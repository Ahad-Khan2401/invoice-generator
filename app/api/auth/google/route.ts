/**
 * POST /api/auth/google
 *
 * 1. Verifies the Google token (ID token or access token)
 * 2. Checks Lemon Squeezy for an active subscription
 * 3. Issues a signed HMAC token for ALL Google users:
 *    - Free users  → token with isPro=false  (30-day session)
 *    - Pro users   → token with isPro=true   (37-day session)
 */
import { NextRequest, NextResponse } from "next/server";
import { hashEmail, createToken } from "@/lib/pro-token";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate" };

/* ─── Google token verification ────────────────────── */
async function verifyGoogleToken(
  token: string
): Promise<{ email: string; name: string } | null> {
  try {
    // Access token (from useGoogleLogin implicit flow)
    if (token.startsWith("access:")) {
      const accessToken = token.slice(7);
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: AbortSignal.timeout(8_000),
      });
      if (!res.ok) return null;
      const info = await res.json() as {
        email?: string; name?: string; email_verified?: boolean;
      };
      if (!info.email) return null;
      if (info.email_verified === false) return null;
      return { email: info.email, name: info.name ?? info.email };
    }

    // ID token (from GoogleLogin button)
    const res = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`,
      { signal: AbortSignal.timeout(8_000) }
    );
    if (!res.ok) return null;
    const info = await res.json() as {
      email: string; name?: string; email_verified: string;
      aud: string; exp: string;
    };
    if (info.email_verified !== "true") return null;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (clientId && info.aud !== clientId) return null;
    if (parseInt(info.exp, 10) * 1000 < Date.now()) return null;
    return { email: info.email, name: info.name ?? info.email };

  } catch (e) {
    console.error("[auth/google] verify error:", e);
    return null;
  }
}

/* ─── Lemon Squeezy subscription check ─────────────── */
async function checkSubscription(email: string): Promise<boolean> {
  const apiKey  = process.env.LS_API_KEY;
  const storeId = process.env.LS_STORE_ID;
  if (!apiKey || !storeId) return false;

  try {
    const url =
      `https://api.lemonsqueezy.com/v1/subscriptions` +
      `?filter[store_id]=${storeId}` +
      `&filter[user_email]=${encodeURIComponent(email)}` +
      `&page[size]=5`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept:        "application/vnd.api+json",
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return false;

    const data = await res.json();
    const subs: { attributes?: { status?: string } }[] = data.data ?? [];
    return subs.some(
      s => s.attributes?.status === "active" || s.attributes?.status === "on_trial"
    );
  } catch {
    return false;
  }
}

/* ─── Route handler ─────────────────────────────────── */
export async function POST(req: NextRequest) {
  let body: { idToken?: unknown };
  try { body = await req.json(); }
  catch { return fail(400, "Invalid request body."); }

  const idToken = typeof body.idToken === "string" ? body.idToken.trim() : "";
  if (!idToken) return fail(400, "Google token is required.");

  if (!process.env.PRO_JWT_SECRET) {
    console.error("[auth/google] PRO_JWT_SECRET is not set");
    return fail(500, "Server configuration error. Please contact support.");
  }

  // 1. Verify Google token
  const google = await verifyGoogleToken(idToken);
  if (!google) return fail(401, "Google sign-in failed. Please try again.");

  // 2. Check Pro subscription
  const isPro     = await checkSubscription(google.email);
  const emailHash = hashEmail(google.email);
  const { token, expires } = createToken(emailHash, isPro);

  return NextResponse.json(
    {
      loggedIn:  true,
      isPro,
      token,
      emailHash,
      expires,
      name:  google.name,
      email: google.email, // returned so client can show it; never stored raw
    },
    { headers: NO_CACHE }
  );
}

function fail(status: number, error: string) {
  return NextResponse.json({ loggedIn: false, error }, { status, headers: NO_CACHE });
}
