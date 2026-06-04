/**
 * Shared Pro token helpers — server-side only.
 * Token format: `emailHash.expires.hmacSignature`
 */
import { createHmac, createHash, timingSafeEqual } from "crypto";

const TOKEN_DAYS = 37; // ~1 month + 7-day grace

function secret(): string {
  const s = process.env.PRO_JWT_SECRET;
  if (!s) throw new Error("PRO_JWT_SECRET env var is not set");
  return s;
}

export function hashEmail(email: string): string {
  return createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex")
    .slice(0, 24);
}

export function createProToken(emailHash: string, expires: number): string {
  const payload = `${emailHash}.${expires}`;
  const sig = createHmac("sha256", secret())
    .update(payload)
    .digest("hex")
    .slice(0, 40);
  return `${payload}.${sig}`;
}

export function verifyProToken(token: string): boolean {
  try {
    const sec = secret();
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [emailHash, expiresStr, sig] = parts;
    const expires = parseInt(expiresStr, 10);
    if (isNaN(expires) || Date.now() > expires) return false;

    const payload  = `${emailHash}.${expires}`;
    const expected = createHmac("sha256", sec)
      .update(payload)
      .digest("hex")
      .slice(0, 40);

    if (sig.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function tokenExpiry(): number {
  return Date.now() + TOKEN_DAYS * 24 * 60 * 60 * 1000;
}
