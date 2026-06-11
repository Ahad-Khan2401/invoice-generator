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
    desc: "Free invoice generator for the USA. Bill in US dollars, add sales tax, upload your logo, and download a professional PDF invoice in seconds. No signup.",
    profession: "freelancers, contractors, and small businesses in the United States",
    currencySymbol: "$",
    keywords: ["invoice generator usa", "free invoice generator us", "invoice maker america", "1099 invoice", "us sales tax invoice"],
  },
  "invoice-generator-canada": {
    h1: "Free Invoice Generator — Canada",
    sub: "Create Canadian invoices with GST/HST and download a PDF in seconds. Bill in CAD, add your logo — 100% free.",
    title: "Free Invoice Generator Canada — GST/HST PDF Invoices (CA$)",
    desc: "Free invoice generator for Canada. Bill in Canadian dollars, apply GST/HST, add your logo, and download a professional PDF invoice. No signup needed.",
    profession: "freelancers, contractors, and small businesses in Canada",
    currencySymbol: "CA$",
    keywords: ["invoice generator canada", "gst hst invoice", "canadian invoice template", "free invoice maker canada"],
  },
  "invoice-generator-uk": {
    h1: "Free Invoice Generator — UK",
    sub: "Create UK invoices with VAT and download a PDF in seconds. Bill in pounds, add your logo — completely free.",
    title: "Free Invoice Generator UK — VAT PDF Invoices (£)",
    desc: "Free invoice generator for the UK. Bill in pounds, add VAT, upload your logo, and download a professional PDF invoice for sole traders and freelancers.",
    profession: "sole traders, freelancers, and small businesses in the UK",
    currencySymbol: "£",
    keywords: ["invoice generator uk", "vat invoice template", "uk invoice maker", "sole trader invoice uk", "free invoice generator uk"],
  },
  "invoice-generator-australia": {
    h1: "Free Tax Invoice Generator — Australia",
    sub: "Create Australian tax invoices with GST and download a PDF in seconds. Bill in AUD, add your logo — 100% free.",
    title: "Free Tax Invoice Generator Australia — GST PDF Invoices (A$)",
    desc: "Free tax invoice generator for Australia. Bill in AUD, add 10% GST, upload your logo, and download a professional PDF tax invoice in seconds. No signup.",
    profession: "sole traders, freelancers, and small businesses in Australia",
    currencySymbol: "A$",
    keywords: ["tax invoice australia", "invoice generator australia", "gst invoice template", "free invoice maker australia"],
  },
  "invoice-generator-india": {
    h1: "Free Invoice Generator — India",
    sub: "Create GST invoices for Indian clients and download a PDF in seconds. Bill in rupees, add your logo — 100% free.",
    title: "Free Invoice Generator India — GST PDF Invoices (₹)",
    desc: "Free invoice generator for India. Bill in rupees, add GST, upload your logo, and download a professional PDF invoice for freelancers and small businesses.",
    profession: "freelancers, consultants, and small businesses in India",
    currencySymbol: "₹",
    keywords: ["invoice generator india", "gst invoice format", "free invoice maker india", "tax invoice india"],
  },
  "invoice-generator-pakistan": {
    h1: "Free Invoice Generator — Pakistan",
    sub: "Create professional invoices for Pakistani clients and download a PDF in seconds. Bill in rupees, add your logo — 100% free.",
    title: "Free Invoice Generator Pakistan — PDF Invoices (₨)",
    desc: "Free invoice generator for Pakistan. Bill in Pakistani rupees, add sales tax, upload your logo, and download a professional PDF invoice. No signup.",
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
    desc: "Free online bill generator. Add your items, apply tax, and download a clean PDF bill in seconds. Also makes invoices, receipts, and quotations.",
    profession: "shops, service providers, and small businesses",
    keywords: ["free bill generator", "bill generator", "bill generator pdf", "create a bill online", "online bill generator"],
  },
  "online-bill-maker": {
    h1: "Free Online Bill Maker",
    sub: "Make a bill online and download a professional PDF in seconds — free, no account, no watermark.",
    title: "Free Online Bill Maker — Make a Bill & Download PDF",
    desc: "Make a bill online for free with our bill maker. Enter your details and items, apply tax, and download a professional PDF bill instantly. No signup.",
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

  /* ───────── High-volume keyword pages ───────── */
  "free-invoice-generator": {
    h1: "Free Invoice Generator — Create & Download PDF Invoices",
    sub: "The fastest free invoice generator online. Fill in your details, add items, and download a professional PDF invoice instantly — no signup, no watermark.",
    title: "Free Invoice Generator — Create PDF Invoices Online Instantly",
    desc: "Create professional PDF invoices in seconds with our free invoice generator. Add your logo, apply tax, and download instantly — no account required.",
    profession: "freelancers, consultants, and small businesses",
    keywords: ["free invoice generator", "invoice generator free", "free invoice maker", "create invoice free", "free invoice creator", "invoice generator online free"],
  },

  "invoice-template-free": {
    h1: "Free Invoice Template — Download & Fill Online",
    sub: "Use a professional free invoice template — fill it out in your browser and download a clean PDF in seconds. No software, no signup.",
    title: "Free Invoice Template — Fill Out & Download PDF Online",
    desc: "Get a free invoice template you can fill out and download as a PDF instantly. Customise your logo, tax rate, and payment terms. No signup needed.",
    profession: "freelancers, contractors, and small businesses",
    keywords: ["free invoice template", "invoice template free", "free invoice template pdf", "invoice template download free", "simple invoice template free"],
  },

  "construction-invoice": {
    h1: "Free Construction Invoice Generator",
    sub: "Create professional construction invoices for labour, materials, and projects. Download a clean PDF in seconds — free, no signup.",
    title: "Free Construction Invoice Generator — PDF Construction Invoice",
    desc: "Generate construction invoices online for free. Add labour, materials, and project details, apply tax, and download a professional PDF in seconds.",
    profession: "builders, contractors, and tradespeople",
    keywords: ["construction invoice", "construction invoice template", "builder invoice", "contractor invoice template", "construction billing", "labour invoice"],
  },

  "invoice-generator-australia-gst": {
    h1: "Free GST Invoice Generator — Australia",
    sub: "Create compliant GST invoices for Australia. Add your ABN, apply 10% GST, and download a professional PDF invoice instantly.",
    title: "Free GST Invoice Generator Australia — Create ABN PDF Invoices",
    desc: "Generate GST-compliant invoices for Australia free. Add your ABN, apply 10% GST, and download a clean PDF — for sole traders and small businesses.",
    profession: "Australian freelancers, sole traders, and small businesses",
    currencySymbol: "A$",
    keywords: ["gst invoice generator australia", "australian gst invoice", "abn invoice generator", "tax invoice australia", "gst tax invoice"],
  },

  /* ───────── High-CPC USA/Canada/UK/AUS pages ───────── */
  "invoice-generator-for-small-business": {
    h1: "Free Invoice Generator for Small Business",
    sub: "Create professional invoices for your small business in seconds. Download a clean PDF instantly — no software, no subscription, no signup.",
    title: "Free Invoice Generator for Small Business — PDF Invoices Online",
    desc: "Free invoice generator for small businesses. Create professional invoices, add your logo, apply tax, and download a PDF instantly. No signup, no cost.",
    profession: "small business owners",
    keywords: ["invoice generator for small business", "small business invoice generator", "small business invoice template", "invoice maker small business", "free invoicing for small business"],
  },

  "free-invoice-maker": {
    h1: "Free Invoice Maker — Create Professional Invoices Online",
    sub: "The fastest free invoice maker online. Fill in your details and download a professional PDF in under 60 seconds. No signup, no watermark on download.",
    title: "Free Invoice Maker — Create & Download Professional PDF Invoices",
    desc: "Create professional invoices free with our online invoice maker. Add your business details, items, and tax, then download a PDF instantly. No signup.",
    profession: "freelancers, contractors, and small businesses",
    keywords: ["free invoice maker", "invoice maker free", "invoice maker online", "invoice creator free", "make an invoice free"],
  },

  "freelance-invoice-template-usa": {
    h1: "Free Freelance Invoice Template — USA",
    sub: "Create a professional freelance invoice for US clients. Add your rate, apply applicable taxes, and download a clean PDF instantly.",
    title: "Free Freelance Invoice Template USA — Create PDF Invoices Online",
    desc: "Free freelance invoice template for US freelancers. Set your hourly or project rate, add Net 30 terms, and download a professional PDF invoice.",
    profession: "US freelancers and independent contractors",
    currencySymbol: "$",
    keywords: ["freelance invoice template usa", "freelancer invoice template usa", "us freelance invoice", "invoice template for freelancers usa", "1099 invoice template"],
  },

  "invoice-template-canada": {
    h1: "Free Invoice Template — Canada (GST/HST Ready)",
    sub: "Create Canadian invoices with proper GST/HST fields. Download a professional PDF invoice in seconds — free, no signup.",
    title: "Free Invoice Template Canada — GST/HST Invoice Generator Online",
    desc: "Free Canadian invoice template with GST/HST support. Apply the right tax rate for your province and download a clean PDF invoice. No signup needed.",
    profession: "Canadian freelancers and small businesses",
    currencySymbol: "CA$",
    keywords: ["invoice template canada", "canada invoice template", "canada gst invoice template", "hst invoice template", "canadian invoice generator"],
  },

  /* ───────── By profession (batch 2 — long-tail, low competition) ───────── */
  "photographer-invoice": {
    h1: "Free Invoice Generator for Photographers",
    sub: "Bill shoots, prints, and licensing in one clean PDF invoice — add your logo and download free, no signup.",
    title: "Free Photographer Invoice Generator — Photography PDF Invoices",
    desc: "Create photography invoices online for free. Bill shoots, editing, prints, and licensing, add your logo, and download a professional PDF invoice.",
    profession: "photographers",
    keywords: ["photographer invoice generator", "photography invoice template", "photo shoot invoice", "wedding photographer invoice", "freelance photographer invoice"],
  },
  "graphic-designer-invoice": {
    h1: "Free Invoice Generator for Graphic Designers",
    sub: "Invoice logos, branding, and design work with a polished PDF that matches your portfolio — 100% free.",
    title: "Free Graphic Designer Invoice Generator — Design PDF Invoices",
    desc: "Generate graphic design invoices online for free. Bill per project or hourly, itemise revisions and licensing, add your branding, and download a clean PDF invoice.",
    profession: "graphic designers",
    keywords: ["graphic designer invoice generator", "design invoice template", "graphic design invoice", "freelance designer invoice", "logo design invoice"],
  },
  "web-developer-invoice": {
    h1: "Free Invoice Generator for Web Developers",
    sub: "Bill development hours, hosting, and retainers in a professional PDF invoice — free, no account needed.",
    title: "Free Web Developer Invoice Generator — Developer PDF Invoices",
    desc: "Create web developer invoices online for free. Bill hourly or per milestone, itemise hosting and maintenance, and download a professional PDF.",
    profession: "web developers",
    keywords: ["web developer invoice generator", "developer invoice template", "software developer invoice", "freelance developer invoice", "web design invoice"],
  },
  "plumber-invoice": {
    h1: "Free Invoice Generator for Plumbers",
    sub: "Itemise labour, parts, and call-out fees in a clean plumbing invoice — download as PDF for free.",
    title: "Free Plumber Invoice Generator — Plumbing PDF Invoices Online",
    desc: "Create plumbing invoices online for free. Bill labour, parts, and call-out fees, apply tax, add your logo, and download a print-ready PDF invoice. No signup needed.",
    profession: "plumbers",
    keywords: ["plumber invoice generator", "plumbing invoice template", "plumber invoice example", "trade invoice template", "call out fee invoice"],
  },
  "electrician-invoice": {
    h1: "Free Invoice Generator for Electricians",
    sub: "Bill labour, materials, and certificates in one professional electrical invoice — free PDF download.",
    title: "Free Electrician Invoice Generator — Electrical PDF Invoices",
    desc: "Create electrician invoices online for free. Itemise labour, materials, and testing, apply tax, add your logo, and download a professional PDF invoice instantly.",
    profession: "electricians",
    keywords: ["electrician invoice generator", "electrical invoice template", "electrician invoice example", "trade invoice template", "electrical contractor invoice"],
  },
  "cleaning-services-invoice": {
    h1: "Free Invoice Generator for Cleaning Services",
    sub: "Invoice one-off or recurring cleans with a tidy PDF — add your logo and download free, no signup.",
    title: "Free Cleaning Invoice Generator — Cleaning Services PDF Invoices",
    desc: "Create cleaning service invoices online for free. Bill per visit, hourly, or recurring, apply tax, and download a professional PDF in seconds.",
    profession: "cleaning businesses",
    keywords: ["cleaning invoice generator", "cleaning services invoice template", "house cleaning invoice", "office cleaning invoice", "maid service invoice"],
  },
  "tutor-invoice": {
    h1: "Free Invoice Generator for Tutors",
    sub: "Bill lessons by the hour or by the package in a clean PDF invoice parents trust — completely free.",
    title: "Free Tutor Invoice Generator — Tutoring PDF Invoices Online",
    desc: "Create tutoring invoices online for free. Bill per lesson, hour, or package, apply tax if needed, and download a professional PDF invoice. No signup.",
    profession: "tutors and teachers",
    keywords: ["tutor invoice generator", "tutoring invoice template", "private tutor invoice", "teacher invoice", "lesson invoice template"],
  },
  "virtual-assistant-invoice": {
    h1: "Free Invoice Generator for Virtual Assistants",
    sub: "Invoice hours, packages, and retainers with a professional PDF — add your logo, download free.",
    title: "Free Virtual Assistant Invoice Generator — VA PDF Invoices",
    desc: "Create virtual assistant invoices online for free. Bill hourly, by task, or on a retainer, add your branding, apply tax, and download a clean PDF invoice instantly.",
    profession: "virtual assistants",
    keywords: ["virtual assistant invoice generator", "va invoice template", "virtual assistant invoice", "freelance va invoice", "remote assistant invoice"],
  },
  "handyman-invoice": {
    h1: "Free Invoice Generator for Handymen",
    sub: "Bill labour, materials, and call-outs in a clear handyman invoice — download a free PDF in seconds.",
    title: "Free Handyman Invoice Generator — Handyman PDF Invoices Online",
    desc: "Create handyman invoices online for free. Itemise labour, materials, and call-out fees, apply tax, and download a professional PDF invoice.",
    profession: "handymen",
    keywords: ["handyman invoice generator", "handyman invoice template", "handyman receipt", "odd jobs invoice", "maintenance invoice template"],
  },
  "catering-invoice": {
    h1: "Free Invoice Generator for Caterers",
    sub: "Invoice events, menus, staff, and deposits in one polished PDF — add your logo, download free.",
    title: "Free Catering Invoice Generator — Catering PDF Invoices Online",
    desc: "Create catering invoices online for free. Bill per head, itemise menus, staff, and rentals, apply tax, and download a professional PDF invoice.",
    profession: "caterers and event food businesses",
    keywords: ["catering invoice generator", "catering invoice template", "event catering invoice", "food service invoice", "caterer invoice example"],
  },
  "auto-repair-invoice": {
    h1: "Free Invoice Generator for Auto Repair & Mechanics",
    sub: "Bill parts, labour, and diagnostics in a clear mechanic invoice — download a free PDF, no signup.",
    title: "Free Auto Repair Invoice Generator — Mechanic PDF Invoices",
    desc: "Create auto repair invoices online for free. Itemise parts, labour, and diagnostics, apply tax, add your garage logo, and download a clean PDF.",
    profession: "mechanics and auto repair shops",
    keywords: ["auto repair invoice generator", "mechanic invoice template", "car repair invoice", "garage invoice template", "automotive invoice"],
  },
  "personal-trainer-invoice": {
    h1: "Free Invoice Generator for Personal Trainers",
    sub: "Invoice sessions, packages, and monthly plans with a clean PDF — add your logo and download free.",
    title: "Free Personal Trainer Invoice Generator — Fitness PDF Invoices",
    desc: "Create personal trainer invoices online for free. Bill per session, package, or month, add your branding, and download a professional PDF invoice.",
    profession: "personal trainers and fitness coaches",
    keywords: ["personal trainer invoice generator", "fitness invoice template", "personal training invoice", "gym trainer invoice", "coaching invoice template"],
  },
};

export const LANDING_SLUGS = Object.keys(LANDING);
