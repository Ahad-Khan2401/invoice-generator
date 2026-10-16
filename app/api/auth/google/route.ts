/**
 * POST /api/auth/google
 *
 * 1. Verifies the Google token (ID token or access token) and, when
 *    GOOGLE_CLIENT_ID is set, that it was issued to THIS app (audience).
 * 2. Resolves the plan: subscriptions table → Lemon Squeezy API sync → free.
 * 3. Issues a signed HMAC session token for ALL Google users:
 *    - Free users  → plan "free"   (30-day session)
 *    - Paid users  → plan pro/biz  (37-day session)
 */
import { NextRequest, NextResponse } from "next/server";
import { hashEmail, createToken } from "@/lib/pro-token";
import { planFromDb, syncPlanFromLemonSqueezy } from "@/lib/entitlements";
import { readJson } from "@/lib/validate";
import { rateLimit, clientIp, tooMany } from "@/lib/rate-limit";
import type { PlanKey } from "@/lib/plans";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate" };

/* ─── Google token verification ────────────────────── */
async function verifyGoogleToken(
  token: string
): Promise<{ email: string; name: string } | null> {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  try {
    // Access token (from useGoogleLogin implicit flow)
    if (token.startsWith("access:")) {
      const accessToken = token.slice(7);

      // Audience check: make sure the token was minted for our OAuth client.
      if (clientId) {
        const ti = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(accessToken)}`,
          { signal: AbortSignal.timeout(8_000) }
        );
        if (!ti.ok) return null;
        const info = (await ti.json()) as { aud?: string; azp?: string; expires_in?: string };
        if (info.aud !== clientId && info.azp !== clientId) return null;
      }

      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: AbortSignal.timeout(8_000),
      });
      if (!res.ok) return null;
      const info = await res.json() as { email?: string; name?: string; email_verified?: boolean };
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
      email: string; name?: string; email_verified: string; aud: string; exp: string;
    };
    if (info.email_verified !== "true") return null;
    if (clientId && info.aud !== clientId) return null;
    if (parseInt(info.exp, 10) * 1000 < Date.now()) return null;
    return { email: info.email, name: info.name ?? info.email };

  } catch (e) {
    console.error("[auth/google] verify error:", e);
    return null;
  }
}

/* ─── Route handler ─────────────────────────────────── */
export async function POST(req: NextRequest) {
  const rl = rateLimit(`auth:${clientIp(req)}`, 20, 60_000);
  if (!rl.ok) return tooMany(rl);

  let body: { idToken?: unknown };
  try { body = await readJson(req, 16 * 1024); }
  catch { return fail(400, "Invalid request body."); }

  const idToken = typeof body.idToken === "string" ? body.idToken.trim() : "";
  if (!idToken || idToken.length > 4096) return fail(400, "Google token is required.");

  if (!process.env.PRO_JWT_SECRET) {
    console.error("[auth/google] PRO_JWT_SECRET is not set");
    return fail(500, "Server configuration error. Please contact support.");
  }

  // 1. Verify Google token
  const google = await verifyGoogleToken(idToken);
  if (!google) return fail(401, "Google sign-in failed. Please try again.");

  // 2. Resolve plan — fresh sync from Lemon Squeezy at sign-in, DB as fallback
  const emailHash = hashEmail(google.email);
  let plan: PlanKey | null = await syncPlanFromLemonSqueezy(google.email);
  if (plan === null) {
    const fromDb = await planFromDb(emailHash);
    plan = fromDb?.plan ?? "free";
  }

  const { token, expires } = createToken(emailHash, plan);

  return NextResponse.json(
    {
      loggedIn:  true,
      isPro:     plan !== "free",
      plan,
      token,
      emailHash,
      expires,
      name:  google.name,
    },
    { headers: NO_CACHE }
  );
}

function fail(status: number, error: string) {
  return NextResponse.json({ loggedIn: false, error }, { status, headers: NO_CACHE });
}
