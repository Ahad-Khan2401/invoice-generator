/**
 * Auth token helpers — server-side only.
 *
 * Token format:  emailHash.expires.isPro(0|1).hmacSignature
 *
 * Both free and Pro users get a token.
 * isPro flag is embedded so the client can read feature gating
 * without an extra API call, but the token can be re-verified
 * server-side via /api/verify.
 */
import { createHmac, createHash, timingSafeEqual } from "crypto";

const FREE_DAYS = 30; // free session
const PRO_DAYS  = 37; // pro session (~1 month + grace)

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
export function createToken(emailHash: string, isPro: boolean): { token: string; expires: number } {
  const days    = isPro ? PRO_DAYS : FREE_DAYS;
  const expires = Date.now() + days * 24 * 60 * 60 * 1000;
  const proFlag = isPro ? "1" : "0";
  const payload = `${emailHash}.${expires}.${proFlag}`;
  const sig     = createHmac("sha256", secret())
    .update(payload)
    .digest("hex")
    .slice(0, 40);
  return { token: `${payload}.${sig}`, expires };
}

/* ─── Verify ────────────────────────────────────── */
export interface TokenPayload {
  valid:     boolean;
  isPro:     boolean;
  emailHash: string;
  expires:   number;
}

export function verifyToken(token: string): TokenPayload {
  const INVALID: TokenPayload = { valid: false, isPro: false, emailHash: "", expires: 0 };

  try {
    const sec   = secret();
    const parts = token.split(".");
    if (parts.length !== 4) return INVALID;

    const [emailHash, expiresStr, proFlag, sig] = parts;
    const expires = parseInt(expiresStr, 10);

    if (isNaN(expires) || Date.now() > expires) return INVALID;
    if (proFlag !== "0" && proFlag !== "1")      return INVALID;

    const payload  = `${emailHash}.${expires}.${proFlag}`;
    const expected = createHmac("sha256", sec)
      .update(payload)
      .digest("hex")
      .slice(0, 40);

    if (sig.length !== expected.length) return INVALID;
    const ok = timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    if (!ok) return INVALID;

    return { valid: true, isPro: proFlag === "1", emailHash, expires };
  } catch {
    return INVALID;
  }
}
