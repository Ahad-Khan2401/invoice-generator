/* ───────────────────────────────────────────────
   Long-tail SEO landing pages.
   Each key becomes a real URL: /freelancer-invoice, etc.
   Shared by app/[profession]/page.tsx (rendering + metadata)
   AND app/sitemap.ts (so they get indexed).
   Add a new profession = add one entry here. That's it.
─────────────────────────────────────────────── */
export interface Landing {
  h1: string;
  sub: string;
  title: string;
  desc: string;
  profession: string; // used inside the SEO body text
}

export const LANDING: Record<string, Landing> = {
  "freelancer-invoice": {
    h1: "Free Invoice Generator for Freelancers",
    sub: "Create and download professional freelance invoices as PDF in seconds — no signup, no fees.",
    title: "Free Freelancer Invoice Generator — Create PDF Invoices Online",
    desc: "Make professional freelance invoices online for free. Add your logo, set your rate, apply tax, and download a clean PDF invoice in seconds. No signup required.",
    profession: "freelancers",
  },
  "contractor-invoice": {
    h1: "Free Invoice Generator for Contractors",
    sub: "Itemise labour and materials and download a professional contractor invoice as PDF — completely free.",
    title: "Free Contractor Invoice Generator — Labour & Materials PDF Invoice",
    desc: "Create contractor invoices online for free. Itemise labour and materials, apply tax, add your logo, and download a print-ready PDF invoice. No signup needed.",
    profession: "contractors",
  },
  "consultant-invoice": {
    h1: "Free Invoice Generator for Consultants",
    sub: "Send branded consulting invoices with your logo and download a polished PDF in seconds — 100% free.",
    title: "Free Consultant Invoice Generator — Professional PDF Invoices",
    desc: "Generate consulting invoices online for free. Add your branding, bill hourly or by project, apply tax, and download a professional PDF invoice instantly.",
    profession: "consultants",
  },
  "small-business-invoice": {
    h1: "Free Invoice Generator for Small Businesses",
    sub: "Invoices, receipts, and quotations for your small business — branded, professional, and free to download.",
    title: "Free Small Business Invoice Generator — Invoices, Receipts & Quotes",
    desc: "Free invoice generator for small businesses. Create invoices, receipts, and quotations with your logo, multi-currency support, and tax — download as PDF instantly.",
    profession: "small businesses",
  },
  "self-employed-invoice": {
    h1: "Free Invoice Generator for the Self-Employed",
    sub: "Bill clients the simple way — create a professional self-employed invoice and download it as PDF for free.",
    title: "Free Self-Employed Invoice Generator — Create PDF Invoices Online",
    desc: "Self-employed invoice generator that's 100% free. Add your details, list your work, apply tax, and download a clean PDF invoice in seconds. No account required.",
    profession: "self-employed professionals",
  },
};

export const LANDING_SLUGS = Object.keys(LANDING);
