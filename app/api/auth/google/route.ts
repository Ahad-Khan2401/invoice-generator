/**
 * POST /api/auth/google
 *
 * 1. Verifies the Google ID token via Google's tokeninfo endpoint
 * 2. Extracts the verified email
 * 3. Checks Lemon Squeezy for an active subscription on that email
 * 4. Returns a signed HMAC Pro token (37-day expiry)
 */
import { NextRequest, NextResponse } from "next/server";
import { hashEmail, createProToken, tokenExpiry } from "@/lib/pro-token";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate" };

/* ─── Google token verification ────────────────────── */
interface GoogleTokenInfo {
  email: string;
  email_verified: string;
  name?: string;
  aud: string;
  iss: string;
  exp: string;
}

/**
 * Verify a Google token.
 * Accepts two formats from the client:
 *   - "access:{accessToken}" → verify via userinfo endpoint
 *   - plain id_token         → verify via tokeninfo endpoint
 */
async function verifyGoogleToken(token: string): Promise<{ email: string; name: string } | null> {
  try {
    let url: string;
    let expectVerifiedField = true;

    if (token.startsWith("access:")) {
      // Access token → call userinfo (always returns verified email)
      const accessToken = token.slice(7);
      url = `https://www.googleapis.com/oauth2/v3/userinfo`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: AbortSignal.timeout(8_000),
      });
      if (!res.ok) return null;
      const info = await res.json() as { email?: string; name?: string; email_verified?: boolean };
      if (!info.email) return null;
      if (info.email_verified === false) return null;
      return { email: info.email, name: info.name ?? info.email };
    } else {
      // ID token → verify via tokeninfo
      const res = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`,
        { signal: AbortSignal.timeout(8_000) }
      );
      if (!res.ok) return null;
      const info = (await res.json()) as GoogleTokenInfo;

      if (expectVerifiedField && info.email_verified !== "true") return null;

      // If GOOGLE_CLIENT_ID set, verify token is for our app
      const clientId = process.env.GOOGLE_CLIENT_ID;
      if (clientId && info.aud !== clientId) {
        console.warn("[auth/google] Token aud mismatch:", info.aud);
        return null;
      }
      if (parseInt(info.exp, 10) * 1000 < Date.now()) return null;
      return { email: info.email, name: info.name ?? info.email };
    }
  } catch (e) {
    console.error("[auth/google] verify error:", e);
    return null;
  }
}

/* ─── Lemon Squeezy subscription check ─────────────── */
async function hasActiveSubscription(email: string): Promise<boolean> {
  const apiKey  = process.env.LS_API_KEY;
  const storeId = process.env.LS_STORE_ID;

  if (!apiKey || !storeId) {
    console.error("[auth/google] LS_API_KEY or LS_STORE_ID env var not set");
    return false;
  }

  try {
    const url =
      `https://api.lemonsqueezy.com/v1/subscriptions` +
      `?filter[store_id]=${storeId}` +
      `&filter[user_email]=${encodeURIComponent(email)}` +
      `&page[size]=5`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/vnd.api+json",
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("[auth/google] LS API error:", res.status);
      return false;
    }

    const data = await res.json();
    const subs: { attributes?: { status?: string } }[] = data.data ?? [];

    return subs.some(
      (s) =>
        s.attributes?.status === "active" ||
        s.attributes?.status === "on_trial"
    );
  } catch (e) {
    console.error("[auth/google] LS check error:", e);
    return false;
  }
}

/* ─── Route handler ─────────────────────────────────── */
export async function POST(req: NextRequest) {
  /* 1. Parse body */
  let body: { idToken?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request body.");
  }

  const idToken = typeof body.idToken === "string" ? body.idToken.trim() : "";
  if (!idToken) return fail(400, "Google ID token is required.");

  /* 2. Check PRO_JWT_SECRET */
  if (!process.env.PRO_JWT_SECRET) {
    console.error("[auth/google] PRO_JWT_SECRET is not set");
    return fail(500, "Server configuration error. Please contact support.");
  }

  /* 3. Verify Google token */
  const google = await verifyGoogleToken(idToken);
  if (!google) {
    return fail(401, "Google sign-in failed. Please try again.");
  }

  /* 4. Check Lemon Squeezy subscription */
  const isPro = await hasActiveSubscription(google.email);
  if (!isPro) {
    return NextResponse.json(
      { valid: false, subscribed: false, email: google.email },
      { headers: NO_CACHE }
    );
  }

  /* 5. Issue signed Pro token */
  const expires    = tokenExpiry();
  const emailHash  = hashEmail(google.email);
  const token      = createProToken(emailHash, expires);

  return NextResponse.json(
    { valid: true, subscribed: true, token, emailHash, expires, name: google.name },
    { headers: NO_CACHE }
  );
}

function fail(status: number, error: string) {
  return NextResponse.json({ valid: false, error }, { status, headers: NO_CACHE });
}
