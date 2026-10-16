/**
 * Tiny in-memory token-bucket rate limiter.
 *
 * On Vercel each serverless instance has its own memory, so this is a
 * best-effort guard against casual abuse (it still stops a single client
 * hammering one warm instance). For hard guarantees move the bucket to
 * Upstash/Redis — the interface below stays the same.
 */
import type { NextRequest } from "next/server";

interface Bucket { tokens: number; updated: number }
const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
}

/**
 * @param key      unique key (e.g. "auth:1.2.3.4")
 * @param limit    max requests per window
 * @param windowMs window length in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const refillPerMs = limit / windowMs;

  let b = buckets.get(key);
  if (!b) {
    if (buckets.size >= MAX_KEYS) {
      // Drop the oldest entries so memory stays bounded.
      const cutoff = now - windowMs;
      for (const [k, v] of buckets) if (v.updated < cutoff) buckets.delete(k);
      if (buckets.size >= MAX_KEYS) buckets.clear();
    }
    b = { tokens: limit, updated: now };
    buckets.set(key, b);
  }

  // Refill
  const elapsed = now - b.updated;
  b.tokens = Math.min(limit, b.tokens + elapsed * refillPerMs);
  b.updated = now;

  if (b.tokens >= 1) {
    b.tokens -= 1;
    return { ok: true, remaining: Math.floor(b.tokens), retryAfterSec: 0 };
  }
  const needMs = (1 - b.tokens) / refillPerMs;
  return { ok: false, remaining: 0, retryAfterSec: Math.max(1, Math.ceil(needMs / 1000)) };
}

/** Best-effort client IP (Vercel sets x-forwarded-for / x-real-ip). */
export function clientIp(req: NextRequest | Request): string {
  const h = req.headers;
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return h.get("x-real-ip") ?? h.get("cf-connecting-ip") ?? "unknown";
}

/** Convenience: build a 429 JSON response. */
export function tooMany(r: RateLimitResult): Response {
  return new Response(JSON.stringify({ error: "Too many requests. Please try again shortly." }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(r.retryAfterSec),
      "Cache-Control": "no-store",
    },
  });
}
