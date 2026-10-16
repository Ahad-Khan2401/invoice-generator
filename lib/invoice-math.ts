/**
 * lib/invoice-math.ts — pure money math for invoices.
 *
 * Behaviour (unchanged from the original generator, now rounding-safe):
 *   subtotal   = Σ round2(qty × rate)
 *   discount   = % of subtotal  |  fixed amount (capped at subtotal)
 *   afterDisc  = subtotal − discount
 *   exclusive  : tax = afterDisc × rate%,  total = afterDisc + tax
 *   inclusive  : total = afterDisc (prices already include tax);
 *                taxIncluded = afterDisc − afterDisc / (1 + rate%)   ← informational only
 *
 * All outputs are rounded to 2 dp using half-up rounding with an epsilon
 * so 1.005 → 1.01 (plain toFixed gives 1.00).
 */

export interface LineItem { qty: number; rate: number }
export type TaxType  = "exclusive" | "inclusive";
export type DiscType = "%" | "fixed";

export interface Totals {
  subtotal: number;
  discount: number;
  afterDiscount: number;
  /** Tax added on top (exclusive) — 0 when inclusive. */
  tax: number;
  /** Tax portion already inside the prices (inclusive) — 0 when exclusive. */
  taxIncluded: number;
  total: number;
  lines: number[];
}

export function round2(n: number): number {
  if (!isFinite(n)) return 0;
  const sign = n < 0 ? -1 : 1;
  return sign * Math.round((Math.abs(n) + Number.EPSILON) * 100) / 100;
}

export function lineAmount(item: LineItem): number {
  const q = isFinite(item.qty) ? item.qty : 0;
  const r = isFinite(item.rate) ? item.rate : 0;
  return round2(q * r);
}

export function calcTotals(
  items: LineItem[],
  opts: { discount: number; discType: DiscType; taxRate: number; taxType: TaxType }
): Totals {
  const lines = items.map(lineAmount);
  const subtotal = round2(lines.reduce((s, a) => s + a, 0));

  const discRaw = !isFinite(opts.discount) || opts.discount < 0 ? 0 : opts.discount;
  let discount = opts.discType === "%"
    ? subtotal * Math.min(discRaw, 100) / 100
    : Math.min(discRaw, Math.max(subtotal, 0));
  discount = round2(discount);

  const afterDiscount = round2(subtotal - discount);
  const rate = !isFinite(opts.taxRate) || opts.taxRate < 0 ? 0 : opts.taxRate;

  let tax = 0, taxIncluded = 0, total = afterDiscount;
  if (opts.taxType === "exclusive") {
    tax = round2(afterDiscount * rate / 100);
    total = round2(afterDiscount + tax);
  } else if (rate > 0) {
    taxIncluded = round2(afterDiscount - afterDiscount / (1 + rate / 100));
  }

  return { subtotal, discount, afterDiscount, tax, taxIncluded, total, lines };
}

/* ─── Formatting ────────────────────────────────────────────────── */

const ZERO_DECIMAL = new Set(["JPY", "KRW", "VND", "CLP", "ISK", "HUF"]);

/**
 * Format a number as money with the given symbol: "$1,234.50", "−$12.00".
 * Uses en-US grouping (the generator is English-only) and tabular-safe output.
 */
export function formatMoney(n: number, symbol = "$", code = "USD"): string {
  const decimals = ZERO_DECIMAL.has(code) ? 0 : 2;
  const abs = Math.abs(round2(n));
  const body = abs.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const neg = n < 0 && abs !== 0 ? "−" : "";
  return `${neg}${symbol}${body}`;
}

/** Plain 2-dp number (no symbol) for inputs. */
export function f2(n: number): string {
  return round2(n).toFixed(2);
}

/** Format a quantity: integers without decimals, otherwise up to 3 dp. */
export function formatQty(q: number): string {
  if (!isFinite(q)) return "0";
  return Number.isInteger(q) ? String(q) : q.toLocaleString("en-US", { maximumFractionDigits: 3 });
}

/* ─── Numbering ─────────────────────────────────────────────────── */

/**
 * Increment the trailing number of an invoice id, preserving prefix and
 * zero-padding: "INV-001" → "INV-002", "2026-0099" → "2026-0100", "7" → "8".
 * If there is no trailing number, append "-2".
 */
export function nextInvoiceNumber(current: string): string {
  const m = /^(.*?)(\d+)$/.exec(current.trim());
  if (!m) return current.trim() ? `${current.trim()}-2` : "INV-001";
  const [, prefix, digits] = m;
  const next = String(parseInt(digits, 10) + 1);
  return prefix + (next.length < digits.length ? next.padStart(digits.length, "0") : next);
}

/** Default number prefix per document type. */
export function defaultNumber(docType: string): string {
  switch (docType) {
    case "receipt":   return "RCT-001";
    case "quotation": return "QUO-001";
    case "estimate":  return "EST-001";
    default:          return "INV-001";
  }
}

/* ─── Dates ─────────────────────────────────────────────────────── */

/** Local-time YYYY-MM-DD (toISOString() would shift the day in UTC+ zones). */
export function localIso(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function addDays(dateStr: string, days: number): string {
  const d = dateStr ? new Date(dateStr + "T00:00:00") : new Date();
  if (isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + days);
  return localIso(d);
}

export function isOverdue(due: string | null | undefined, status: string | null | undefined, now = new Date()): boolean {
  if (!due || status === "paid") return false;
  const d = new Date(due + "T23:59:59");
  return !isNaN(d.getTime()) && d.getTime() < now.getTime();
}

export function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00").getTime();
  const db = new Date(b + "T00:00:00").getTime();
  if (isNaN(da) || isNaN(db)) return 0;
  return Math.round((db - da) / 86_400_000);
}
