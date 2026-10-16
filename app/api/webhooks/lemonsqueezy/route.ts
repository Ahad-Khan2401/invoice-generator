/**
 * POST /api/webhooks/lemonsqueezy
 *
 * Receives Lemon Squeezy subscription/order events and keeps the
 * `subscriptions` table current, so entitlements no longer depend on
 * the one-time check at sign-in.
 *
 * Security:
 *  - Signature: LS signs the RAW body with HMAC-SHA256 using the webhook
 *    signing secret and sends it hex-encoded in `X-Signature`. We compare
 *    with timingSafeEqual. Requests without a valid signature are rejected.
 *  - Idempotency: every event id is recorded in `webhook_events`; replays
 *    are acknowledged with 200 but not re-applied.
 *  - Rate limited per IP as a last line of defence.
 *
 * Setup (Lemon Squeezy → Settings → Webhooks):
 *   URL:    https://www.pdfbillbuilder.com/api/webhooks/lemonsqueezy
 *   Secret: same value as env LS_WEBHOOK_SECRET
 *   Events: subscription_created, subscription_updated, subscription_cancelled,
 *           subscription_resumed, subscription_expired, subscription_paused,
 *           subscription_unpaused, subscription_payment_failed,
 *           subscription_payment_success, subscription_payment_recovered,
 *           order_refunded
 */
import { NextRequest, NextResponse } from "next/server";
import { createHmac, createHash, timingSafeEqual } from "crypto";
import { getDb, isDbReady } from "@/lib/db";
import { hashEmail } from "@/lib/pro-token";
import { upsertSubscription } from "@/lib/entitlements";
import { planFromVariant } from "@/lib/plans";
import { rateLimit, clientIp, tooMany } from "@/lib/rate-limit";

export const runtime = "nodejs";

const SUBSCRIPTION_EVENTS = new Set([
  "subscription_created", "subscription_updated", "subscription_cancelled",
  "subscription_resumed", "subscription_expired", "subscription_paused",
  "subscription_unpaused", "subscription_payment_failed",
  "subscription_payment_success", "subscription_payment_recovered",
]);

interface LsWebhook {
  meta?: { event_name?: string; webhook_id?: string; custom_data?: Record<string, unknown> };
  data?: {
    id?: string;
    type?: string;
    attributes?: Record<string, unknown>;
  };
}

function verifySignature(raw: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(header.trim().toLowerCase(), "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

const s = (v: unknown) => (v == null ? null : String(v));

export async function POST(req: NextRequest) {
  const rl = rateLimit(`ls-webhook:${clientIp(req)}`, 120, 60_000);
  if (!rl.ok) return tooMany(rl);

  const secret = process.env.LS_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[ls-webhook] LS_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const raw = await req.text();
  if (raw.length > 512 * 1024) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }
  if (!verifySignature(raw, req.headers.get("x-signature"), secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: LsWebhook;
  try { body = JSON.parse(raw) as LsWebhook; }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const eventName = body.meta?.event_name ?? req.headers.get("x-event-name") ?? "";
  const attrs = body.data?.attributes ?? {};
  const objectId = s(body.data?.id) ?? "";

  // Stable event id: LS provides webhook_id; fall back to a body hash.
  const eventId = body.meta?.webhook_id
    ? String(body.meta.webhook_id)
    : createHash("sha256").update(raw).digest("hex");

  if (!isDbReady()) {
    // Acknowledge so LS doesn't retry forever, but log loudly.
    console.error("[ls-webhook] DATABASE_URL not configured; event dropped", eventName, objectId);
    return NextResponse.json({ ok: true, stored: false });
  }
  const db = getDb()!;

  // Idempotency
  try {
    const seen = (await db`SELECT 1 FROM webhook_events WHERE event_id = ${eventId} LIMIT 1`) as unknown[];
    if (seen.length) return NextResponse.json({ ok: true, duplicate: true });
  } catch (e) {
    console.error("[ls-webhook] idempotency check failed", e);
  }

  let applied = false;

  if (SUBSCRIPTION_EVENTS.has(eventName) && objectId) {
    const email = s(attrs.user_email);
    if (email) {
      const urls = (attrs.urls ?? {}) as Record<string, unknown>;
      applied = await upsertSubscription({
        subscription_id: objectId,
        email_hash:      hashEmail(email),
        status:          s(attrs.status) ?? "unknown",
        plan:            planFromVariant(s(attrs.variant_id)),
        variant_id:      s(attrs.variant_id),
        product_id:      s(attrs.product_id),
        customer_id:     s(attrs.customer_id),
        order_id:        s(attrs.order_id),
        renews_at:       s(attrs.renews_at),
        ends_at:         s(attrs.ends_at),
        trial_ends_at:   s(attrs.trial_ends_at),
        card_brand:      s(attrs.card_brand),
        card_last_four:  s(attrs.card_last_four),
        update_url:      s(urls.update_payment_method),
        customer_portal: s(urls.customer_portal),
        source:          `webhook:${eventName}`,
      });
    }
  } else if (eventName === "order_refunded" && objectId) {
    // A refunded order: mark any subscription from that order as expired.
    try {
      await db`
        UPDATE subscriptions
           SET status = 'expired', ends_at = NOW(), source = 'webhook:order_refunded', updated_at = NOW()
         WHERE order_id = ${objectId}
      `;
      applied = true;
    } catch (e) {
      console.error("[ls-webhook] refund update failed", e);
    }
  }

  try {
    await db`INSERT INTO webhook_events (event_id, event_name) VALUES (${eventId}, ${eventName}) ON CONFLICT DO NOTHING`;
  } catch (e) {
    console.error("[ls-webhook] event log failed", e);
  }

  return NextResponse.json({ ok: true, applied, event: eventName }, { headers: { "Cache-Control": "no-store" } });
}
