/**
 * lib/invoice-doc.ts — the document model shared by the generator,
 * dashboard, export/import and the save API.
 */
import { defaultNumber, localIso } from "./invoice-math.ts";
import { DEFAULT_LAYOUT, sanitizeLayout, type Layout } from "./layout.ts";
import { DEFAULT_COLOR } from "./brand.ts";

export type DocType   = "invoice" | "receipt" | "quotation" | "estimate";
export type PayStatus = "paid" | "unpaid";
export type TaxType   = "exclusive" | "inclusive";
export type DiscType  = "%" | "fixed";
export type TemplateKey = "classic" | "minimal" | "bold";
export type PaperSize = "a4" | "letter";

export interface Party { name: string; email: string; phone: string; address: string }
export interface Item  { id: number; desc: string; qty: number; rate: number }
export interface Currency { s: string; l: string }

export interface DocMeta {
  no: string;
  date: string;
  due: string;
  notes: string;
  bankDetails: string;
  signNote: string;
  poNumber: string;
}

export interface InvoiceDoc {
  version: 2;
  from: Party;
  to: Party;
  meta: DocMeta;
  items: Item[];
  tax: number;
  taxLabel: string;
  taxType: TaxType;
  discount: number;
  discType: DiscType;
  docType: DocType;
  status: PayStatus;
  cur: Currency;
  color: string;
  template: TemplateKey;
  paper: PaperSize;
  layout: Layout;
  brandLogo: string | null;
  wmLogo: string | null;
}

export const CURRENCIES: Currency[] = [
  { s: "$",   l: "USD" }, { s: "€",   l: "EUR" }, { s: "£",   l: "GBP" },
  { s: "₹",   l: "INR" }, { s: "₨",   l: "PKR" }, { s: "CA$", l: "CAD" },
  { s: "A$",  l: "AUD" }, { s: "NZ$", l: "NZD" }, { s: "S$",  l: "SGD" },
  { s: "AED", l: "AED" }, { s: "R",   l: "ZAR" }, { s: "CHF", l: "CHF" },
  { s: "kr",  l: "SEK" }, { s: "¥",   l: "JPY" }, { s: "₦",   l: "NGN" },
  { s: "KSh", l: "KES" }, { s: "RM",  l: "MYR" }, { s: "₱",   l: "PHP" },
];

export const DOC_TYPE_INFO: Record<DocType, { label: string; upper: string; desc: string; color: string }> = {
  invoice:   { label: "Invoice",   upper: "INVOICE",   desc: "Bill for goods or services", color: DEFAULT_COLOR },
  receipt:   { label: "Receipt",   upper: "RECEIPT",   desc: "Proof of payment",           color: "#10b981" },
  quotation: { label: "Quotation", upper: "QUOTATION", desc: "Price proposal",             color: "#f59e0b" },
  estimate:  { label: "Estimate",  upper: "ESTIMATE",  desc: "Approximate cost",           color: "#0ea5e9" },
};

export const today = () => localIso(new Date());
export const blankParty = (): Party => ({ name: "", email: "", phone: "", address: "" });

export function defaultNotes(docType: DocType): string {
  switch (docType) {
    case "receipt":   return "Thank you for your payment.";
    case "quotation": return "This quotation is valid for 30 days from the date above. Prices exclude any items not listed.";
    case "estimate":  return "This estimate is based on the information provided and may change if the scope of work changes.";
    default:          return "Payment due within 30 days. Thank you for your business!";
  }
}

export function newDoc(overrides: Partial<InvoiceDoc> = {}): InvoiceDoc {
  const docType = overrides.docType ?? "invoice";
  return {
    version: 2,
    from: blankParty(),
    to: blankParty(),
    meta: {
      no: defaultNumber(docType),
      date: today(),
      due: "",
      notes: defaultNotes(docType),
      bankDetails: "",
      signNote: "This is a computer-generated document and does not require a signature.",
      poNumber: "",
    },
    items: [{ id: 1, desc: "", qty: 1, rate: 0 }],
    tax: 0,
    taxLabel: "Tax",
    taxType: "exclusive",
    discount: 0,
    discType: "%",
    docType,
    status: docType === "receipt" ? "paid" : "unpaid",
    cur: CURRENCIES[0],
    color: DEFAULT_COLOR,
    template: "classic",
    paper: "a4",
    layout: DEFAULT_LAYOUT,
    brandLogo: null,
    wmLogo: null,
    ...overrides,
  };
}

