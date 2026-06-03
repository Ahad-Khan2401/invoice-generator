/* ───────────────────────────────────────────────
   Single source of truth for FAQs.
   Used by BOTH the visible FAQ section (SeoContent)
   AND the FAQPage JSON-LD schema, so they always match
   (Google requires the on-page text to match the schema).
─────────────────────────────────────────────── */
export interface Faq { q: string; a: string }

export const FAQS: Faq[] = [
  {
    q: "Is this invoice generator really free?",
    a: "Yes. PDF Bill Builder is 100% free with no signup, no watermark, and no limits. You can create and download unlimited PDF invoices, receipts, and quotations at no cost.",
  },
  {
    q: "How do I make an invoice online?",
    a: "Pick a document type, enter your business and client details, add your items with quantity and rate, then click Download PDF. Your totals and tax are calculated automatically.",
  },
  {
    q: "Can I create an invoice without signing up?",
    a: "Absolutely. No account or email is required. The tool runs entirely in your browser, so your data stays private and is never stored on a server.",
  },
  {
    q: "Can I add my own logo and tax to the invoice?",
    a: "Yes. You can upload your brand logo, choose your accent colour and currency, and apply tax as either inclusive or exclusive of the total.",
  },
  {
    q: "Is this a bill generator or an invoice generator?",
    a: "Both — they're the same thing here. PDF Bill Builder works as a free bill generator and invoice generator: create a bill, invoice, receipt, or quotation and download it as a PDF in seconds.",
  },
  {
    q: "How do I make a bill online for free?",
    a: "Open PDF Bill Builder, add your details and items, apply tax if needed, and click Download PDF. You get a clean, professional bill instantly — no signup and no cost.",
  },
];
