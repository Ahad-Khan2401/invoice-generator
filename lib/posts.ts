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
};

export const POST_SLUGS = Object.keys(POSTS);

export const POST_LIST = POST_SLUGS.map((slug) => ({
  slug,
  title: POSTS[slug].title,
  excerpt: POSTS[slug].excerpt,
  date: POSTS[slug].date,
  readMins: POSTS[slug].readMins,
}));
