/**
 * lib/validate.ts — request body validation / sanitisation for API routes.
 * No external deps; keeps payloads bounded and shapes predictable.
 */

export const LIMITS = {
  bodyBytes:       600 * 1024,  // whole JSON body incl. logos (data URLs)
  logoBytes:       400 * 1024,  // single data-URL image
  shortText:       200,
  longText:        4000,
  items:           300,
  clients:         1000,
} as const;

export function str(v: unknown, max: number = LIMITS.shortText): string {
  if (typeof v !== "string") return "";
  // strip control chars except newline/tab
  const cleaned = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

export function num(v: unknown, fallback = 0, min = -1e12, max = 1e12): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? parseFloat(v) : NaN;
  if (!isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function oneOf<T extends string>(v: unknown, allowed: readonly T[], fallback: T): T {
  return typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
}

export function isoDate(v: unknown): string {
  if (typeof v !== "string") return "";
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
}

export function dataUrlImage(v: unknown): string | null {
  if (typeof v !== "string") return null;
  if (!/^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,/i.test(v)) return null;
  if (v.length > LIMITS.logoBytes) return null;
  return v;
}

export function uuid(v: unknown): string | null {
  return typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v) ? v : null;
}

/** Read and parse a JSON body with a hard size cap. Throws on violation. */
export async function readJson<T = unknown>(req: Request, maxBytes: number = LIMITS.bodyBytes): Promise<T> {
  const len = Number(req.headers.get("content-length") ?? "0");
  if (len > maxBytes) throw new Error("payload_too_large");
  const text = await req.text();
  if (text.length > maxBytes) throw new Error("payload_too_large");
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("invalid_json");
  }
}

/* ─── Party / item / document shapes shared with the client ────────── */
export interface PartyIn { name: string; email: string; phone: string; address: string }
export interface ItemIn  { id: number; desc: string; qty: number; rate: number }

export const DOC_TYPES = ["invoice", "receipt", "quotation", "estimate"] as const;
export const PAY_STATUSES = ["paid", "unpaid"] as const;
export const TAX_TYPES = ["exclusive", "inclusive"] as const;
export const DISC_TYPES = ["%", "fixed"] as const;
export const TEMPLATES = ["classic", "minimal", "bold"] as const;
export const PAPER_SIZES = ["a4", "letter"] as const;

export function party(v: unknown): PartyIn {
  const o = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
  return {
    name:    str(o.name),
    email:   str(o.email),
    phone:   str(o.phone, 60),
    address: str(o.address, 600),
  };
}

export function items(v: unknown): ItemIn[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, LIMITS.items).map((it, i) => {
    const o = (it && typeof it === "object" ? it : {}) as Record<string, unknown>;
    return {
      id:   num(o.id, i + 1, 0, 1e9),
      desc: str(o.desc, 1000),
      qty:  num(o.qty, 0, -1e9, 1e9),
      rate: num(o.rate, 0, -1e12, 1e12),
    };
  });
}

/** Sanitise the free-form `data` blob saved with a document. Unknown keys are dropped. */
export function documentData(v: unknown): Record<string, unknown> {
  const o = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
  const meta = (o.meta && typeof o.meta === "object" ? o.meta : {}) as Record<string, unknown>;
  const cur  = (o.cur && typeof o.cur === "object" ? o.cur : {}) as Record<string, unknown>;
  return {
    from:     party(o.from),
    to:       party(o.to),
    meta: {
      no:          str(meta.no, 60),
      date:        isoDate(meta.date),
      due:         isoDate(meta.due),
      notes:       str(meta.notes, LIMITS.longText),
      bankDetails: str(meta.bankDetails, 2000),
      signNote:    str(meta.signNote, 500),
      poNumber:    str(meta.poNumber, 60),
    },
    items:    items(o.items),
    tax:      num(o.tax, 0, 0, 1000),
    taxLabel: str(o.taxLabel, 30),
    taxType:  oneOf(o.taxType, TAX_TYPES, "exclusive"),
    discount: num(o.discount, 0, 0, 1e12),
    discType: oneOf(o.discType, DISC_TYPES, "%"),
    docType:  oneOf(o.docType, DOC_TYPES, "invoice"),
    status:   oneOf(o.status, PAY_STATUSES, "unpaid"),
    cur:      { s: str(cur.s, 6) || "$", l: str(cur.l, 6) || "USD" },
    color:    /^#[0-9a-f]{6}$/i.test(String(o.color ?? "")) ? String(o.color) : "#4f46e5",
    template: oneOf(o.template, TEMPLATES, "classic"),
    paper:    oneOf(o.paper, PAPER_SIZES, "a4"),
    brandLogo: dataUrlImage(o.brandLogo),
    wmLogo:    dataUrlImage(o.wmLogo),
  };
}
