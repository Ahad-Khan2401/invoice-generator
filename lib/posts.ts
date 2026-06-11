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
      "How to make a professional invoice, step by step: the fields that matter, a worked example with real numbers, and the mistakes that delay payment.",
    date: "2026-01-12",
    updated: "2026-06-11",
    readMins: 5,
    keywords: ["how to make an invoice", "create an invoice", "invoice step by step", "free invoice generator"],
    excerpt:
      "A no-jargon walkthrough of your first invoice: six steps, a worked example with real numbers, and the small mistakes that quietly delay payment.",
    body: [
      { type: "p", text: "Your first client just said “great — send me an invoice”, and you opened a blank document with no idea what goes on it. Everyone starts there. The reassuring truth is that an invoice is a short, predictable document with about ten fields, and once you've built one you can rebuild it in two minutes forever. This guide walks through each field, shows a worked example with real numbers, and covers the mistakes that quietly delay first payments." },
      { type: "callout", text: "In a hurry? <a href=\"/\">Open the free generator</a> and fill it in as you read. You'll have a finished PDF before you reach the FAQ section." },
      { type: "h2", text: "Gather five things before you start" },
      { type: "p", text: "An invoice takes two minutes to make when the details are in front of you, and twenty when you keep stopping to hunt for them. Have these ready:" },
      { type: "ul", items: [
        "<strong>Your details:</strong> business name (or just your name), address, email, and a logo if you have one.",
        "<strong>The client's billing details:</strong> the legal company name and address. Ask who the invoice should be addressed to; larger companies often reject invoices made out to the wrong entity or person.",
        "<strong>What you delivered:</strong> descriptions, quantities, and hours.",
        "<strong>Your prices:</strong> rates, any agreed discount, and your tax rate if you're registered for VAT, GST, or sales tax.",
        "<strong>Payment info:</strong> your bank account, PayPal, or UPI details, and how long the client has to pay.",
      ] },
      { type: "h2", text: "How to make an invoice in 6 steps" },
      { type: "ol", items: [
        "<strong>Title and number it.</strong> Write “Invoice” at the top and assign a unique sequential number such as INV-001. This isn't decoration: accounting systems file invoices by number, and tax offices expect an unbroken sequence.",
        "<strong>Add both addresses.</strong> Your details go at the top; the client's go under a “Bill To” heading. Use the billing contact's name, not just the company.",
        "<strong>Add two dates.</strong> The issue date and the due date. Write a real calendar date such as “Due 25 June 2026” rather than only “Net 14” — a date nobody has to calculate is a date nobody can misread.",
        "<strong>List line items.</strong> One line per deliverable: description, quantity or hours, rate, and line total. Specific descriptions get paid faster because there's nothing to query.",
        "<strong>Do the maths visibly.</strong> Show a subtotal, then tax on its own line with the rate stated (e.g. “VAT 20%: £58.00”), then a bold grand total. Bookkeepers need that breakdown to process the payment.",
        "<strong>Add payment details and export to PDF.</strong> Put your bank or PayPal details directly on the invoice with a short note: “Thank you! Payment due within 14 days.” Then send the PDF, never an editable file.",
      ] },
      { type: "h2", text: "A worked example" },
      { type: "p", text: "Here's the body of a realistic first invoice from a freelance designer:" },
      { type: "ul", items: [
        "Logo design, 3 concepts + 2 revision rounds: 1 × $450 = $450.00",
        "Business card layout: 2 hrs × $45 = $90.00",
        "Stock photo licences: 3 × $12 = $36.00",
        "Subtotal $576.00 · Tax (not registered) $0.00 · <strong>Total due $576.00</strong>",
      ] },
      { type: "p", text: "Every line answers the client's first question, “what exactly am I paying for?”, before they can ask it. If this invoice had a single line reading “Design services: $576”, the likely result is a can-you-break-this-down email and a week's delay. Itemising is not bureaucracy — it's speed." },
      { type: "h2", text: "Mistakes that delay first payments" },
      { type: "ul", items: [
        "<strong>No invoice number.</strong> Many accounts systems have a mandatory field for it; an unnumbered invoice can sit in a queue indefinitely.",
        "<strong>Missing payment details.</strong> If the client has to email you for your bank details, you've added days to the clock.",
        "<strong>Sent to the wrong person.</strong> Your day-to-day contact often isn't the one who pays. Ask for the accounts email and CC your contact.",
        "<strong>No due date.</strong> An invoice without a deadline reads as a suggestion, and suggestions get deprioritised.",
        "<strong>An editable attachment.</strong> Word and Excel files look unfinished and can be altered. Send PDF.",
      ] },
      { type: "h2", text: "Is there a legal format?" },
      { type: "p", text: "There's no single worldwide template, but most tax authorities publish a minimum list of contents, and the lists are remarkably similar: seller, buyer, date, number, description, amounts, tax. The UK government keeps a clear summary of <a href=\"https://www.gov.uk/invoicing-and-taking-payment-from-customers\">what invoices must include</a>, and the IRS <a href=\"https://www.irs.gov/businesses/small-businesses-self-employed\">Small Business and Self-Employed center</a> explains the records US businesses should keep. If you're VAT or GST registered, extra fields apply, so check your local rules." },
      { type: "h2", text: "After you hit send" },
      { type: "p", text: "Send the invoice the same day the work is done, with the invoice number in the subject line. Then track it: a simple spreadsheet with number, client, amount, due date, and date paid is enough at the start. The day after the due date passes, send a short, friendly reminder quoting the number. Most late payments are forgetfulness rather than refusal, and a one-line nudge resolves them." },
      { type: "p", text: "Billing regularly in a specific trade? The layouts differ a little, so try the dedicated generators for <a href=\"/freelancer-invoice\">freelancers</a>, <a href=\"/contractor-invoice\">contractors</a>, and <a href=\"/small-business-invoice\">small businesses</a>." },
      { type: "callout", text: "When you're ready, <a href=\"/\">build your invoice with PDF Bill Builder</a>: it numbers it, does the maths, and exports the PDF free, with no account needed." },
    ],
    faq: [
      { q: "How do I make an invoice for free?", a: "Use a browser-based generator such as PDF Bill Builder: enter your details and line items, add tax if it applies, and download the PDF without signing up. You can also build the same layout in any word processor and export it to PDF; it just takes longer and you do the maths yourself." },
      { q: "What should every invoice include?", a: "Eight things: the word “Invoice”, a unique number, your details, the client's details, issue and due dates, itemised lines with amounts, any tax shown separately, and the total with payment instructions. Miss one and you invite questions; miss the number or the total and many accounts systems can't process it at all." },
      { q: "Do I need accounting software to make an invoice?", a: "Not for the invoice itself. Software earns its keep once you have many clients and need automatic reminders and bookkeeping, but a free generator covers creating and sending professional invoices indefinitely." },
      { q: "Should I send the invoice as a PDF or a Word document?", a: "PDF, every time. It can't be accidentally edited, renders identically on every device, and looks finished. Editable formats occasionally get tampered with and frequently get mangled by other people's fonts." },
    ],
  },

  /* 2 ───────────────────────────────────────── */
  "how-to-invoice-a-client-as-a-freelancer": {
    title: "How to Invoice a Client as a Freelancer",
    description:
      "How to invoice a client as a freelancer: agree terms first, itemise hourly vs fixed work, time it right, and chase late payments without burning bridges.",
    date: "2026-02-03",
    updated: "2026-06-11",
    readMins: 6,
    keywords: ["how to invoice a client", "freelance invoice", "freelancer invoicing", "invoice for freelancers"],
    excerpt:
      "A freelancer's invoicing system that actually gets used: terms before work, hourly vs fixed line items, milestone billing, and a follow-up schedule for late payers.",
    body: [
      { type: "p", text: "The costliest invoicing mistake freelancers make happens before any invoice exists: starting work without agreeing, in writing, what it costs and when it gets paid. Fix that and the invoice itself becomes paperwork. Skip it and even a perfect invoice is just an opening offer. Here's the full system, from the kickoff email to the polite-but-firm late reminder." },
      { type: "h2", text: "Settle four things before the work starts" },
      { type: "ul", items: [
        "<strong>The price:</strong> your hourly rate or a fixed project fee, in writing (an email thread counts).",
        "<strong>The payment terms:</strong> how long the client has to pay after you invoice. Net 7 or Net 14 is reasonable for freelance work; agree it now, not on the invoice.",
        "<strong>A deposit for new clients or big projects:</strong> 30–50% upfront is standard, and it filters out the clients who were never going to pay promptly.",
        "<strong>Where the invoice goes:</strong> ask for the accounts email address. At companies of any size, your project contact usually isn't the person who pays.",
      ] },
      { type: "h2", text: "What goes on the invoice" },
      { type: "p", text: "A freelance invoice has nothing exotic on it. You need:" },
      { type: "ul", items: [
        "Your name or business name, address, and email",
        "The client's company name and billing address",
        "A unique invoice number (INV-014, not “invoice final v2”) and the issue date",
        "One line per deliverable, with hours or quantity and your rate",
        "Tax, only if you're registered for VAT/GST/sales tax, shown as its own line",
        "The total due, the due date as a calendar date, and your payment details",
      ] },
      { type: "callout", text: "The <a href=\"/freelancer-invoice\">free freelancer invoice generator</a> has all of these fields laid out already; fill them in and download the PDF." },
      { type: "h2", text: "Hourly vs fixed-price: present the work differently" },
      { type: "p", text: "For hourly billing, the breakdown is the invoice. A line like “API integration: 9 hrs × $70 = $630” answers every question before it's asked, and a client who can see the hours rarely disputes the total. The <a href=\"/hourly-invoice\">hourly invoice generator</a> formats this automatically. Keep it to a few grouped lines rather than a fifty-row time log; “Bug fixes and code review: 6.5 hrs × $70 = $455” is detailed enough." },
      { type: "p", text: "Fixed-price work is the opposite: one clean line with the agreed fee, e.g. “Brand identity package, per proposal dated 3 May: $2,400”. Itemising your hours on a fixed-price job invites the client to re-litigate the price. Reference the proposal instead." },
      { type: "h2", text: "When to invoice" },
      { type: "ol", items: [
        "<strong>One-off projects:</strong> invoice the day you deliver, while the work is fresh and the client is happy. Every day you wait is a day added to the payment clock.",
        "<strong>Ongoing or retainer work:</strong> pick a fixed day (the 1st, or the last working day of the month) and never move it. Predictable invoices get slotted into payment runs.",
        "<strong>Large projects:</strong> split it. A common pattern is 40% to start, 30% at an agreed midpoint, and 30% on delivery, so you're never more than a third exposed.",
      ] },
      { type: "h2", text: "A worked example" },
      { type: "p", text: "Say you built a small marketing site in May. The invoice body might read: “Design and build, 5-page marketing site: $1,800. Copy edits beyond two included rounds: 3 hrs × $60 = $180. CMS training call: 1 hr × $60 = $60. Total due: $2,040, payable within 14 days (due 14 June) by bank transfer.” Specific, dated, and arithmetic the client can check in their head." },
      { type: "h2", text: "When the payment is late" },
      { type: "p", text: "Don't take it personally and don't go quiet. The day after the due date, send a one-liner: “Hi Sam, a quick nudge that invoice INV-014 for $2,040 was due yesterday. Could you check where it is in your process?” A week later, go firmer: restate the amount, reattach the invoice, and ask for a payment date. After that, the options escalate — pause ongoing work, apply the late fee your terms allow, and for serious amounts consider small claims court, which in most places is designed to be used without a lawyer. Freelancers who follow up on a schedule get paid; the awkwardness you're avoiding is exactly what a slow payer is counting on." },
      { type: "h2", text: "A quick word on tax" },
      { type: "p", text: "Invoice totals are your declared income, so keep a copy of every invoice you issue. If you freelance in the US, the IRS <a href=\"https://www.irs.gov/businesses/small-businesses-self-employed\">Self-Employed centre</a> covers which records to keep and when estimated taxes apply; other countries have equivalents. And only add VAT or GST to an invoice if you're actually registered — charging a tax you don't collect is illegal nearly everywhere." },
      { type: "callout", text: "Invoice your next client in about two minutes with the <a href=\"/\">free invoice generator</a>: no signup, no watermark, just a clean PDF." },
    ],
    faq: [
      { q: "How do freelancers invoice clients?", a: "Agree the rate and payment terms before starting, then send a PDF invoice on delivery: your details, the client's, a unique number, itemised lines with rates, any tax, and a calendar due date. Email it to the client's accounts address with the invoice number in the subject line." },
      { q: "Should a freelancer charge tax on an invoice?", a: "Only if you're registered for sales tax, VAT, or GST where you operate. If you are, show it as a separate line with the rate visible; if you're not, leave tax lines off entirely rather than charging something you can't collect." },
      { q: "How big a deposit should a freelancer ask for?", a: "For new clients, 30–50% before work starts is normal and rarely questioned. On long projects, switch to milestone billing (for example 40/30/30) so no single unpaid chunk can sink your month." },
      { q: "What do I do when a client just doesn't pay?", a: "Escalate on a schedule: a friendly nudge the day after the due date, a firm reminder a week later, then pause any ongoing work and apply the late fee your terms allow. For amounts worth the effort, a formal demand letter followed by small claims court recovers more often than people expect." },
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
      "Net 30, due on receipt, 2/10 Net 30: what invoice payment terms mean, how clients actually process them, and which terms genuinely get you paid sooner.",
    date: "2026-03-25",
    updated: "2026-06-11",
    readMins: 5,
    keywords: ["invoice payment terms", "net 30", "due on receipt", "payment terms meaning"],
    excerpt:
      "Payment terms in plain English, plus the part most guides skip: how payment runs work inside companies, what Net 30 really costs you, and when late fees stick.",
    body: [
      { type: "p", text: "Quick question: if you send an invoice dated 1 June with “Net 30” at the bottom, when does the money arrive? On paper, 1 July. In real life, somewhere between 28 June and mid-July, because most companies pay in batches and your due date lands wherever their next payment run falls. Payment terms set expectations; understanding how clients actually process them is what gets you paid on time." },
      { type: "h2", text: "The common terms, translated" },
      { type: "ul", items: [
        "<strong>Due on receipt:</strong> pay as soon as the invoice arrives. In practice it means “within a few days”, and it works best with individuals and small clients who pay directly rather than through an accounts process.",
        "<strong>Net 7 / Net 15 / Net 30:</strong> payment is due 7, 15, or 30 calendar days after the invoice date. Weekends count.",
        "<strong>2/10 Net 30:</strong> the client may deduct 2% if they pay within 10 days; otherwise the full amount is due in 30.",
        "<strong>50% upfront:</strong> half before work starts, half on delivery. Standard for projects big enough to hurt if they go unpaid.",
        "<strong>EOM / Net EOM 10:</strong> due at the end of the month the invoice was issued, or 10 days after month end. Common in retail supply chains.",
      ] },
      { type: "h2", text: "What terms look like from the client's side" },
      { type: "p", text: "Here's the part most guides skip. A company of any size doesn't pay invoices one at a time; it approves them, queues them, and pays them in a weekly or monthly run. Net 30 in that world means the accounts team will schedule your invoice for the last run before day 30, which is why so much money arrives on day 28–35. If you invoice on the 2nd and their monthly run was on the 1st, you can be paid “on time” and still wait nearly five weeks. Two practical lessons: ask new corporate clients when their payment runs happen, and get your invoice in before the cut-off date." },
      { type: "h2", text: "Choosing terms by client type" },
      { type: "ul", items: [
        "<strong>Individuals and very small businesses:</strong> Due on receipt or Net 7. They pay from a banking app; there's no run to wait for.",
        "<strong>Agencies and SMEs:</strong> Net 14 or Net 15 is a fair middle ground most will accept without negotiation.",
        "<strong>Large corporates:</strong> expect Net 30 as a floor, sometimes Net 60 from procurement. You usually can't change the term, but you can negotiate a deposit or an early milestone to offset it.",
        "<strong>New clients of any size:</strong> shorter terms plus a deposit until trust is established.",
      ] },
      { type: "h2", text: "A worked example: what Net 30 costs you" },
      { type: "p", text: "Suppose you bill $3,000 of work every month. On Net 7 terms paid promptly, you're owed roughly one week of work at any moment, about $700. On Net 30 with the typical real-world drift, you're floating $3,000–4,500 at all times. Same clients, same work, but several thousand dollars of your money permanently living in other people's bank accounts. That's the case for using the shortest terms the relationship can bear." },
      { type: "h2", text: "Late fees and statutory interest" },
      { type: "p", text: "A late fee only works if it was agreed before the work, in your contract or quoted terms; springing one on an already-overdue invoice rarely sticks. In the US, 1.5% per month is the customary ceiling, though some states cap it lower. In the UK you don't even need a clause: businesses have a statutory right to interest at 8% plus the Bank of England base rate on late commercial payments, plus a fixed recovery fee — see the <a href=\"https://www.gov.uk/late-commercial-payments-interest-debt-recovery\">GOV.UK guidance</a>. Often the mere mention of statutory interest in a reminder email is what unlocks payment." },
      { type: "h2", text: "How to write terms on the invoice" },
      { type: "ol", items: [
        "State the term and the date together: “Payment terms: Net 14. Due 25 June 2026.” Never make the client calculate.",
        "Repeat the due date near the total, the one part of an invoice everyone reads.",
        "Put your late-fee or statutory-interest line in the notes, phrased neutrally: “Overdue balances accrue interest at…”.",
        "Keep terms identical from invoice to invoice so clients can put you on autopilot.",
      ] },
      { type: "p", text: "Terms are one lever among several — see <a href=\"/blog/how-to-invoice-a-client-as-a-freelancer\">how to invoice a client</a> and <a href=\"/blog/what-to-include-on-an-invoice\">what to include on an invoice</a> for the rest of the toolkit." },
      { type: "callout", text: "Set your terms once and reuse them: the <a href=\"/\">free invoice generator</a> lets you add a due date and a terms note to every PDF you download." },
    ],
    faq: [
      { q: "Do the days in Net 30 include weekends?", a: "Yes, they're calendar days, so an invoice dated 1 June under Net 30 is due 1 July regardless of weekends or holidays. If the due date lands on a weekend, most payers process it the next working day, so build in a day or two of slack before chasing." },
      { q: "Which payment term gets invoices paid fastest?", a: "Due on receipt and Net 7 produce the fastest payments from small clients, while with corporates the term matters less than catching their payment run. Whatever you choose, printing an explicit due date speeds things up more than the term itself." },
      { q: "Can I charge a late fee on an overdue invoice?", a: "Only if it was agreed before the work, in a contract, quote, or your stated terms. Agreed fees of around 1.5% per month are widely accepted in the US, and UK businesses can claim statutory interest on late commercial debts even without a clause." },
      { q: "Should I offer an early-payment discount like 2/10 Net 30?", a: "It's a trade: on a $2,000 invoice, 2/10 Net 30 costs you $40 to get paid up to 20 days sooner. That's expensive money if your cash flow is fine and cheap if you're stretched, so use it tactically with slow-but-reliable payers rather than as a default." },
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
      "Invoice numbering done right: formats that sort and scale, the sequential-numbering rules tax offices expect, and how to fix a messy sequence.",
    date: "2026-04-22",
    updated: "2026-06-11",
    readMins: 5,
    keywords: ["invoice number", "invoice number format", "invoice numbering", "how to number invoices"],
    excerpt: "The numbering habits that keep your invoices auditable: which format to pick, the five rules that matter, and what to do if your sequence is already a mess.",
    body: [
      { type: "p", text: "Three invoices into self-employment, numbering feels like pointless ceremony. Three hundred invoices in, it's the difference between a tidy business and an archaeology project. Invoice numbers are how you, your client, your accountant, and (if it ever comes to it) an auditor refer to one specific transaction without ambiguity, and the habits you pick in week one are the ones you'll live with for years. Here's how to get them right the first time." },
      { type: "h2", text: "Numbering is a requirement, not a convention" },
      { type: "p", text: "In most tax systems, invoice numbering is baked into the rules. UK VAT invoices must carry a unique, sequential identifying number, per <a href=\"https://www.gov.uk/invoicing-and-taking-payment-from-customers\">GOV.UK's invoicing guidance</a>, and India's GST rules similarly require consecutive serial numbers unique within a financial year. Even where no law spells it out, sequential numbers are what make your books auditable: a gap between INV-041 and INV-043 is instantly visible, which protects you in an audit and helps you spot invoices you forgot to record. Practically, “invoice 2026-134” is also a far better email subject than “the invoice from a while ago”." },
      { type: "h2", text: "The four common formats" },
      { type: "ul", items: [
        "<strong>Plain sequential:</strong> INV-001, INV-002, INV-003. The best default for freelancers; nothing to think about, nothing to break.",
        "<strong>Year-based:</strong> 2026-001, 2026-002, resetting each January. Handy at tax time because the year is visible in the number itself.",
        "<strong>Client-coded:</strong> ACME-001, ACME-002. Useful once a handful of clients generate most of your invoices and you want per-client sequences at a glance.",
        "<strong>Project-coded:</strong> P12-001. Common in construction and agencies, where billing is organised around jobs rather than time.",
      ] },
      { type: "h2", text: "Which should you pick?" },
      { type: "p", text: "If in doubt: year plus sequence, zero-padded to three digits (2026-001). It sorts correctly in any file browser, tells you the year instantly, and scales past 999 invoices a year before the formatting breaks. One honest tip many freelancers use: no rule says you must start at 001, so starting at, say, 1041 avoids advertising to your first client that they're your first client. What matters is that the sequence increments cleanly from wherever it begins." },
      { type: "h2", text: "Five rules that keep records clean" },
      { type: "ol", items: [
        "<strong>Never reuse a number,</strong> even when an invoice is cancelled. The cancelled invoice keeps its number and gets a credit note; the number dies with it.",
        "<strong>Never delete an invoice.</strong> Deleting creates exactly the gaps auditors ask about. To undo a mistake, issue a corrected invoice under a new number and a credit note against the old one.",
        "<strong>Don't skip numbers,</strong> and if a numbering accident creates a gap anyway, write a one-line note in your records explaining it.",
        "<strong>Zero-pad:</strong> 001–009 sort correctly; 1, 2, 10, 11 interleave alphabetically and turn your invoice folder into soup.",
        "<strong>Run one sequence per business.</strong> Separate parallel sequences for cash and card, or PDF and paper, destroy the single chronological spine that makes the system trustworthy.",
      ] },
      { type: "h2", text: "A numbering scheme in use" },
      { type: "p", text: "A freelance copywriter starts in June 2026 with 2026-101. By December she's at 2026-167: 67 invoices, no gaps, and her year's output is countable from the filenames alone. In January she rolls over to 2027-001. When a client queries an old job, “2026-134” finds the PDF, the email thread, and the bank statement line in seconds. The system costs nothing and required exactly one decision, made once." },
      { type: "h2", text: "Where the number goes" },
      { type: "p", text: "Top right of the invoice, near the issue date, labelled “Invoice #” or “Invoice no.” Put it in the PDF filename too (2026-134-acme.pdf) and in the subject line of the email that delivers it. The number only earns its keep if every reference to the job carries it." },
      { type: "h2", text: "If your numbering is already a mess" },
      { type: "p", text: "Don't renumber the past; retroactive edits look worse than the mess itself. Pick a clean format, note the changeover date somewhere permanent (“from 11 June 2026, invoices use 2026-1xx”), and start the new sequence above anything you've already used. Going forward is the only direction auditors care about." },
      { type: "callout", text: "PDF Bill Builder accepts any numbering format you type and remembers your details for the next invoice — <a href=\"/\">try the free generator</a>." },
    ],
    faq: [
      { q: "What is a good invoice number format?", a: "Year plus a zero-padded sequence, like 2026-001, is the strongest default: it sorts correctly, shows the year at a glance, and resets cleanly each January. A plain INV-001 sequence that never resets is equally valid if you'd rather not think about it." },
      { q: "Do invoice numbers have to start at 001?", a: "No. Any starting point is fine as long as the sequence is unique and increments consistently, which is why many freelancers begin at a higher number like 1041. Tax authorities care about uniqueness and order, not where you began." },
      { q: "I issued two invoices with the same number. What now?", a: "Leave whichever one is already with the client or paid, and reissue the other under the next free number with a short note referencing the correction. Record what happened: a documented mistake is a non-event, while a silent edit is what triggers audit questions." },
      { q: "Can invoice numbers contain letters?", a: "Yes. Prefixes like INV-, client codes like ACME-, and project codes are all common and fine. Keep the numeric part sequential and unique, and keep the pattern consistent so the order stays obvious." },
    ],
  },

  /* 8 ───────────────────────────────────────── */
  "gst-invoice-format-india": {
    title: "GST Invoice Format in India: Rules & Free Template",
    description:
      "GST invoice format in India explained: mandatory fields, CGST/SGST vs IGST with a worked example, HSN/SAC codes, deadlines, and common mistakes.",
    date: "2026-05-06",
    updated: "2026-06-11",
    readMins: 5,
    keywords: ["gst invoice format", "gst invoice india", "tax invoice format india", "gst bill format"],
    excerpt: "What a valid GST invoice must show, when to split CGST/SGST versus charging IGST, a worked ₹50,000 example, and the mistakes that block input tax credit.",
    body: [
      { type: "p", text: "One missing field on a GST invoice can cost your buyer their input tax credit, and nothing sours a B2B relationship in India faster than an invoice their accountant bounces back. If you're GST-registered, the format isn't a style choice; the mandatory contents are defined in the invoice rules. Here's what must appear, with a worked example showing the tax split done correctly." },
      { type: "h2", text: "The mandatory fields, in plain English" },
      { type: "ul", items: [
        "Your business name, address, and 15-character <strong>GSTIN</strong>",
        "The words “Tax Invoice” and a consecutive serial number, unique within the financial year",
        "The invoice date",
        "The buyer's name, address, and GSTIN if they're registered (that's what lets them claim input credit)",
        "<strong>HSN code</strong> for goods or <strong>SAC code</strong> for services on each line; how many digits depends on your turnover",
        "Description, quantity, unit, and taxable value of each item",
        "The tax breakup: <strong>CGST + SGST/UTGST</strong> for intra-state sales or <strong>IGST</strong> for inter-state, with rates shown",
        "Place of supply (essential on inter-state invoices), the total value, and ideally the amount in words",
        "Signature or digital signature of the supplier or an authorised person",
      ] },
      { type: "h2", text: "CGST + SGST or IGST? The ten-second rule" },
      { type: "p", text: "Compare where you are with the place of supply. Same state: split the tax equally into CGST and SGST. Different states: charge IGST at the full rate instead. The customer pays the same total either way; what changes is which government accounts receive the tax, which is why getting the split wrong creates genuine cleanup work in your returns." },
      { type: "h2", text: "A worked example" },
      { type: "p", text: "A Pune web studio bills a Mumbai retailer (both in Maharashtra) for a website at ₹50,000. Web development is a service taxed at 18%, so the invoice shows: taxable value ₹50,000, CGST 9% = ₹4,500, SGST 9% = ₹4,500, total ₹59,000, with the relevant SAC code on the line. If the same studio billed a client in Bengaluru instead, the tax line becomes IGST 18% = ₹9,000, with “Place of supply: Karnataka” stated. Same money, different line — and the buyer's input credit depends on it being the right line." },
      { type: "h2", text: "Rates, deadlines, and copies" },
      { type: "ul", items: [
        "<strong>Rates:</strong> GST slabs are 5%, 12%, 18%, and 28%, set per item; most services fall at 18%. Confirm the rate for your specific HSN/SAC on the <a href=\"https://www.gst.gov.in/\">official GST portal</a> rather than guessing.",
        "<strong>Timing for services:</strong> issue the invoice within 30 days of providing the service.",
        "<strong>Timing for goods:</strong> issue it at or before delivery or removal of the goods.",
        "<strong>Copies:</strong> goods invoices are issued in triplicate (original for the buyer, duplicate for the transporter, triplicate for you); service invoices in duplicate.",
      ] },
      { type: "h2", text: "Special cases worth knowing" },
      { type: "ul", items: [
        "<strong>Composition scheme:</strong> you issue a “Bill of Supply”, not a tax invoice, and you must not charge GST on it.",
        "<strong>Unregistered buyers:</strong> you still issue a tax invoice; the GSTIN line is simply left out. For higher-value inter-state B2C sales, include the buyer's address and state.",
        "<strong>Exports and SEZ supplies:</strong> these need specific endorsements on the invoice (for example, supply under LUT without payment of IGST), so take advice before your first one.",
        "<strong>E-invoicing:</strong> businesses above a turnover threshold must register invoices on the government portal and print the IRN/QR code. The threshold has been lowered repeatedly, so check the current figure on the GST portal.",
      ] },
      { type: "h2", text: "Mistakes that block input tax credit" },
      { type: "ul", items: [
        "Charging CGST + SGST on an inter-state sale (or IGST intra-state): the buyer's credit gets stuck and you'll be amending returns.",
        "Skipping serial numbers or restarting the sequence mid-year; numbers must run consecutively within the financial year.",
        "Forgetting place of supply on inter-state invoices.",
        "Charging GST while on the composition scheme, or before your registration's effective date.",
      ] },
      { type: "callout", text: "Need a clean, GST-style PDF without wrestling a spreadsheet? <a href=\"/invoice-generator-india\">The India invoice generator</a> handles the layout, tax lines, and rupee formatting free." },
      { type: "p", text: "GST rules change often and penalties for defective invoices are real, so treat this as orientation rather than tax advice: confirm specifics with a chartered accountant and the official <a href=\"https://www.gst.gov.in/\">GST portal</a>." },
    ],
    faq: [
      { q: "What is mandatory on a GST invoice in India?", a: "Your GSTIN, the words “Tax Invoice”, a consecutive serial number unique to the financial year, the date, the buyer's details (with GSTIN if registered), HSN/SAC codes, taxable value per line, the CGST/SGST or IGST breakup with rates, place of supply for inter-state sales, the total, and a signature." },
      { q: "When do I charge CGST and SGST versus IGST?", a: "Intra-state supplies split the tax into equal CGST and SGST halves; inter-state supplies charge IGST at the full rate. The deciding factor is the place of supply, so state it explicitly on inter-state invoices." },
      { q: "Is the HSN or SAC code mandatory on GST invoices?", a: "For most registered businesses, yes. The number of digits you must show (typically 4 or 6) depends on your annual turnover, so look up your item's code and the current digit requirement on the GST portal before finalising your template." },
      { q: "Can I make a GST invoice online for free?", a: "You can create a clean, itemised tax invoice with PDF Bill Builder, including your GSTIN, tax lines, and totals. The GST-specific fields (HSN/SAC, place of supply, the correct rate) remain your responsibility, and businesses covered by e-invoicing rules must also register invoices on the government portal." },
    ],
  },

  /* 9 ───────────────────────────────────────── */
  "vat-invoice-requirements-uk": {
    title: "VAT Invoice Requirements in the UK",
    description:
      "UK VAT invoice requirements: the mandatory fields, full vs simplified vs modified invoices, a worked 20% example, and errors that get invoices rejected.",
    date: "2026-05-20",
    updated: "2026-06-11",
    readMins: 5,
    keywords: ["vat invoice", "vat invoice uk", "vat invoice requirements", "uk invoice"],
    excerpt: "Everything a UK VAT invoice must show once you're registered, with a worked example at 20%, the £250 simplified-invoice rule, and the mistakes accountants bounce.",
    body: [
      { type: "p", text: "The day your VAT registration certificate arrives from HMRC, every invoice you send changes. New mandatory fields, new maths, new record-keeping, and a new way to annoy business customers if you get it wrong, because their VAT reclaim depends on your invoice being valid. This guide covers what a UK VAT invoice must show, the three invoice types, and a worked example at the standard 20% rate." },
      { type: "h2", text: "What a full VAT invoice must show" },
      { type: "ul", items: [
        "A unique, sequential invoice number.",
        "Your business name, address, and <strong>VAT registration number</strong>.",
        "The invoice date, and the <strong>tax point</strong> (time of supply) if it differs from the invoice date.",
        "The customer's name and address.",
        "A description sufficient to identify the goods or services.",
        "For each line: the quantity, unit price excluding VAT, and the VAT rate applied.",
        "The total excluding VAT, the total VAT (shown in sterling), and any zero-rated or exempt items identified as such.",
      ] },
      { type: "p", text: "That sterling detail surprises people: even if you invoice a client in euros or dollars, the VAT amount itself must appear in pounds. The authoritative list lives in <a href=\"https://www.gov.uk/invoicing-and-taking-payment-from-customers\">GOV.UK's invoicing guidance</a>." },
      { type: "h2", text: "Full, simplified, or modified?" },
      { type: "ul", items: [
        "<strong>Full VAT invoice:</strong> the default for B2B sales; everything in the list above.",
        "<strong>Simplified VAT invoice:</strong> allowed for sales up to £250 including VAT. Needs only your name, address, and VAT number, the time of supply, a description, the VAT rate, and the total including VAT.",
        "<strong>Modified VAT invoice:</strong> for retail sales over £250 where the customer agrees; it shows VAT-inclusive amounts.",
      ] },
      { type: "p", text: "When in doubt, issue a full invoice. It's valid in every situation, while the shorter forms are only valid below their thresholds or in specific retail contexts." },
      { type: "h2", text: "A worked example at 20%" },
      { type: "p", text: "A VAT-registered consultant invoices a client: “Workshop facilitation, 2 days × £600 = £1,200. Travel re-billed (standard-rated): £80. Subtotal £1,280. VAT at 20%: £256.00. Total due: £1,536.00.” Note what makes it valid: the rate is named, the VAT sits on its own line in sterling, and the net, VAT, and gross totals are all visible. If the consultant also sold something zero-rated, say a printed training book, that line would show 0% and be identified separately rather than silently mixed in." },
      { type: "h2", text: "The rates you'll deal with" },
      { type: "ul", items: [
        "<strong>Standard rate, 20%:</strong> most goods and services.",
        "<strong>Reduced rate, 5%:</strong> a short list including domestic energy and children's car seats.",
        "<strong>Zero rate, 0%:</strong> most food, books, children's clothing. Still VAT, still recorded on the invoice.",
        "<strong>Exempt:</strong> insurance and certain education and health services. No VAT and no reclaim, which is a different thing from zero-rated.",
      ] },
      { type: "p", text: "Categories shift at Budgets, so verify anything borderline on GOV.UK before relying on it." },
      { type: "h2", text: "Timing and record-keeping" },
      { type: "p", text: "Two deadlines matter. You normally have 30 days from the date of supply (the tax point) to issue a VAT invoice. And once issued, invoices form part of your VAT records, which HMRC expects you to keep for at least six years. Sequential numbering isn't optional either; gaps in the sequence are precisely what an inspector will ask about." },
      { type: "h2", text: "Mistakes that get VAT invoices rejected" },
      { type: "ul", items: [
        "Showing VAT before your registration's effective date, or before your number arrives. In the gap, charge a VAT-inclusive price without itemising VAT, then reissue proper VAT invoices once the number lands.",
        "Blending the VAT into the total instead of giving it its own line with the rate stated.",
        "Leaving off the VAT number itself — the single most common reason client accountants bounce an invoice.",
        "Charging VAT when not registered at all, which is unlawful rather than just messy.",
      ] },
      { type: "callout", text: "Bill in pounds with the VAT line done for you: the <a href=\"/invoice-generator-uk\">free UK invoice generator</a> formats net, VAT, and gross totals on a clean PDF." },
      { type: "p", text: "This is orientation, not tax or legal advice; the authoritative version lives on GOV.UK, and your accountant will know how it applies to your business." },
    ],
    faq: [
      { q: "Do I have to issue a VAT invoice for every sale?", a: "You must issue one to VAT-registered customers for standard or reduced-rated supplies, since that's what supports their reclaim. For retail sales to the public a simplified invoice on request is enough, and wholly exempt supplies don't need a VAT invoice at all." },
      { q: "Do I need to show my VAT number on every invoice?", a: "If you're VAT-registered and issuing VAT invoices, yes — the registration number is mandatory. Its absence is the most common reason business customers send an invoice back, because without it they can't support a VAT reclaim." },
      { q: "Can I invoice clients while waiting for my VAT number?", a: "You can't show VAT as a separate line until the number is issued. HMRC's accepted approach is to charge the VAT-inclusive amount without itemising VAT, then send corrected VAT invoices once the number arrives; tell the client in advance so the higher gross figure doesn't surprise them." },
      { q: "When can I use a simplified VAT invoice?", a: "For sales of £250 or less including VAT, typically retail. It needs far fewer fields, but above £250, or whenever a business customer asks for one, you must provide a full VAT invoice." },
    ],
  },

  /* 10 ──────────────────────────────────────── */
  "how-to-send-an-invoice": {
    title: "How to Send an Invoice (Email Tips & Template)",
    description:
      "How to send an invoice that gets paid: the pre-send checklist, a copy-paste email, who to address it to, portal tips, and a follow-up sequence.",
    date: "2026-05-28",
    updated: "2026-06-11",
    readMins: 5,
    keywords: ["how to send an invoice", "send invoice by email", "invoice email template", "emailing an invoice"],
    excerpt: "Good invoices die in inboxes every day. The full send-to-settled routine: PDF, right recipient, a subject line that does the work, and follow-ups that aren't awkward.",
    body: [
      { type: "p", text: "Plenty of perfectly good invoices die in the inbox. Wrong recipient, vague subject line, an editable Word attachment that someone's phone mangles, no due date anyone noticed: the work was done and the invoice was fine, but the sending failed. Getting paid is a delivery problem as much as a paperwork one, so here's the full send-to-settled routine." },
      { type: "h2", text: "Before you hit send: a 30-second check" },
      { type: "ul", items: [
        "The invoice number is unique and the dates are right (a wrong year on the due date is a classic January error).",
        "The client's legal name and any PO number they gave you are on the invoice; many companies can't process without the PO.",
        "Your payment details are on the PDF itself, not only in the email.",
        "The attachment is actually attached, and it's the final PDF, not a draft.",
      ] },
      { type: "h2", text: "Always send a PDF" },
      { type: "p", text: "A PDF renders identically everywhere, can't be accidentally edited, and looks finished. Word or Excel attachments shift layout on other machines and, worse, they're editable, which accounts teams and auditors dislike for obvious reasons. If you build invoices in a spreadsheet, export to PDF before sending. Or skip the wrestling entirely: <a href=\"/\">generate the PDF free with PDF Bill Builder</a> and attach it." },
      { type: "h2", text: "Send it to the right inbox" },
      { type: "p", text: "At companies beyond a few people, the person who loved your work is not the person who pays for it. Ask early: “Who should invoices go to, and is there a PO or reference number to quote?” Then send to accounts payable with your day-to-day contact CC'd. This one habit removes the silent failure mode where your contact means to forward the invoice and doesn't." },
      { type: "h2", text: "The email itself (copy this)" },
      { type: "p", text: "Subject: <em>Invoice INV-042 from Harbour Studio — $1,240, due July 8</em>. Everything a busy person needs is visible before they even open the message." },
      { type: "p", text: "Body: <em>“Hi Dana, thanks again for a smooth project. Attached is invoice INV-042 for the June website work ($1,240), due July 8. Payment details are on the invoice; just reply if anything needs adjusting for your system. Best, Priya.”</em> Four sentences. The “anything needs adjusting” line matters: it surfaces processing problems now instead of on day 29." },
      { type: "h2", text: "Time the send" },
      { type: "ul", items: [
        "Send the same day the work is delivered; every day waited is a day added to the payment clock.",
        "Tuesday-to-Thursday mornings get faster handling than Friday afternoons, when invoices sink to page two of the inbox.",
        "Corporate clients pay in weekly or monthly runs, so ask when the cut-off is and invoice ahead of it. Missing a monthly run can cost 30 days on its own.",
      ] },
      { type: "h2", text: "If the client uses an invoicing portal" },
      { type: "p", text: "Larger companies increasingly require suppliers to upload invoices to a portal (Coupa, SAP Ariba, Bill.com and the like) instead of emailing them. Don't fight it; an invoice emailed to a portal-using client is an invoice that doesn't exist. Upload the same PDF, fill the portal's fields exactly as they appear on the invoice, and keep the confirmation email. Payment terms usually start from portal acceptance, not your send date, which is one more reason to submit the day the work is done." },
      { type: "h2", text: "The follow-up sequence" },
      { type: "ol", items: [
        "<strong>Due date:</strong> if unpaid, a friendly same-day or next-day nudge: “Quick reminder that INV-042 was due today; could you check where it sits in your run?”",
        "<strong>One week over:</strong> firmer, with the PDF reattached and a direct ask: “Could you confirm a payment date?”",
        "<strong>Two to three weeks over:</strong> a phone call, plus a note that late terms apply if you have them. Most invoices never get this far; the first nudge clears the majority.",
      ] },
      { type: "p", text: "Pair the sequence with terms that were clear from the start — our <a href=\"/blog/invoice-payment-terms-explained\">payment terms guide</a> covers the wording." },
      { type: "h2", text: "Keep a copy of everything" },
      { type: "p", text: "Save the sent PDF, note the date, and log it (number, client, amount, due date, paid date) in a simple sheet. Invoices are tax records: the IRS <a href=\"https://www.irs.gov/businesses/small-businesses-self-employed\">small business centre</a> and <a href=\"https://www.gov.uk/invoicing-and-taking-payment-from-customers\">GOV.UK's invoicing guidance</a> both treat issued invoices as documents you're expected to retain. Being able to re-send any invoice in thirty seconds is half of professional follow-up anyway." },
      { type: "callout", text: "Need the PDF before you can send anything? <a href=\"/\">Create it free with PDF Bill Builder</a>: itemised, totalled, and ready to attach in about two minutes." },
    ],
    faq: [
      { q: "What's the best way to send an invoice?", a: "Email a PDF to the client's accounts address, with the invoice number and amount in the subject line and your project contact CC'd. The PDF can't be accidentally edited, and a descriptive subject line means the invoice can be found instantly later." },
      { q: "Should I put the invoice details in the email body too?", a: "Summarise rather than duplicate: state the invoice number, the total, and the due date in one sentence, and let the PDF carry the rest. The email is for findability; the invoice is the document of record." },
      { q: "Can I send an invoice by WhatsApp or text?", a: "As a courtesy copy, sure, and in some markets it's completely normal. Send it by email as well though: you want a timestamped, searchable record with the attachment, which chat apps handle poorly and accounts departments often can't accept." },
      { q: "What if the client says they never received the invoice?", a: "Re-send the same PDF immediately, keeping the original invoice date intact, and note the new send date in your records. Whether it was a spam filter or a stalling tactic, the right response is identical: cheerful, instant, documented re-delivery." },
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
      "Seven habits that get invoices paid faster: same-day invoicing, shorter terms, deposits, frictionless payment, scheduled reminders, and real consequences.",
    date: "2026-06-03",
    updated: "2026-06-11",
    readMins: 5,
    keywords: ["get paid faster", "how to get paid on time", "late invoice", "invoice payment tips"],
    excerpt: "The gap between finishing work and getting paid is made of small delays. Seven habits that close it, from same-day invoicing to reminders that actually work.",
    body: [
      { type: "p", text: "It's the 28th, rent is due on the 1st, and the invoice you sent three weeks ago is still marked unpaid. Every freelancer and small business owner has lived some version of that month. The fix is rarely one dramatic confrontation; it's a handful of small habits that each shave days off the gap between finishing work and seeing money. Stack them and the gap collapses." },
      { type: "h2", text: "1. Invoice the same day you finish" },
      { type: "p", text: "The payment clock starts when the invoice lands, not when the work is done. Finish on Tuesday and invoice on Friday and you've donated three days. Batch your invoicing to month-end and you've donated up to thirty. Same-day invoicing also catches the client at peak satisfaction, when the work is fresh and approving payment feels natural rather than like admin." },
      { type: "h2", text: "2. Make the invoice impossible to question" },
      { type: "p", text: "Most “late” payments are actually stalled payments: something on the invoice raised a question, and the question sat in someone's inbox. Itemise specifically (“Landing page copy, 2 revision rounds: $400”, not “Copywriting: $400”), show the maths, name the right legal entity, and quote any PO number the client gave you. An invoice with nothing to query has no excuse to stall on." },
      { type: "h2", text: "3. Shorten the terms and show a real date" },
      { type: "p", text: "If you default to Net 30 out of politeness, stop; Net 14 is accepted without comment in most freelance and small-business relationships. And always print the actual due date. “Due 25 June 2026” gets scheduled; “Net 14” gets interpreted, later. Our <a href=\"/blog/invoice-payment-terms-explained\">payment terms guide</a> covers which terms suit which clients." },
      { type: "h2", text: "4. Take deposits on anything that would hurt" },
      { type: "p", text: "For any project big enough that non-payment would damage your month, take 30–50% upfront. On a $4,000 build, a $1,600 deposit means the worst case is chasing $2,400 on work that's partly paid for, not chasing $4,000 with no leverage. Deposits also pre-screen clients: anyone who balks at a standard deposit is telling you how they'll behave at final payment." },
      { type: "h2", text: "5. Remove every step between “approved” and “paid”" },
      { type: "ul", items: [
        "Put full payment details on the invoice itself: account name, number, sort or routing code, or your PayPal/UPI handle.",
        "Offer at least two payment methods; the client's easiest method is the fastest one.",
        "Quote the invoice number in the email subject, the PDF filename, and every reminder, so nobody has to search.",
        "For repeat clients, keep your invoice layout identical every time. Familiar invoices get approved on sight.",
      ] },
      { type: "h2", text: "6. Remind on a schedule, not when frustration peaks" },
      { type: "p", text: "Decide the cadence in advance so reminders are administrative rather than emotional: a friendly note the day after the due date (“quick nudge, INV-042 was due yesterday, could you check it's in your next run?”), a firmer one at a week (restate the amount, reattach the PDF, ask for a payment date), and a phone call or final notice at two to three weeks. Most overdue invoices are forgetfulness and die at the first nudge. The schedule matters because silence is read, accurately, as flexibility." },
      { type: "h2", text: "7. Make lateness cost something" },
      { type: "p", text: "State a late fee in your terms before the work, and apply it the second time a client is late even if you waived it the first. In the UK you have a statutory right to interest at 8% plus the Bank of England base rate on overdue commercial invoices, plus a fixed recovery fee, without needing any contract clause — details on <a href=\"https://www.gov.uk/late-commercial-payments-interest-debt-recovery\">GOV.UK</a>. Elsewhere, around 1.5% a month is the common convention where agreed in advance. The point isn't the revenue; it's making “pay this one last” a losing strategy." },
      { type: "h2", text: "When a client simply won't pay" },
      { type: "p", text: "Escalate in order: a formal final demand with a hard date, pausing any ongoing work, then small claims court for amounts worth the filing fee (limits run from roughly $2,500 to $25,000 depending on US state, with similar schemes in the UK and elsewhere). Collections agencies are a last resort that costs a large slice of the recovery. And for repeat offenders, the most profitable move is the quiet one: deposits up front, or no next project." },
      { type: "callout", text: "Faster payment starts with a cleaner invoice. <a href=\"/\">Build one free with PDF Bill Builder</a>: itemised lines, a clear due date, and a PDF the client can't misread." },
    ],
    faq: [
      { q: "How can I get my invoices paid faster?", a: "Invoice the same day you finish, show a real due date on Net 7–14 terms, take deposits on large jobs, put payment details on the invoice, and send reminders on a fixed schedule. Each habit saves days; together they typically halve the wait." },
      { q: "Do payment reminders annoy clients?", a: "Professional ones don't. A short, friendly nudge that quotes the invoice number reads as good admin rather than aggression, and most clients pay within a day of the first reminder. Any relationship that can't survive a polite reminder was going to struggle at payment time anyway." },
      { q: "Should I stop work when a client owes me money?", a: "For ongoing engagements, yes, once a firm reminder has been ignored. Pausing work is leverage you already hold and a far cheaper signal than court. Tell the client plainly that work resumes when the balance clears." },
      { q: "Is a late fee or statutory interest actually worth charging?", a: "Mentioning it matters more than collecting it. Referencing the agreed fee, or UK statutory interest, in a second reminder reliably moves your invoice up the pile, because it converts lateness from free credit into a cost." },
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
    description: "US invoice payment terms: Net 30 vs Net 15, when late fees are enforceable, collection steps for overdue invoices, and what 2/10 Net 30 really costs.",
    date: "2026-06-05",
    updated: "2026-06-11",
    readMins: 5,
    keywords: ["invoice payment terms usa", "net 30 invoice", "invoice due date usa", "late fee invoice usa", "payment terms freelancer usa"],
    excerpt: "Net 30 is a habit, not a law. How US payment terms really work, which ones get you paid sooner, when late fees are enforceable, and how to collect when an invoice goes quiet.",
    body: [
      { type: "p", text: "No federal law tells American businesses what payment terms to put on an invoice. That freedom is the trap: with nothing forcing a standard, defaults get set by habit, and the prevailing habit (Net 30, inherited from corporate purchasing departments) quietly favours whoever is paying late. Picking terms deliberately is one of the few cash-flow levers a US freelancer or small business controls completely." },
      { type: "h2", text: "The terms you'll actually encounter" },
      { type: "ul", items: [
        "<strong>Net 30:</strong> due within 30 calendar days of the invoice date; the default in B2B America.",
        "<strong>Net 15:</strong> due in 15 days; increasingly the freelancer standard.",
        "<strong>Net 7:</strong> due in a week; suits small jobs and clients who pay directly.",
        "<strong>Due on receipt:</strong> payment expected immediately; realistic for retail, one-off gigs, and individual clients.",
        "<strong>2/10 Net 30:</strong> the client may take 2% off if they pay within 10 days; otherwise the full amount is due in 30.",
      ]},
      { type: "h2", text: "What actually gets you paid fastest" },
      { type: "p", text: "Shorter stated terms reliably shorten real payment times; platforms that track invoice data report the same pattern year after year. But the bigger effect is specificity. “Payment due by July 10, 2026” outperforms a bare “Net 30” because nobody has to interpret it. And with corporate clients, understand that Net 30 in practice means your invoice gets approved, queued, and paid in whichever weekly or biweekly payment run falls nearest day 30, which is why so much B2B money lands on day 28–35. Invoice early in their cycle and you catch an earlier run." },
      { type: "h2", text: "Late fees: legal in all 50 states, with conditions" },
      { type: "p", text: "You can charge late fees anywhere in the US, provided the fee was disclosed before the work began, in your contract, proposal, or standing terms. Spring one on an already-overdue invoice and it's close to unenforceable." },
      { type: "ul", items: [
        "1.5% per month (18% a year) is the widely used convention and rarely contested.",
        "A flat fee ($25–50) is simpler for small invoices and feels less punitive.",
        "State usury and late-fee caps exist; if you want to charge more than 1.5% per month, check your state's rules first.",
        "Restate the fee on every invoice (“Balances 30+ days past due accrue 1.5% monthly interest”) so there's never a notice argument.",
      ]},
      { type: "h2", text: "Terms by business type" },
      { type: "h3", text: "Freelancers (designers, writers, developers)" },
      { type: "p", text: "Net 15 is the sweet spot: fast enough to protect cash flow, standard enough that clients don't blink. Take a 30–50% deposit from every new client before work starts, and put the late-fee line on each invoice from day one. For tiny jobs under a few hundred dollars, due on receipt is fine." },
      { type: "h3", text: "Small businesses and contractors" },
      { type: "p", text: "Net 30 remains the B2B norm, so plan cash flow around it rather than fighting every client over it. On multi-week jobs, bill in milestones — a third up front, a third midway, a third on completion — so no single invoice can starve the project." },
      { type: "h3", text: "Retail and service businesses" },
      { type: "p", text: "Due on receipt for point-of-sale. For recurring service accounts like cleaning, landscaping, or IT support, Net 15 invoiced on the same day each month keeps payments predictable on both sides." },
      { type: "h2", text: "A worked example: what 2/10 Net 30 costs" },
      { type: "p", text: "On a $2,000 invoice, 2/10 Net 30 lets the client keep $40 in exchange for paying roughly 20 days early. Annualised, that's borrowing at about 36%: expensive money if your cash flow is healthy, decent value if you're covering payroll. Use early-payment discounts tactically with large, slow, reliable payers, not as a default for everyone." },
      { type: "h2", text: "Collecting on a late US invoice" },
      { type: "ol", items: [
        "<strong>Day 0 (due date):</strong> a friendly reminder with the invoice attached.",
        "<strong>Day 7:</strong> a firmer note asking for a specific payment date, referencing the invoice number and any late-fee terms.",
        "<strong>Day 30:</strong> a formal demand letter by email and certified mail; for ongoing clients, pause work.",
        "<strong>Day 60+:</strong> choose between small claims court (limits range from about $2,500 to $25,000 depending on the state, and you don't need a lawyer) and a collections agency (which typically keeps 25–50% of what it recovers).",
      ]},
      { type: "h2", text: "Sales tax on invoices: the short version" },
      { type: "p", text: "There's no federal sales tax in the US; it's all state and local. Most states don't tax professional services, but several tax digital products and some tax specific service categories, while physical goods are taxable almost everywhere. Check your state's Department of Revenue, and for the records side of invoicing, the IRS <a href=\"https://www.irs.gov/businesses/small-businesses-self-employed\">Small Business and Self-Employed center</a> is the authoritative starting point." },
      { type: "callout", text: "Set your terms, due date, and late-fee note once: the <a href=\"/\">free invoice generator</a> puts them on a clean PDF you can reuse for every client." },
    ],
    faq: [
      { q: "Is Net 30 or Net 15 better for freelancers in the USA?", a: "Net 15, in almost every case. Clients rarely push back, your money arrives two weeks sooner, and you can still grant Net 30 to the occasional corporate client whose procurement policy requires it." },
      { q: "Can I charge late fees without putting them on the original invoice?", a: "It's very hard to enforce. US late fees stick when they were disclosed before the work began, in a contract or your stated terms, so add the late-fee line to your standard invoice template today and it will cover everything going forward." },
      { q: "What payment terms should a new US freelancer default to?", a: "Net 15, a deposit for new clients, and a 1.5%-per-month late-fee line. That combination is unremarkable to clients and protective of you, which is exactly what default terms should be." },
      { q: "Do I need to charge sales tax on US freelance invoices?", a: "It depends entirely on your state. Most states exempt professional services, but some tax digital goods and certain services, and physical products are almost always taxable. Your state's Department of Revenue site has the definitive list; when in doubt, ask a CPA rather than guessing." },
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

  /* ══════════════════════════════════════════════
     POST 24 — Invoice vs Receipt (high informational volume)
  ══════════════════════════════════════════════ */
  "invoice-vs-receipt-difference": {
    title: "Invoice vs Receipt: What's the Difference? (2026 Guide)",
    description: "Invoice vs receipt explained simply — what each document means, when to use which, and what legally must appear on each. With free templates for both.",
    date: "2026-06-08",
    updated: "2026-06-08",
    readMins: 5,
    keywords: ["invoice vs receipt", "difference between invoice and receipt", "is a receipt the same as an invoice", "when to use invoice or receipt"],
    excerpt: "An invoice requests payment; a receipt confirms it. Here's the full difference, when to use each, and what must appear on both — with free templates.",
    body: [
      { type: "p", text: "People use the words 'invoice' and 'receipt' as if they mean the same thing, but they are two different documents with two different jobs. Mixing them up can confuse clients, mess up your bookkeeping, and even cause tax problems. This guide makes the difference clear in plain language." },
      { type: "callout", text: `Need either one right now? ${CTA}` },
      { type: "h2", text: "The simple difference" },
      { type: "p", text: "An invoice is a request for payment — you send it before you get paid. A receipt is proof of payment — you send it after the money has been received. In short: invoice asks, receipt confirms." },
      { type: "h2", text: "What is an invoice?" },
      { type: "p", text: "An invoice is a document a seller sends to a buyer that lists the goods or services provided and the amount owed. It is essentially a bill. It includes payment terms and a due date, and it creates a record that money is owed to you." },
      { type: "ul", items: [
        "Sent before payment",
        "States the amount due and the due date",
        "Has a unique invoice number",
        "Used to chase and track unpaid money",
      ]},
      { type: "h2", text: "What is a receipt?" },
      { type: "p", text: "A receipt is issued after the buyer pays. It confirms that a specific amount was received for a specific transaction. Customers keep receipts as proof of purchase for returns, warranties, expense claims, and tax records." },
      { type: "ul", items: [
        "Issued after payment is made",
        "Confirms the amount actually paid",
        "Acts as proof of purchase",
        "Used for refunds, warranties, and expense claims",
      ]},
      { type: "h2", text: "When should you use which?" },
      { type: "ol", items: [
        "Finished a job and waiting to be paid? Send an <strong>invoice</strong>.",
        "Just received payment? Issue a <strong>receipt</strong>.",
        "Got paid instantly at point of sale (cash, card)? A <strong>receipt</strong> alone is usually enough.",
        "Billing a client on terms (e.g. Net 30)? Send an <strong>invoice</strong> first, then a receipt once they pay.",
      ]},
      { type: "p", text: `Our free tool creates both — switch the document type between Invoice, Receipt, and Quotation, then ${CTA}` },
      { type: "h2", text: "Can one document be both?" },
      { type: "p", text: "Sometimes. A 'paid invoice' — an invoice stamped or marked PAID — can act as a receipt because it shows both what was owed and that it was settled. But for clean records, most businesses keep them separate: one invoice requesting payment, one receipt confirming it." },
    ],
    faq: [
      { q: "Is a receipt the same as an invoice?", a: "No. An invoice is a request for payment sent before you are paid, while a receipt is proof of payment issued after the money is received. They serve opposite ends of the same transaction." },
      { q: "Do I need both an invoice and a receipt?", a: "For credit-based sales (paid later) you typically send an invoice first, then a receipt once paid. For instant payments at point of sale, a receipt alone is usually enough." },
      { q: "Does a receipt need a number?", a: "It's best practice to number receipts sequentially for your records and tax reporting, just like invoices, even though it isn't always legally required." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 25 — Payment reminder email templates (high intent)
  ══════════════════════════════════════════════ */
  "payment-reminder-email-templates": {
    title: "How to Write a Payment Reminder Email (5 Free Templates)",
    description: "Polite but effective payment reminder email templates for overdue invoices — before due date, on due date, and for late payments. Copy, paste, and get paid.",
    date: "2026-06-08",
    updated: "2026-06-08",
    readMins: 7,
    keywords: ["payment reminder email", "overdue invoice email", "how to ask for payment politely", "late payment email template", "invoice follow up email"],
    excerpt: "Five copy-paste payment reminder email templates — from a friendly nudge before the due date to a firm final notice — that get invoices paid without burning the relationship.",
    body: [
      { type: "p", text: "Chasing late payments is the most uncomfortable part of running a business. The good news: a clear, polite, well-timed email gets most invoices paid without any friction. Below are five ready-to-use templates for every stage, plus the timing that works best." },
      { type: "callout", text: `Reminders work best when your original invoice was clear and professional. ${CTA}` },
      { type: "h2", text: "When to send each reminder" },
      { type: "ol", items: [
        "<strong>3 days before due date</strong> — a friendly heads-up.",
        "<strong>On the due date</strong> — a simple 'payment is due today' note.",
        "<strong>3–7 days overdue</strong> — a polite first reminder.",
        "<strong>14 days overdue</strong> — a firmer second reminder.",
        "<strong>30+ days overdue</strong> — a final notice before escalation.",
      ]},
      { type: "h2", text: "Template 1 — Friendly reminder (before due date)" },
      { type: "p", text: "Subject: Invoice #INV-001 due on [date]<br><br>Hi [Name], just a quick reminder that invoice #INV-001 for [amount] is due on [date]. I've attached it again here for convenience. Thanks so much — let me know if you have any questions." },
      { type: "h2", text: "Template 2 — Due today" },
      { type: "p", text: "Subject: Invoice #INV-001 is due today<br><br>Hi [Name], invoice #INV-001 for [amount] is due today. If you've already sent payment, thank you and please ignore this. Otherwise, here are the payment details again: [details]." },
      { type: "h2", text: "Template 3 — First overdue reminder" },
      { type: "p", text: "Subject: Invoice #INV-001 — now overdue<br><br>Hi [Name], I wanted to follow up on invoice #INV-001 for [amount], which was due on [date] and is now a few days overdue. Could you let me know when I can expect payment? Happy to resend the invoice if needed." },
      { type: "h2", text: "Template 4 — Firm second reminder" },
      { type: "p", text: "Subject: Second reminder: Invoice #INV-001 overdue by 14 days<br><br>Hi [Name], invoice #INV-001 for [amount] is now 14 days overdue. I'd really appreciate it if you could process this as soon as possible. If there's an issue with the invoice or a delay I should know about, please let me know so we can sort it out." },
      { type: "h2", text: "Template 5 — Final notice" },
      { type: "p", text: "Subject: Final notice: Invoice #INV-001 (30 days overdue)<br><br>Hi [Name], despite previous reminders, invoice #INV-001 for [amount] remains unpaid 30 days after the due date. Please arrange payment within 7 days to avoid late fees / further action. I value our working relationship and would prefer to resolve this quickly." },
      { type: "h2", text: "Tips that actually get you paid" },
      { type: "ul", items: [
        "Always attach the invoice again — don't make them search for it.",
        "Reference the invoice number and exact amount in every email.",
        "Stay polite and professional, even in the final notice.",
        "Send during business hours, mid-week, for the best response.",
        "Add a small late fee clause to your terms so reminders carry weight.",
      ]},
      { type: "p", text: `Clear invoices get paid faster. Create yours with payment terms and due dates built in — ${CTA}` },
    ],
    faq: [
      { q: "How do I politely ask for payment?", a: "Keep it short and friendly: reference the invoice number and amount, restate the due date, attach the invoice again, and ask when you can expect payment. Assume good intent in the first reminder." },
      { q: "How long should I wait before sending a payment reminder?", a: "Send a friendly reminder a few days before the due date, another on the due date, and a polite follow-up 3–7 days after it becomes overdue." },
      { q: "Can I charge a late fee on overdue invoices?", a: "Yes, if you stated it in your terms before the work began. Many businesses charge 1–2% per month or a flat fee. Always mention the late-fee policy on the original invoice." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 26 — Net 30 / payment terms explained
  ══════════════════════════════════════════════ */
  "net-30-payment-terms-explained": {
    title: "Net 30 Payment Terms Explained (Net 15, Net 60 & More)",
    description: "What 'Net 30' means on an invoice, plus Net 15, Net 60, Due on Receipt, and 2/10 Net 30 explained — and how to choose payment terms that get you paid faster.",
    date: "2026-06-08",
    updated: "2026-06-08",
    readMins: 6,
    keywords: ["net 30 payment terms", "what does net 30 mean", "net 15 net 60", "invoice payment terms", "2/10 net 30"],
    excerpt: "Net 30 means payment is due 30 days after the invoice date. Here's what every common payment term means and how to pick the one that gets you paid fastest.",
    body: [
      { type: "p", text: "Payment terms tell your client exactly when they need to pay. Get them right and your cash flow stays healthy; get them vague and you'll spend your time chasing money. This guide decodes every common term you'll see on an invoice." },
      { type: "h2", text: "What does Net 30 mean?" },
      { type: "p", text: "'Net 30' means the full payment is due within 30 days of the invoice date. The word 'net' refers to the total amount owed after any discounts. So an invoice dated 1 June with Net 30 terms is due by 1 July." },
      { type: "callout", text: `Add clear payment terms to every invoice automatically — ${CTA}` },
      { type: "h2", text: "Common payment terms explained" },
      { type: "ul", items: [
        "<strong>Due on Receipt</strong> — payment is expected immediately when the invoice is received.",
        "<strong>Net 7 / Net 10</strong> — due within 7 or 10 days; common for freelancers and small jobs.",
        "<strong>Net 15</strong> — due within 15 days; a good balance for services.",
        "<strong>Net 30</strong> — due within 30 days; the standard for most B2B work.",
        "<strong>Net 60 / Net 90</strong> — due within 60 or 90 days; common with large companies and slow to favour the buyer.",
        "<strong>2/10 Net 30</strong> — a 2% discount if paid within 10 days, otherwise the full amount is due in 30.",
      ]},
      { type: "h2", text: "What does 2/10 Net 30 mean?" },
      { type: "p", text: "This is an early-payment discount. '2/10' means the client can take 2% off if they pay within 10 days. 'Net 30' means that if they don't take the discount, the full amount is due in 30 days. It's a simple way to encourage faster payment." },
      { type: "h2", text: "Which payment terms should you use?" },
      { type: "ol", items: [
        "Freelancers and solo workers: Net 7 to Net 15, or Due on Receipt for small jobs.",
        "Service businesses: Net 15 or Net 30.",
        "Selling to large corporations: they may demand Net 30 to Net 60 — negotiate a deposit if so.",
        "Cash-flow tight? Offer a small early-payment discount like 2/10 Net 30.",
      ]},
      { type: "h2", text: "Tips for getting paid on time" },
      { type: "ul", items: [
        "Always show both the invoice date and the exact due date — don't make clients calculate it.",
        "State the payment terms clearly in words, e.g. 'Payment due within 30 days (Net 30)'.",
        "Shorter terms generally get paid faster — use the shortest the client will accept.",
        "Include your payment details directly on the invoice to remove friction.",
      ]},
      { type: "p", text: `Our free generator lets you set a due date and add a terms note on every invoice — ${CTA}` },
    ],
    faq: [
      { q: "What does Net 30 mean on an invoice?", a: "Net 30 means the full invoice amount is due within 30 days of the invoice date. For example, an invoice dated June 1 with Net 30 terms must be paid by July 1." },
      { q: "Is Net 30 from the invoice date or delivery date?", a: "Almost always from the invoice date, unless your contract specifically says otherwise (such as 'Net 30 from delivery' or 'from end of month'). Always state which on the invoice." },
      { q: "What are the best payment terms for a small business?", a: "Shorter terms get you paid faster. Net 7 to Net 15 works well for freelancers and small businesses, while Net 30 is the standard expectation for larger B2B clients." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 28 — UK VAT invoice (high CPC UK)
  ══════════════════════════════════════════════ */
  "uk-vat-invoice-requirements": {
    title: "UK VAT Invoice Requirements: What to Include (2026)",
    description: "What a valid UK VAT invoice must include under HMRC rules — VAT number, rates, and the difference between a full and simplified VAT invoice. Free template.",
    date: "2026-06-08",
    updated: "2026-06-08",
    readMins: 6,
    keywords: ["uk vat invoice requirements", "what to include on a vat invoice", "hmrc invoice rules", "vat invoice template uk", "do i need to charge vat"],
    excerpt: "What HMRC requires on a valid UK VAT invoice — VAT number, rates, full vs simplified invoices, and when you must (and must not) charge VAT.",
    body: [
      { type: "p", text: "If you're VAT-registered in the UK, HMRC requires specific details on every invoice you issue. Getting them right means your clients can reclaim their VAT and you stay compliant. This guide covers exactly what to include." },
      { type: "h2", text: "Do you need to charge VAT?" },
      { type: "p", text: "You must register for VAT and charge it once your taxable turnover exceeds the VAT threshold (£90,000 as of 2024/25). Below that you can register voluntarily, but you don't have to. If you're not VAT-registered, you must not show or charge VAT on your invoices." },
      { type: "callout", text: `Create a clean, professional UK invoice in seconds — ${CTA}` },
      { type: "h2", text: "What a full VAT invoice must include" },
      { type: "ul", items: [
        "A unique, sequential invoice number",
        "Your business name and address",
        "Your VAT registration number",
        "The invoice date (and 'time of supply' / tax point if different)",
        "The customer's name and address",
        "A description of the goods or services",
        "The quantity, unit price (excluding VAT), and VAT rate for each item",
        "The total amount excluding VAT",
        "The total VAT amount, shown in sterling",
        "The total amount including VAT",
      ]},
      { type: "h2", text: "UK VAT rates" },
      { type: "ul", items: [
        "Standard rate — 20% (most goods and services)",
        "Reduced rate — 5% (e.g. domestic energy, children's car seats)",
        "Zero rate — 0% (e.g. most food, children's clothes, books)",
        "Exempt — no VAT (e.g. insurance, certain education and health services)",
      ]},
      { type: "h2", text: "Full vs simplified VAT invoice" },
      { type: "p", text: "For sales up to £250 (including VAT), you can issue a simplified VAT invoice, which needs fewer details: your name, address, and VAT number; the time of supply; a description of the goods/services; the rate of VAT; and the total amount including VAT. For anything over £250, you must issue a full VAT invoice." },
      { type: "h2", text: "How long to keep UK invoices" },
      { type: "p", text: "HMRC requires you to keep VAT records and invoices for at least 6 years. If you use the VAT Cash Accounting Scheme or have specific arrangements, keep them organised and accessible in case of an inspection." },
      { type: "p", text: `Read more in our guides for <a href="/freelancer-invoice">freelancers</a> and <a href="/small-business-invoice">small businesses</a>, or ${CTA}` },
    ],
    faq: [
      { q: "What must a UK VAT invoice include?", a: "A unique invoice number, your business name and address, your VAT number, the date, the customer's details, a description of goods/services, the net amount, the VAT rate and amount in sterling, and the total including VAT." },
      { q: "Can I charge VAT if I'm not registered?", a: "No. You must not charge or show VAT on invoices unless you are VAT-registered with HMRC. Doing so is illegal and can result in penalties." },
      { q: "What is the UK VAT registration threshold?", a: "As of 2024/25, you must register for VAT once your taxable turnover exceeds £90,000 in any rolling 12-month period. You can also register voluntarily below this." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 28 — What is an invoice (high-volume definitional)
  ══════════════════════════════════════════════ */
  "what-is-an-invoice": {
    title: "What Is an Invoice? Definition, Types & Examples (2026)",
    description: "What an invoice is, what it's legally for, the fields every invoice needs, the main types, and how invoices differ from bills and receipts.",
    date: "2026-06-09",
    updated: "2026-06-11",
    readMins: 5,
    keywords: ["what is an invoice", "invoice definition", "invoice meaning", "types of invoices", "what does an invoice do"],
    excerpt: "Plain-English answer: what an invoice does, what it must include, the main types, and why it isn't the same thing as a bill or a receipt.",
    body: [
      { type: "p", text: "Bill, invoice, statement, receipt: business paperwork has a lot of overlapping names, and people use them interchangeably right up until money goes missing. Strip away the jargon and an invoice does one job. It tells a customer, in writing, exactly what they owe you, for what, and by when. Everything else on the page exists to support those three facts." },
      { type: "h2", text: "The definition, properly" },
      { type: "p", text: "Formally, an invoice is a commercial document a seller issues to a buyer that itemises goods or services supplied, states the amount owed, and requests payment by a given date. It's created by the seller, before payment, and it becomes the seller's record of money owed to them (accounts receivable) and the buyer's record of money owing (accounts payable). That dual role is why both sides keep copies for years." },
      { type: "h2", text: "What an invoice is actually for" },
      { type: "p", text: "Requesting payment is the obvious purpose, but rarely the most important one over the long run:" },
      { type: "ul", items: [
        "<strong>A payment trigger.</strong> Most businesses won't (and often can't) pay anything that hasn't been invoiced. No invoice, no payment run.",
        "<strong>A legal record of the sale.</strong> If a dispute ever reaches a lawyer or a small-claims court, the invoice is the first document anyone asks for.",
        "<strong>Cash-flow tracking.</strong> Your unpaid invoices are your receivables; knowing their total tells you whether next month is comfortable or tight.",
        "<strong>Tax evidence.</strong> Invoices substantiate the income you declare. The IRS, for instance, lists invoices among the core <a href=\"https://www.irs.gov/businesses/small-businesses-self-employed\">supporting records small businesses should keep</a>, and most tax authorities expect the same.",
        "<strong>Proof for the buyer too.</strong> Registered businesses often need a valid invoice before they can reclaim VAT or GST they've paid.",
      ]},
      { type: "h2", text: "What must an invoice include?" },
      { type: "p", text: "Exact legal requirements vary by country, and tax registration adds fields (a VAT or GST number, for example). But the core is the same everywhere:" },
      { type: "ol", items: [
        "The word “Invoice” and a unique, sequential invoice number",
        "Your business name, address, and contact details",
        "The customer's name and billing address",
        "The issue date and the payment due date",
        "An itemised list of goods or services with quantities and prices",
        "Any tax (VAT, GST, sales tax) shown as its own line",
        "The total amount due, plus how to pay it",
      ]},
      { type: "h2", text: "A 30-second example" },
      { type: "p", text: "Suppose a window cleaner finishes a quarterly job for a dental office. The invoice might read: “Invoice INV-0042, dated 11 June, due 25 June. Bill to: Harbour Lane Dental. Exterior window cleaning, ground and first floor: 1 × £140. Interior glass partitions: 2 hrs × £30 = £60. Subtotal £200, VAT (20%) £40, total due £240. Payment by bank transfer to…” That's the whole genre. Ten fields, no mystery, and either side could hand it to an accountant or a court and it would make sense on its own." },
      { type: "h2", text: "The main types of invoice" },
      { type: "ul", items: [
        "<strong>Standard invoice:</strong> the everyday request for payment after goods or services are delivered.",
        "<strong>Proforma invoice:</strong> a preview sent before the sale is final, often so the buyer can approve costs or arrange import paperwork. Not a demand for payment.",
        "<strong>Commercial invoice:</strong> used in international shipping so customs can classify and value the goods.",
        "<strong>Recurring invoice:</strong> the same invoice issued on a schedule; typical for retainers, hosting, and subscriptions.",
        "<strong>Credit note:</strong> a negative invoice that corrects or refunds part of an earlier one.",
        "<strong>Interim and final invoices:</strong> instalments through a long project, then one closing invoice for the balance.",
      ]},
      { type: "h2", text: "Invoice vs bill vs receipt" },
      { type: "p", text: "An invoice and a bill are the same document seen from opposite ends: the seller issues an invoice, the buyer calls it a bill. A receipt is genuinely different. It comes after payment and confirms money was received, while an invoice comes before payment and asks for it. Mixing them up causes real accounting problems — a receipt can't be used to chase a debt, and an invoice proves nothing was paid. The full comparison is in our <a href=\"/blog/invoice-vs-receipt-difference\">invoice vs receipt guide</a>." },
      { type: "h2", text: "Is an invoice legally binding?" },
      { type: "p", text: "On its own, an invoice is not a contract; it's evidence of one. The binding agreement is the underlying deal: your quote, contract, or even an email thread agreeing scope and price. The invoice documents what was delivered under that agreement and what's owed, which is exactly why courts and tax inspectors give it weight. The practical upshot: agree the price in writing first, invoice against it, and keep both documents." },
      { type: "callout", text: "Seen enough theory? <a href=\"/\">Create a real invoice free with PDF Bill Builder</a> and you'll recognise every field from this article." },
    ],
    faq: [
      { q: "What is an invoice in simple terms?", a: "It's a written request for payment: a document from seller to buyer listing what was supplied, what it costs, and when payment is due. Once paid, it doubles as a record of the sale for both sides' accounts." },
      { q: "Who issues the invoice, the buyer or the seller?", a: "The seller issues it; the buyer receives it and typically calls it a bill. The one common exception is self-billing, where a large buyer generates invoices on the supplier's behalf under a written agreement." },
      { q: "Is an invoice the same as a receipt?", a: "No, and the difference matters. An invoice requests payment that hasn't happened yet, while a receipt confirms a payment that has. If a client asks for a receipt after paying your invoice, that's a separate, shorter document." },
      { q: "Is an invoice a legal document?", a: "It's strong legal evidence rather than a contract in itself. Paired with a quote or agreement, it documents the transaction for tax purposes and can support a claim in court if payment is ever disputed." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 29 — Purchase order vs invoice
  ══════════════════════════════════════════════ */
  "purchase-order-vs-invoice": {
    title: "Purchase Order vs Invoice: What's the Difference?",
    description: "Purchase order vs invoice explained — who creates each, when they're used, what they contain, and how they work together in the buying process. With examples.",
    date: "2026-06-09",
    updated: "2026-06-09",
    readMins: 5,
    keywords: ["purchase order vs invoice", "difference between purchase order and invoice", "po vs invoice", "what is a purchase order"],
    excerpt: "A purchase order is created by the buyer to order goods; an invoice is created by the seller to request payment. Here's how they differ and work together.",
    body: [
      { type: "p", text: "Purchase orders (POs) and invoices are both essential documents in business transactions, but they sit at opposite ends of the process and are created by different parties. Understanding the difference keeps your buying and selling organised and your records clean." },
      { type: "h2", text: "The key difference" },
      { type: "p", text: "A purchase order is created by the buyer and sent to the seller to officially request goods or services. An invoice is created by the seller and sent to the buyer to request payment after those goods or services are delivered. In short: the PO starts the order, the invoice closes it." },
      { type: "callout", text: `Need to send an invoice against a PO? ${CTA}` },
      { type: "h2", text: "What's on a purchase order?" },
      { type: "ul", items: [
        "A unique PO number",
        "The buyer's and seller's details",
        "A description of the goods or services ordered",
        "Quantities and agreed prices",
        "Delivery date and terms",
      ]},
      { type: "h2", text: "What's on an invoice?" },
      { type: "ul", items: [
        "A unique invoice number (and the matching PO number)",
        "The seller's and buyer's details",
        "What was actually delivered, with quantities and prices",
        "Tax and the total amount due",
        "Payment due date and methods",
      ]},
      { type: "h2", text: "How they work together" },
      { type: "ol", items: [
        "The buyer issues a purchase order to confirm what they want to buy.",
        "The seller accepts the PO and delivers the goods or services.",
        "The seller sends an invoice that references the PO number.",
        "The buyer matches the invoice to the PO and pays.",
      ]},
      { type: "p", text: "Referencing the PO number on your invoice is the single most important tip for getting paid by larger companies — their finance teams can't process an invoice they can't match to a PO. Always ask for the PO number before you invoice." },
    ],
    faq: [
      { q: "What comes first, a purchase order or an invoice?", a: "The purchase order comes first. The buyer issues a PO to order goods or services; the seller then delivers and sends an invoice requesting payment, usually referencing the PO number." },
      { q: "Who creates a purchase order?", a: "The buyer creates the purchase order and sends it to the seller. The seller creates the invoice and sends it back to the buyer." },
      { q: "Do I need a purchase order to send an invoice?", a: "Not always. Many small transactions skip the PO entirely. But when selling to larger companies, they often require a PO number on your invoice before they'll process payment." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 30 — What is a credit note
  ══════════════════════════════════════════════ */
  "what-is-a-credit-note": {
    title: "What Is a Credit Note? When and How to Issue One",
    description: "A credit note explained — what it is, when to issue one, how it differs from an invoice or refund, and what to include. With a simple example.",
    date: "2026-06-09",
    updated: "2026-06-09",
    readMins: 5,
    keywords: ["what is a credit note", "credit note meaning", "credit note vs invoice", "how to issue a credit note", "credit memo"],
    excerpt: "A credit note (or credit memo) reduces the amount a customer owes on a previous invoice. Here's when to issue one, how it works, and what to include.",
    body: [
      { type: "p", text: "A credit note — also called a credit memo — is a document a seller issues to a buyer that reduces the amount the buyer owes. It's effectively a negative invoice, used to correct an overcharge, account for returned goods, or apply a discount after an invoice has already been sent." },
      { type: "h2", text: "When do you issue a credit note?" },
      { type: "p", text: "You issue a credit note whenever you need to reduce a previously invoiced amount rather than cancel it entirely. Common situations include:" },
      { type: "ul", items: [
        "The customer returned some or all of the goods",
        "You overcharged on the original invoice",
        "Goods arrived damaged or faulty",
        "You agreed a discount or goodwill credit after invoicing",
        "There was a pricing or quantity error",
      ]},
      { type: "callout", text: `Need to create a corrected document? ${CTA}` },
      { type: "h2", text: "Credit note vs invoice vs refund" },
      { type: "p", text: "An invoice increases what a customer owes; a credit note decreases it. A credit note isn't necessarily a cash refund — it often reduces the balance owed or is applied against a future invoice. A refund is the actual return of money. Sometimes a credit note leads to a refund; sometimes it just offsets the next bill." },
      { type: "h2", text: "What to include on a credit note" },
      { type: "ol", items: [
        "The words 'Credit Note' and a unique credit note number",
        "The original invoice number it relates to",
        "Your details and the customer's details",
        "The date issued",
        "A description of why the credit is being given",
        "The amount being credited, with tax shown separately",
      ]},
      { type: "p", text: "Keep your credit note numbering separate from your invoice sequence, and always reference the original invoice. This keeps your accounts and tax records accurate and easy to audit." },
    ],
    faq: [
      { q: "What is a credit note in simple terms?", a: "A credit note is a document that reduces the amount a customer owes on a previous invoice. It acts like a negative invoice and is used for returns, overcharges, or post-invoice discounts." },
      { q: "Is a credit note the same as a refund?", a: "Not quite. A credit note reduces the amount owed and may be applied to a future invoice, while a refund is the actual return of money. A credit note can lead to a refund but isn't automatically one." },
      { q: "Does a credit note need to reference the original invoice?", a: "Yes. A credit note should always reference the original invoice number it relates to, so both parties and the tax authorities can match the correction to the original sale." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 31 — Invoicing mistakes to avoid
  ══════════════════════════════════════════════ */
  "invoicing-mistakes-to-avoid": {
    title: "10 Invoicing Mistakes That Delay Your Payments (and How to Fix Them)",
    description: "The most common invoicing mistakes that cause late payments — vague terms, missing details, no invoice number — and exactly how to fix each one to get paid faster.",
    date: "2026-06-09",
    updated: "2026-06-09",
    readMins: 6,
    keywords: ["invoicing mistakes", "common invoice errors", "why invoices get paid late", "invoice best practices", "how to avoid late payments"],
    excerpt: "Most late payments are caused by avoidable invoicing mistakes. Here are the 10 most common errors — vague terms, missing numbers, late sending — and how to fix each.",
    body: [
      { type: "p", text: "Late payments are the bane of every freelancer and small business — but a surprising number are caused by avoidable mistakes on the invoice itself. Fix these ten common errors and you'll get paid faster, with far less chasing." },
      { type: "h2", text: "1. Sending the invoice late" },
      { type: "p", text: "The longer you wait to invoice, the longer you wait to be paid. Send the invoice the same day you finish the work, while it's fresh in the client's mind." },
      { type: "h2", text: "2. No clear due date" },
      { type: "p", text: "‘Payment appreciated' isn't a due date. State an exact date — and the terms in words, e.g. 'Due within 14 days (by 30 June)'. Vague timing means your invoice drifts to the bottom of the pile." },
      { type: "h2", text: "3. Missing or duplicate invoice numbers" },
      { type: "p", text: "Every invoice needs a unique, sequential number. Without one, clients can't reference it and your own records get tangled. See our <a href=\"/blog/invoice-numbering-best-practices\">invoice numbering guide</a>." },
      { type: "h2", text: "4. Vague line items" },
      { type: "p", text: "'Services rendered — $2,000' invites questions and delays. Break the work into clear line items so the client can see exactly what they're paying for." },
      { type: "h2", text: "5. Forgetting the PO number" },
      { type: "p", text: "When billing larger companies, their finance team can't process an invoice without the matching purchase order number. Always ask for it before invoicing." },
      { type: "callout", text: `Avoid all of these automatically — ${CTA}` },
      { type: "h2", text: "6. No payment instructions" },
      { type: "p", text: "If the client has to email you to ask how to pay, you've added days of delay. Put your bank details, PayPal, or payment link directly on the invoice." },
      { type: "h2", text: "7. Maths errors" },
      { type: "p", text: "A wrong total destroys trust and forces a re-issue. Use a tool that calculates subtotals, tax, and the grand total for you so the numbers are always right." },
      { type: "h2", text: "8. Charging the wrong tax (or tax you shouldn't)" },
      { type: "p", text: "Only charge VAT, GST, or sales tax if you're registered to. Showing tax you can't legally charge is a serious error; forgetting tax you owe is just as costly." },
      { type: "h2", text: "9. Sending to the wrong person" },
      { type: "p", text: "An invoice sent to your day-to-day contact instead of accounts payable can sit unseen for weeks. Confirm exactly who should receive invoices." },
      { type: "h2", text: "10. Not following up" },
      { type: "p", text: "Silence after the due date rarely gets you paid. A polite reminder a day or two after the deadline resolves most late payments — use our <a href=\"/blog/payment-reminder-email-templates\">reminder email templates</a>." },
    ],
    faq: [
      { q: "Why do my invoices get paid late?", a: "The most common reasons are avoidable: sending the invoice late, no clear due date, vague line items, missing payment instructions, or no follow-up. Fixing these usually speeds up payment dramatically." },
      { q: "What's the most important thing on an invoice for getting paid?", a: "A clear due date and easy payment instructions. If the client knows exactly when and how to pay, most of the friction disappears." },
      { q: "How soon should I send an invoice?", a: "The same day you complete the work, if possible. The sooner the invoice arrives, the sooner the payment clock starts and the fresher the work is in the client's mind." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 32 — How to invoice as a sole trader (UK high CPC)
  ══════════════════════════════════════════════ */
  "how-to-invoice-as-a-sole-trader": {
    title: "How to Invoice as a Sole Trader (UK Guide 2026)",
    description: "How to invoice as a sole trader in the UK — what to put on your invoice, whether you need to charge VAT, record-keeping for Self Assessment, and a free template.",
    date: "2026-06-09",
    updated: "2026-06-09",
    readMins: 6,
    keywords: ["how to invoice as a sole trader", "sole trader invoice", "sole trader invoice template uk", "do sole traders charge vat", "self employed invoice uk"],
    excerpt: "A practical guide to invoicing as a UK sole trader — what your invoice must include, whether you charge VAT, and how to keep records for Self Assessment.",
    body: [
      { type: "p", text: "As a sole trader, invoicing is how you get paid and how you prove your income to HMRC. The good news is the rules are simple — you don't need to be VAT-registered or use expensive software to invoice professionally. Here's everything a UK sole trader needs to know." },
      { type: "h2", text: "What a sole trader invoice must include" },
      { type: "p", text: "Even as a sole trader, your invoice should look professional and contain the essentials. There's no legal requirement to register a company — you can invoice under your own name or a trading name." },
      { type: "ul", items: [
        "Your name (and trading name, if you use one)",
        "Your address and contact details",
        "The word 'Invoice' and a unique invoice number",
        "The client's name and address",
        "The date and payment due date",
        "A clear description of the work, with amounts",
        "The total due and how to pay you",
      ]},
      { type: "callout", text: `Create a clean sole trader invoice in seconds — ${CTA}` },
      { type: "h2", text: "Do sole traders charge VAT?" },
      { type: "p", text: "Only if you're VAT-registered. You must register for VAT once your turnover exceeds £90,000 (2024/25 threshold); below that it's optional. Most sole traders under the threshold don't charge VAT — and if you're not registered, you must not show or charge VAT on your invoices." },
      { type: "h2", text: "Record-keeping for Self Assessment" },
      { type: "p", text: "As a sole trader you report your income through Self Assessment each year. Keep a copy of every invoice you send — HMRC requires you to retain business records for at least five years after the 31 January submission deadline for that tax year. Numbered, dated PDF invoices make totalling your income and completing your return straightforward." },
      { type: "h2", text: "Getting paid on time" },
      { type: "ol", items: [
        "Agree your price and payment terms before starting work.",
        "Send the invoice promptly when the job is done.",
        "Use short terms like Net 7 or Net 14.",
        "Include your bank details so the client can pay instantly.",
        "Follow up politely if payment is late.",
      ]},
      { type: "p", text: "For more, see our <a href=\"/blog/uk-vat-invoice-requirements\">UK VAT invoice guide</a> and the <a href=\"/invoice-generator-uk\">free UK invoice generator</a>." },
    ],
    faq: [
      { q: "Do I need to be registered to invoice as a sole trader?", a: "No. As a sole trader you can invoice under your own name or a trading name without registering a limited company. You just need to register as self-employed with HMRC for Self Assessment." },
      { q: "Do sole traders need to charge VAT?", a: "Only if your turnover exceeds the VAT registration threshold (£90,000 in 2024/25) or you register voluntarily. If you're not VAT-registered, you must not charge or show VAT on your invoices." },
      { q: "How long should a sole trader keep invoices?", a: "HMRC requires you to keep business records, including invoices, for at least five years after the 31 January Self Assessment deadline for the relevant tax year." },
    ],
  },

  /* ══════════════════════════════════════════════
     POST 33 — Recurring invoices
  ══════════════════════════════════════════════ */
  "what-is-a-recurring-invoice": {
    title: "What Is a Recurring Invoice? A Guide for Subscriptions & Retainers",
    description: "What a recurring invoice is, when to use one, and how to manage repeat billing for subscriptions and retainers — plus tips to keep recurring payments on time.",
    date: "2026-06-09",
    updated: "2026-06-09",
    readMins: 5,
    keywords: ["recurring invoice", "what is a recurring invoice", "recurring billing", "retainer invoice", "subscription invoice"],
    excerpt: "A recurring invoice is sent automatically on a set schedule for ongoing services — like retainers or subscriptions. Here's when to use one and how to manage it.",
    body: [
      { type: "p", text: "A recurring invoice is an invoice sent to the same customer on a regular, repeating schedule — weekly, monthly, or yearly — for ongoing goods or services. It's the standard way to bill retainers, subscriptions, memberships, and any service with a steady, predictable fee." },
      { type: "h2", text: "When to use a recurring invoice" },
      { type: "p", text: "Recurring invoices make sense whenever you bill the same client the same (or similar) amount on a regular basis:" },
      { type: "ul", items: [
        "Monthly retainers for consulting, design, or marketing",
        "Subscription products or memberships",
        "Ongoing maintenance or support contracts",
        "Rent or regular service fees",
        "Any predictable, repeating charge",
      ]},
      { type: "callout", text: `Set up your repeat invoice template once — ${CTA}` },
      { type: "h2", text: "Benefits of recurring billing" },
      { type: "p", text: "Recurring invoices save you from recreating the same invoice every period, reduce the risk of forgetting to bill, and give both you and your client predictable cash flow. For the client, they're easy to budget for and approve." },
      { type: "h2", text: "Tips for managing recurring invoices" },
      { type: "ol", items: [
        "Keep the invoice template consistent so the client recognises it instantly.",
        "Use a clear period reference, e.g. 'Retainer — June 2026'.",
        "Increment the invoice number each period for clean records.",
        "Send on the same day each cycle so the client can expect it.",
        "Confirm any price change in writing before the next invoice.",
      ]},
      { type: "p", text: "Even without automated software, you can run recurring billing efficiently by saving a template, duplicating it each period, and updating the date, period, and invoice number. A consistent, professional invoice keeps long-term clients paying on time." },
    ],
    faq: [
      { q: "What is a recurring invoice?", a: "A recurring invoice is one sent to the same customer on a regular schedule — such as monthly or yearly — for ongoing services like retainers, subscriptions, or memberships." },
      { q: "What's the difference between a recurring invoice and a subscription?", a: "A subscription is the billing arrangement; a recurring invoice is the document that requests each payment within it. Subscriptions are often billed via recurring invoices." },
      { q: "How do I manage recurring invoices without software?", a: "Save a consistent invoice template, duplicate it each billing period, and update the date, the period reference, and the invoice number. Send it on the same day each cycle for predictability." },
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
