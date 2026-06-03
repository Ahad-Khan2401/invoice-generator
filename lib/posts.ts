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
};

export const POST_SLUGS = Object.keys(POSTS);

export const POST_LIST = POST_SLUGS.map((slug) => ({
  slug,
  title: POSTS[slug].title,
  excerpt: POSTS[slug].excerpt,
  date: POSTS[slug].date,
  readMins: POSTS[slug].readMins,
}));
