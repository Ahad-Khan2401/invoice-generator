import { NextRequest, NextResponse } from "next/server";
import { createHmac, createHash, timingSafeEqual } from "crypto";

/* ─── Config ─────────────────────────────────────── */
const LS_VALIDATE = "https://api.lemonsqueezy.com/v1/licenses/validate";
const TOKEN_DAYS  = 37; // ~1 month + 7-day grace

/* ─── Helpers ─────────────────────────────────────── */
function getSecret(): string | null {
  return process.env.PRO_JWT_SECRET ?? null;
}

/** One-way hash of license key (never store raw key) */
export function hashKey(key: string): string {
  return createHash("sha256")
    .update(key.trim().toLowerCase())
    .digest("hex")
    .slice(0, 24);
}

/** Create HMAC-signed token: `keyHash.expires.signature` */
export function createToken(keyHash: string, expires: number): string {
  const secret = getSecret()!;
  const payload = `${keyHash}.${expires}`;
  const sig = createHmac("sha256", secret)
    .update(payload)
    .digest("hex")
    .slice(0, 40);
  return `${payload}.${sig}`;
}

/** Verify token — constant-time comparison to prevent timing attacks */
export function verifyToken(token: string): boolean {
  const secret = getSecret();
  if (!secret) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [keyHash, expiresStr, sig] = parts;
  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || Date.now() > expires) return false;

  const payload = `${keyHash}.${expires}`;
  const expected = createHmac("sha256", secret)
    .update(payload)
    .digest("hex")
    .slice(0, 40);

  // Constant-time comparison (prevents timing attacks)
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

/* ─── License key format validator ───────────────── */
const LS_KEY_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

/* ─── POST /api/activate ─────────────────────────── */
export async function POST(req: NextRequest) {

  /* 1. Parse body */
  let body: { key?: unknown };
  try {
    body = await req.json();
  } catch {
    return err(400, "Invalid request body.");
  }

  /* 2. Validate input */
  const rawKey = typeof body.key === "string" ? body.key.trim() : "";
  if (!rawKey) {
    return err(400, "License key is required.");
  }
  if (!LS_KEY_REGEX.test(rawKey)) {
    return err(400, "Invalid license key format. It should look like: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX");
  }

  /* 3. Check secret is configured */
  if (!getSecret()) {
    console.error("[activate] PRO_JWT_SECRET env var is not set.");
    return err(500, "Server configuration error. Please contact support@pdfbillbuilder.com");
  }

  /* 4. Call Lemon Squeezy validate API */
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  let lsData: LSValidateResponse;
  try {
    const lsRes = await fetch(LS_VALIDATE, {
      method:  "POST",
      headers: {
        "Accept":       "application/json",
        "Content-Type": "application/json",
      },
      body:   JSON.stringify({ license_key: rawKey }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!lsRes.ok) {
      console.error("[activate] LS API returned:", lsRes.status);
      return err(502, "Could not verify license. Please try again in a moment.");
    }

    lsData = (await lsRes.json()) as LSValidateResponse;

  } catch (e: unknown) {
    clearTimeout(timeout);
    if (e instanceof Error && e.name === "AbortError") {
      return err(504, "Verification timed out. Please try again.");
    }
    console.error("[activate] fetch error:", e);
    return err(500, "Server error. Please try again.");
  }

  /* 5. Check license validity */
  if (!lsData.valid) {
    const status = lsData.license_key?.status ?? "unknown";
    const messages: Record<string, string> = {
      inactive: "This license key has been deactivated. Please contact support.",
      expired:  "Your subscription has expired. Please renew at pdfbillbuilder.lemonsqueezy.com",
      disabled: "This license key has been disabled. Please contact support.",
    };
    return err(403, messages[status] ?? "Invalid license key. Please check and try again.");
  }

  if (lsData.license_key?.status !== "active") {
    return err(403, "Your subscription is not currently active. Please check your payment status.");
  }

  /* 6. Issue signed token */
  const expires  = Date.now() + TOKEN_DAYS * 24 * 60 * 60 * 1000;
  const keyHash  = hashKey(rawKey);
  const token    = createToken(keyHash, expires);

  return NextResponse.json(
    { valid: true, token, keyHash, expires },
    { headers: noCache() },
  );
}

/* ─── Helpers ─────────────────────────────────────── */
function err(status: number, message: string) {
  return NextResponse.json(
    { valid: false, error: message },
    { status, headers: noCache() },
  );
}

function noCache() {
  return { "Cache-Control": "no-store, no-cache, must-revalidate" };
}

interface LSValidateResponse {
  valid: boolean;
  error?: string | null;
  license_key?: { status: string; key: string } | null;
  meta?: { customer_email?: string } | null;
}
