/* ───────────────────────────────────────────────
   UNIQUE per-page content for each landing page.
   This is what makes every /slug page genuinely different
   from the others — critical for SEO (no duplicate content)
   AND for AdSense approval (no "low value / scaled content").

   Rendered by app/[profession]/page.tsx via <LandingContent>.
   Each entry: a unique intro + 2-3 unique sections.
─────────────────────────────────────────────── */
export interface LandingSection {
  h: string;
  p: string;
  list?: string[];
}
export interface LandingContentEntry {
  intro: string;
  sections: LandingSection[];
}

export const LANDING_CONTENT: Record<string, LandingContentEntry> = {
  /* ───────── By profession ───────── */
  "freelancer-invoice": {
    intro:
      "As a freelancer, your invoice is often the last impression a client has of a project — so it needs to look as polished as the work itself. Whether you charge by the hour, by the day, or a fixed project fee, a clear freelance invoice spells out exactly what you did, what it costs, and when payment is due, which is the single biggest factor in getting paid on time.",
    sections: [
      {
        h: "What every freelance invoice should include",
        p: "Freelance clients pay faster when there is no ambiguity. A complete freelance invoice removes the back-and-forth that delays payment and protects you if a dispute ever comes up.",
        list: [
          "Your name or business name, plus how clients should pay you",
          "A unique invoice number so both sides can reference it",
          "A line item for each deliverable, with hours or quantity and your rate",
          "The project or retainer name, so the client's finance team can match it to a PO",
          "A clear due date and your accepted payment methods",
        ],
      },
      {
        h: "Hourly, day-rate, or fixed fee — how to bill each",
        p: "If you bill hourly, list the hours against your rate so the client sees the breakdown. For a day rate, one line per day worked keeps it simple. For fixed-fee projects, a single line with the agreed amount looks cleanest — and you can add milestone lines (deposit, on delivery) for larger jobs. The generator above totals everything automatically, so you never send a maths error to a client.",
      },
      {
        h: "Getting paid on time as a freelancer",
        p: "Send the invoice the day you deliver, use short terms like Net 7 or Net 14, and include your payment details directly on the document. If a client is late, a polite reminder a day or two after the due date resolves most cases — keeping every invoice numbered and dated makes those follow-ups quick and professional.",
      },
    ],
  },

  "contractor-invoice": {
    intro:
      "Contractor invoices live or die on detail. Clients want to see exactly what they are paying for — the labour, the materials, the equipment, and the tax — broken out line by line. A clear contractor invoice not only gets you paid faster, it also doubles as a record for warranties, change orders, and tax season.",
    sections: [
      {
        h: "Separate labour from materials",
        p: "The cleanest contractor invoices split labour and materials into their own line items. This lets the client see the value of your work versus the cost of supplies, makes change orders easy to add, and is essential if any portion of the job is taxed differently or reimbursed by a third party.",
        list: [
          "Labour — hours or days worked, with your rate",
          "Materials — itemised with quantities and unit costs",
          "Equipment or plant hire, if charged separately",
          "Permits, disposal, or call-out fees",
          "Tax applied to the appropriate lines",
        ],
      },
      {
        h: "Deposits, progress payments, and retention",
        p: "For larger jobs, few contractors invoice the full amount at the end. Take a deposit up front, invoice progress payments at agreed milestones, and issue a final invoice on completion. If your contract holds back a retention percentage, show it clearly so the client knows the balance is due once the defects period ends.",
      },
      {
        h: "Why a professional invoice protects you",
        p: "A detailed, numbered invoice is your paper trail. If a client questions a charge months later, your itemised record settles it instantly. It also keeps your bookkeeping clean for tax and helps you spot which types of jobs are actually the most profitable.",
      },
    ],
  },

  "consultant-invoice": {
    intro:
      "Consulting is sold on credibility, and your invoice is part of that brand. A consultant's invoice should look as considered as your advice — clean, branded, and unambiguous about scope and fees. Whether you bill a monthly retainer, a project fee, or by the hour, the right invoice reinforces that clients are working with a professional.",
    sections: [
      {
        h: "Retainers vs project fees vs hourly",
        p: "Each billing model needs a slightly different invoice. A retainer invoice states the monthly fee and the period it covers. A project invoice references the statement of work and any milestones. An hourly invoice lists sessions or days with a short description of what was delivered, so the client can connect the fee to outcomes.",
        list: [
          "Retainer — fixed monthly amount and the service period",
          "Project — reference the SOW and bill by milestone",
          "Hourly — list dates, hours, and a brief deliverable note",
          "Expenses — travel or software, itemised and clearly marked",
        ],
      },
      {
        h: "Brand every invoice",
        p: "Add your logo, set an accent colour, and keep your layout consistent across every client. Consistent branding makes your invoices instantly recognisable to a client's finance team, which means fewer queries and faster approval.",
      },
      {
        h: "Make scope visible to avoid disputes",
        p: "Consulting disputes almost always come down to scope. A short description on each line — what was advised, delivered, or reviewed — turns your invoice into a record of value delivered, not just a number, and makes renewal conversations far easier.",
      },
    ],
  },

  "small-business-invoice": {
    intro:
      "Running a small business means wearing every hat, and billing should never be the bottleneck. A reliable invoicing routine — consistent numbering, clear terms, and a professional layout — keeps cash flowing and your records audit-ready, whether you are sending five invoices a month or fifty.",
    sections: [
      {
        h: "One tool for invoices, receipts, and quotes",
        p: "Small businesses rarely need just invoices. You quote a job, you invoice the work, and you confirm payment with a receipt. Handling all three with one consistent design saves time and looks far more professional to your customers than a patchwork of Word and Excel files.",
        list: [
          "Quotations — win the work with a clear, branded estimate",
          "Invoices — bill with itemised lines, tax, and due dates",
          "Receipts — confirm payment and keep customers' records clean",
        ],
      },
      {
        h: "Keep your numbering and records clean",
        p: "Sequential invoice numbers (INV-001, INV-002…) make it impossible to lose track of what's been billed and what's outstanding. Clean, dated records also make tax filing painless and protect you in the event of an audit.",
      },
      {
        h: "Look bigger than you are",
        p: "A branded, well-formatted invoice signals reliability. For a small business competing with larger players, that polish builds trust with new customers and encourages repeat business — at no extra cost.",
      },
    ],
  },

  "self-employed-invoice": {
    intro:
      "When you are self-employed, every invoice you send is both a request for payment and a record for your own tax return. Keeping them simple, consistent, and professional means you get paid without friction and have a clean paper trail when it's time to report your income.",
    sections: [
      {
        h: "Invoicing basics for the self-employed",
        p: "You don't need accounting software to invoice well. You need your details, the client's details, a clear list of what you did, and a due date. The generator above handles the formatting and the maths so you can focus on the work.",
        list: [
          "Your name, address, and payment details",
          "The client's name and contact info",
          "A unique invoice number and the date",
          "What you did, with amounts, plus any tax",
          "A clear due date and payment method",
        ],
      },
      {
        h: "Keep records for tax time",
        p: "Self-employment means you are responsible for your own tax. Numbered, dated PDF invoices are the simplest possible record of your income — keep a copy of every one, and reporting your earnings becomes a matter of adding them up rather than reconstructing the year from memory.",
      },
      {
        h: "Should you charge tax?",
        p: "Only if you are registered for sales tax, VAT, or GST in your country. If you are, show the tax separately and clearly. If you are not registered, do not add tax to your invoices — just bill the agreed amount.",
      },
    ],
  },

  /* ───────── By country ───────── */
  "invoice-generator-usa": {
    intro:
      "Invoicing US clients comes with its own conventions — billing in US dollars, applying state sales tax where it's due, and supplying clean records for 1099 reporting. This free generator is set up for the way American freelancers, contractors, and small businesses bill, so you can send a professional invoice in dollars in under a minute.",
    sections: [
      {
        h: "Sales tax in the United States",
        p: "Unlike VAT, US sales tax is set at the state (and sometimes city) level, and many services are not taxable at all. If you sell taxable goods, apply your state's rate and show it as its own line. If your work isn't taxable or you're billing across state lines, you may not charge sales tax at all — when in doubt, check your state's department of revenue.",
      },
      {
        h: "1099 contractors and W-9s",
        p: "If you're an independent contractor, your clients may report payments to you on a 1099 form and ask for a W-9. Your invoices are the matching record of what you were paid. Keep them numbered and dated so your reported income lines up cleanly with any 1099s you receive at year end.",
        list: [
          "Bill in US dollars with clear line items",
          "Add state sales tax only where it applies",
          "Keep numbered invoices to match 1099 income",
          "Include your payment details (ACH, Zelle, check, PayPal)",
        ],
      },
    ],
  },

  "invoice-generator-canada": {
    intro:
      "Canadian invoicing revolves around GST/HST and, in some provinces, PST or QST. This generator lets you bill in Canadian dollars and apply the right tax for your province, so freelancers, contractors, and small businesses across Canada can send a compliant, professional invoice in seconds.",
    sections: [
      {
        h: "GST, HST, PST — what applies to you",
        p: "Canada's sales tax depends on your province. Provinces like Ontario use a single Harmonised Sales Tax (HST), while others charge the federal GST plus a separate provincial tax (PST), and Quebec uses QST. Apply the combined rate for your province and show it clearly on the invoice.",
        list: [
          "HST provinces (e.g. Ontario, Nova Scotia) — one combined rate",
          "GST + PST provinces (e.g. BC, Saskatchewan, Manitoba)",
          "GST only (e.g. Alberta and the territories)",
          "Quebec — GST plus QST",
        ],
      },
      {
        h: "When you must register for GST/HST",
        p: "If your revenue exceeds the CRA's small-supplier threshold of $30,000 over four consecutive quarters, you must register for GST/HST, charge it, and include your registration number on invoices. Below that you can register voluntarily, but you don't have to — in which case you should not charge GST/HST.",
      },
    ],
  },

  "invoice-generator-uk": {
    intro:
      "UK invoicing centres on VAT and, for many, the realities of being a sole trader. This generator bills in pounds sterling and lets you add VAT at the right rate, so sole traders, freelancers, and small businesses can produce an HMRC-friendly invoice in seconds.",
    sections: [
      {
        h: "VAT and the registration threshold",
        p: "You only charge VAT once you're VAT-registered, which becomes mandatory when your taxable turnover passes the HMRC threshold (£90,000 as of 2024/25). If you're registered, show your VAT number, the rate (usually 20%), and the VAT amount in sterling. If you're not registered, you must not add VAT to your invoices.",
        list: [
          "Standard rate — 20% on most goods and services",
          "Reduced rate — 5% (e.g. domestic energy)",
          "Zero rate — 0% (e.g. most food, children's clothes, books)",
          "Show your VAT number once registered",
        ],
      },
      {
        h: "Sole traders and record-keeping",
        p: "As a sole trader you report business income through Self Assessment, so clean invoice records matter. HMRC expects you to keep invoices for at least five years (six if VAT-registered). Numbered, dated PDFs make your annual return — and any HMRC enquiry — far simpler to handle.",
      },
    ],
  },

  "invoice-generator-australia": {
    intro:
      "Australian invoicing is built around the ABN and GST. Whether you're a sole trader or a growing business, getting these right keeps you compliant with the ATO and ensures your clients can claim their GST credits. This generator bills in Australian dollars and supports GST out of the box.",
    sections: [
      {
        h: "You need an ABN to invoice",
        p: "If you're carrying on an enterprise in Australia, your invoice should show your Australian Business Number. Without an ABN, the paying business is legally required to withhold 47% of the payment under the no-ABN withholding rules — so getting your free ABN before you bill is essential.",
      },
      {
        h: "GST and tax invoices",
        p: "Once your turnover reaches $75,000 you must register for GST, charge 10%, and issue 'tax invoices'. A compliant tax invoice shows the words 'Tax Invoice', your ABN, the GST amount, and the GST-inclusive total. For sales over $1,000 you must also show the buyer's details.",
        list: [
          "Display the words 'Tax Invoice' clearly",
          "Show your ABN and the date",
          "Show the 10% GST amount or state 'includes GST'",
          "For invoices over $1,000, include the buyer's identity",
        ],
      },
    ],
  },

  "invoice-generator-india": {
    intro:
      "Invoicing in India is shaped by GST, and for B2B work the right invoice lets your client claim input tax credit. This generator bills in rupees and supports the tax fields Indian freelancers, consultants, and small businesses need to issue a clean, GST-ready invoice.",
    sections: [
      {
        h: "GST invoices and input tax credit",
        p: "If you're GST-registered, a proper tax invoice lets your business clients claim input tax credit, which makes you easier to work with. A GST invoice should show your GSTIN, the place of supply, the applicable CGST/SGST or IGST split, and the HSN/SAC code for what you're selling.",
        list: [
          "Your GSTIN and the client's GSTIN (for B2B)",
          "CGST + SGST for intra-state, or IGST for inter-state supply",
          "HSN code (goods) or SAC code (services)",
          "Invoice number and date in a continuous series",
        ],
      },
      {
        h: "Do you need to register for GST?",
        p: "GST registration is generally required once turnover crosses the threshold (commonly ₹20 lakh for services, ₹40 lakh for goods, lower in some states), or immediately for inter-state supply and most online selling. Below the threshold you can issue a simple bill of supply without charging GST.",
      },
    ],
  },

  "invoice-generator-pakistan": {
    intro:
      "For freelancers and businesses in Pakistan — especially those billing overseas clients — a clean, professional invoice in the right currency is essential for getting paid and keeping records for the State Bank and FBR. This generator lets you bill in rupees or dollars and download a polished PDF in seconds.",
    sections: [
      {
        h: "Invoicing international clients",
        p: "Many Pakistani freelancers bill clients in the US, UK, and Gulf in foreign currency. Set the currency to dollars (or your client's currency), include your full details and a clear description of the service, and keep every invoice — they support your foreign-remittance records when funds arrive through your bank or a service like Payoneer or Wise.",
        list: [
          "Bill in USD, GBP, AED, or PKR as needed",
          "Add a clear service description for each line",
          "Keep numbered invoices for your remittance records",
          "Include your payment details for faster settlement",
        ],
      },
      {
        h: "Records for FBR and tax",
        p: "Whether you're a freelancer or run a registered business, organised invoice records make filing your annual income tax return with the FBR far simpler. Sequential, dated PDF invoices are the easiest way to total your income accurately and back it up if ever questioned.",
      },
    ],
  },

  /* ───────── By document type / topic ───────── */
  "rent-receipt": {
    intro:
      "A rent receipt is proof that a tenant has paid their rent for a given period. Landlords use them to keep clean records, and tenants often need them to claim House Rent Allowance (HRA), apply for visas or loans, or simply have evidence of payment. This free tool creates a clear rent receipt you can download and hand over in seconds.",
    sections: [
      {
        h: "What a rent receipt should include",
        p: "A valid rent receipt leaves no room for doubt about who paid, how much, and for which period. Include all of the details below so the receipt stands up as evidence for tax or any dispute.",
        list: [
          "Tenant's name and the property address",
          "Landlord's name and signature",
          "The amount paid and the payment method",
          "The rental period the payment covers (e.g. month and year)",
          "The date of payment and a receipt number",
        ],
      },
      {
        h: "Rent receipts for HRA and tax",
        p: "Salaried employees in many countries need rent receipts to claim House Rent Allowance and reduce their taxable income. Some tax authorities also require the landlord's PAN or tax ID on receipts above a certain monthly rent. Issuing a clean, numbered receipt each month keeps both landlord and tenant covered.",
      },
    ],
  },

  "proforma-invoice": {
    intro:
      "A proforma invoice is a preliminary bill of sale sent before a transaction is finalised. It tells the buyer exactly what to expect — the goods or services, the quantities, and the estimated cost — without being a formal demand for payment. It's widely used for quotes, advance payments, and international shipping.",
    sections: [
      {
        h: "Proforma vs a commercial invoice",
        p: "A proforma is sent before the sale is confirmed and is not recorded as a sale or used to reclaim tax. A commercial invoice comes once the sale is agreed or delivered, demands payment, and is your official accounting record. Think of the proforma as a detailed, binding-looking estimate.",
      },
      {
        h: "When to use a proforma invoice",
        p: "Reach for a proforma when a customer needs a formal document to approve a purchase or arrange funds, when you're taking a deposit, or when shipping goods internationally so customs can estimate duties before arrival.",
        list: [
          "To give a customer a formal quote for internal approval",
          "To request an advance payment or deposit",
          "For customs on international shipments",
          "When final quantities or prices may still change",
        ],
      },
    ],
  },

  "commercial-invoice": {
    intro:
      "A commercial invoice is the primary document used in international trade. Customs authorities rely on it to assess duties and taxes, and it serves as the legal record of a cross-border sale. Getting it right keeps your shipments moving and avoids costly delays at the border.",
    sections: [
      {
        h: "What customs needs on a commercial invoice",
        p: "Customs officers use the commercial invoice to value a shipment and apply the correct duties. Missing or vague information is one of the most common causes of shipments being held, so be thorough and accurate.",
        list: [
          "Full exporter (seller) and importer (buyer) details",
          "A detailed description of each item and its quantity",
          "The value of each item and the currency",
          "Country of origin of the goods",
          "Harmonised System (HS) codes where required",
          "Shipping terms (Incoterms) and reason for export",
        ],
      },
      {
        h: "Commercial vs proforma invoice in shipping",
        p: "A proforma invoice is often sent first so the buyer and customs can preview the shipment. The commercial invoice is the final, definitive document that accompanies the goods and is used to clear customs and collect payment. The values on both should match unless something genuinely changed.",
      },
    ],
  },

  "hourly-invoice": {
    intro:
      "An hourly invoice bills a client based on the time you worked rather than a fixed fee. It's the standard for many freelancers, consultants, lawyers, and agencies. The key to a good hourly invoice is transparency — showing the hours, the rate, and what was done so the total is never a surprise.",
    sections: [
      {
        h: "Show your hours clearly",
        p: "List each block of work as its own line with the hours, your rate, and a short description of the task. This lets the client connect the time billed to the value delivered and dramatically reduces queries. The generator above multiplies hours by rate and totals everything automatically.",
        list: [
          "One line per task or session",
          "Hours worked × your hourly rate",
          "A brief description of what was done",
          "Tax applied if you're registered, then the grand total",
        ],
      },
      {
        h: "Track time so invoicing is painless",
        p: "Whether you use a timer app or a simple spreadsheet, recording hours as you go means your invoice writes itself at the end of the period. Round consistently (to 6, 15, or 30 minutes), agree the rounding with your client up front, and keep your notes so you can answer any question about a line.",
      },
    ],
  },

  "bill-generator": {
    intro:
      "A bill generator lets you create a clean, professional bill for any product or service and download it as a PDF — no software, no signup. Whether you run a shop, provide a service, or just need to bill a one-off, this free tool turns your line items into a tidy bill in seconds.",
    sections: [
      {
        h: "Bill or invoice — what's the difference?",
        p: "In everyday use, 'bill' and 'invoice' mean almost the same thing: a document requesting payment for goods or services. 'Bill' is the more casual term a customer hears ('here's your bill'), while 'invoice' is the formal business term. The structure and the steps to create one are identical.",
      },
      {
        h: "Make a bill in seconds",
        p: "Add your business name, list what you're charging for with quantities and prices, apply tax if needed, and download. The total calculates itself and the layout fits neatly onto a single page, so your bill looks professional whether it's for a customer at the counter or a client by email.",
        list: [
          "Add your details and the customer's",
          "List items with quantity and price",
          "Apply tax, inclusive or exclusive",
          "Download a clean PDF bill to print or send",
        ],
      },
    ],
  },

  "online-bill-maker": {
    intro:
      "An online bill maker lets you create bills from any device with a browser — no installs, no accounts, no cost. It's ideal when you need to send a professional bill quickly, from a laptop or a phone, without opening clunky software or wrestling with a spreadsheet.",
    sections: [
      {
        h: "Why use an online bill maker",
        p: "Because it works anywhere. Everything runs in your browser, so you can make a bill on a job site from your phone, at a market stall on a tablet, or at your desk — and the PDF comes out identical every time. Your data stays on your device and is never uploaded.",
        list: [
          "Works on phone, tablet, and desktop",
          "Nothing to install or update",
          "No signup and no fees",
          "Private — your data never leaves your browser",
        ],
      },
      {
        h: "Professional results, zero learning curve",
        p: "You don't need design skills or accounting knowledge. Fill in a few fields, add your logo if you want, and download. The layout, totals, and tax are handled for you, so even your first bill looks like it came from an established business.",
      },
    ],
  },

  "bill-format": {
    intro:
      "Getting your bill format right matters: a well-structured bill is easy to read, looks professional, and gets paid faster. A standard bill format follows a predictable order so customers and finance teams can scan it instantly and find exactly what they need.",
    sections: [
      {
        h: "The standard bill format, top to bottom",
        p: "A professional bill follows a familiar structure. Sticking to it means your customers always know where to look, which reduces questions and speeds up payment.",
        list: [
          "Header — 'Bill' or 'Invoice', your logo and business name",
          "Your details and the customer's details",
          "Bill number and date, plus a due date",
          "Itemised table — description, quantity, rate, amount",
          "Subtotal, tax, and a clear grand total",
          "Payment details and any notes or terms",
        ],
      },
      {
        h: "Format once, reuse forever",
        p: "Once you settle on a clean format, every bill you send should follow it. Consistency builds trust and recognition with repeat customers, and it makes your own record-keeping effortless because every document looks and reads the same way.",
      },
    ],
  },

  "free-invoice-generator": {
    intro:
      "A genuinely free invoice generator should let you create unlimited invoices, with no watermark, no signup, and no surprise paywall. This one does exactly that — you fill in your details, list your work, and download a clean PDF invoice, as many times as you like, at no cost.",
    sections: [
      {
        h: "What 'free' should actually mean",
        p: "Many 'free' tools limit you to a handful of invoices, stamp a watermark on the PDF, or require a credit card. A truly free generator has none of those catches. Everything you need to bill a client professionally is available without paying or creating an account.",
        list: [
          "Unlimited invoices, receipts, and quotations",
          "No watermark on your PDF",
          "No signup or credit card required",
          "Logo, colours, multi-currency, and tax included",
        ],
      },
      {
        h: "Private by design",
        p: "Because the invoice is built entirely in your browser, your business and client details are never uploaded to a server. Free shouldn't mean your data becomes the product — here, your information stays on your device, full stop.",
      },
    ],
  },

  "invoice-template-free": {
    intro:
      "A free invoice template gives you a professional structure without starting from a blank page. Instead of formatting a Word or Excel file and hoping the maths is right, you fill in a ready-made layout and download a polished PDF — with the totals and tax calculated for you.",
    sections: [
      {
        h: "Why a template beats Word or Excel",
        p: "Word templates break when you add rows, and Excel sheets are easy to misformat or miscalculate. A purpose-built invoice template keeps the layout intact no matter how many items you add, totals everything automatically, and always exports a clean, single-page PDF.",
        list: [
          "Totals and tax calculate automatically",
          "Layout never breaks when you add line items",
          "Consistent, professional design every time",
          "One-click PDF export — no print-to-PDF hassle",
        ],
      },
      {
        h: "Customise it to your brand",
        p: "A good template is a starting point, not a straitjacket. Add your logo, choose an accent colour, set your currency, and pick tax-inclusive or tax-exclusive billing. The result looks bespoke to your business while saving you all the formatting work.",
      },
    ],
  },

  "construction-invoice": {
    intro:
      "Construction invoices have to capture a lot: labour across trades, materials, equipment, permits, and often progress payments across a long job. A clear, itemised construction invoice keeps clients confident about what they're paying for and gives you a solid record for every stage of the build.",
    sections: [
      {
        h: "Itemise every part of the job",
        p: "On a construction job, lumping everything into one figure invites disputes. Break the invoice into clear sections so the client can see exactly where their money is going and approve it without hesitation.",
        list: [
          "Labour by trade, with hours or days and rates",
          "Materials, itemised with quantities and costs",
          "Equipment and plant hire",
          "Permits, inspections, and disposal fees",
          "Tax applied to the relevant lines",
        ],
      },
      {
        h: "Progress billing and retention",
        p: "Few construction jobs are billed in a single invoice. Take a deposit, invoice at agreed milestones as the work progresses, and issue a final invoice on completion. If the contract holds a retention percentage until the defects period ends, show it clearly so everyone knows what's outstanding and when it's due.",
      },
    ],
  },

  "invoice-generator-australia-gst": {
    intro:
      "If you're registered for GST in Australia, every sale over $82.50 needs a compliant tax invoice. This generator is set up for Australian GST billing — it lets you show your ABN, apply 10% GST, and produce a 'Tax Invoice' the ATO and your clients will accept.",
    sections: [
      {
        h: "Anatomy of a compliant Australian tax invoice",
        p: "The ATO is specific about what a tax invoice must contain. Include each of the following and your client can confidently claim their GST credit while you stay compliant.",
        list: [
          "The words 'Tax Invoice' displayed prominently",
          "Your business or trading name and your ABN",
          "The date of issue",
          "A description of the goods or services",
          "The GST amount, or a statement that the price includes GST",
          "For invoices over $1,000, the buyer's name and ABN",
        ],
      },
      {
        h: "When GST applies",
        p: "You must register for and charge GST once your turnover reaches $75,000 a year. GST is 10% on most taxable sales, though some items are GST-free (such as basic food and exports). Exports and most services to overseas clients are generally GST-free — show these clearly so the zero rate is obvious.",
      },
    ],
  },

  "invoice-generator-for-small-business": {
    intro:
      "Small businesses need invoicing that's fast, professional, and free — not another monthly subscription. This generator lets you create branded invoices, receipts, and quotations and download them as PDFs instantly, so billing never slows your business down or eats into your margins.",
    sections: [
      {
        h: "Built for how small businesses bill",
        p: "From a single line item to a long, itemised order, the generator keeps every invoice on one clean page with the totals and tax worked out for you. Add your logo and colour once, and every document reinforces your brand.",
        list: [
          "Branded invoices, receipts, and quotes in one place",
          "Multi-currency for customers abroad",
          "Tax-inclusive or tax-exclusive billing",
          "Sequential numbering for tidy records",
        ],
      },
      {
        h: "Save money as you grow",
        p: "Dedicated invoicing software can cost hundreds a year — money better spent growing your business. A free generator covers everything most small businesses need, and if you ever want invoice history and an ad-free workspace, an affordable Pro upgrade is there when you need it.",
      },
    ],
  },

  "free-invoice-maker": {
    intro:
      "A free invoice maker should be exactly that: open it, make a professional invoice, download it, done — with no account and no cost. This tool turns your details and line items into a clean PDF invoice in under a minute, as often as you need.",
    sections: [
      {
        h: "Make an invoice in four steps",
        p: "There's no learning curve. The whole process takes about a minute and produces a polished, single-page PDF every time.",
        list: [
          "Choose Invoice, Receipt, or Quotation",
          "Add your details, the client's, and your logo",
          "List items with quantity and rate — totals auto-calculate",
          "Download the PDF or print it to send",
        ],
      },
      {
        h: "No catch, no watermark",
        p: "Unlike many free tools, there's no watermark on your invoice, no cap on how many you can make, and no credit card required. Your data stays in your browser, so making invoices for free never costs you your privacy either.",
      },
    ],
  },

  "freelance-invoice-template-usa": {
    intro:
      "US freelancers need an invoice template that bills in dollars, handles sales tax where it applies, and produces records that line up with 1099 reporting. This free template is tailored for American freelancers, so you can send a clean, professional invoice that gets you paid and keeps your taxes tidy.",
    sections: [
      {
        h: "What US freelance clients expect",
        p: "American clients — especially agencies and larger companies — expect a clear, itemised invoice with a unique number, your payment details, and a defined due date. Many will report your earnings on a 1099, so your invoices should be easy to reconcile against those forms at year end.",
        list: [
          "Bill in US dollars with itemised lines",
          "A unique invoice number and clear due date",
          "Your payment details (ACH, Zelle, PayPal, check)",
          "Numbered records that match any 1099s you receive",
        ],
      },
      {
        h: "Sales tax for freelancers",
        p: "Most freelance services aren't subject to sales tax, but rules vary by state and by what you sell. If you provide taxable goods or services, apply your state's rate as a separate line; if not, you typically won't charge sales tax at all. Check your state's department of revenue if you're unsure.",
      },
    ],
  },

  "invoice-template-canada": {
    intro:
      "A Canadian invoice template should bill in Canadian dollars and handle GST/HST (and PST or QST where it applies) correctly. This free template is set up for Canada, so freelancers and small businesses can issue a compliant, professional invoice without wrestling with tax formatting.",
    sections: [
      {
        h: "Apply the right tax for your province",
        p: "Canada's sales tax depends on where you are. HST provinces use a single combined rate, others charge GST plus PST, Alberta and the territories charge GST only, and Quebec adds QST. Apply your province's rate, show it as its own line, and include your GST/HST number if you're registered.",
        list: [
          "HST (e.g. Ontario) — one combined rate",
          "GST + PST (e.g. BC, Manitoba, Saskatchewan)",
          "GST only (Alberta and the territories)",
          "Quebec — GST plus QST",
        ],
      },
      {
        h: "Registration and record-keeping",
        p: "You must register for GST/HST once revenue tops $30,000 over four consecutive quarters; below that it's optional. Either way, keep numbered, dated invoices — the CRA expects you to retain business records for six years, and clean invoices make filing your return straightforward.",
      },
    ],
  },

  /* ───────── By profession (batch 2) ───────── */
  "photographer-invoice": {
    intro:
      "Photography invoicing is rarely just one number. A single job can include the shoot itself, hours of editing, prints, albums, and image licensing — each of which a client expects to see broken out clearly. A professional photographer invoice protects your usage rights, justifies your pricing, and gets you paid faster, while looking as polished as the images you deliver.",
    sections: [
      {
        h: "What to itemise on a photography invoice",
        p: "Splitting your work into clear line items shows clients the value behind your fee and avoids awkward questions later. It also makes deposits and licensing terms unmistakable.",
        list: [
          "Session or shoot fee (hours or day rate)",
          "Editing and retouching time",
          "Prints, albums, or physical products",
          "Image licensing or usage rights",
          "Travel, deposit, and any rush fees",
        ],
      },
      {
        h: "Deposits and licensing — bill them clearly",
        p: "Most photographers take a non-refundable deposit to secure a date, then bill the balance on delivery. Add the deposit as its own line (or a negative line once paid) so the remaining amount is obvious. If you license images rather than sell them outright, state the usage rights on the invoice — it's the document clients keep on file.",
      },
      {
        h: "Get paid before the gallery goes out",
        p: "A common, effective approach is to invoice the balance before releasing the final gallery. Send a clean, numbered PDF with your payment details and a clear due date, and clients almost always pay promptly to receive their photos. The generator above totals shoot, editing, and products automatically.",
      },
    ],
  },

  "graphic-designer-invoice": {
    intro:
      "For graphic designers, the invoice is part of the brand experience — it should look as considered as the work it bills for. Whether you charge per project, hourly, or by deliverable, a clear design invoice spells out the scope, the revisions included, and any licensing, which keeps projects profitable and prevents scope creep from eating your margins.",
    sections: [
      {
        h: "Per-project vs hourly design billing",
        p: "Fixed-fee projects look cleanest as a single line with the agreed amount, plus separate lines for extras outside the original scope. Hourly work should show the hours against your rate so clients see the breakdown. Either way, spelling out what's included protects you when 'just one more tweak' arrives.",
        list: [
          "The agreed project fee or hourly rate",
          "Number of revision rounds included",
          "Extra revisions or out-of-scope work",
          "Source files or licensing, if charged",
          "Deposit and balance for larger projects",
        ],
      },
      {
        h: "Handle revisions and source files",
        p: "Design disputes usually come down to revisions and file ownership. State on your invoice how many revision rounds the fee covers, and bill additional rounds as their own line. If you charge separately for editable source files or extended licensing, list that explicitly — it sets expectations and adds a clean upsell.",
      },
      {
        h: "Protect your cash flow",
        p: "For anything beyond a small job, invoice a deposit up front and the balance on delivery. Send numbered, dated PDFs with short payment terms, and keep a copy of every invoice for your records. The tool above calculates subtotals and tax instantly so your design invoices are always accurate.",
      },
    ],
  },

  "web-developer-invoice": {
    intro:
      "Web development projects often mix one-off build work with ongoing costs like hosting, maintenance, and retainers — and clients want to see each clearly separated. A well-structured developer invoice makes milestones, hourly work, and recurring charges easy to understand, which means faster approvals from the finance teams that actually pay you.",
    sections: [
      {
        h: "Billing builds, milestones, and retainers",
        p: "Large builds are best billed in milestones (deposit, mid-point, on launch) so neither side carries all the risk. Ongoing work — maintenance, hosting, support — suits a monthly retainer. Itemising these separately keeps your invoice clear and your cash flow predictable.",
        list: [
          "Development hours or fixed milestone fees",
          "Hosting, domains, and third-party services",
          "Maintenance or support retainer",
          "Out-of-scope change requests",
          "Deposit and remaining balance",
        ],
      },
      {
        h: "Pass-through costs and change requests",
        p: "Hosting, premium plugins, and API fees are often passed through to the client — list them as their own lines so it's clear what's your work and what's a third-party cost. Change requests outside the original brief should always be a separate line item, which keeps fixed-price projects from quietly losing money.",
      },
      {
        h: "Recurring invoices for ongoing work",
        p: "If you support a site monthly, send a consistent recurring invoice each period with the same layout and an incrementing number — clients come to expect it and pay on schedule. Save your template once, update the date and period, and download a fresh PDF in seconds with the generator above.",
      },
    ],
  },

  "plumber-invoice": {
    intro:
      "A clear plumbing invoice does two jobs: it gets you paid on the spot and it serves as a record for any warranty on the work. Customers want to see the call-out fee, the labour, and the parts laid out plainly — and a professional, itemised invoice is what separates a trusted trade business from someone working cash-in-hand.",
    sections: [
      {
        h: "Itemise call-out, labour, and parts",
        p: "Breaking the job into clear lines avoids disputes and shows the customer exactly what they're paying for. It also makes it easy to handle jobs where a landlord or insurer is footing the bill.",
        list: [
          "Call-out or diagnostic fee",
          "Labour — hours worked at your rate",
          "Parts and materials, itemised",
          "Emergency or out-of-hours surcharge",
          "Tax (VAT/GST) where applicable",
        ],
      },
      {
        h: "Emergency call-outs and surcharges",
        p: "Out-of-hours and emergency work usually carries a surcharge — make it a clearly labelled line so there's no surprise. Stating your call-out fee up front, and again on the invoice, sets expectations and heads off the most common cause of trade payment disputes.",
      },
      {
        h: "Invoice on site, get paid faster",
        p: "Many plumbers now invoice straight after finishing the job, while still on site or the same day. A numbered PDF with your bank details and a short payment window means customers can pay immediately. The generator above adds up labour, parts, and tax automatically so you never miscalculate a total.",
      },
    ],
  },

  "electrician-invoice": {
    intro:
      "Electrical work comes with paperwork — and your invoice is a key part of it. Customers, landlords, and insurers expect labour, materials, and any testing or certification to be itemised clearly. A professional electrician invoice gets you paid quickly and provides the documented record that electrical work so often needs.",
    sections: [
      {
        h: "What to include on an electrical invoice",
        p: "Clear, separated line items make your invoice easy to approve and easy to keep on file for compliance. They also make it simple to bill landlords or letting agents who need detailed records.",
        list: [
          "Labour — hours or day rate",
          "Materials and fittings, itemised",
          "Testing, inspection, or certification",
          "Call-out or assessment fee",
          "Tax (VAT/GST) where it applies",
        ],
      },
      {
        h: "Certificates and compliance records",
        p: "Where you issue test certificates or compliance documents, referencing them on the invoice ties the paperwork together — useful for landlords, insurers, and your own records. A consistent invoice number on every job makes those records easy to find years later if a query comes up.",
      },
      {
        h: "Keep your trade business looking professional",
        p: "A tidy, branded invoice signals a reliable contractor and helps win repeat work. Add your logo, list everything clearly, set a short payment term, and download a print-ready PDF. The tool above totals labour, materials, and tax for you in real time.",
      },
    ],
  },

  "cleaning-services-invoice": {
    intro:
      "Cleaning businesses bill in lots of ways — per visit, by the hour, by the square foot, or on a recurring weekly or monthly plan. A clear cleaning invoice makes your pricing transparent and your recurring jobs effortless to bill, which is exactly what keeps domestic and commercial clients paying on time, month after month.",
    sections: [
      {
        h: "One-off and recurring cleaning jobs",
        p: "For a one-off deep clean, a single line with the agreed price works well. For regular contracts, list the period clearly (e.g. 'Office clean — June 2026') and keep the layout consistent each month so clients recognise it instantly.",
        list: [
          "Service type (standard, deep, end-of-tenancy)",
          "Per visit, hourly, or monthly rate",
          "Number of visits in the period",
          "Supplies or equipment, if charged",
          "Tax where applicable",
        ],
      },
      {
        h: "Make recurring billing effortless",
        p: "Regular cleaning contracts are perfect for recurring invoices. Save your template, update the month and invoice number, and send the same clean PDF on the same day each cycle. Predictable invoicing means predictable payment — and far less admin for you.",
      },
      {
        h: "Look professional to win contracts",
        p: "Commercial clients in particular expect proper invoices for their own bookkeeping. A branded, itemised PDF with your logo and clear payment details helps you win and keep contracts. The generator above handles the totals and tax so every invoice is accurate.",
      },
    ],
  },

  "tutor-invoice": {
    intro:
      "Whether you teach in person or online, a clear tutoring invoice makes billing parents and students straightforward and professional. Listing lessons, dates, and your rate removes any confusion about what's owed — and a tidy PDF invoice reassures parents that they're dealing with a serious, organised tutor.",
    sections: [
      {
        h: "Billing per lesson, hour, or package",
        p: "List each lesson with its date so parents can match the invoice to their calendar, or bill a block of lessons as a package for simplicity. Many tutors offer a small discount for prepaid packages — show it as its own line so the saving is clear.",
        list: [
          "Subject and student name",
          "Lesson dates or number of sessions",
          "Hourly rate or package price",
          "Any prepaid discount",
          "Payment due date and method",
        ],
      },
      {
        h: "Prepaid packages and cancellations",
        p: "Selling lessons in blocks improves your cash flow and reduces no-shows. State your cancellation policy near your terms, and if you charge for late cancellations, add it as a clearly labelled line. Numbered invoices make it easy to track which packages a family has paid for.",
      },
      {
        h: "Simple, professional, and free",
        p: "You don't need accounting software to invoice well as a tutor. Add your details, list the lessons, set a due date, and download a clean PDF in seconds. The generator above totals everything for you, so billing takes a couple of minutes between lessons.",
      },
    ],
  },

  "virtual-assistant-invoice": {
    intro:
      "Virtual assistants often juggle several clients, each on a different arrangement — some hourly, some on monthly retainers, some by task or package. A clear VA invoice keeps each client's billing transparent and your own income easy to track, which is essential when you're managing multiple income streams remotely.",
    sections: [
      {
        h: "Hourly, retainer, or per-task billing",
        p: "Hourly clients should see hours logged against your rate; retainer clients suit a single monthly line for the agreed package, with overage hours billed separately. Per-task work is clearest as one line per deliverable. Spelling this out keeps every client relationship clean.",
        list: [
          "Hours worked or retainer package",
          "Tasks or deliverables completed",
          "Overage hours beyond the retainer",
          "The billing period covered",
          "Your preferred payment method",
        ],
      },
      {
        h: "Retainers and overage hours",
        p: "Retainers give you predictable income, but clients sometimes exceed their hours. Track and bill overage as its own line so the base retainer stays clean and the extra work is clearly justified. A consistent monthly invoice with an incrementing number keeps the relationship professional.",
      },
      {
        h: "Bill clients worldwide, in any currency",
        p: "Working with international clients means invoicing in different currencies. The generator above supports multiple currency symbols, so you can bill a US client in dollars and a UK client in pounds. Add your details, list your work, and download a polished PDF in seconds.",
      },
    ],
  },

  "handyman-invoice": {
    intro:
      "Handyman work spans dozens of small jobs, and a clear invoice for each keeps your business organised and your customers confident. Listing labour, materials, and any call-out fee plainly means there's never a question about what's owed — and a professional PDF invoice helps you stand out from casual, cash-only competitors.",
    sections: [
      {
        h: "Itemise labour, materials, and call-outs",
        p: "Even for small jobs, separating your time from the cost of materials shows customers exactly what they're paying for. It also makes it easy to bill landlords or property managers who need a clear breakdown for their records.",
        list: [
          "Description of the job done",
          "Labour — hours or a flat job price",
          "Materials and parts, itemised",
          "Call-out or minimum charge",
          "Tax where applicable",
        ],
      },
      {
        h: "Flat-rate vs hourly jobs",
        p: "Quick, predictable jobs are often cleanest as a flat price, while bigger or open-ended work suits hourly billing. Whichever you use, stating it clearly on the invoice prevents misunderstandings. For repeat customers, a consistent invoice format builds trust and repeat bookings.",
      },
      {
        h: "Invoice on the spot and get paid",
        p: "Finishing a job and handing over a clean, numbered invoice the same day is the fastest route to payment. Add your bank details or payment link, set a short due date, and download a print-ready PDF. The generator above adds up labour, materials, and tax automatically.",
      },
    ],
  },

  "catering-invoice": {
    intro:
      "Catering invoices can be complex — guest counts, menus, staff, rentals, and deposits all have to add up correctly for an event that may be months away. A clear, itemised catering invoice builds client confidence, locks in deposits, and ensures the final balance is paid before or promptly after the big day.",
    sections: [
      {
        h: "Build a clear event invoice",
        p: "Breaking the event into clear sections — food, staff, equipment, and fees — lets clients see exactly where their budget goes and makes it easy to adjust as guest numbers change.",
        list: [
          "Per-head menu price × guest count",
          "Additional menu items or upgrades",
          "Service staff and hours",
          "Equipment, rentals, and delivery",
          "Deposit, balance, and tax",
        ],
      },
      {
        h: "Deposits and final balances",
        p: "Most caterers take a deposit to confirm the booking, then invoice the balance close to the event once the final guest count is set. Show the deposit as its own line so the remaining balance is unmistakable. Clear deposit terms protect you against last-minute cancellations.",
      },
      {
        h: "Handle changing guest numbers",
        p: "Guest counts shift right up to the event, so a per-head structure makes adjustments simple — change the quantity and the total recalculates. The generator above updates subtotals, tax, and the grand total instantly, so your catering invoice is always accurate no matter how many times the numbers move.",
      },
    ],
  },

  "auto-repair-invoice": {
    intro:
      "An auto repair invoice is both a bill and a service record — customers keep it for warranties, resale, and their own maintenance history. Clearly separating parts, labour, and diagnostics builds trust at the counter and gets you paid faster, while giving the customer the documented breakdown they expect from a professional garage.",
    sections: [
      {
        h: "Separate parts, labour, and diagnostics",
        p: "Customers scrutinise repair bills, so a transparent breakdown is essential. Listing each part and the labour against each task shows fair pricing and reduces pushback at payment time.",
        list: [
          "Diagnostic or inspection fee",
          "Parts, itemised with quantities",
          "Labour per task at your shop rate",
          "Sundries (oil, fluids, consumables)",
          "Tax where applicable",
        ],
      },
      {
        h: "Build trust with a clear breakdown",
        p: "A detailed invoice is your best defence against 'why is it so expensive?' Showing parts and labour separately, with a line for each job done, demonstrates fair, itemised pricing. Including the vehicle details (make, model, registration) turns the invoice into a useful service record too.",
      },
      {
        h: "A record customers keep",
        p: "Repair invoices often resurface — at resale, for warranty claims, or for the next service. A numbered, dated PDF with your garage's branding is easy for customers to file and find. The generator above totals parts, labour, and tax automatically so every repair invoice is accurate and professional.",
      },
    ],
  },

  "personal-trainer-invoice": {
    intro:
      "Personal trainers bill in a variety of ways — single sessions, multi-session packages, or monthly coaching plans — and a clear invoice keeps each client's payments easy to track. A professional, branded invoice also reinforces that you run a real business, which helps justify your rates and retain clients long term.",
    sections: [
      {
        h: "Sessions, packages, and monthly plans",
        p: "Single sessions are clearest billed individually, while packages and monthly plans suit a single line for the agreed amount. Showing the per-session value of a package highlights the saving and encourages clients to commit to more sessions up front.",
        list: [
          "Session type (1-to-1, group, online)",
          "Number of sessions or plan period",
          "Per-session or package rate",
          "Any program or nutrition add-ons",
          "Payment due date and method",
        ],
      },
      {
        h: "Prepaid packages improve cash flow",
        p: "Selling blocks of sessions or monthly plans gives you predictable income and keeps clients committed. Bill the package up front as a single line, and track which clients have sessions remaining. A consistent invoice number per client makes this easy to follow month to month.",
      },
      {
        h: "Professional invoicing, zero hassle",
        p: "You don't need complex software to invoice clients well. Add your branding, list the sessions or plan, set a due date, and download a clean PDF in seconds. The generator above handles the totals, so you can spend your time training clients rather than doing admin.",
      },
    ],
  },
};
