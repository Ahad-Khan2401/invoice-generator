/**
 * lib/entitlements.ts — server-side plan resolution.
 *
 * Order of truth:
 *   1. `subscriptions` table (kept current by the Lemon Squeezy webhook and
 *      by the sign-in sync). Fast, works for every request.
 *   2. Lemon Squeezy API lookup by e-mail (only possible when we have the
 *      raw e-mail, i.e. at sign-in). Result is written back to the table.
 *   3. The plan code embedded in the session token (UI hint only). Used
 *      only when the DB is not configured so the product keeps working.
 *
 * Never trust the client; call `resolvePlan()` in every API route that
 * gates a feature.
 */
import { getDb, isDbReady } from "@/lib/db";
import { hashEmail } from "@/lib/pro-token";
import { planFromVariant, statusGrantsAccess, type PlanKey } from "@/lib/plans";

export interface SubscriptionRow {
  subscription_id: string;
  email_hash: string;
  status: string;
  plan: string;
  variant_id: string | null;
  renews_at: string | null;
  ends_at: string | null;
  customer_portal: string | null;
  update_url: string | null;
  card_brand: string | null;
  card_last_four: string | null;
  updated_at: string;
}

/** Highest plan granted by any access-granting subscription row. */
function bestPlan(rows: SubscriptionRow[]): PlanKey {
  let best: PlanKey = "free";
  for (const r of rows) {
    if (!statusGrantsAccess(r.status, r.ends_at)) continue;
    if (r.plan === "business") return "business";
    if (r.plan === "pro") best = "pro";
  }
  return best;
}

/** Plan from the subscriptions table, or null when the DB is unavailable. */
export async function planFromDb(emailHash: string): Promise<{ plan: PlanKey; rows: SubscriptionRow[] } | null> {
  if (!isDbReady()) return null;
  const db = getDb();
  if (!db) return null;
  try {
    const rows = (await db`
      SELECT subscription_id, email_hash, status, plan, variant_id, renews_at, ends_at,
             customer_portal, update_url, card_brand, card_last_four, updated_at
        FROM subscriptions
       WHERE email_hash = ${emailHash}
       ORDER BY updated_at DESC
       LIMIT 10
    `) as SubscriptionRow[];
    return { plan: bestPlan(rows), rows };
  } catch (e) {
    console.error("[entitlements] db error", e);
    return null;
  }
}

/**
 * Resolve the effective plan for an authenticated request.
 * `tokenPlan` is the hint from the verified session token.
 */
export async function resolvePlan(emailHash: string, tokenPlan: PlanKey): Promise<PlanKey> {
  const fromDb = await planFromDb(emailHash);
  if (fromDb) return fromDb.plan;
  // DB not configured: the token is the only signal we have.
  return tokenPlan;
}

/* ─── Lemon Squeezy API sync (needs raw e-mail → only at sign-in) ────── */

interface LsSub {
  id: string;
  attributes: {
    status: string;
    user_email: string;
    variant_id: number;
    product_id: number;
    customer_id: number;
    order_id: number;
    renews_at: string | null;
    ends_at: string | null;
    trial_ends_at: string | null;
    card_brand: string | null;
    card_last_four: string | null;
    urls?: { update_payment_method?: string; customer_portal?: string };
  };
}

/**
 * Look up subscriptions for an e-mail via the Lemon Squeezy API, upsert
 * them into the DB (if configured) and return the effective plan.
 * Returns null when the API is not configured or the call fails.
 */
export async function syncPlanFromLemonSqueezy(email: string): Promise<PlanKey | null> {
  const apiKey  = process.env.LS_API_KEY;
  const storeId = process.env.LS_STORE_ID;
  if (!apiKey || !storeId) return null;

  try {
    const url =
      `https://api.lemonsqueezy.com/v1/subscriptions` +
      `?filter[store_id]=${encodeURIComponent(storeId)}` +
      `&filter[user_email]=${encodeURIComponent(email)}` +
      `&page[size]=10`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/vnd.api+json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { data?: LsSub[] };
    const subs = data.data ?? [];
    const emailHash = hashEmail(email);

    let plan: PlanKey = "free";
    for (const s of subs) {
      const a = s.attributes;
      const p = planFromVariant(a.variant_id);
      if (statusGrantsAccess(a.status, a.ends_at)) {
        if (p === "business") plan = "business";
        else if (plan === "free") plan = "pro";
      }
      await upsertSubscription({
        subscription_id: String(s.id),
        email_hash: emailHash,
        status: a.status,
        plan: p,
        variant_id: String(a.variant_id ?? ""),
        product_id: String(a.product_id ?? ""),
        customer_id: String(a.customer_id ?? ""),
        order_id: String(a.order_id ?? ""),
        renews_at: a.renews_at,
        ends_at: a.ends_at,
        trial_ends_at: a.trial_ends_at,
        card_brand: a.card_brand,
        card_last_four: a.card_last_four,
        update_url: a.urls?.update_payment_method ?? null,
        customer_portal: a.urls?.customer_portal ?? null,
        source: "api-sync",
      });
    }
    return plan;
  } catch (e) {
    console.error("[entitlements] LS sync failed", e);
    return null;
  }
}

export interface UpsertSub {
  subscription_id: string;
  email_hash: string;
  status: string;
  plan: PlanKey;
  variant_id?: string | null;
  product_id?: string | null;
  customer_id?: string | null;
  order_id?: string | null;
  renews_at?: string | null;
  ends_at?: string | null;
  trial_ends_at?: string | null;
  card_brand?: string | null;
  card_last_four?: string | null;
  update_url?: string | null;
  customer_portal?: string | null;
  source: string;
}

/** Idempotent upsert — safe to call from webhook and sync paths. */
export async function upsertSubscription(s: UpsertSub): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await db`
      INSERT INTO subscriptions (
        subscription_id, email_hash, status, plan, variant_id, product_id, customer_id, order_id,
        renews_at, ends_at, trial_ends_at, card_brand, card_last_four, update_url, customer_portal, source, updated_at
      ) VALUES (
        ${s.subscription_id}, ${s.email_hash}, ${s.status}, ${s.plan}, ${s.variant_id ?? null}, ${s.product_id ?? null},
        ${s.customer_id ?? null}, ${s.order_id ?? null}, ${s.renews_at ?? null}, ${s.ends_at ?? null}, ${s.trial_ends_at ?? null},
        ${s.card_brand ?? null}, ${s.card_last_four ?? null}, ${s.update_url ?? null}, ${s.customer_portal ?? null}, ${s.source}, NOW()
      )
      ON CONFLICT (subscription_id) DO UPDATE SET
        email_hash      = EXCLUDED.email_hash,
        status          = EXCLUDED.status,
        plan            = EXCLUDED.plan,
        variant_id      = EXCLUDED.variant_id,
        product_id      = EXCLUDED.product_id,
        customer_id     = EXCLUDED.customer_id,
        order_id        = EXCLUDED.order_id,
        renews_at       = EXCLUDED.renews_at,
        ends_at         = EXCLUDED.ends_at,
        trial_ends_at   = EXCLUDED.trial_ends_at,
        card_brand      = EXCLUDED.card_brand,
        card_last_four  = EXCLUDED.card_last_four,
        update_url      = COALESCE(EXCLUDED.update_url, subscriptions.update_url),
        customer_portal = COALESCE(EXCLUDED.customer_portal, subscriptions.customer_portal),
        source          = EXCLUDED.source,
        updated_at      = NOW()
    `;
    return true;
  } catch (e) {
    console.error("[entitlements] upsert failed", e);
    return false;
  }
}
