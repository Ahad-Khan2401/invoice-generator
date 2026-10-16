/* ───────────────────────────────────────────────
   Specimen documents: real, fully-calculated sample documents rendered with
   the SAME InvoicePreview the generator and the PDF use — so the marketing
   pages show the actual product output, not a drawing of it.

   All content is fictional (made-up businesses, example.com addresses) and the
   dates are fixed so server and client render identically.
─────────────────────────────────────────────── */
import { newDoc, type DocType, type InvoiceDoc, type TemplateKey } from "./invoice-doc";
import { calcTotals, type Totals } from "./invoice-math";
import { BRAND } from "./brand";

export interface SpecimenData {
  doc: InvoiceDoc;
  totals: Totals;
  /** Short caption for the page (serif title + one plain sentence). */
  title: string;
  blurb: string;
  href: string;
}

function build(doc: InvoiceDoc): { doc: InvoiceDoc; totals: Totals } {
  const totals = calcTotals(doc.items, { discount: doc.discount, discType: doc.discType, taxRate: doc.tax, taxType: doc.taxType });
  return { doc, totals };
}

const invoice = (template: TemplateKey = "classic") =>
  build(newDoc({
    docType: "invoice", template, color: BRAND.navy, status: "unpaid",
    from: { name: "Harbour & Pine Studio", email: "hello@harbourpine.example", phone: "+1 555 0148", address: "27 Quay Street\nPortland" },
    to: { name: "Northfield Dental", email: "accounts@northfielddental.example", phone: "", address: "310 Elm Avenue\nPortland" },
    meta: {
      no: "INV-0042", date: "2026-10-01", due: "2026-10-31", poNumber: "",
      notes: "Payment due within 30 days. Thank you for your business!",
      bankDetails: "Harbour & Pine Studio\nAccount 0123 4567 · Routing 021000021",
      signNote: "",
    },
    items: [
      { id: 1, desc: "Website redesign — five pages", qty: 1, rate: 1800 },
      { id: 2, desc: "Copywriting for service pages (hours)", qty: 6, rate: 65 },
      { id: 3, desc: "Hosting setup and launch", qty: 1, rate: 150 },
    ],
    tax: 7, taxLabel: "Sales tax",
  }));

const receipt = () =>
  build(newDoc({
    docType: "receipt", template: "classic", color: "#0f766e", status: "paid",
    from: { name: "Quick Fix Mobile Repair", email: "shop@quickfix.example", phone: "+1 555 0199", address: "8 Mill Lane\nDenver" },
    to: { name: "J. Alvarez", email: "", phone: "", address: "" },
    meta: { no: "RCT-0231", date: "2026-10-09", due: "", poNumber: "", notes: "Paid in full by card. Keep this receipt for the 90-day repair warranty.", bankDetails: "", signNote: "" },
    items: [
      { id: 1, desc: "Screen replacement — phone model 13", qty: 1, rate: 129 },
      { id: 2, desc: "Tempered glass protector", qty: 1, rate: 15 },
    ],
  }));

const quotation = () =>
  build(newDoc({
    docType: "quotation", template: "classic", color: BRAND.red, status: "unpaid",
    from: { name: "Greenleaf Landscaping", email: "quotes@greenleaf.example", phone: "+1 555 0172", address: "5 Orchard Road\nAustin" },
    to: { name: "M. & R. Hughes", email: "", phone: "", address: "14 Cedar Court\nAustin" },
    meta: { no: "QUO-0118", date: "2026-10-05", due: "2026-11-04", poNumber: "", notes: "Valid for 30 days. A 30% deposit books the work.", bankDetails: "", signNote: "" },
    items: [
      { id: 1, desc: "Lawn removal and levelling (m²)", qty: 40, rate: 6.5 },
      { id: 2, desc: "Raised cedar beds, installed", qty: 3, rate: 140 },
      { id: 3, desc: "Topsoil and planting", qty: 1, rate: 250 },
    ],
  }));

const estimate = () =>
  build(newDoc({
    docType: "estimate", template: "classic", color: BRAND.blue, status: "unpaid",
    from: { name: "Reyes Plumbing", email: "jobs@reyesplumbing.example", phone: "+1 555 0126", address: "61 Canal Street\nChicago" },
    to: { name: "Unit 4B, Alder House", email: "", phone: "", address: "22 Alder Road\nChicago" },
    meta: { no: "EST-0075", date: "2026-10-12", due: "2026-10-26", poNumber: "", notes: "Estimate based on a phone description. The final price may change after inspection.", bankDetails: "", signNote: "" },
    items: [
      { id: 1, desc: "Labour, estimated 3 hours", qty: 3, rate: 70 },
      { id: 2, desc: "Mixer tap and fittings", qty: 1, rate: 68 },
    ],
  }));

export function specimen(kind: DocType, template: TemplateKey = "classic"): { doc: InvoiceDoc; totals: Totals } {
  switch (kind) {
    case "receipt":   return receipt();
    case "quotation": return quotation();
    case "estimate":  return estimate();
    default:          return invoice(template);
  }
}

export const DOC_SPECIMENS: { kind: DocType; title: string; blurb: string; href: string }[] = [
  { kind: "invoice",   title: "Invoice",   blurb: "Ask for payment, with line items, tax and a due date.", href: "/" },
  { kind: "receipt",   title: "Receipt",   blurb: "Prove a payment came in: amount, date and method.",     href: "/receipt-generator" },
  { kind: "quotation", title: "Quotation", blurb: "A firm price the client can say yes to, valid until a date.", href: "/quotation-generator" },
  { kind: "estimate",  title: "Estimate",  blurb: "A rough cost before the job is scoped in detail.",      href: "/estimate-generator" },
];
