/**
 * lib/analytics.ts — privacy-conscious GA4 event helper.
 *
 * Rules:
 *  - Never send names, e-mails, invoice contents, client data or amounts.
 *  - Only categorical / boolean / small-integer params.
 *  - Safe no-op when gtag is absent (ad blocker, consent denied, no GA id).
 */

export type AnalyticsEvent =
  | "landing_page_view"
  | "generator_started"
  | "document_type_selected"
  | "template_selected"
  | "pdf_generated"
  | "pdf_downloaded"
  | "print_started"
  | "draft_saved"
  | "document_exported"
  | "document_imported"
  | "signup_started"
  | "signup_completed"
  | "signin_completed"
  | "pricing_viewed"
  | "checkout_started"
  | "subscription_activated"
  | "subscription_cancelled"
  | "premium_feature_clicked"
  | "reminder_copied"
  | "csv_exported"
  | "mode_changed"
  | "example_filled"
  | "guide_step_done"
  | "guide_skipped"
  | "guide_completed"
  | "layout_changed";

type Primitive = string | number | boolean;

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

/* Keys that must never leave the browser even if passed by mistake. */
const BLOCKED = /name|email|phone|address|amount|total|rate|price|client|notes|bank|desc|logo|token|hash/i;

export function track(event: AnalyticsEvent, params: Record<string, Primitive | undefined> = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const clean: Record<string, Primitive> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || BLOCKED.test(k)) continue;
    if (typeof v === "string" && v.length > 60) continue;
    clean[k] = v;
  }
  try { window.gtag("event", event, clean); } catch { /* ignore */ }
}

/** GA4 recommended e-commerce event for checkout clicks (no user data). */
export function trackCheckout(source: string, plan: string, value: number): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "begin_checkout", {
      currency: "USD",
      value,
      items: [{ item_name: `PDF Bill Builder ${plan}`, item_category: source }],
    });
  } catch { /* ignore */ }
  track("checkout_started", { source, plan });
}
