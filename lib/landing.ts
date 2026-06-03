/* ───────────────────────────────────────────────
   Long-tail SEO landing pages.
   Each key becomes a real URL: /freelancer-invoice, /invoice-generator-usa…
   Shared by app/[profession]/page.tsx (rendering + metadata)
   AND app/sitemap.ts (so they get indexed).
   Add a new page = add one entry here. That's it.
─────────────────────────────────────────────── */
export interface Landing {
  h1: string;
  sub: string;
  title: string;
  desc: string;
  profession: string;          // used inside the SEO body text ("built for …")
  currencySymbol?: string;     // tool opens with this currency (must match CURRENCIES)
  keywords?: string[];         // page-specific keywords for <meta keywords>
}

export const LANDING: Record<string, Landing> = {
  /* ───────── By profession ───────── */
  "freelancer-invoice": {
    h1: "Free Invoice Generator for Freelancers",
    sub: "Create and download professional freelance invoices as PDF in seconds — no signup, no fees.",
    title: "Free Freelancer Invoice Generator — Create PDF Invoices Online",
    desc: "Make professional freelance invoices online for free. Add your logo, set your rate, apply tax, and download a clean PDF invoice in seconds. No signup required.",
    profession: "freelancers",
    keywords: ["freelancer invoice generator", "freelance invoice template", "invoice for freelancers", "self employed invoice"],
  },
  "contractor-invoice": {
    h1: "Free Invoice Generator for Contractors",
    sub: "Itemise labour and materials and download a professional contractor invoice as PDF — completely free.",
    title: "Free Contractor Invoice Generator — Labour & Materials PDF Invoice",
    desc: "Create contractor invoices online for free. Itemise labour and materials, apply tax, add your logo, and download a print-ready PDF invoice. No signup needed.",
    profession: "contractors",
    keywords: ["contractor invoice generator", "construction invoice template", "labour and materials invoice", "1099 contractor invoice"],
  },
  "consultant-invoice": {
    h1: "Free Invoice Generator for Consultants",
    sub: "Send branded consulting invoices with your logo and download a polished PDF in seconds — 100% free.",
    title: "Free Consultant Invoice Generator — Professional PDF Invoices",
    desc: "Generate consulting invoices online for free. Add your branding, bill hourly or by project, apply tax, and download a professional PDF invoice instantly.",
    profession: "consultants",
    keywords: ["consultant invoice generator", "consulting invoice template", "hourly invoice", "professional services invoice"],
  },
  "small-business-invoice": {
    h1: "Free Invoice Generator for Small Businesses",
    sub: "Invoices, receipts, and quotations for your small business — branded, professional, and free to download.",
    title: "Free Small Business Invoice Generator — Invoices, Receipts & Quotes",
    desc: "Free invoice generator for small businesses. Create invoices, receipts, and quotations with your logo, multi-currency support, and tax — download as PDF instantly.",
    profession: "small businesses",
    keywords: ["small business invoice generator", "small business invoice template", "invoice receipt quotation maker"],
  },
  "self-employed-invoice": {
    h1: "Free Invoice Generator for the Self-Employed",
    sub: "Bill clients the simple way — create a professional self-employed invoice and download it as PDF for free.",
    title: "Free Self-Employed Invoice Generator — Create PDF Invoices Online",
    desc: "Self-employed invoice generator that's 100% free. Add your details, list your work, apply tax, and download a clean PDF invoice in seconds. No account required.",
    profession: "self-employed professionals",
    keywords: ["self employed invoice generator", "sole trader invoice", "self employed invoice template"],
  },

  /* ───────── By country (high-CPC + South Asia) ───────── */
  "invoice-generator-usa": {
    h1: "Free Invoice Generator — USA",
    sub: "Create professional invoices for US clients and download a PDF in seconds. Dollars, sales tax, your logo — 100% free.",
    title: "Free Invoice Generator USA — Create & Download PDF Invoices ($)",
    desc: "Free online invoice generator for the USA. Bill in US dollars, add sales tax, upload your logo, and download a professional PDF invoice instantly. No signup. Great for freelancers, contractors (1099) and small businesses.",
    profession: "freelancers, contractors, and small businesses in the United States",
    currencySymbol: "$",
    keywords: ["invoice generator usa", "free invoice generator us", "invoice maker america", "1099 invoice", "us sales tax invoice"],
  },
  "invoice-generator-canada": {
    h1: "Free Invoice Generator — Canada",
    sub: "Create Canadian invoices with GST/HST and download a PDF in seconds. Bill in CAD, add your logo — 100% free.",
    title: "Free Invoice Generator Canada — GST/HST PDF Invoices (CA$)",
    desc: "Free online invoice generator for Canada. Bill in Canadian dollars, apply GST/HST, add your logo, and download a professional PDF invoice instantly. No signup needed.",
    profession: "freelancers, contractors, and small businesses in Canada",
    currencySymbol: "CA$",
    keywords: ["invoice generator canada", "gst hst invoice", "canadian invoice template", "free invoice maker canada"],
  },
  "invoice-generator-uk": {
    h1: "Free Invoice Generator — UK",
    sub: "Create UK invoices with VAT and download a PDF in seconds. Bill in pounds, add your logo — completely free.",
    title: "Free Invoice Generator UK — VAT PDF Invoices (£)",
    desc: "Free online invoice generator for the UK. Bill in pounds sterling, add VAT, upload your logo, and download a professional PDF invoice instantly. Ideal for sole traders, freelancers and small businesses. No signup.",
    profession: "sole traders, freelancers, and small businesses in the UK",
    currencySymbol: "£",
    keywords: ["invoice generator uk", "vat invoice template", "uk invoice maker", "sole trader invoice uk", "free invoice generator uk"],
  },
  "invoice-generator-australia": {
    h1: "Free Tax Invoice Generator — Australia",
    sub: "Create Australian tax invoices with GST and download a PDF in seconds. Bill in AUD, add your logo — 100% free.",
    title: "Free Tax Invoice Generator Australia — GST PDF Invoices (A$)",
    desc: "Free online tax invoice generator for Australia. Bill in Australian dollars, add 10% GST, upload your logo, and download a compliant-looking PDF tax invoice instantly. No signup.",
    profession: "sole traders, freelancers, and small businesses in Australia",
    currencySymbol: "A$",
    keywords: ["tax invoice australia", "invoice generator australia", "gst invoice template", "free invoice maker australia"],
  },
  "invoice-generator-india": {
    h1: "Free Invoice Generator — India",
    sub: "Create GST invoices for Indian clients and download a PDF in seconds. Bill in rupees, add your logo — 100% free.",
    title: "Free Invoice Generator India — GST PDF Invoices (₹)",
    desc: "Free online invoice generator for India. Bill in Indian rupees, add GST, upload your logo, and download a professional PDF invoice instantly. Perfect for freelancers, consultants and small businesses. No signup.",
    profession: "freelancers, consultants, and small businesses in India",
    currencySymbol: "₹",
    keywords: ["invoice generator india", "gst invoice format", "free invoice maker india", "tax invoice india"],
  },
  "invoice-generator-pakistan": {
    h1: "Free Invoice Generator — Pakistan",
    sub: "Create professional invoices for Pakistani clients and download a PDF in seconds. Bill in rupees, add your logo — 100% free.",
    title: "Free Invoice Generator Pakistan — PDF Invoices (₨)",
    desc: "Free online invoice generator for Pakistan. Bill in Pakistani rupees, add sales tax, upload your logo, and download a professional PDF invoice instantly. Great for freelancers and small businesses. No signup.",
    profession: "freelancers and small businesses in Pakistan",
    currencySymbol: "₨",
    keywords: ["invoice generator pakistan", "free invoice maker pakistan", "invoice template pakistan", "sales tax invoice"],
  },

  /* ───────── By use-case ───────── */
  "rent-receipt": {
    h1: "Free Rent Receipt Generator",
    sub: "Create a professional rent receipt for your tenant and download it as PDF in seconds — 100% free.",
    title: "Free Rent Receipt Generator — Create & Download PDF Rent Receipts",
    desc: "Generate a rent receipt online for free. Add landlord and tenant details, amount, period, and download a clean PDF rent receipt instantly. No signup required.",
    profession: "landlords and property managers",
    keywords: ["rent receipt generator", "rent receipt format", "free rent receipt", "house rent receipt pdf"],
  },
  "proforma-invoice": {
    h1: "Free Proforma Invoice Generator",
    sub: "Create a proforma invoice for your buyer before the sale and download it as PDF in seconds — completely free.",
    title: "Free Proforma Invoice Generator — Create PDF Proforma Invoices",
    desc: "Make a proforma invoice online for free. Add items, quantities, and prices, then download a professional PDF proforma invoice in seconds. No signup needed.",
    profession: "exporters, wholesalers, and small businesses",
    keywords: ["proforma invoice generator", "proforma invoice format", "proforma invoice template", "free proforma invoice"],
  },
  "commercial-invoice": {
    h1: "Free Commercial Invoice Generator",
    sub: "Create a commercial invoice for shipping and customs and download it as PDF in seconds — 100% free.",
    title: "Free Commercial Invoice Generator — Shipping & Customs PDF Invoice",
    desc: "Generate a commercial invoice online for free for international shipping and customs. Add goods, values, and parties, then download a clean PDF. No signup required.",
    profession: "exporters and e-commerce sellers",
    keywords: ["commercial invoice generator", "commercial invoice template", "customs invoice", "shipping invoice pdf"],
  },
  "hourly-invoice": {
    h1: "Free Hourly Rate Invoice Generator",
    sub: "Bill clients by the hour — add your hours and rate and download a professional PDF invoice in seconds, free.",
    title: "Free Hourly Invoice Generator — Bill by the Hour (PDF)",
    desc: "Create an hourly invoice online for free. Enter hours worked and your hourly rate, apply tax, and download a professional PDF invoice instantly. No signup needed.",
    profession: "freelancers, consultants, and agencies billing by the hour",
    keywords: ["hourly invoice generator", "hourly rate invoice template", "time based invoice", "consultant hourly invoice"],
  },

  /* ───────── Bill keyword variants ───────── */
  "bill-generator": {
    h1: "Free Bill Generator",
    sub: "Create a professional bill for your customer and download it as PDF in seconds — 100% free, no signup.",
    title: "Free Bill Generator — Create & Download a PDF Bill Online",
    desc: "Free online bill generator. Add your items, apply tax, and download a clean PDF bill in seconds. Works as a bill, invoice, receipt, or quotation maker. No signup required.",
    profession: "shops, service providers, and small businesses",
    keywords: ["free bill generator", "bill generator", "bill generator pdf", "create a bill online", "online bill generator"],
  },
  "online-bill-maker": {
    h1: "Free Online Bill Maker",
    sub: "Make a bill online and download a professional PDF in seconds — free, no account, no watermark.",
    title: "Free Online Bill Maker — Make a Bill & Download PDF",
    desc: "Make a bill online for free with our bill maker. Enter your details and items, apply tax, and download a professional PDF bill instantly. Also makes invoices, receipts, and quotations.",
    profession: "shops, freelancers, and small businesses",
    keywords: ["online bill maker", "bill maker", "make a bill online", "free bill maker", "bill maker app"],
  },
  "bill-format": {
    h1: "Free Bill Format — Create a Bill in PDF",
    sub: "Use a clean, professional bill format and download your bill as a PDF in seconds — completely free.",
    title: "Bill Format — Free PDF Bill Format Generator Online",
    desc: "Create a bill using a professional bill format online for free. Fill in your items and tax, then download a print-ready PDF bill. No signup, no software needed.",
    profession: "shops, service providers, and small businesses",
    keywords: ["bill format", "bill format pdf", "bill format in word", "simple bill format", "cash bill format"],
  },
};

export const LANDING_SLUGS = Object.keys(LANDING);
