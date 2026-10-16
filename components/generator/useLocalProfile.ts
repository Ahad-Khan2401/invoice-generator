"use client";
/**
 * "Remember my business" — persists ONLY the sender's side (never the
 * client, never the line items) to this device's localStorage so the
 * second invoice takes seconds. Nothing is uploaded; still no account.
 * Signed-in users additionally sync the same data to /api/profile so it
 * follows them across devices.
 */
import type { InvoiceDoc, Party, Currency, DocType } from "@/lib/invoice-doc";

export const PROFILE_KEY = "pdfbb_profile_v2";
const LEGACY_KEY = "pdfbb_profile_v1";
export const SETTINGS_KEY = "pdfbb_settings_v1";

export interface LocalProfile {
  from: Party;
  brandLogo: string | null;
  cur: Currency;
  color: string;
  bankDetails: string;
  notes: string;
  taxLabel: string;
  tax: number;
  template?: string;
  paper?: "a4" | "letter";
  /** Last used number per doc type — the next document auto-increments. */
  lastNos?: Partial<Record<DocType, string>>;
}

export interface LocalSettings {
  saveToDashboard: boolean;   // auto-save downloads when signed in
}

export function readProfile(): LocalProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<LocalProfile> & { curLabel?: string };
    const from: Party = { name: "", email: "", phone: "", address: "", ...(p.from ?? {}) };
    return {
      from,
      brandLogo: typeof p.brandLogo === "string" ? p.brandLogo : null,
      cur: p.cur && typeof p.cur === "object" ? p.cur : { s: "$", l: p.curLabel ?? "USD" },
      color: typeof p.color === "string" ? p.color : "#4f46e5",
      bankDetails: p.bankDetails ?? "",
      notes: p.notes ?? "",
      taxLabel: p.taxLabel ?? "Tax",
      tax: typeof p.tax === "number" ? p.tax : 0,
      template: p.template,
      paper: p.paper,
      lastNos: p.lastNos ?? {},
    };
  } catch { return null; }
}

export function profileFromDoc(doc: InvoiceDoc, prev: LocalProfile | null): LocalProfile {
  return {
    from: doc.from,
    // data-URL logos can be huge; skip anything that would blow the ~5MB quota
    brandLogo: doc.brandLogo && doc.brandLogo.length < 500_000 ? doc.brandLogo : null,
    cur: doc.cur,
    color: doc.color,
    bankDetails: doc.meta.bankDetails,
    notes: doc.meta.notes,
    taxLabel: doc.taxLabel,
    tax: doc.tax,
    template: doc.template,
    paper: doc.paper,
    lastNos: prev?.lastNos ?? {},
  };
}

export function writeProfile(p: LocalProfile | null): void {
  try {
    if (!p) { localStorage.removeItem(PROFILE_KEY); localStorage.removeItem(LEGACY_KEY); return; }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    localStorage.removeItem(LEGACY_KEY);
  } catch { /* quota exceeded / private mode — not worth interrupting the user */ }
}

export function rememberNumber(docType: DocType, no: string): void {
  try {
    const p = readProfile();
    if (!p) return;
    p.lastNos = { ...(p.lastNos ?? {}), [docType]: no };
    writeProfile(p);
  } catch { /* ignore */ }
}

export function hasDetails(from: Party): boolean {
  return !!(from.name || from.email || from.phone || from.address);
}

export function readSettings(): LocalSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { saveToDashboard: true, ...(JSON.parse(raw) as Partial<LocalSettings>) };
  } catch { /* ignore */ }
  return { saveToDashboard: true };
}
export function writeSettings(s: LocalSettings): void {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}
