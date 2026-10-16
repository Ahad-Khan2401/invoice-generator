/**
 * Session token helpers — server-side only.
 *
 * Token format:  emailHash.expires.planCode.hmacSignature
 *   planCode: "0" = free, "1" = pro, "2" = business  (see lib/plans.ts)
 *
 * The plan code is embedded so the client can read feature gating
 * without an extra API call, but it is only a HINT for the UI.
 * Every API route re-resolves the plan server-side (lib/entitlements.ts),
 * and /api/verify re-issues a token whenever the plan changes.
 */
import { createHmac, createHash, timingSafeEqual } from "crypto";
import { CODE_PLAN, PLAN_CODE, type PlanKey } from "./plans.ts";

const FREE_DAYS = 30; // free session
const PAID_DAYS = 37; // paid session (~1 month + grace)

function secret(): string {
  const s = process.env.PRO_JWT_SECRET;
  if (!s) throw new Error("PRO_JWT_SECRET env var is not set");
  return s;
}

/* ─── Utilities ─────────────────────────────────── */
export function hashEmail(email: string): string {
  return createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex")
    .slice(0, 24);
}

/* ─── Create ────────────────────────────────────── */
export function createToken(emailHash: string, plan: PlanKey | boolean): { token: string; expires: number } {
  const key: PlanKey = typeof plan === "boolean" ? (plan ? "pro" : "free") : plan;
  const days    = key === "free" ? FREE_DAYS : PAID_DAYS;
  const expires = Date.now() + days * 24 * 60 * 60 * 1000;
  const payload = `${emailHash}.${expires}.${PLAN_CODE[key]}`;
  const sig     = createHmac("sha256", secret())
    .update(payload)
    .digest("hex")
    .slice(0, 40);
  return { token: `${payload}.${sig}`, expires };
}

/* ─── Verify ────────────────────────────────────── */
export interface TokenPayload {
  valid:     boolean;
  /** Back-compat flag: any paid plan. */
  isPro:     boolean;
  plan:      PlanKey;
  emailHash: string;
  expires:   number;
}

export function verifyToken(token: string): TokenPayload {
  const INVALID: TokenPayload = { valid: false, isPro: false, plan: "free", emailHash: "", expires: 0 };

  try {
    const sec   = secret();
    const parts = token.split(".");
    if (parts.length !== 4) return INVALID;

    const [emailHash, expiresStr, planCode, sig] = parts;
    const expires = parseInt(expiresStr, 10);

    if (!/^[a-f0-9]{24}$/.test(emailHash))            return INVALID;
    if (isNaN(expires) || Date.now() > expires)       return INVALID;
    if (!(planCode in CODE_PLAN))                     return INVALID;

    const payload  = `${emailHash}.${expires}.${planCode}`;
    const expected = createHmac("sha256", sec)
      .update(payload)
      .digest("hex")
      .slice(0, 40);

    if (sig.length !== expected.length) return INVALID;
    const ok = timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    if (!ok) return INVALID;

    const plan = CODE_PLAN[planCode];
    return { valid: true, isPro: plan !== "free", plan, emailHash, expires };
  } catch {
    return INVALID;
  }
}
