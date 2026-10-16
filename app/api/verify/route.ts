/**
 * POST /api/verify
 *
 * Re-validates a session token AND re-resolves the plan server-side
 * (subscriptions table). If the plan changed (upgrade, cancellation,
 * failed payment…) a fresh token with the current plan is returned so the
 * client can swap it. Called by the client every 7 days and after payment.
 */
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createToken } from "@/lib/pro-token";
import { resolvePlan } from "@/lib/entitlements";
import { readJson } from "@/lib/validate";
import { rateLimit, clientIp, tooMany } from "@/lib/rate-limit";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate" };

export async function POST(req: NextRequest) {
  const rl = rateLimit(`verify:${clientIp(req)}`, 60, 60_000);
  if (!rl.ok) return tooMany(rl);

  let body: { token?: unknown };
  try { body = await readJson(req, 8 * 1024); }
  catch { return NextResponse.json({ valid: false }, { status: 400, headers: NO_CACHE }); }

  const token = typeof body.token === "string" ? body.token : "";
  if (!token) return NextResponse.json({ valid: false }, { headers: NO_CACHE });

  const p = verifyToken(token);
  if (!p.valid) return NextResponse.json({ valid: false }, { headers: NO_CACHE });

  const plan = await resolvePlan(p.emailHash, p.plan);

  if (plan !== p.plan) {
    const fresh = createToken(p.emailHash, plan);
    return NextResponse.json(
      { valid: true, isPro: plan !== "free", plan, token: fresh.token, expires: fresh.expires, changed: true },
      { headers: NO_CACHE }
    );
  }

  return NextResponse.json(
    { valid: true, isPro: plan !== "free", plan, changed: false },
    { headers: NO_CACHE }
  );
}
