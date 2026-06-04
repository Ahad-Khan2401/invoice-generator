/* ───────────────────────────────────────────────
   Blog posts — long-form, SEO + AEO optimised content.
   Each key is a URL: /blog/how-to-make-an-invoice
   Rendered by app/blog/[slug]/page.tsx, listed by app/blog/page.tsx,
   and indexed via app/sitemap.ts. Add a post = add one entry.
─────────────────────────────────────────────── */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; text: string };

export interface Post {
  title: string;
  description: string;
  date: string;       // ISO published
  updated: string;    // ISO updated
  readMins: number;
  keywords: string[];
  excerpt: string;
  body: Block[];
  faq: { q: string; a: string }[];
}

const CTA =
  'You can <a href="/">create one free with PDF Bill Builder</a> — no signup, download as PDF in seconds.';

export const POSTS: Record<string, Post> = {
  /* 1 ───────────────────────────────────────── */
  "how-to-make-an-invoice": {
    title: "How to Make an Invoice: Step-by-Step Guide (2026)",
    description:
      "Learn how to make a professional invoice in 2026 — what to include, a free step-by-step method, and how to get paid faster. With a free invoice generator.",
    date: "2026-01-12",
    updated: "2026-06-01",
    readMins: 6,
    keywords: ["how to make an invoice", "create an invoice", "invoice step by step", "free invoice generator"],
    excerpt:
      "A clear, no-jargon guide to making a professional invoice that gets paid — what to include, the exact steps, and a free tool to do it in seconds.",
    body: [
      { type: "p", text: "An invoice is a document that requests payment for goods or services. A clear, professional invoice gets paid faster and keeps your records clean. This guide shows you exactly how to make one — even if you've never sent an invoice before." },
      { type: "callout", text: `In a hurry? ${CTA}` },
      { type: "h2", text: "What you need before you start" },
      { type: "p", text: "Gather a few details first so the process takes two minutes instead of twenty:" },
      { type: "ul", items: [
        "Your business name, address, email, and (optionally) logo",
        "Your client's name and contact details",
        "A description of the work or products, with quantities and rates",
        "Your tax rate, if applicable, and your payment terms",
      ] },
      { type: "h2", text: "How to make an invoice in 6 steps" },
      { type: "ol", items: [
        "<strong>Add a header and invoice number.</strong> Label it clearly as “Invoice” and give it a unique number (e.g. INV-001) for your records.",
        "<strong>Add your details and your client's.</strong> Put your business info top-left and the client's under “Bill To”.",
        "<strong>Add the date and due date.</strong> Include the issue date and a clear due date so there's no ambiguity.",
        "<strong>List your items.</strong> One line per item with a description, quantity, and rate. The total calculates from these.",
        "<strong>Apply tax and show the total.</strong> Add your tax percentage if needed and display a clear grand total.",
        "<strong>Add notes and download.</strong> Include payment terms or a thank-you note, then export to PDF and send it.",
      ] },
      { type: "p", text: `Every one of these steps is built into our free tool — ${CTA}` },
      { type: "h2", text: "Tips to get paid faster" },
      { type: "ul", items: [
        "Send the invoice the same day you finish the work.",
        "Use short payment terms like “Due within 7 days” or “Due on receipt”.",
        "Include your payment details (bank/UPI/PayPal) directly on the invoice.",
        "Number your invoices sequentially so nothing gets lost.",
      ] },
      { type: "p", text: "If you bill clients regularly, see our guides for <a href=\"/freelancer-invoice\">freelancers</a>, <a href=\"/contractor-invoice\">contractors</a>, and <a href=\"/small-business-invoice\">small businesses</a>." },
    ],
    faq: [
      { q: "How do I make an invoice for free?", a: "Use a free invoice generator like PDF Bill Builder: add your details, list your items, apply tax, and download a PDF — no signup or payment needed." },
      { q: "What should every invoice include?", a: "An invoice number, your details, the client's details, issue and due dates, an itemised list with amounts, tax (if any), a clear total, and payment terms." },
      { q: "Do I need software to make an invoice?", a: "No. A free browser-based generator creates a professional PDF invoice in minutes without installing anything." },
    ],
  },

  /* 2 ───────────────────────────────────────── */
  "how-to-invoice-a-client-as-a-freelancer": {
    title: "How to Invoice a Client as a Freelancer",
    description:
      "A practical guide to invoicing clients as a freelancer — what to put on a freelance invoice, when to send it, and how to get paid on time. Free template included.",
    date: "2026-02-03",
    updated: "2026-06-01",
    readMins: 7,
    keywords: ["how to invoice a client", "freelance invoice", "freelancer invoicing", "invoice for freelancers"],
    excerpt:
      "Everything a freelancer needs to invoice clients professionally and get paid on time — plus a free freelance invoice template.",
    body: [
      { type: "p", text: "Invoicing is how freelancers actually get paid, yet most people learn it by trial and error. Here's a simple system you can reuse for every client and project." },
      { type: "h2", text: "Agree on terms before you invoice" },
      { type: "p", text: "Before the work starts, confirm your rate (hourly or fixed), the scope, and when payment is due. This prevents awkward conversations later and makes your invoice a formality rather than a surprise." },
      { type: "h2", text: "What to put on a freelance invoice" },
      { type: "ul", items: [
        "Your name/business name and contact details",
        "The client's name and details",
        "A unique invoice number and the date",
        "A line item for each deliverable, with hours or quantity and your rate",
        "Tax if you're registered, and the total amount due",
        "Payment method and a clear due date",
      ] },
      { type: "callout", text: `Want a ready-made layout? Use our <a href="/freelancer-invoice">free freelancer invoice generator</a> and download a PDF in seconds.` },
      { type: "h2", text: "Hourly vs fixed-price invoices" },
      { type: "p", text: "If you bill hourly, list the hours and your rate so the client can see the breakdown — our <a href=\"/hourly-invoice\">hourly invoice generator</a> does this automatically. For fixed-price work, a single line with the agreed amount is cleaner." },
      { type: "h2", text: "When to send the invoice" },
      { type: "ol", items: [
        "For one-off projects: send it the day you deliver.",
        "For ongoing work: invoice on a fixed day each month.",
        "For large projects: take a deposit up front and invoice milestones.",
      ] },
      { type: "h2", text: "Following up on late payments" },
      { type: "p", text: "If an invoice goes unpaid, send a polite reminder a day or two after the due date, then a firmer one a week later. Keeping invoices numbered and dated makes these follow-ups easy and professional." },
    ],
    faq: [
      { q: "How do freelancers invoice clients?", a: "Freelancers create an invoice with their details, the client's details, an itemised list of work with rates, tax if applicable, and a due date — then send it as a PDF. A free generator makes this take two minutes." },
      { q: "Should a freelancer charge tax on an invoice?", a: "Only if you're registered for sales tax/VAT/GST in your country. If so, add your tax percentage; the invoice total should show tax separately." },
      { q: "How do I get clients to pay on time?", a: "Use short, clear payment terms, send the invoice promptly, include your payment details, and follow up politely right after the due date." },
    ],
  },

  /* 3 ───────────────────────────────────────── */
  "invoice-vs-receipt-vs-quotation": {
    title: "Invoice vs Receipt vs Quotation: What's the Difference?",
    description:
      "Confused about invoice vs receipt vs quotation? Learn what each document means, when to use it, and how they fit together — with free templates for all three.",
    date: "2026-02-20",
    updated: "2026-06-01",
    readMins: 5,
    keywords: ["invoice vs receipt", "quotation vs invoice", "difference between invoice and receipt", "receipt vs invoice"],
    excerpt:
      "Invoice, receipt, and quotation are easy to mix up. Here's what each one means, when to send it, and how they work together in the sales cycle.",
    body: [
      { type: "p", text: "Invoices, receipts, and quotations are three different documents that appear at three different points in a sale. Using the right one keeps you professional and your records correct." },
      { type: "h2", text: "Quotation: the price before the work" },
      { type: "p", text: "A quotation (or quote) is an estimate you send <em>before</em> a job. It tells the client what the work will cost so they can approve it. It is not a request for payment. Create one with our <a href=\"/\">free quotation generator</a> by switching the document type to “Quotation”." },
      { type: "h2", text: "Invoice: the request for payment" },
      { type: "p", text: "An invoice is sent <em>after</em> you deliver the goods or service. It requests payment, lists what's owed, and includes a due date. This is the document most businesses send most often." },
      { type: "h2", text: "Receipt: the proof of payment" },
      { type: "p", text: "A receipt is issued <em>after</em> the client pays. It confirms that payment was received. Buyers keep receipts for their own records, returns, and expense claims." },
      { type: "h2", text: "How they fit together" },
      { type: "ol", items: [
        "You send a <strong>quotation</strong> → client approves.",
        "You do the work and send an <strong>invoice</strong> → client pays.",
        "You issue a <strong>receipt</strong> → the cycle is complete.",
      ] },
      { type: "callout", text: `PDF Bill Builder creates all three from one place — just switch the document type. <a href="/">Try it free</a>.` },
    ],
    faq: [
      { q: "What is the difference between an invoice and a receipt?", a: "An invoice requests payment before it's made; a receipt confirms payment after it's received. An invoice says “please pay”, a receipt says “payment received”." },
      { q: "Is a quotation legally binding?", a: "A quotation is an offer, not a demand for payment. It can become binding once the client accepts it, depending on your terms, but it isn't an invoice." },
      { q: "Can one tool create invoices, receipts, and quotations?", a: "Yes. PDF Bill Builder lets you switch between invoice, receipt, and quotation with one click and download any of them as a PDF." },
    ],
  },

  /* 4 ───────────────────────────────────────── */
  "what-to-include-on-an-invoice": {
    title: "What to Include on an Invoice: The Complete Checklist",
    description:
      "A complete checklist of what to include on a professional invoice so it's clear, compliant, and gets paid — plus country notes for VAT and GST.",
    date: "2026-03-09",
    updated: "2026-06-01",
    readMins: 6,
    keywords: ["what to include on an invoice", "invoice requirements", "invoice checklist", "professional invoice"],
    excerpt:
      "Miss a detail and your invoice gets delayed. Here's the complete checklist of what every professional invoice should include.",
    body: [
      { type: "p", text: "A complete invoice is paid faster and questioned less. Use this checklist every time you bill a client." },
      { type: "h2", text: "The essential checklist" },
      { type: "ul", items: [
        "The word <strong>“Invoice”</strong> clearly at the top",
        "A unique <strong>invoice number</strong>",
        "<strong>Issue date</strong> and <strong>due date</strong>",
        "<strong>Your</strong> business name, address, and contact details",
        "<strong>Client's</strong> name and details under “Bill To”",
        "An <strong>itemised list</strong>: description, quantity, rate, amount",
        "<strong>Subtotal, tax, and total</strong> amount due",
        "<strong>Payment terms</strong> and accepted payment methods",
      ] },
      { type: "callout", text: `Our <a href="/">free invoice generator</a> includes every field above by default, so you can't forget one.` },
      { type: "h2", text: "Country notes: VAT, GST and tax numbers" },
      { type: "p", text: "Tax rules differ by country. A few quick pointers:" },
      { type: "ul", items: [
        "<strong>UK:</strong> a VAT invoice must show your VAT number and the VAT rate. See our <a href=\"/invoice-generator-uk\">UK invoice generator</a>.",
        "<strong>Australia:</strong> a tax invoice should say “Tax Invoice” and show GST. See the <a href=\"/invoice-generator-australia\">Australia tax invoice generator</a>.",
        "<strong>India:</strong> a GST invoice needs your GSTIN and the GST breakup. See the <a href=\"/invoice-generator-india\">India invoice generator</a>.",
        "<strong>USA/Canada:</strong> show sales tax/GST-HST where you're registered. See <a href=\"/invoice-generator-usa\">USA</a> and <a href=\"/invoice-generator-canada\">Canada</a>.",
      ] },
      { type: "p", text: "Always confirm the exact requirements with your local tax authority or accountant — this is general guidance, not tax advice." },
      { type: "h2", text: "Make it look professional" },
      { type: "p", text: "Add your logo, pick a brand colour, and keep the layout clean. A polished invoice signals a professional business and gets taken seriously." },
    ],
    faq: [
      { q: "What information is legally required on an invoice?", a: "At minimum: the word “invoice”, a unique number, dates, your and the client's details, an itemised list, the total, and any tax. Tax-registered businesses must also show their tax number and rate." },
      { q: "Do I need an invoice number?", a: "Yes. A unique, sequential invoice number is important for your records, accounting, and tax. Tools like PDF Bill Builder let you set it per invoice." },
      { q: "What are common payment terms to include?", a: "“Due on receipt”, “Net 7”, “Net 15”, or “Net 30” are common. Pick shorter terms if you want to be paid faster." },
    ],
  },

  /* 5 ───────────────────────────────────────── */
  "invoice-payment-terms-explained": {
    title: "Invoice Payment Terms Explained (Net 30, Due on Receipt & More)",
    description:
      "What do invoice payment terms like Net 30, Net 15, and Due on Receipt actually mean? A plain-English guide to choosing terms that get you paid faster.",
    date: "2026-03-25",
    updated: "2026-06-01",
    readMins: 5,
    keywords: ["invoice payment terms", "net 30", "due on receipt", "payment terms meaning"],
    excerpt:
      "Net 30? Due on receipt? Here's what invoice payment terms mean in plain English — and which ones actually get you paid faster.",
    body: [
      { type: "p", text: "Payment terms tell your client when payment is due. The right terms can be the difference between getting paid this week and chasing money next month." },
      { type: "h2", text: "Common payment terms and what they mean" },
      { type: "ul", items: [
        "<strong>Due on receipt:</strong> pay as soon as the invoice arrives.",
        "<strong>Net 7 / Net 15 / Net 30:</strong> pay within 7, 15, or 30 days of the invoice date.",
        "<strong>50% upfront:</strong> half before work starts, half on delivery — common for large projects.",
        "<strong>EOM (end of month):</strong> payment due at the end of the month the invoice was issued.",
      ] },
      { type: "h2", text: "Which terms get you paid fastest?" },
      { type: "p", text: "Shorter terms generally mean faster payment. For freelancers and small businesses, “Due on receipt” or “Net 7” work well. Larger corporate clients often expect “Net 30”, so factor that into your cash flow." },
      { type: "callout", text: `Add your terms to the notes field and <a href="/">download a professional invoice</a> for free.` },
      { type: "h2", text: "Tips for setting payment terms" },
      { type: "ol", items: [
        "Agree terms in writing before the work starts.",
        "State the due date clearly on every invoice — don't just write “Net 30”.",
        "Consider a small late fee for overdue invoices.",
        "Offer multiple payment methods to remove friction.",
      ] },
      { type: "p", text: "For more, read <a href=\"/blog/how-to-invoice-a-client-as-a-freelancer\">how to invoice a client</a> and <a href=\"/blog/what-to-include-on-an-invoice\">what to include on an invoice</a>." },
    ],
    faq: [
      { q: "What does Net 30 mean on an invoice?", a: "Net 30 means the full payment is due within 30 days of the invoice date. Net 15 and Net 7 mean 15 and 7 days respectively." },
      { q: "What is the best payment term to get paid faster?", a: "“Due on receipt” or “Net 7” usually get you paid fastest. Always show the actual due date on the invoice, not just the term." },
      { q: "Can I charge a late fee?", a: "Yes, if you state it in your terms before the work. A small percentage or flat late fee encourages on-time payment." },
    ],
  },

  /* 6 ───────────────────────────────────────── */
  "how-to-write-an-invoice": {
    title: "How to Write an Invoice (With a Free Example)",
    description:
      "Learn how to write a professional invoice step by step, with an example layout and the exact wording to use. Free invoice maker included.",
    date: "2026-04-08",
    updated: "2026-06-01",
    readMins: 6,
    keywords: ["how to write an invoice", "write an invoice", "invoice example", "invoice wording"],
    excerpt: "Exactly how to write a professional invoice — the fields, the wording, and a clean example you can copy.",
    body: [
      { type: "p", text: "Writing an invoice is simpler than it looks. A good invoice is clear, complete, and easy to pay. Here's exactly what to write and where." },
      { type: "callout", text: `Skip the manual work — ${CTA}` },
      { type: "h2", text: "The structure of a well-written invoice" },
      { type: "ol", items: [
        "<strong>Header:</strong> the word “Invoice” and a unique invoice number.",
        "<strong>Your details:</strong> business name, address, email, phone.",
        "<strong>Client details:</strong> their name and address under “Bill To”.",
        "<strong>Dates:</strong> issue date and due date.",
        "<strong>Line items:</strong> description, quantity, rate, and amount for each.",
        "<strong>Totals:</strong> subtotal, tax, and the final total due.",
        "<strong>Payment & notes:</strong> how to pay and your terms.",
      ] },
      { type: "h2", text: "Example wording" },
      { type: "p", text: "Keep descriptions specific: instead of “Design work”, write “Logo design — 3 concepts + 2 revisions”. For notes, a simple line works: “Payment due within 14 days. Bank transfer details below. Thank you!”" },
      { type: "h2", text: "Common mistakes to avoid" },
      { type: "ul", items: [
        "Forgetting a unique invoice number.",
        "Vague item descriptions that invite questions.",
        "No clear due date (“Net 30” without an actual date).",
        "Leaving off your payment details.",
      ] },
      { type: "p", text: "See our full <a href=\"/blog/what-to-include-on-an-invoice\">invoice checklist</a> and <a href=\"/blog/invoice-payment-terms-explained\">payment terms guide</a> for more." },
    ],
    faq: [
      { q: "How do I write a simple invoice?", a: "Add a header with an invoice number, your and your client's details, the dates, an itemised list with amounts, the total, and payment terms — then download it as a PDF." },
      { q: "What should I write in the invoice description?", a: "Be specific about what you delivered, e.g. “Website homepage design — 2 revisions”. Specific descriptions reduce back-and-forth and get you paid faster." },
      { q: "Do I need accounting software to write an invoice?", a: "No. A free online invoice maker writes a professional invoice for you in minutes — no software or signup required." },
    ],
  },

  /* 7 ───────────────────────────────────────── */
  "invoice-numbering-best-practices": {
    title: "Invoice Numbering: Formats & Best Practices",
    description:
      "How to number your invoices correctly — common invoice number formats, sequential vs date-based, and rules to keep your records clean.",
    date: "2026-04-22",
    updated: "2026-06-01",
    readMins: 5,
    keywords: ["invoice number", "invoice number format", "invoice numbering", "how to number invoices"],
    excerpt: "A clear guide to invoice numbering — the formats that work, the rules to follow, and examples you can copy.",
    body: [
      { type: "p", text: "Every invoice needs a unique number. It keeps your records organised, helps with tax, and makes follow-ups easy. Here's how to do it right." },
      { type: "h2", text: "Why invoice numbers matter" },
      { type: "p", text: "Unique, sequential numbers prove no invoice is missing, make accounting and audits painless, and give you a clean reference when chasing payment." },
      { type: "h2", text: "Common invoice number formats" },
      { type: "ul", items: [
        "<strong>Sequential:</strong> INV-001, INV-002, INV-003…",
        "<strong>Date-based:</strong> 2026-001, 2026-002 (year + sequence).",
        "<strong>Client-based:</strong> ACME-001, ACME-002 (per client).",
        "<strong>Project-based:</strong> P12-001 (project + sequence).",
      ] },
      { type: "callout", text: `Set any invoice number you like in the tool — ${CTA}` },
      { type: "h2", text: "Best practices" },
      { type: "ol", items: [
        "Never reuse a number — each invoice must be unique.",
        "Keep numbers sequential (don't skip), so gaps are obvious.",
        "Pick one format and stick to it.",
        "Add a prefix (INV-) so invoices are easy to spot in records.",
      ] },
    ],
    faq: [
      { q: "What is a good invoice number format?", a: "A simple sequential format like INV-001, INV-002 works for most. Add the year (2026-001) if you reset numbering annually." },
      { q: "Can invoice numbers have letters?", a: "Yes. Prefixes like INV-, client codes, or project codes are fine and common — just keep the numeric part sequential and unique." },
      { q: "Should I restart invoice numbers each year?", a: "You can, using a year prefix (2026-001). The key rule is that every number stays unique and sequential within your system." },
    ],
  },

  /* 8 ───────────────────────────────────────── */
  "gst-invoice-format-india": {
    title: "GST Invoice Format in India: Rules & Free Template",
    description:
      "What a GST invoice in India must include — GSTIN, HSN/SAC codes, CGST/SGST/IGST, and mandatory fields. Create one free online.",
    date: "2026-05-06",
    updated: "2026-06-01",
    readMins: 6,
    keywords: ["gst invoice format", "gst invoice india", "tax invoice format india", "gst bill format"],
    excerpt: "Everything a GST invoice in India must show — GSTIN, HSN/SAC, and the tax breakup — plus a free way to create one.",
    body: [
      { type: "p", text: "If you're registered under GST in India, your tax invoices must include specific fields. Here's a plain-English checklist." },
      { type: "h2", text: "What a GST invoice must include" },
      { type: "ul", items: [
        "Your business name, address, and <strong>GSTIN</strong>.",
        "A unique, sequential invoice number and the date.",
        "Customer name, address, and GSTIN (if registered).",
        "<strong>HSN/SAC code</strong> for each item or service.",
        "Taxable value and the <strong>CGST, SGST/UTGST, or IGST</strong> breakup with rates.",
        "Total invoice value (in figures and ideally words).",
        "Place of supply for inter-state transactions.",
      ] },
      { type: "callout", text: `Create a clean GST-style bill online — <a href="/invoice-generator-india">use the India invoice generator</a>, add your tax, and download a PDF free.` },
      { type: "h2", text: "CGST/SGST vs IGST" },
      { type: "p", text: "For sales <em>within</em> your state, split the tax into CGST + SGST. For <em>inter-state</em> sales, charge IGST instead. Our tool lets you add your total tax percentage; label it clearly on the invoice." },
      { type: "p", text: "Always confirm the latest GST rules with a qualified accountant — this is general guidance, not tax advice." },
    ],
    faq: [
      { q: "What is mandatory on a GST invoice in India?", a: "Your GSTIN, a unique invoice number and date, customer details, HSN/SAC codes, the taxable value, the CGST/SGST or IGST breakup with rates, and the total value." },
      { q: "Is HSN code mandatory on a GST invoice?", a: "Yes, HSN (goods) or SAC (services) codes are required; the number of digits depends on your turnover. Check the current threshold for your business." },
      { q: "Can I make a GST invoice online for free?", a: "Yes. You can create a professional GST-style invoice with PDF Bill Builder, add your tax, and download it as a PDF — no signup." },
    ],
  },

  /* 9 ───────────────────────────────────────── */
  "vat-invoice-requirements-uk": {
    title: "VAT Invoice Requirements in the UK",
    description:
      "What a UK VAT invoice must include — your VAT number, the VAT rate, and all required fields. Full vs simplified invoices explained.",
    date: "2026-05-20",
    updated: "2026-06-01",
    readMins: 5,
    keywords: ["vat invoice", "vat invoice uk", "vat invoice requirements", "uk invoice"],
    excerpt: "A clear checklist of what a UK VAT invoice must show — and the difference between full and simplified invoices.",
    body: [
      { type: "p", text: "If your business is VAT-registered in the UK, your invoices must meet HMRC's requirements. Here's what to include." },
      { type: "h2", text: "What a full VAT invoice must show" },
      { type: "ul", items: [
        "A unique invoice number and the invoice date.",
        "Your business name, address, and <strong>VAT registration number</strong>.",
        "The customer's name and address.",
        "A description of the goods or services.",
        "The <strong>VAT rate</strong> and amount per item, plus the rate applied.",
        "The total amount excluding VAT, the VAT total, and the total including VAT.",
      ] },
      { type: "callout", text: `Bill in pounds with VAT and download a PDF — <a href="/invoice-generator-uk">use the UK invoice generator</a>, free.` },
      { type: "h2", text: "Full vs simplified invoices" },
      { type: "p", text: "A <strong>simplified</strong> VAT invoice can be used for retail sales under £250 and needs fewer details. A <strong>full</strong> VAT invoice is required for most B2B sales. When in doubt, issue a full invoice." },
      { type: "p", text: "Always check the current rules on the HMRC website — this is general guidance, not tax or legal advice." },
    ],
    faq: [
      { q: "What must a UK VAT invoice include?", a: "A unique number, the date, your VAT number, your and the customer's details, a description, the VAT rate and amount, and totals excluding and including VAT." },
      { q: "Do I need to show my VAT number on invoices?", a: "Yes. If you're VAT-registered, your VAT registration number must appear on your VAT invoices." },
      { q: "What is a simplified VAT invoice?", a: "A shorter invoice allowed for retail sales up to £250 that needs fewer fields than a full VAT invoice. Most B2B sales still require a full invoice." },
    ],
  },

  /* 10 ──────────────────────────────────────── */
  "how-to-send-an-invoice": {
    title: "How to Send an Invoice (Email Tips & Template)",
    description:
      "The best way to send an invoice by email so it gets opened and paid — what to write, what to attach, and how to follow up.",
    date: "2026-05-28",
    updated: "2026-06-01",
    readMins: 5,
    keywords: ["how to send an invoice", "send invoice by email", "invoice email template", "emailing an invoice"],
    excerpt: "How to send an invoice that actually gets paid — the email wording, what to attach, and a polite follow-up template.",
    body: [
      { type: "p", text: "How you send an invoice matters almost as much as the invoice itself. A clear email gets opened, understood, and paid faster." },
      { type: "h2", text: "Send the invoice as a PDF" },
      { type: "p", text: "Always attach a <strong>PDF</strong> — it looks professional, can't be accidentally edited, and opens on any device. Generate one free and attach it to your email." },
      { type: "callout", text: `Need the PDF first? ${CTA}` },
      { type: "h2", text: "A simple invoice email template" },
      { type: "p", text: "Subject: <em>Invoice INV-001 from [Your Business]</em>" },
      { type: "p", text: "Body: <em>“Hi [Name], thanks for your business. Please find invoice INV-001 attached for [work], due [date]. Payment details are on the invoice. Let me know if you have any questions!”</em>" },
      { type: "h2", text: "Following up politely" },
      { type: "ol", items: [
        "Send the invoice the day you finish the work.",
        "A day or two after the due date, send a friendly reminder.",
        "A week later, send a firmer (but polite) follow-up referencing the invoice number.",
      ] },
      { type: "p", text: "For terms that speed up payment, read our <a href=\"/blog/invoice-payment-terms-explained\">payment terms guide</a>." },
    ],
    faq: [
      { q: "What's the best way to send an invoice?", a: "Email a PDF invoice with a short, clear message and the invoice number in the subject line. PDFs look professional and can't be accidentally altered." },
      { q: "What should I write in an invoice email?", a: "Keep it short: greet the client, state the invoice number and what it's for, mention the due date, and point to the payment details on the invoice." },
      { q: "How do I follow up on an unpaid invoice?", a: "Send a friendly reminder just after the due date, then a firmer polite follow-up a week later, always referencing the invoice number." },
    ],
  },

  /* 11 ──────────────────────────────────────── */
  "free-invoice-templates": {
    title: "Free Invoice Templates: Create & Download Online",
    description:
      "Skip the Word and Excel templates. Create a professional invoice, receipt, or quotation online for free and download a clean PDF in seconds.",
    date: "2026-06-02",
    updated: "2026-06-02",
    readMins: 5,
    keywords: ["free invoice template", "invoice template", "invoice template free download", "pdf invoice template"],
    excerpt: "Why a free online invoice template beats Word and Excel — and how to make a polished PDF invoice in seconds.",
    body: [
      { type: "p", text: "Searching for a free invoice template? You can skip the clunky Word and Excel files altogether. An online template fills in the maths for you and exports a clean PDF instantly." },
      { type: "callout", text: `Try it now — ${CTA}` },
      { type: "h2", text: "What makes a good invoice template" },
      { type: "ul", items: [
        "A clear header with your logo, invoice number, and dates.",
        "Separate “From” and “Bill To” blocks.",
        "An itemised table that calculates subtotal, tax, and total automatically.",
        "Space for payment terms and notes.",
      ] },
      { type: "h2", text: "Online template vs Word/Excel" },
      { type: "p", text: "Word and Excel templates break easily, don't calculate tax reliably, and look inconsistent. An online tool keeps the layout perfect, does the maths, and gives you a print-ready PDF — no formulas, no formatting headaches." },
      { type: "h2", text: "One template, three documents" },
      { type: "p", text: "The same template works for invoices, <a href=\"/blog/how-to-make-a-receipt\">receipts</a>, and <a href=\"/blog/how-to-write-a-quotation\">quotations</a> — just switch the document type. Add your logo, pick a currency, apply tax, and download." },
    ],
    faq: [
      { q: "Where can I get a free invoice template?", a: "You can create one online for free with PDF Bill Builder — no download or signup needed. It fills in totals and tax and exports a PDF." },
      { q: "Is Word or Excel good for invoices?", a: "They work, but break easily and don't calculate tax reliably. An online template keeps the layout perfect and does the maths for you." },
      { q: "Can I reuse the template for every client?", a: "Yes. Your details can carry over, so you just change the client and items each time." },
    ],
  },

  /* 12 ──────────────────────────────────────── */
  "how-to-make-a-receipt": {
    title: "How to Make a Receipt (Free Receipt Maker)",
    description:
      "Learn how to make a payment receipt for your customer and download it as a PDF for free. What a receipt must include, with a free receipt maker.",
    date: "2026-06-02",
    updated: "2026-06-02",
    readMins: 5,
    keywords: ["how to make a receipt", "receipt maker", "receipt template", "payment receipt"],
    excerpt: "What a payment receipt must include and how to create one free in seconds — plus how a receipt differs from an invoice.",
    body: [
      { type: "p", text: "A receipt confirms that a customer has paid. It's issued <em>after</em> payment and is important for your customer's records, returns, and expense claims." },
      { type: "h2", text: "What a receipt should include" },
      { type: "ul", items: [
        "The word “Receipt” and a unique receipt number.",
        "Your business name and contact details.",
        "The customer's name.",
        "The date payment was received.",
        "What was paid for, with amounts and any tax.",
        "The total amount paid and the payment method.",
      ] },
      { type: "callout", text: `Make one now — open the tool, switch the document type to <strong>Receipt</strong>, and ${CTA}` },
      { type: "h2", text: "Receipt vs invoice" },
      { type: "p", text: "An <a href=\"/blog/invoice-vs-receipt-vs-quotation\">invoice requests payment</a>; a receipt confirms it was received. If a customer has already paid, issue a receipt, not an invoice." },
    ],
    faq: [
      { q: "How do I make a receipt for free?", a: "Use PDF Bill Builder, set the document type to Receipt, add the customer and amount paid, and download a PDF — no signup." },
      { q: "What is the difference between a receipt and an invoice?", a: "An invoice asks for payment before it's made; a receipt confirms payment after it's received." },
      { q: "Do I need to give a receipt?", a: "It's good practice and often expected — customers use receipts for records, returns, and expense claims." },
    ],
  },

  /* 13 ──────────────────────────────────────── */
  "how-to-write-a-quotation": {
    title: "How to Write a Quotation (Free Quote Template)",
    description:
      "Learn how to write a professional price quotation that wins the job — what to include, how it differs from an invoice, and a free quote maker.",
    date: "2026-06-03",
    updated: "2026-06-03",
    readMins: 5,
    keywords: ["how to write a quotation", "quotation format", "quote template", "price quote"],
    excerpt: "How to write a clear price quotation that wins work — the must-have fields, validity, and a free way to make one.",
    body: [
      { type: "p", text: "A quotation (or quote) tells a potential client what a job will cost <em>before</em> they commit. A clear, professional quote builds trust and wins more work." },
      { type: "h2", text: "What to include in a quotation" },
      { type: "ul", items: [
        "The word “Quotation” and a unique quote number.",
        "Your business and client details.",
        "An itemised breakdown of the work and prices.",
        "The total, including or excluding tax (state which).",
        "A validity period (e.g. “Valid for 30 days”).",
        "Any terms or assumptions.",
      ] },
      { type: "callout", text: `Create a quote in seconds — switch the document type to <strong>Quotation</strong> and ${CTA}` },
      { type: "h2", text: "Quotation vs invoice" },
      { type: "p", text: "A quote is an estimate sent before the work; an invoice requests payment after. Once the client accepts your quote, you do the work and then send an <a href=\"/blog/how-to-make-an-invoice\">invoice</a>." },
      { type: "h2", text: "Tips to win the job" },
      { type: "ol", items: [
        "Be specific so the client knows exactly what's included.",
        "Add a short validity period to encourage a decision.",
        "Keep it clean and branded — it's a sales document.",
      ] },
    ],
    faq: [
      { q: "How do I write a quotation?", a: "List the work with itemised prices, add your and the client's details, show the total and tax, and include a validity period — then send it as a PDF." },
      { q: "What is the difference between a quote and an invoice?", a: "A quote is a price estimate sent before work begins; an invoice requests payment after the work is delivered." },
      { q: "How long should a quotation be valid?", a: "30 days is common. Stating a validity period encourages the client to decide and protects you if prices change." },
    ],
  },

  /* 14 ──────────────────────────────────────── */
  "what-is-a-proforma-invoice": {
    title: "What Is a Proforma Invoice? (Meaning & Free Template)",
    description:
      "Proforma invoice meaning explained — what it is, when to use it, how it differs from a commercial invoice, and how to create one free.",
    date: "2026-06-03",
    updated: "2026-06-03",
    readMins: 5,
    keywords: ["proforma invoice", "what is a proforma invoice", "proforma invoice meaning", "proforma vs invoice"],
    excerpt: "Proforma invoice meaning in plain English — when to use one, how it differs from a regular invoice, and a free way to make it.",
    body: [
      { type: "p", text: "A proforma invoice is a preliminary bill sent to a buyer <em>before</em> goods or services are delivered. It's like a detailed quote: it shows what will be charged, but it isn't a demand for payment." },
      { type: "h2", text: "When to use a proforma invoice" },
      { type: "ul", items: [
        "To give a buyer a firm estimate before confirming an order.",
        "For international shipping and customs paperwork.",
        "When a buyer needs a document to arrange payment or financing.",
      ] },
      { type: "callout", text: `Need one? <a href="/proforma-invoice">Use the free proforma invoice generator</a> and ${CTA}` },
      { type: "h2", text: "Proforma vs commercial/tax invoice" },
      { type: "p", text: "A proforma is provisional and not used for accounting. A <strong>commercial</strong> or <strong>tax invoice</strong> is the final, official bill used for payment and records. Send the proforma first; issue the real invoice once the order is confirmed." },
    ],
    faq: [
      { q: "What does proforma invoice mean?", a: "It's a preliminary invoice sent before delivery that shows the expected charges. It's not a demand for payment and isn't used for final accounting." },
      { q: "Is a proforma invoice legally binding?", a: "Generally no — it's an estimate of what will be charged. The binding document is the final commercial or tax invoice." },
      { q: "How do I make a proforma invoice?", a: "Create it like a normal invoice with PDF Bill Builder, label it clearly, and download a PDF — free and no signup." },
    ],
  },

  /* 15 ──────────────────────────────────────── */
  "tax-invoice-australia": {
    title: "Tax Invoice Australia: GST Rules & Free Template",
    description:
      "What an Australian tax invoice must include — ABN, GST, and the words 'Tax Invoice'. Create a compliant-looking tax invoice free online.",
    date: "2026-06-03",
    updated: "2026-06-03",
    readMins: 5,
    keywords: ["tax invoice australia", "gst invoice australia", "tax invoice template", "abn invoice"],
    excerpt: "What an Australian tax invoice must show — ABN, GST, and required fields — plus a free way to create one.",
    body: [
      { type: "p", text: "If you're registered for GST in Australia, your invoices need to be valid <strong>tax invoices</strong>. Here's what the ATO expects them to show." },
      { type: "h2", text: "What an Australian tax invoice must include" },
      { type: "ul", items: [
        "The words <strong>“Tax Invoice”</strong>.",
        "Your business name and <strong>ABN</strong>.",
        "The date of issue.",
        "A description of the items sold, with quantities.",
        "The <strong>GST</strong> amount (or a statement that the total includes GST).",
        "The total price.",
        "The buyer's identity or ABN for sales of A$1,000 or more.",
      ] },
      { type: "callout", text: `Bill in AUD with GST — <a href="/invoice-generator-australia">use the Australia tax invoice generator</a> and ${CTA}` },
      { type: "h2", text: "GST basics" },
      { type: "p", text: "GST in Australia is 10%. You can show it as a separate line or state that the total includes GST. Our tool lets you add the tax and label it clearly." },
      { type: "p", text: "Always confirm current requirements with the ATO or your accountant — this is general guidance, not tax advice." },
    ],
    faq: [
      { q: "What must an Australian tax invoice include?", a: "The words “Tax Invoice”, your ABN, the date, a description of items, the GST amount or a GST-inclusive statement, and the total. Buyer details are needed for sales of A$1,000 or more." },
      { q: "Do I need an ABN to issue a tax invoice?", a: "Yes — a valid tax invoice must show your ABN. Without one, you can issue a regular invoice but not a GST tax invoice." },
      { q: "How much is GST in Australia?", a: "GST is 10%. You can list it separately or state that the total price includes GST." },
    ],
  },

  /* 16 ──────────────────────────────────────── */
  "how-to-get-paid-faster": {
    title: "How to Get Paid Faster (Freelancers & Small Business)",
    description:
      "Practical, proven ways to get invoices paid faster — clear terms, deposits, reminders, and easy payment options. Free invoice tool included.",
    date: "2026-06-03",
    updated: "2026-06-03",
    readMins: 6,
    keywords: ["get paid faster", "how to get paid on time", "late invoice", "invoice payment tips"],
    excerpt: "Proven tactics to get your invoices paid faster — from clear terms and deposits to friendly reminders.",
    body: [
      { type: "p", text: "Late payments are the biggest cash-flow headache for freelancers and small businesses. These simple habits get money in the door faster." },
      { type: "h2", text: "1. Invoice immediately and clearly" },
      { type: "p", text: "Send the invoice the day you finish — momentum matters. Make it clear and complete so there's no reason to delay. A clean, professional invoice gets taken seriously." },
      { type: "callout", text: `Send a polished PDF the same day — ${CTA}` },
      { type: "h2", text: "2. Use short, specific terms" },
      { type: "p", text: "“Due on receipt” or “Net 7” beat “Net 30”. Always show the actual due date, not just the term — see our <a href=\"/blog/invoice-payment-terms-explained\">payment terms guide</a>." },
      { type: "h2", text: "3. Take a deposit for big jobs" },
      { type: "p", text: "For larger projects, ask for 30–50% upfront. It protects your cash flow and filters out non-serious clients." },
      { type: "h2", text: "4. Make paying effortless" },
      { type: "ul", items: [
        "Put your payment details right on the invoice.",
        "Offer multiple methods (bank transfer, card, UPI/PayPal).",
        "Reference the invoice number everywhere.",
      ] },
      { type: "h2", text: "5. Follow up without fear" },
      { type: "p", text: "A friendly reminder right after the due date, then a firmer one a week later, recovers most late invoices. Keeping invoices numbered makes follow-ups quick and professional." },
    ],
    faq: [
      { q: "How can I get my invoices paid faster?", a: "Invoice immediately, use short clear terms with a real due date, take deposits on big jobs, make paying easy, and follow up politely right after the due date." },
      { q: "Should I ask for a deposit?", a: "For larger projects, yes — 30–50% upfront protects your cash flow and confirms the client is serious." },
      { q: "What do I do about a late invoice?", a: "Send a friendly reminder just after the due date and a firmer follow-up a week later, always referencing the invoice number. Consider a small late fee stated in your terms." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 17 — Free invoice template
  ══════════════════════════════════════════════ */
  "free-invoice-template": {
    title: "Free Invoice Template — Fill Out & Download PDF Online",
    description: "Looking for a free invoice template? Skip the Word and Excel downloads — fill out a professional invoice template in your browser and download a clean PDF instantly.",
    date: "2026-06-04",
    updated: "2026-06-04",
    readMins: 6,
    keywords: ["free invoice template", "invoice template free download", "simple invoice template", "invoice template pdf", "free invoice template word"],
    excerpt: "Skip the Word downloads. Fill out a professional invoice template online for free and download a clean PDF in seconds — no software needed.",
    body: [
      { type: "p", text: "Searching for a free invoice template is one of the most common tasks for new freelancers and small business owners. The problem? Most templates are either locked behind a paywall, require Microsoft Word or Excel, or come out looking dated and unprofessional." },
      { type: "p", text: "The good news: you don't need to download anything. You can fill out a professional invoice template right in your browser and download a polished PDF in seconds. Here's everything you need to know." },
      { type: "h2", text: "What is an invoice template?" },
      { type: "p", text: "An invoice template is a pre-built document layout with all the standard invoice fields — your business name, client details, line items, tax, and total — already in the right places. You fill in your specific information and you have a professional invoice." },
      { type: "p", text: "A good template saves you time and ensures you never forget a required field. It also makes your business look more professional to clients." },
      { type: "h2", text: "What should a free invoice template include?" },
      { type: "ul", items: [
        "Your business name, address, and contact details",
        "Client name and address",
        "Invoice number and date",
        "Due date and payment terms",
        "Itemised list of services or products with quantities and rates",
        "Subtotal, tax (if applicable), and total amount due",
        "Payment instructions (bank details, PayPal, etc.)",
        "Any notes or terms and conditions",
      ]},
      { type: "h2", text: "Word vs Excel vs Online invoice template — which is best?" },
      { type: "h3", text: "Microsoft Word invoice template" },
      { type: "p", text: "Word templates are easy to edit, but they don't auto-calculate totals. You'll need to type in the numbers manually, which means mistakes. Formatting can also shift unpredictably when you add more line items." },
      { type: "h3", text: "Excel invoice template" },
      { type: "p", text: "Excel is better for calculations, but formatting is notoriously tricky. Getting an Excel invoice to print neatly on a single A4 page without cutting off content is a common frustration." },
      { type: "h3", text: "Online invoice template (browser-based)" },
      { type: "p", text: "The best option for most people. You fill in your details, the tool calculates the totals, and you download a clean, professionally formatted PDF. No software required, works on any device, and your data never leaves your browser." },
      { type: "callout", text: CTA },
      { type: "h2", text: "How to use a free invoice template online" },
      { type: "ol", items: [
        "Open the invoice generator at pdfbillbuilder.com",
        "Choose your document type — Invoice, Receipt, or Quotation",
        "Enter your business name and contact details in the 'From' section",
        "Enter your client's details in the 'Bill To' section",
        "Set your invoice number, date, and due date",
        "Add your line items (description, quantity, rate — the total calculates automatically)",
        "Add tax if applicable (toggle between exclusive and inclusive)",
        "Add any payment details or notes",
        "Click 'Download PDF' — your invoice is ready",
      ]},
      { type: "h2", text: "Free invoice template for different professions" },
      { type: "p", text: "The same template works across industries — the key is filling in the right details for your profession:" },
      { type: "ul", items: [
        "Freelancers: include your hourly or project rate, payment terms, and late fee policy",
        "Contractors: list materials and labour separately for clarity",
        "Consultants: describe the scope of work clearly in the line item description",
        "Retailers: list each product with a unit price and quantity",
        "Service businesses: add your business registration number or VAT/GST number if required",
      ]},
      { type: "h2", text: "Common invoice template mistakes to avoid" },
      { type: "ul", items: [
        "Missing invoice number — every invoice needs a unique number for tracking",
        "No due date — 'due on receipt' is vague; use a specific date",
        "Wrong tax rate — double-check whether your rate should be VAT, GST, or sales tax",
        "No payment instructions — always include how you want to be paid",
        "Inconsistent formatting — use the same template every time for a professional image",
      ]},
      { type: "h2", text: "Do I need to sign a PDF invoice?" },
      { type: "p", text: "In most countries, a digital invoice does not need a physical signature to be legally valid. Adding a line like 'This is a computer-generated document and does not require a signature' is a common professional practice." },
    ],
    faq: [
      { q: "Is a free invoice template actually free?", a: "Yes — at PDF Bill Builder, the template is completely free. No subscription, no watermark, no account required. Just fill in your details and download." },
      { q: "Can I customise the free invoice template?", a: "Yes. You can upload your logo, choose a colour theme, set any currency, add tax, discount, and payment terms. Everything is customisable in the browser." },
      { q: "Can I save the invoice template for future use?", a: "The browser-based tool doesn't save data (for privacy reasons), but you can keep the PDF and reuse the same format. Just clear the fields and fill in new details for the next invoice." },
      { q: "What format is the invoice template downloaded in?", a: "It downloads as a PDF file — the best format for sending to clients, printing, and record-keeping." },
      { q: "Is a free invoice template legal?", a: "Yes. The format of your invoice doesn't determine its legality — the content does. As long as your invoice includes the required fields for your country (business name, amount, tax number if applicable), it is legally valid." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 18 — Construction invoice
  ══════════════════════════════════════════════ */
  "construction-invoice-template": {
    title: "Construction Invoice Template: Free Download + Guide (2026)",
    description: "A complete guide to construction invoices — what to include, how to list labour and materials, and a free template you can download as a PDF instantly.",
    date: "2026-06-04",
    updated: "2026-06-04",
    readMins: 7,
    keywords: ["construction invoice template", "construction invoice", "builder invoice template", "contractor invoice template", "labour and materials invoice"],
    excerpt: "Everything builders, contractors, and tradespeople need to invoice correctly — what to include, how to list labour and materials, and a free PDF template.",
    body: [
      { type: "p", text: "Construction invoicing has a few quirks that make generic invoice templates fall short. You often need to separate labour from materials, handle progress billing on long projects, and meet specific legal requirements depending on your country." },
      { type: "p", text: "This guide covers what every construction invoice should include, how to structure it, and how to download a professional template for free." },
      { type: "h2", text: "What is a construction invoice?" },
      { type: "p", text: "A construction invoice is a billing document sent by a builder, contractor, or tradesperson to a client requesting payment for completed work. It itemises labour hours, materials used, and any other project costs, then shows the total amount owed." },
      { type: "h2", text: "What should a construction invoice include?" },
      { type: "ul", items: [
        "Your business name, ABN/business number, and contact details",
        "Client name and project address",
        "Invoice number and invoice date",
        "A clear description of the work completed (e.g. 'Brick laying — north wall' not just 'Labour')",
        "Labour: hours worked × hourly rate",
        "Materials: itemised list with unit costs",
        "Subtotal, tax (GST/VAT/sales tax), and total due",
        "Payment terms and bank details",
        "Any retention amount held back (common on large commercial projects)",
      ]},
      { type: "h2", text: "How to list labour and materials on a construction invoice" },
      { type: "p", text: "The clearest approach is to use separate line items for labour and materials. This makes it easy for the client to understand what they're paying for and helps if there's ever a dispute." },
      { type: "h3", text: "Labour line items" },
      { type: "p", text: "List each type of work separately, especially if you charge different rates. For example: 'Bricklaying — 16 hrs @ $85/hr = $1,360' and 'Concreting — 8 hrs @ $75/hr = $600'." },
      { type: "h3", text: "Materials line items" },
      { type: "p", text: "List each material with quantity and unit cost. For example: 'Concrete mix — 20 bags @ $14.50 = $290' and 'Timber framing — 40 lm @ $8.20 = $328'." },
      { type: "callout", text: CTA },
      { type: "h2", text: "Progress invoicing vs final invoicing" },
      { type: "h3", text: "Progress invoicing (milestone billing)" },
      { type: "p", text: "On longer projects, it's standard to invoice at key milestones — for example, 30% at foundation completion, 40% at lock-up, and 30% at handover. Each progress invoice should clearly state the milestone, the total contract value, how much has been invoiced to date, and the amount currently due." },
      { type: "h3", text: "Final invoice" },
      { type: "p", text: "The final invoice covers all remaining work and any variations. It should deduct previous payments and show the exact balance owed." },
      { type: "h2", text: "Construction invoice requirements by country" },
      { type: "h3", text: "Australia" },
      { type: "p", text: "In Australia, any invoice over $82.50 (including GST) that is subject to GST must be a tax invoice. Include your ABN, the words 'Tax Invoice', the date, a description of the supply, and the GST amount either separately or as a statement that the price includes GST." },
      { type: "h3", text: "UK" },
      { type: "p", text: "If you are VAT registered, you must issue a VAT invoice for any VAT-registered customer. Include your VAT registration number, the VAT rate applied, and the VAT amount separately." },
      { type: "h3", text: "USA" },
      { type: "p", text: "Construction invoicing requirements vary by state for sales tax on materials. Labour is generally not subject to sales tax, but materials may be, depending on the state and contract type." },
      { type: "h2", text: "How to create a construction invoice for free" },
      { type: "ol", items: [
        "Go to pdfbillbuilder.com",
        "Select 'Invoice' as the document type",
        "Enter your business name, ABN/business number, and contact details",
        "Enter the client's name and site address",
        "Set the invoice number, date, and due date",
        "Add line items: list each labour and material item separately",
        "Apply tax (e.g. 10% GST in Australia, 20% VAT in the UK)",
        "Add your bank details in the payment section",
        "Download as PDF",
      ]},
      { type: "h2", text: "Tips for getting construction invoices paid on time" },
      { type: "ul", items: [
        "Invoice promptly — send the invoice the same day the milestone is reached",
        "Be specific — vague descriptions like 'Labour' lead to client questions and payment delays",
        "Add a due date — 'Payment due 14 days from invoice date' is much clearer than 'due on receipt'",
        "Include your payment details on the invoice — don't make clients email you to find out how to pay",
        "Follow up — a polite reminder 1–2 days after the due date recovers most late invoices",
      ]},
    ],
    faq: [
      { q: "Do I need a signed contract before I can invoice?", a: "You don't need a signed contract to issue an invoice, but a written agreement (even an email confirmation) protects you if there's a dispute about what was agreed." },
      { q: "Can I charge for variations on a construction invoice?", a: "Yes. List variations as separate line items with a clear description of what the variation covers and the agreed price. Keep written evidence (email or variation order) for each variation." },
      { q: "How do I invoice for a long construction project?", a: "Use progress invoicing at agreed milestones (foundation, frame, lock-up, completion). Each invoice should show the total contract value, previous payments, and the current amount due." },
      { q: "What is a retention amount on a construction invoice?", a: "Retention is a percentage (typically 5–10%) of each progress payment that the client holds back until the project is complete and any defects are fixed. Your invoice should show the gross amount, the retention withheld, and the net amount payable now." },
      { q: "Is labour GST-free in Australia?", a: "No. Both labour and materials are generally subject to 10% GST in Australia if you are GST-registered. List them separately on your tax invoice but apply 10% GST to the combined total." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 19 — How to create an invoice in Excel
  ══════════════════════════════════════════════ */
  "invoice-in-excel": {
    title: "How to Create an Invoice in Excel (2026) — Free Template & Guide",
    description: "Step-by-step guide to creating an invoice in Excel, including formulas for auto-calculating totals and tax. Plus a faster, free alternative that takes 60 seconds.",
    date: "2026-06-04",
    updated: "2026-06-04",
    readMins: 6,
    keywords: ["how to create an invoice in excel", "excel invoice template", "invoice template excel", "make invoice in excel", "excel invoice formula"],
    excerpt: "How to build an invoice in Excel with auto-calculating totals — including the exact formulas — plus a faster browser-based alternative that takes 60 seconds.",
    body: [
      { type: "p", text: "Excel is a popular choice for invoicing because most people already have it. With the right setup, you can create a reusable invoice template with automatic calculations. This guide walks you through exactly how to do it." },
      { type: "h2", text: "Step-by-step: Create an invoice in Excel" },
      { type: "h3", text: "Step 1: Set up your header" },
      { type: "p", text: "Open a new Excel worksheet. In the top section, add your business name, address, phone, and email. Reserve a cell for your logo (Insert → Pictures). On the right side, add fields for Invoice Number, Invoice Date, and Due Date." },
      { type: "h3", text: "Step 2: Add a 'Bill To' section" },
      { type: "p", text: "Below the header, create a 'Bill To' section with fields for your client's name, company, address, and email." },
      { type: "h3", text: "Step 3: Build the line items table" },
      { type: "p", text: "Create a table with these columns: Description, Quantity, Unit Price, Amount. Format the Amount column to multiply Quantity × Unit Price automatically." },
      { type: "ul", items: [
        "Select your first Amount cell (e.g. D10)",
        "Enter the formula: =B10*C10",
        "Copy this formula down for as many rows as you need",
      ]},
      { type: "h3", text: "Step 4: Add subtotal, tax, and total formulas" },
      { type: "p", text: "Below the items table, add these calculations:" },
      { type: "ul", items: [
        "Subtotal: =SUM(D10:D25) — adjust the range to match your rows",
        "Tax (e.g. 10% GST): =Subtotal_Cell*0.10",
        "Total: =Subtotal_Cell+Tax_Cell",
      ]},
      { type: "h3", text: "Step 5: Add payment details and notes" },
      { type: "p", text: "Below the totals, add a section for payment instructions (bank name, account number, BSB/routing number, PayPal, etc.) and any notes or payment terms." },
      { type: "h3", text: "Step 6: Format and save as a template" },
      { type: "p", text: "Apply your colour scheme, adjust column widths, and set the print area to fit one A4 page (Page Layout → Print Area → Set Print Area). Save as an Excel Template (.xltx) so each new invoice starts from a clean copy." },
      { type: "h2", text: "Excel invoice limitations" },
      { type: "p", text: "Excel works, but it has real drawbacks for invoicing:" },
      { type: "ul", items: [
        "Formatting breaks easily when you add or remove rows",
        "Getting it to print neatly on exactly one A4 page requires careful margin and scaling setup",
        "No mobile support — editing on a phone is difficult",
        "Easy to accidentally overwrite a formula and get wrong totals",
        "You need Excel installed (it's not free for everyone)",
      ]},
      { type: "h2", text: "A faster alternative: browser-based invoice generator" },
      { type: "p", text: "If you want a professional PDF invoice without the Excel setup, a browser-based invoice generator takes less than 60 seconds:" },
      { type: "callout", text: CTA },
      { type: "ol", items: [
        "Go to pdfbillbuilder.com",
        "Fill in your details — the totals calculate automatically",
        "Click Download PDF",
        "Done — a clean, professional invoice ready to send",
      ]},
      { type: "p", text: "It works on any device, never misaligns, always fits one A4 page, and requires no software at all." },
      { type: "h2", text: "When to use Excel vs an online invoice generator" },
      { type: "ul", items: [
        "Use Excel if: you need complex custom calculations, you already have an elaborate spreadsheet workflow, or you need to integrate invoicing with other financial models",
        "Use an online generator if: you just need clean, professional PDF invoices quickly with no setup time",
      ]},
    ],
    faq: [
      { q: "Can I use Excel Online (free) to create invoices?", a: "Yes. Excel Online is free with a Microsoft account and supports basic invoice templates. The functionality is similar to the desktop version, though some advanced formatting options are limited." },
      { q: "Is there a free Excel invoice template I can download?", a: "Yes — Microsoft Office has free invoice templates at templates.office.com. Alternatively, you can build your own following the steps above, or use an online invoice generator for a faster result." },
      { q: "How do I stop Excel totals from breaking when I add rows?", a: "Use a named table (Insert → Table) for your line items. Table formulas automatically expand when you add new rows, so your SUM formula always includes all items." },
      { q: "Can I send an Excel invoice directly to a client?", a: "You can, but it's not recommended. Clients can accidentally edit the numbers. Always save as PDF (File → Save As → PDF) before sending." },
      { q: "What's the formula for VAT in an Excel invoice?", a: "=Subtotal_Cell*0.20 for 20% UK VAT. Replace 0.20 with your applicable rate (e.g. 0.10 for 10% Australian GST, 0.18 for 18% Indian GST)." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 20 — Invoice payment terms USA (high CPC)
  ══════════════════════════════════════════════ */
  "invoice-payment-terms-usa": {
    title: "Invoice Payment Terms in the USA: Complete Guide (2026)",
    description: "Everything US freelancers and small businesses need to know about invoice payment terms — Net 30, due on receipt, late fees, and what's legally enforceable.",
    date: "2026-06-05",
    updated: "2026-06-05",
    readMins: 6,
    keywords: ["invoice payment terms usa", "net 30 invoice", "invoice due date usa", "late fee invoice usa", "payment terms freelancer usa"],
    excerpt: "Net 30, Net 15, due on receipt — what US invoice payment terms mean, which ones get you paid fastest, and how to enforce late fees legally.",
    body: [
      { type: "p", text: "Choosing the right payment terms on your invoice is one of the easiest ways to get paid faster. In the United States, freelancers and small businesses have wide flexibility in setting their own terms — but some choices consistently outperform others." },
      { type: "h2", text: "Most common US invoice payment terms" },
      { type: "ul", items: [
        "Net 30 — Payment due within 30 calendar days of the invoice date. The most widely used term in B2B invoicing.",
        "Net 15 — Payment due within 15 days. Faster than Net 30 and increasingly common for freelancers.",
        "Net 7 — Payment due within 7 days. Common for small jobs or clients with fast payment systems.",
        "Due on receipt — Payment expected immediately upon receiving the invoice. Best for retail or one-time clients.",
        "2/10 Net 30 — 2% discount if paid within 10 days; full amount due within 30. Encourages faster payment.",
      ]},
      { type: "h2", text: "What payment terms actually get you paid fastest?" },
      { type: "p", text: "Data from invoice management platforms consistently shows that shorter terms = faster payment. Net 15 invoices are paid on average 8 days faster than Net 30. 'Due on receipt' invoices are paid within 14 days on average, faster than Net 30 but not always faster than Net 15." },
      { type: "p", text: "The most important factor is being specific. 'Payment due within 30 days' is clearer than 'Net 30' for clients unfamiliar with invoicing terminology." },
      { type: "h2", text: "Late payment fees — are they legal in the USA?" },
      { type: "p", text: "Yes. In all 50 US states, you can charge a late payment fee as long as it was communicated before the work began. Best practice: include late fee terms in your contract or on the invoice itself." },
      { type: "ul", items: [
        "Standard late fee: 1.5% per month (18% annually) — this is widely used and rarely contested",
        "Flat fee option: $25–50 flat fee for invoices under $1,000",
        "The fee must be stated on the invoice or in your contract to be enforceable",
        "Some states cap late fees — check your state's commercial law if you're charging above 1.5%/month",
      ]},
      { type: "callout", text: CTA },
      { type: "h2", text: "Invoice payment terms for different business types" },
      { type: "h3", text: "Freelancers (designers, writers, developers)" },
      { type: "p", text: "Net 15 or Net 7 are standard. For new clients, always require a 30–50% deposit before starting work. Add '1.5% per month late fee after due date' to every invoice." },
      { type: "h3", text: "Small businesses and contractors" },
      { type: "p", text: "Net 30 is the industry standard for B2B work. For large projects, use milestone invoicing — invoice at project start, midpoint, and completion. This protects your cash flow on jobs that run for weeks or months." },
      { type: "h3", text: "Retail and service businesses" },
      { type: "p", text: "Due on receipt is standard. Most point-of-sale transactions are immediate. For ongoing service clients (landscaping, cleaning, IT support), Net 15 is common." },
      { type: "h2", text: "How to collect on a late US invoice" },
      { type: "ol", items: [
        "Send a friendly reminder the day the invoice is due",
        "Send a firmer reminder 7 days after the due date, referencing the invoice number",
        "At 30 days overdue: send a formal demand letter via email and certified mail",
        "At 60 days overdue: consider a collections agency (typically takes 25–50% of collected amount) or small claims court",
        "Small claims court limits vary by state: $2,500–$25,000",
      ]},
    ],
    faq: [
      { q: "Is Net 30 or Net 15 better for freelancers in the USA?", a: "Net 15 is generally better — it results in faster payment and clients rarely push back. Reserve Net 30 for large corporate clients who require it by company policy." },
      { q: "Can I charge late fees without putting them on the original invoice?", a: "In most US states, late fees need to have been disclosed before the work began — either in your contract or on your invoice. Adding them after the fact without prior notice is difficult to enforce." },
      { q: "What's the standard invoice due date for freelancers in the US?", a: "Net 15 to Net 30 is standard. New freelancers often default to Net 30, but Net 15 is increasingly the norm and results in measurably faster payment." },
      { q: "Do I need to charge sales tax on US freelance invoices?", a: "Services are generally not subject to sales tax in most US states, though some states do tax certain digital and professional services. Physical products are almost always taxable. Check your state's Department of Revenue for specifics." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 21 — Canadian invoice requirements (high CPC CA)
  ══════════════════════════════════════════════ */
  "invoice-requirements-canada": {
    title: "Invoice Requirements in Canada: GST/HST Guide for Freelancers (2026)",
    description: "What every Canadian freelancer and small business must include on an invoice — GST/HST numbers, CRA requirements, and a free invoice template.",
    date: "2026-06-05",
    updated: "2026-06-05",
    readMins: 6,
    keywords: ["invoice requirements canada", "canada invoice gst hst", "freelancer invoice canada", "cra invoice requirements", "hst invoice ontario"],
    excerpt: "What Canadian freelancers must include on invoices — GST/HST registration, CRA requirements, and what happens if you don't charge GST.",
    body: [
      { type: "p", text: "Canadian invoicing has a few specifics that confuse new freelancers and small business owners — particularly around GST/HST. This guide covers everything you need to know to invoice correctly and stay on the right side of the CRA." },
      { type: "h2", text: "What must a Canadian invoice include?" },
      { type: "ul", items: [
        "Your full legal name (or business name) and contact information",
        "Client's name and address",
        "Invoice number (must be unique and sequential)",
        "Invoice date and payment due date",
        "Description of the goods or services provided",
        "Amount charged for each item",
        "Total amount before and after tax",
        "GST/HST registration number (if you are registered)",
        "The amount of GST/HST charged (if applicable)",
      ]},
      { type: "h2", text: "When do you need to charge GST/HST in Canada?" },
      { type: "p", text: "You must register for GST/HST when your worldwide taxable supplies exceed $30,000 in any four consecutive calendar quarters. Once you cross this threshold, you have 29 days to register with the CRA." },
      { type: "p", text: "If you earn less than $30,000 annually, you are a 'small supplier' and do not have to charge GST/HST. However, you can voluntarily register, which allows you to claim input tax credits on your business expenses." },
      { type: "h2", text: "GST vs HST — what's the difference?" },
      { type: "p", text: "Canada has a harmonized tax system. The rate you charge depends on where your client is located:" },
      { type: "ul", items: [
        "Ontario, New Brunswick, Newfoundland, Nova Scotia, PEI: 13–15% HST",
        "Alberta, Northwest Territories, Nunavut, Yukon: 5% GST only",
        "British Columbia, Manitoba, Saskatchewan, Quebec: 5% GST + provincial tax",
        "Quebec uses QST (9.975%) instead of the provincial part of HST",
      ]},
      { type: "callout", text: CTA },
      { type: "h2", text: "What happens if you forget to charge GST/HST?" },
      { type: "p", text: "If you are registered but forget to charge GST/HST on an invoice, you are still liable to remit it to the CRA. You cannot go back and add it to a previously issued invoice without client agreement. The safest approach: always include GST/HST on every invoice to registered clients." },
      { type: "h2", text: "Canadian invoice payment terms" },
      { type: "p", text: "There are no legal requirements for specific payment terms in Canada. The most common terms for freelancers and small businesses are Net 15 or Net 30. You can charge interest on overdue invoices if your contract states this — the Prompt Payment for Construction Contracts Act in some provinces sets specific rules for construction contractors." },
    ],
    faq: [
      { q: "Do I need a GST/HST number to invoice in Canada?", a: "Only if your annual revenue exceeds $30,000. Below that, you are a small supplier and don't need to charge or remit GST/HST, though you can register voluntarily." },
      { q: "What is the penalty for not charging GST/HST in Canada?", a: "If you are registered and fail to collect GST/HST, you must still remit the tax to the CRA. Penalties for late filing or remittance start at 1% per month plus interest. Voluntary disclosure can reduce penalties if you come forward before the CRA contacts you." },
      { q: "Can I invoice in US dollars as a Canadian freelancer?", a: "Yes. Many Canadian freelancers invoice international clients in USD. For tax purposes, you must convert the USD amount to CAD using the Bank of Canada exchange rate on the date of the transaction." },
      { q: "Do I charge GST/HST to US clients?", a: "Generally no. Exports of services to non-resident clients who are not in Canada are zero-rated for GST/HST purposes — meaning you charge 0% GST/HST. Always confirm with a tax professional for your specific situation." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 22 — UK invoice requirements (high CPC)
  ══════════════════════════════════════════════ */
  "uk-invoice-requirements": {
    title: "UK Invoice Requirements: What Must Be on a British Invoice (2026)",
    description: "The legal requirements for UK invoices — what HMRC says must be included, when to charge VAT, and the difference between a VAT invoice and a non-VAT invoice.",
    date: "2026-06-05",
    updated: "2026-06-05",
    readMins: 5,
    keywords: ["uk invoice requirements", "hmrc invoice requirements", "vat invoice uk", "what must be on an invoice uk", "uk freelance invoice"],
    excerpt: "What HMRC requires on UK invoices — VAT numbers, required fields, and the difference between VAT and non-VAT invoices for UK freelancers.",
    body: [
      { type: "p", text: "UK invoicing is governed by HMRC rules. Whether you're a sole trader, freelancer, or limited company, your invoices must meet certain minimum requirements. Here's exactly what needs to be on a UK invoice in 2026." },
      { type: "h2", text: "Mandatory fields on a UK invoice" },
      { type: "p", text: "According to HMRC, every UK invoice must include:" },
      { type: "ul", items: [
        "A unique invoice number (sequential, no repeats)",
        "Your business name and address",
        "The client's name and address",
        "Invoice date",
        "Description of the goods or services supplied",
        "Amount charged for each item",
        "Total amount due",
      ]},
      { type: "h2", text: "Additional requirements if you are VAT-registered" },
      { type: "p", text: "If you are VAT-registered (annual taxable turnover above £90,000), your VAT invoice must also include:" },
      { type: "ul", items: [
        "Your VAT registration number",
        "The VAT rate applied to each item",
        "The VAT amount payable",
        "The total excluding VAT and the total including VAT",
        "The tax point (usually the invoice date, unless goods were delivered on a different date)",
      ]},
      { type: "h2", text: "Do UK freelancers need to charge VAT?" },
      { type: "p", text: "Only if your VAT-taxable turnover exceeds £90,000 in the previous 12 months. Below this threshold, you are not required to register for VAT, though you can do so voluntarily. If you are not VAT-registered, you do not charge VAT and you do not include a VAT number on your invoice." },
      { type: "callout", text: CTA },
      { type: "h2", text: "Simplified vs full VAT invoice" },
      { type: "p", text: "UK VAT invoices come in two forms:" },
      { type: "ul", items: [
        "Full VAT invoice: required for sales over £250 and for all B2B sales where the customer needs to reclaim VAT",
        "Simplified VAT invoice: can be used for retail sales under £250; doesn't need to show the customer's name and address",
      ]},
      { type: "h2", text: "UK invoice payment terms" },
      { type: "p", text: "UK law (Late Payment of Commercial Debts Act 1998) gives you the right to charge statutory interest on overdue invoices at 8% above the Bank of England base rate, plus a fixed debt recovery cost of £40–100 depending on the invoice amount. You can also set your own payment terms — Net 30 is the most common for B2B, Net 14 for freelancers." },
    ],
    faq: [
      { q: "How long must UK invoices be kept for tax purposes?", a: "HMRC requires you to keep invoices for at least 6 years (5 years for sole traders after the 31 January tax return deadline for that year). Digital copies are acceptable." },
      { q: "Can I invoice in euros as a UK freelancer?", a: "Yes. You can invoice in any currency. For UK tax purposes, you'll need to convert to GBP using the exchange rate on the invoice date." },
      { q: "What is the VAT threshold in the UK in 2026?", a: "The VAT registration threshold for 2026/27 is £90,000 of taxable turnover in any rolling 12-month period. Check HMRC's website for the latest threshold as it can change with the Budget." },
      { q: "Do I need to include my UTR number on a UK invoice?", a: "No — your UTR (Unique Taxpayer Reference) is for HMRC records and self-assessment returns, not for invoices. Your VAT number (if registered) goes on invoices, not your UTR." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 23 — Australia invoice guide (high CPC AUS)
  ══════════════════════════════════════════════ */
  "australia-tax-invoice-guide": {
    title: "Tax Invoice Requirements in Australia: ABN, GST & ATO Rules (2026)",
    description: "What the ATO requires on Australian tax invoices — ABN, GST rules for sole traders, and when you must issue a tax invoice vs a regular invoice.",
    date: "2026-06-05",
    updated: "2026-06-05",
    readMins: 6,
    keywords: ["australia tax invoice requirements", "abn invoice australia", "gst invoice australia", "ato invoice requirements", "sole trader invoice australia"],
    excerpt: "ATO requirements for Australian tax invoices — ABN, GST registration thresholds, and exactly what must appear on a compliant Australian invoice.",
    body: [
      { type: "p", text: "In Australia, the ATO (Australian Taxation Office) sets clear rules about what must appear on invoices. Whether you're a sole trader, contractor, or small business, getting your invoices right keeps you compliant and protects you if the ATO ever audits your records." },
      { type: "h2", text: "Do you need an ABN to invoice in Australia?" },
      { type: "p", text: "Yes — if you are carrying on an enterprise in Australia, you must have an Australian Business Number (ABN). Without an ABN on your invoice, the paying business is required by law to withhold 47% of the payment (the top marginal tax rate) under the no-ABN withholding rules." },
      { type: "p", text: "Registering for an ABN is free and takes about 15 minutes at abr.business.gov.au. You need a Tax File Number (TFN) to apply." },
      { type: "h2", text: "Tax invoice vs regular invoice in Australia" },
      { type: "p", text: "The ATO distinguishes between a 'tax invoice' and a regular invoice:" },
      { type: "ul", items: [
        "Tax invoice: issued by a GST-registered business for sales over $82.50 (including GST). The buyer needs a tax invoice to claim the GST credit.",
        "Regular invoice: issued by businesses not registered for GST, or for sales under $82.50 where no GST credit claim is needed.",
      ]},
      { type: "h2", text: "What must an Australian tax invoice include?" },
      { type: "ul", items: [
        "The words 'Tax Invoice' prominently displayed",
        "Your business name (or trading name)",
        "Your ABN",
        "The date of issue",
        "A brief description of the goods or services",
        "The GST amount payable (or a statement that the price includes GST)",
        "The total price including GST",
        "For invoices over $1,000: the buyer's identity (name and ABN)",
      ]},
      { type: "callout", text: CTA },
      { type: "h2", text: "GST registration threshold in Australia" },
      { type: "p", text: "You must register for GST if your GST turnover (gross income) is $75,000 or more per year (or $150,000 for non-profit organisations). Once registered, you must:" },
      { type: "ul", items: [
        "Charge 10% GST on all taxable sales",
        "Lodge Business Activity Statements (BAS) quarterly or monthly",
        "Remit the GST collected to the ATO",
        "Claim GST credits on your business purchases",
      ]},
      { type: "h2", text: "Australian invoice payment terms" },
      { type: "p", text: "There are no specific laws governing payment terms for most Australian businesses, though the Australian government is progressively rolling out prompt payment policies for government contractors. The most common terms are: Net 7 for small jobs, Net 14 for services, Net 30 for larger B2B work." },
      { type: "p", text: "Under the PPSA (Personal Property Securities Act), you can retain ownership of goods until payment is received by including retention of title clauses. For construction, the Security of Payment Act in each state gives contractors the right to claim rapid adjudication for unpaid invoices." },
    ],
    faq: [
      { q: "Can I invoice without an ABN in Australia?", a: "Technically yes, but the paying business must withhold 47% of the payment under ATO rules. As a sole trader or small business, you should always include your ABN on every invoice." },
      { q: "What GST rate applies in Australia?", a: "10% on most goods and services. Some items are GST-free (basic food, medical services, exports) or input-taxed (residential rent, financial services)." },
      { q: "How long do I need to keep invoices in Australia?", a: "The ATO requires you to keep all tax records, including invoices, for 5 years from the date you lodge the relevant tax return." },
      { q: "Do I charge GST to overseas clients?", a: "Generally no. Most exports of goods and cross-border services to non-Australian clients are GST-free (zero-rated). However, digital services supplied to Australian consumers may be subject to GST — check the ATO website for your specific situation." },
    ],
  },
};

export const POST_SLUGS = Object.keys(POSTS);

export const POST_LIST = POST_SLUGS.map((slug) => ({
  slug,
  title: POSTS[slug].title,
  excerpt: POSTS[slug].excerpt,
  date: POSTS[slug].date,
  readMins: POSTS[slug].readMins,
}));