/* ─── Sanitise anything coming from storage / network / files ──────── */
const s = (v: unknown, max = 2000) => (typeof v === "string" ? v.slice(0, max) : "");
const n = (v: unknown, d = 0) => (typeof v === "number" && isFinite(v) ? v : typeof v === "string" && isFinite(parseFloat(v)) ? parseFloat(v) : d);
const img = (v: unknown) => (typeof v === "string" && /^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,/i.test(v) && v.length < 2_000_000 ? v : null);
const party = (v: unknown): Party => {
  const o = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
  return { name: s(o.name, 200), email: s(o.email, 200), phone: s(o.phone, 60), address: s(o.address, 600) };
};

export function sanitizeDoc(input: unknown, base: InvoiceDoc = newDoc()): InvoiceDoc {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const meta = (o.meta && typeof o.meta === "object" ? o.meta : {}) as Record<string, unknown>;
  const curIn = (o.cur && typeof o.cur === "object" ? o.cur : {}) as Record<string, unknown>;
  const docType = (["invoice", "receipt", "quotation", "estimate"] as const).includes(o.docType as DocType) ? (o.docType as DocType) : base.docType;
  const cur = CURRENCIES.find((c) => c.l === curIn.l) ?? (s(curIn.s, 6) && s(curIn.l, 6) ? { s: s(curIn.s, 6), l: s(curIn.l, 6) } : base.cur);

  let items: Item[] = Array.isArray(o.items)
    ? o.items.slice(0, 300).map((it, i) => {
        const r = (it && typeof it === "object" ? it : {}) as Record<string, unknown>;
        return { id: n(r.id, i + 1), desc: s(r.desc, 1000), qty: n(r.qty, 0), rate: n(r.rate, 0) };
      })
    : base.items;
  if (!items.length) items = [{ id: 1, desc: "", qty: 1, rate: 0 }];

  return {
    version: 2,
    from: o.from ? party(o.from) : base.from,
    to:   o.to   ? party(o.to)   : base.to,
    meta: {
      no:          s(meta.no, 60) || base.meta.no,
      date:        /^\d{4}-\d{2}-\d{2}$/.test(s(meta.date)) ? s(meta.date) : base.meta.date,
      due:         /^\d{4}-\d{2}-\d{2}$/.test(s(meta.due))  ? s(meta.due)  : "",
      notes:       typeof meta.notes === "string" ? s(meta.notes, 4000) : base.meta.notes,
      bankDetails: s(meta.bankDetails, 2000),
      signNote:    typeof meta.signNote === "string" ? s(meta.signNote, 500) : base.meta.signNote,
      poNumber:    s(meta.poNumber, 60),
    },
    items,
    tax:      Math.max(0, Math.min(1000, n(o.tax, 0))),
    taxLabel: s(o.taxLabel, 30) || "Tax",
    taxType:  o.taxType === "inclusive" ? "inclusive" : "exclusive",
    discount: Math.max(0, n(o.discount, 0)),
    discType: o.discType === "fixed" ? "fixed" : "%",
    docType,
    status:   o.status === "paid" ? "paid" : "unpaid",
    cur,
    color:    /^#[0-9a-f]{6}$/i.test(s(o.color, 7)) ? s(o.color, 7) : base.color,
    template: (["classic", "minimal", "bold"] as const).includes(o.template as TemplateKey) ? (o.template as TemplateKey) : "classic",
    paper:    o.paper === "letter" ? "letter" : "a4",
    layout:   o.layout ? sanitizeLayout(o.layout) : base.layout,
    brandLogo: img(o.brandLogo),
    wmLogo:    img(o.wmLogo),
  };
}

/** File name for downloads: "INV-001.pdf" style, safe characters only. */
export function safeFileName(no: string, docType: DocType, ext: string): string {
  const base = (no || docType).replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "") || docType;
  return `${base}.${ext}`;
}

/** Convert a quotation/estimate into an invoice (keeps items, resets status/number). */
export function convertToInvoice(doc: InvoiceDoc): InvoiceDoc {
  return {
    ...doc,
    docType: "invoice",
    status: "unpaid",
    meta: { ...doc.meta, no: defaultNumber("invoice"), date: today(), due: "", notes: defaultNotes("invoice") },
  };
}

/** Create a receipt from a (paid) invoice. */
export function receiptFromInvoice(doc: InvoiceDoc): InvoiceDoc {
  return {
    ...doc,
    docType: "receipt",
    status: "paid",
    meta: {
      ...doc.meta,
      no: doc.meta.no.replace(/^INV/i, "RCT") === doc.meta.no ? defaultNumber("receipt") : doc.meta.no.replace(/^INV/i, "RCT"),
      date: today(),
      due: "",
      notes: `Payment received for invoice ${doc.meta.no}. Thank you.`,
    },
  };
}
