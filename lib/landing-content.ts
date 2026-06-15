/* ───────────────────────────────────────────────
   UNIQUE per-page content for each landing page.

   Rendered by app/[profession]/page.tsx via <LandingContent>.
   Every landing page now carries ONLY its own unique content
   (intro + sections + page-specific FAQs). The shared homepage
   SeoContent block and the shared FAQ are NOT rendered on landing
   pages, so no two pages share boilerplate — this is what fixes the
   AdSense "low value / duplicate / scaled content" rejection.

   Each entry: a unique intro + several unique sections (some with a
   bullet list) + a set of page-specific FAQs (these also feed the
   per-page FAQPage JSON-LD via faqSchemaFrom, so no two pages emit
   an identical FAQ schema).
─────────────────────────────────────────────── */
export interface LandingSection {
  h: string;
  p: string;
  list?: string[];
}
export interface LandingFaq {
  q: string;
  a: string;
}
export interface LandingContentEntry {
  intro: string;
  sections: LandingSection[];
  faqs?: LandingFaq[];
}

export const LANDING_CONTENT: Record<string, LandingContentEntry> = {
  "freelancer-invoice": {
    intro:
      "As a freelancer, your invoice is often the last impression a client has of a project, so it needs to look as polished as the work itself. Whether you charge by the hour, by the day, or a fixed project fee, a clear freelance invoice spells out exactly what you did, what it costs, and when payment is due. That clarity is the single biggest factor in getting paid on time and the easiest way to keep a good client coming back for the next brief.",
    sections: [
      {
        h: "What every freelance invoice must include",
        p: "Freelance clients pay faster when there is no ambiguity. A complete invoice removes the back-and-forth that delays payment and protects you if a dispute ever comes up. Treat the document as the official record of the deal, not an afterthought you send once the work is delivered.",
        list: [
          "Your name or trading name, plus how clients should pay you",
          "A unique invoice number so both sides can reference it later",
          "A line item for each deliverable, with hours or quantity and your rate",
          "The project or retainer name, so the client's finance team can match it to a purchase order",
          "A clear issue date, due date, and your accepted payment methods",
        ],
      },
      {
        h: "Project fee, day rate, or hourly: how to bill each",
        p: "If you bill hourly, list the hours against your rate so the client sees the breakdown and cannot quibble with the total. For a day rate, one line per day worked keeps it simple and reads cleanly on a timesheet-style invoice. For fixed-fee projects, a single line with the agreed amount looks most professional.\n\nFor larger jobs, split the fee across milestones: a deposit to start, a payment at the halfway point, and the balance on delivery. This shares the risk fairly and keeps cash arriving throughout the project rather than all at the end. The generator above totals everything automatically, so you never send a maths error to a client.",
      },
      {
        h: "Deposits and milestone billing",
        p: "Asking for money up front is normal, not pushy, and it weeds out clients who were never going to pay. A deposit of 25 to 50 percent before you start covers your early effort and signals that the engagement is real. On a phased project, tie each payment to a deliverable both sides can see, such as approved wireframes or a first draft, so there is never an argument about whether a milestone was reached.",
        list: [
          "Take a deposit before booking the work into your calendar",
          "Bill the next stage only when the agreed milestone is signed off",
          "Show the deposit as its own line and deduct it from the balance",
          "Keep each milestone invoice numbered in the same sequence",
        ],
      },
      {
        h: "Getting paid on time and chasing politely",
        p: "Send the invoice the day you deliver, while the work is fresh and the client is happy. Use short terms like Net 7 or Net 14 and put your payment details directly on the document so there is no excuse to delay. If a client slips past the due date, a friendly nudge a day or two later resolves most cases. Keep it warm and factual: reference the invoice number, restate the amount and the date it was due, and offer to resend the PDF. Because every invoice here is numbered and dated, those follow-ups take seconds and stay professional.",
      },
    ],
    faqs: [
      { q: "How much deposit should I ask a new freelance client for?", a: "A 25 to 50 percent deposit before you begin is standard for project work. It covers your early hours and confirms the client is committed. For a brand-new client with no track record, lean towards the higher end, and consider invoicing the balance before you hand over final files." },
      { q: "What payment terms work best for freelancers?", a: "Short terms get you paid sooner. Net 7 or Net 14 from the invoice date suits most freelance work, and many freelancers now invoice on delivery with payment due on receipt. Agree the terms in writing before you start so the due date on your invoice is never a surprise." },
      { q: "Should I charge a late fee on overdue freelance invoices?", a: "You can, provided you stated it before the work began. A small monthly percentage on overdue balances is common and encourages prompt payment. In practice, a polite reminder usually works first. Keep the late-fee clause in your terms so you can apply it fairly when a client repeatedly ignores due dates." },
      { q: "How do I invoice a client who keeps adding to the brief?", a: "Bill the original scope as agreed, then add each extra request as its own clearly described line item at your stated rate. Itemising scope creep separately keeps your fixed fee intact and shows the client exactly what the additions cost, which often makes them more disciplined about new requests." },
      { q: "Do I need to put my address on a freelance invoice?", a: "A contact address is expected on a professional invoice and many clients' finance teams require one to process payment. If you work from home and would rather not publish your address, use a registered business address or a PO box. At minimum, include an email and your payment details." },
    ],
  },

  "consultant-invoice": {
    intro:
      "Consulting is sold on credibility, and your invoice is part of that brand. A consultant's invoice should look as considered as your advice: clean, branded, and unambiguous about scope and fees. Whether you bill a monthly retainer, a project fee, or by the day, the right invoice reinforces that the client is working with a serious professional and gives their finance team everything they need to approve payment without a single follow-up question.",
    sections: [
      {
        h: "Retainers, day rates, and project fees",
        p: "Each billing model needs a slightly different invoice. A retainer invoice states the monthly fee and the exact period it covers, so it can be approved on sight. A project invoice references the statement of work and bills against agreed milestones. A day-rate or hourly invoice lists the sessions with a short description of what was delivered, connecting your fee to outcomes rather than just hours.",
        list: [
          "Retainer: a fixed monthly amount and the service period it covers",
          "Project: reference the SOW number and bill by milestone",
          "Day rate or hourly: list dates, time, and a brief deliverable note",
          "Disbursements: travel, software, or third-party costs, itemised separately",
        ],
      },
      {
        h: "Reference the engagement and statement of work",
        p: "Consulting disputes almost always come down to scope. Quoting the statement of work or engagement letter reference on every invoice ties the fee back to what was agreed and signed, which makes approval routine and renewals easier. A short description on each line, naming what was advised, delivered, or reviewed, turns the invoice into a record of value rather than a bare number. When a client's procurement team can see the SOW reference and a clear deliverable note, your invoice moves through their system without sitting in a queue waiting for someone to ask what it was for.",
      },
      {
        h: "Billable expenses and disbursements",
        p: "Consultants frequently incur costs on a client's behalf, from flights and hotels to subscriptions and subcontractor fees. Keep these separate from your professional fee so the client can see what is your time and what is a pass-through cost. Agree in advance whether expenses are billed at cost or with a handling margin, and keep receipts for anything you recharge.",
        list: [
          "Travel and accommodation tied to client work",
          "Software, data, or research bought for the engagement",
          "Subcontractor or specialist fees you have paid",
          "A note stating whether expenses are at cost or marked up",
        ],
      },
      {
        h: "Branding and net terms that command respect",
        p: "Add your logo, set an accent colour, and keep the layout identical across every client so your invoices become instantly recognisable to the people who pay them. Consistency reduces queries and speeds approval. On terms, consultants typically bill Net 14 or Net 30, and a clean retainer is best invoiced at the start of the period it covers so payment lands before the work. State your terms plainly near the total, and your professionalism on the page does some of the chasing for you.",
      },
    ],
    faqs: [
      { q: "Should I invoice a consulting retainer at the start or end of the month?", a: "Bill a retainer in advance, at the start of the period it covers. The client is paying to reserve your availability and capacity for that month, so payment should arrive before the work, not after. Advance billing also smooths your cash flow and reduces the risk of working a full month unpaid." },
      { q: "How do I show billable expenses without padding my fee?", a: "List disbursements as their own lines, separate from your professional fee, and label them clearly as expenses. State up front whether they are billed at cost or with a handling margin. Keeping them distinct shows the client what is your time versus a pass-through cost and avoids any sense that your day rate is inflated." },
      { q: "What net terms are normal for management consultants?", a: "Net 14 to Net 30 from the invoice date is typical for consulting work, with larger corporate clients often defaulting to Net 30 or longer. Confirm the terms in your engagement letter, and for retainers consider payment in advance so you are not financing a client who pays slowly." },
      { q: "Do I reference the statement of work on every consulting invoice?", a: "Yes. Quoting the SOW or engagement reference ties each invoice to the agreement both parties signed, which speeds approval through procurement and prevents scope disputes. It also makes your records far easier to reconcile at year end when you are matching invoices to contracts." },
      { q: "How do I bill for a discovery call or scoping meeting?", a: "Decide your policy before the call. Many consultants offer a short initial conversation free, then bill any deeper scoping work at their day or hourly rate as a clearly described line item. If the scoping leads to a signed engagement, you can credit that fee against the first invoice as a goodwill gesture." },
    ],
  },

  "hourly-invoice": {
    intro:
      "An hourly invoice bills a client based on the time you worked rather than a fixed fee. It is the standard for many freelancers, consultants, lawyers, and agencies. The key to a good hourly invoice is transparency: showing the hours, the rate, and what was done so the total is never a surprise. Done well, it reads like a clear account of your time that a client can approve at a glance and file with confidence for their own records.",
    sections: [
      {
        h: "Rate times hours, shown clearly",
        p: "List each block of work as its own line with the hours, your rate, and a short description of the task. This lets the client connect the time billed to the value delivered and dramatically reduces queries. The generator above multiplies hours by rate and totals everything automatically, so the arithmetic is always right.",
        list: [
          "One line per task, project, or working session",
          "Hours worked multiplied by your hourly rate",
          "A brief, plain description of what each block covered",
          "Subtotal, then tax if you are registered, then the grand total",
        ],
      },
      {
        h: "Tracking and rounding time fairly",
        p: "Whether you use a timer app or a simple spreadsheet, recording hours as you go means your invoice almost writes itself at the end of the period. Decide on a rounding increment and stick to it: rounding to the nearest 6, 15, or 30 minutes are all common, but mixing them looks careless and invites disputes. Agree the increment with your client up front so a six-minute email and a twelve-minute call are billed consistently. Rounding up every tiny task to the next half hour erodes trust quickly, so keep it honest and keep your notes, which lets you answer any question about a line without scrambling to reconstruct the day.",
      },
      {
        h: "Attaching or summarising a time log",
        p: "For anything beyond a couple of hours, clients appreciate seeing where the time went. You do not need to attach a forensic breakdown, but a tidy summary builds trust and heads off questions. Group the detail sensibly so the invoice stays readable while still standing up to scrutiny.",
        list: [
          "Summarise by task or work area rather than every two-minute entry",
          "Show the date range the invoice covers",
          "Note the total hours alongside the billed amount",
          "Keep your full timesheet on file in case the client asks",
        ],
      },
      {
        h: "Blended rates, rush work, and overtime",
        p: "When a small team works on one job, you can either list each person's hours at their own rate or quote a single blended rate that averages the team, whichever the client prefers. State which approach you are using so the numbers are clear. Rush or out-of-hours work is normally billed at a higher rate: add it as its own clearly labelled line, such as an evening or weekend uplift, rather than quietly raising your standard rate. Spelling out overtime and rush lines separately keeps your base rate trusted and makes the premium feel fair because the client can see exactly what they are paying extra for.",
      },
    ],
    faqs: [
      { q: "What is a fair time increment to round my hours to?", a: "Rounding to the nearest 15 minutes is the most common and widely accepted standard, though 6-minute (tenth of an hour) billing is normal in legal and some professional work. Pick one increment, agree it with the client before you start, and apply it consistently. Avoid rounding every tiny task up to the next half hour, which quickly erodes trust." },
      { q: "Should I attach my full timesheet to an hourly invoice?", a: "A concise summary is usually enough, grouped by task or work area rather than listing every entry. It reassures the client without overwhelming them. Keep your detailed timesheet on file so you can produce it if a line is ever queried. Larger clients with formal approval processes may specifically request the full log." },
      { q: "How do I bill rush or out-of-hours work on an hourly invoice?", a: "Add it as a separate, clearly labelled line at your higher rate, such as an evening, weekend, or rush uplift, rather than inflating your standard rate. Agree the premium in advance. Showing it as its own line keeps your base rate trusted and makes the extra charge transparent and easy for the client to approve." },
      { q: "What is a blended rate and when should I use one?", a: "A blended rate is a single hourly figure that averages the rates of everyone working on a job, instead of billing each person separately. It simplifies the invoice when a small team is involved and the client prefers one number. State clearly that the rate is blended so the client understands it covers mixed seniority." },
      { q: "How do I handle a client who disputes the hours I billed?", a: "Refer to your time records and the rounding policy you agreed at the outset. Walk them through the summary line by line and offer your detailed log if needed. Most disputes come from unclear descriptions, so going forward, write plainer task notes on each line. Keeping contemporaneous records is your strongest protection." },
    ],
  },

  "photographer-invoice": {
    intro:
      "Photography invoicing is rarely just one number. A single job can include the shoot itself, hours of editing, prints, albums, and image licensing, each of which a client expects to see broken out clearly. A professional photographer invoice protects your usage rights, justifies your pricing, and gets you paid faster, while looking as polished as the images you deliver. It is also the document a commercial client files to prove what rights they bought.",
    sections: [
      {
        h: "Itemising the shoot, editing, and products",
        p: "Splitting your work into clear line items shows clients the value behind your fee and avoids awkward questions later. It also makes deposits and licensing terms unmistakable when a brand or magazine reviews the invoice months on.",
        list: [
          "Session or shoot fee, billed by the hour or as a day rate",
          "Editing and retouching time, as its own line",
          "Prints, albums, or physical products with quantities",
          "Image licensing or usage rights for the agreed term",
          "Travel, mileage, and any rush or expedite fee",
        ],
      },
      {
        h: "Image licensing and usage rights",
        p: "Selling photographs and licensing them are different things, and your invoice should make clear which the client is paying for. If you license images rather than transfer copyright outright, state the scope plainly: where the images may be used, for how long, and in which territories. A wedding client buying personal-use prints needs very different wording from a brand running a national ad campaign. Putting the usage terms on the invoice, not just in a separate contract, means the permission travels with the document the client keeps on file. It also gives you a clean basis to charge more later if they want to extend the licence beyond what was originally agreed.",
      },
      {
        h: "Deposits and invoicing before delivery",
        p: "Most photographers take a non-refundable deposit to secure a date, then bill the balance on or before delivery. This protects you against last-minute cancellations and a calendar slot you can no longer fill. Structure the money so the remaining balance is always obvious and tied to the client receiving their images.",
        list: [
          "A booking deposit, shown as its own line and deducted from the total",
          "A clear statement that the deposit is non-refundable",
          "The balance invoiced before the gallery is released",
          "Payment due date set ahead of the delivery date",
        ],
      },
      {
        h: "Travel, rush fees, and getting paid before the gallery",
        p: "Shoots away from your base usually justify a travel or mileage line, and a tight turnaround warrants a clearly labelled rush fee, both billed separately from the shoot itself so the client sees what they are paying for. A common and effective approach is to invoice the outstanding balance before you release the final edited gallery: send a clean, numbered PDF with your payment details and a firm due date, and clients almost always pay promptly to receive their photos. The generator above totals the shoot, editing, products, and any travel automatically, so even a complex commercial invoice adds up correctly every time.",
      },
    ],
    faqs: [
      { q: "Should I transfer copyright or license my photos to a client?", a: "Most photographers license usage and retain copyright, which lets you reuse images in your portfolio and charge for wider use later. Transferring copyright outright should command a much higher fee because you are giving up all future value. Whichever you choose, state it explicitly on the invoice so the client knows exactly what they have bought." },
      { q: "How do I word image usage rights on a photography invoice?", a: "Spell out where the images may be used, for how long, and in which territories, for example personal use only, or one year of UK social and web use. Keep it specific. Putting the licence terms on the invoice, not only in a separate contract, ensures the permissions travel with the document the client keeps on file." },
      { q: "When should a photographer invoice the final balance?", a: "Invoice the balance before releasing the edited gallery. Send the numbered PDF with a firm due date once the images are ready, and deliver the gallery on payment. This is standard practice, protects you against non-payment after delivery, and clients almost always pay quickly because they want their photos." },
      { q: "Is a photography deposit refundable if the client cancels?", a: "Most photographers make the booking deposit non-refundable because it compensates for a date you can no longer sell and work you may have already done. State this clearly on the invoice and in your contract. If you offer any flexibility, such as transferring the deposit to a new date, put those conditions in writing too." },
      { q: "How do I charge for travel to a shoot location?", a: "Add a separate travel line based on mileage at a set per-mile rate, or a flat fee for the distance, plus any accommodation for distant or multi-day shoots. Agree the basis with the client before the booking so the travel charge on the invoice matches their expectation and does not become a point of friction." },
    ],
  },

  "graphic-designer-invoice": {
    intro:
      "For graphic designers, the invoice is part of the brand experience and should look as considered as the work it bills for. Whether you charge per project, hourly, or by deliverable, a clear design invoice spells out the scope, the revisions included, and any licensing or file handover. That clarity keeps projects profitable, prevents scope creep from eating your margins, and makes the transfer of finished artwork and its ownership unambiguous when the final payment lands.",
    sections: [
      {
        h: "Per-project versus hourly design billing",
        p: "Fixed-fee projects look cleanest as a single line with the agreed amount, plus separate lines for anything outside the original scope. Hourly work should show the hours against your rate so clients see the breakdown. Either way, spelling out what is included on the invoice itself protects you when the inevitable extra request arrives.",
        list: [
          "The agreed project fee or your hourly rate",
          "The number of revision rounds included in the fee",
          "Extra revisions or out-of-scope work, priced per round",
          "Source files or extended licensing, if charged separately",
          "Deposit and balance for larger branding projects",
        ],
      },
      {
        h: "Revisions and scope creep",
        p: "Design disputes nearly always come down to revisions and the moment a small tweak becomes a redesign. State on your invoice and your quote how many revision rounds the fee covers, and bill any additional rounds as their own clearly described line at a set per-round price. This does two things: it protects your margin, and it gently encourages clients to consolidate their feedback rather than drip-feeding endless small changes. When a client can see that the third round of amends carries a charge, requests tend to become sharper and more decisive, which is better for both sides. Never absorb open-ended revisions into a fixed fee, because that is exactly where profitable projects quietly turn into loss-making ones.",
      },
      {
        h: "Source files, IP, and final payment",
        p: "Decide what the client is buying: the finished, flattened artwork, or the editable source files and the rights to alter them. Many designers hand over layered files and transfer the intellectual property only once the final invoice is paid in full, which gives you clean leverage and a clear hand-off point.",
        list: [
          "State whether editable source files are included or charged extra",
          "Transfer IP and source files on receipt of final payment",
          "Note any usage limits, such as print run or territory",
          "Keep a copy of delivered files and the paid invoice for your records",
        ],
      },
      {
        h: "Deposits, kill fees, and protecting cash flow",
        p: "For anything beyond a small job, invoice a deposit up front and the balance on delivery, so you are never carrying a whole project unpaid. Just as important is a kill fee: a clause stating what you are owed if a client cancels partway through, usually the deposit plus payment for work completed to that point. Spell it out before you start and reference it if a project collapses, so you are paid fairly for the hours already invested. Send numbered, dated PDFs with short payment terms, keep a copy of every invoice, and let the generator above calculate subtotals and tax instantly so your design billing is always accurate and on-brand.",
      },
    ],
    faqs: [
      { q: "How many revision rounds should a design fee include?", a: "Two to three rounds is a common standard for most design projects, but the exact number matters less than stating it clearly on your quote and invoice. Define what counts as a round, then bill additional rounds at a fixed per-round price. This protects your margin and encourages clients to consolidate their feedback rather than sending endless small tweaks." },
      { q: "When do I hand over editable source files to a client?", a: "Many designers release source files and transfer the intellectual property only once the final invoice is paid in full. Decide whether source files are included in your fee or charged as an extra, and state it on the invoice. Tying the handover to final payment gives you a clean leverage point and a clear end to the project." },
      { q: "What is a kill fee and should I include one?", a: "A kill fee is what a client owes if they cancel a project partway through, typically the deposit plus payment for work completed to that point. Yes, include one. Agree it before you start and reference it on the final invoice if a project collapses, so you are fairly compensated for the hours you have already invested." },
      { q: "How do I bill a client who keeps requesting out-of-scope changes?", a: "Bill the original scope as agreed, then add each out-of-scope request as its own described line at your stated rate or per-round price. Itemising extras separately keeps your fixed fee intact and makes the cost of scope creep visible, which usually makes clients more disciplined about what they ask for next." },
      { q: "Should I charge separately for a logo's usage rights?", a: "If you are licensing the artwork rather than transferring full ownership, note any usage limits such as print run, media, or territory, and price wider rights accordingly. For most small-business logo work, clients expect full ownership on final payment, so state plainly on the invoice that IP transfers once the balance is settled to avoid later confusion." },
    ],
  },

  "web-developer-invoice": {
    intro:
      "Web development projects often mix one-off build work with ongoing costs like hosting, maintenance, and retainers, and clients want to see each clearly separated. A well-structured developer invoice makes milestones, hourly work, and recurring charges easy to understand, which means faster approvals from the finance teams that actually release payment. It also gives you a clean record of which costs are your labour and which are third-party services you have merely passed along.",
    sections: [
      {
        h: "Milestone and deposit billing for builds",
        p: "Large builds are best billed in milestones so neither side carries all the risk. A deposit confirms the work, a mid-point payment keeps cash flowing through the longest phase, and the balance falls due on launch. Tie each payment to something the client can see and sign off.",
        list: [
          "A deposit before development begins",
          "A mid-build payment tied to a working staging site or agreed feature set",
          "The balance on launch or final handover",
          "Each milestone numbered in the same invoice sequence",
          "A short description of what each milestone delivered",
        ],
      },
      {
        h: "Fixed-bid versus hourly, and billing change requests",
        p: "Fixed-bid pricing suits well-defined projects with a clear brief, while hourly billing fits open-ended or evolving work where the scope genuinely cannot be pinned down. State which model applies so the client reads the invoice correctly. The real money on fixed-bid projects is won or lost on change requests: anything outside the original brief, from an extra page template to a new integration, should always appear as its own clearly described line item rather than being quietly absorbed. When a client asks for a feature that was never specified, raise it as a change, price it, and add it to the invoice with a note. This keeps fixed-price work from steadily eroding into unpaid effort and makes it obvious to the client that the addition is genuinely extra, not something they assumed was included.",
      },
      {
        h: "Hosting, maintenance, and pass-through costs",
        p: "Developers routinely buy hosting, domains, premium plugins, and API access on a client's behalf. List these as their own lines, distinct from your development time, so it is clear what is your work and what is a third-party cost. Decide and state whether you bill them at cost or with a small handling margin.",
        list: [
          "Hosting and domain renewals, itemised with the period covered",
          "Premium plugins, themes, or licences bought for the project",
          "Third-party API or service fees passed through",
          "A note on whether pass-through costs include a handling margin",
        ],
      },
      {
        h: "Recurring invoices for maintenance and retainers",
        p: "Ongoing support, security updates, and small content changes suit a monthly maintenance retainer, which gives you predictable income and the client peace of mind. Bill it on a consistent recurring invoice each period, with the same layout and an incrementing number, so clients come to expect it and pay on schedule. Note the period the retainer covers and bill any work beyond the included hours as a separate overage line. Save your template once, update the date and period, and download a fresh PDF in seconds with the generator above, which keeps your recurring billing effortless and your cash flow steady between bigger build projects.",
      },
    ],
    faqs: [
      { q: "How should I structure milestone payments for a website build?", a: "A common split is a deposit before work starts, a mid-build payment tied to a working staging site or agreed feature set, and the balance on launch. Larger projects may use more stages. Tie each milestone to a visible, sign-off-able deliverable so payment is never disputed, and number each invoice in the same sequence." },
      { q: "How do I bill hosting and domains that I buy for a client?", a: "List them as separate pass-through lines, distinct from your development time, with the renewal period stated. Decide whether you charge them at cost or add a small handling margin, and say which on the invoice. Many developers prefer to have clients hold their own hosting accounts to avoid carrying these costs at all." },
      { q: "What is the best way to charge for change requests mid-project?", a: "Treat anything outside the original brief as a change: raise it, price it, and add it to the invoice as its own clearly described line with a note. On fixed-bid work this is essential, because absorbing unscoped requests is how profitable projects turn into unpaid effort. Flagging changes as you go also keeps the client aware of the cost before it mounts up." },
      { q: "Should web maintenance be a retainer or billed per task?", a: "A monthly retainer suits clients who need regular updates, security patches, and small changes, giving you predictable income and them peace of mind. Per-task billing fits clients with only occasional needs. Many developers offer a retainer with a set number of hours, then bill anything beyond that as a clearly labelled overage line." },
      { q: "How do I invoice for ongoing hosting and support each month?", a: "Use a recurring invoice with the same layout each period and an incrementing number, stating the period it covers. Bill any work beyond the included hours as a separate overage line. Saving a template and updating only the date and period keeps the process to under a minute and helps clients pay on a predictable schedule." },
    ],
  },

  "virtual-assistant-invoice": {
    intro:
      "Virtual assistants often juggle several clients, each on a different arrangement: some hourly, some on monthly retainers, some by task or package. A clear VA invoice keeps each client's billing transparent and your own income easy to track, which is essential when you are managing multiple income streams remotely and often across borders. The right invoice also makes you easy to pay, whether your client is around the corner or on another continent settling in a different currency.",
    sections: [
      {
        h: "Hourly versus package and retainer billing",
        p: "Hourly clients should see their hours logged against your rate. Retainer and package clients suit a single monthly line for the agreed bundle of hours or services, with anything beyond that billed separately. Spelling out the model on each invoice keeps every client relationship clean and easy to reconcile.",
        list: [
          "Hours worked, or the agreed retainer or package",
          "Tasks and deliverables completed in the period",
          "Overage hours used beyond the retainer",
          "The exact billing period covered",
          "Your preferred payment method and details",
        ],
      },
      {
        h: "Tracking tasks and hours across clients",
        p: "When you support several clients at once, the invoice is only as accurate as the records behind it. Keep a simple log per client, noting the date, the task, and the time spent, and group similar work so the invoice reads clearly without listing every two-minute email. A retainer client appreciates seeing a summary of what their package covered that month, even when the fee is fixed, because it demonstrates the value they received and makes renewals easy. Tracking diligently also protects you when a client questions a busy month: you can point to a tidy summary rather than reconstructing the period from memory. It is the difference between a VA who looks organised and one who looks like they are guessing.",
      },
      {
        h: "Invoicing international clients and choosing a currency",
        p: "Remote work means clients in different countries and currencies, so decide and state the billing currency clearly. Billing in your client's currency can make you easier to hire, while billing in your own simplifies your bookkeeping. Whichever you choose, be consistent per client and account for the fact that conversion and transfer fees can eat into your rate.",
        list: [
          "Set the currency to match the client, such as USD, GBP, or EUR",
          "State the currency plainly so there is no ambiguity",
          "Factor conversion and transfer fees into your rate",
          "Keep each client billed in one consistent currency",
        ],
      },
      {
        h: "Recurring monthly invoices and payment methods",
        p: "Retainer clients are perfect for recurring invoices: send the same clean layout on the same day each month with an incrementing number, and clients learn to expect and pay it on schedule. Offer the payment methods that suit remote, cross-border work, since the right option saves both of you on fees and delays. PayPal is convenient but can be costly on international transfers, Wise often gives better exchange rates for cross-currency payments, and a direct bank transfer suits domestic clients. List your chosen method and details on every invoice, and use the generator above to produce each month's PDF in seconds across whichever currencies your clients pay in.",
      },
    ],
    faqs: [
      { q: "Should a virtual assistant bill hourly or offer monthly packages?", a: "Packages and retainers give you predictable income and clients a clear budget, which is why many established VAs move towards them. Hourly billing suits new or unpredictable clients where the workload genuinely varies. A common middle ground is a retainer covering a set number of hours, with any extra time billed as a clearly labelled overage line." },
      { q: "What currency should I invoice an international client in?", a: "Billing in the client's currency can make you easier to hire, while billing in your own keeps your bookkeeping simple. Either works if you are consistent per client and state the currency clearly on the invoice. Whatever you choose, factor conversion and transfer fees into your rate so they do not quietly erode your earnings." },
      { q: "Is PayPal or Wise better for getting paid as a VA?", a: "Wise often gives better exchange rates and lower fees on cross-currency payments, which suits international clients. PayPal is widely recognised and convenient but can be expensive on overseas transfers. Many VAs offer both plus direct bank transfer, and list the available options on the invoice so clients can pick the cheapest route for everyone." },
      { q: "How do I bill a retainer client who goes over their hours?", a: "Keep the base retainer as a single clean line for the agreed package, then add overage hours as a separate, clearly described line at your standard or a slightly higher rate. Track the hours as you go so the overage is easy to justify, and flag it to the client before the invoice arrives so it is never a surprise." },
      { q: "How do I set up a recurring monthly invoice for an ongoing client?", a: "Save your invoice layout once, then each month update only the date, the billing period, and the invoice number, which should increment in sequence. Send it on the same day every cycle so the client comes to expect it. Keeping the format identical month to month helps the client's records stay tidy and encourages prompt, predictable payment." },
    ],
  },

  "contractor-invoice": {
    intro:
      "Contractor invoices live or die on detail. Clients want to see exactly what they are paying for - the labour, the materials, the equipment, and the tax - broken out line by line. A clear contractor invoice does not just get you paid faster; it also doubles as a record for warranties, change orders, and tax season. The cleaner your billing, the fewer awkward phone calls about a charge nobody can quite remember agreeing to three weeks after the job wrapped up.",
    sections: [
      {
        h: "Keep labour and materials on separate lines",
        p: "The cleanest contractor invoices split labour and materials into their own line items rather than rolling everything into one figure. This lets the client see the value of your skilled work against the cost of supplies, which matters when materials are reimbursed by a third party, an insurer, or a landlord. It also makes change orders painless to add and is essential when one portion of the job is taxed differently from another. A single lump-sum total invites questions; an itemised breakdown answers them before they are asked.",
        list: [
          "Labour - hours or days worked, with your day or hourly rate",
          "Materials - itemised with quantities and unit costs",
          "Equipment or plant hire, if charged on to the client",
          "Permits, skip hire, disposal, or call-out fees",
          "Tax applied only to the lines where it is due",
        ],
      },
      {
        h: "Change orders without the argument",
        p: "Scope changes are where contractor profit quietly disappears. The moment a client asks for something outside the original quote - an extra socket, a different finish, a wall that was not in the drawings - capture it as a dated change order and carry it onto the invoice as its own clearly labelled line. Reference the original quote number so both sides can see exactly what was added and why the total moved. Treating extras as separate lines, rather than silently absorbing them, keeps fixed-price jobs from sliding into a loss and gives you a defensible record if the final figure is ever queried.",
      },
      {
        h: "Deposits, progress payments, and retention",
        p: "Few contractors invoice the whole amount only at the end. Take a deposit up front to cover early material costs, bill progress payments at agreed stages, and issue a final invoice on completion.\n\nIf your contract holds back a retention or holdback percentage - commonly around five per cent until the defects period ends - show it as a deduction on the invoice so the client knows the balance is genuinely owed once the agreed period closes. Spelling out what has been paid, what is being billed now, and what is retained leaves no room for confusion about the running balance.",
        list: [
          "Deposit invoice before work starts",
          "Progress invoices at agreed milestones",
          "Final invoice on practical completion",
          "Retention shown as a separate deduction line",
        ],
      },
      {
        h: "Your invoice is your paper trail",
        p: "A detailed, numbered invoice is the cheapest insurance a contractor has. If a client disputes a charge months later, your itemised record settles it in seconds rather than turning into a he-said-she-said. Sequential numbering keeps your bookkeeping clean for tax, makes it obvious which invoices are still outstanding, and helps you see which kinds of jobs actually make money once materials and labour are weighed against what you charged. Keep a PDF copy of every invoice you send, including deposits and progress claims, so the full history of a job sits in one place.",
      },
    ],
    faqs: [
      { q: "Should I charge tax on labour as well as materials?", a: "It depends on your region and the type of work. In many places materials are taxable while certain labour is not, or vice versa. Keeping them on separate lines lets you apply tax to the correct items rather than the whole total, which keeps the invoice compliant and easy to audit." },
      { q: "How do I show retention or holdback on a contractor invoice?", a: "List the full value of the work, then show the retained percentage as a clearly labelled deduction line so the net amount due now is obvious. When the defects period ends, raise a separate invoice for the retained balance referencing the original job." },
      { q: "What is the difference between a change order and a new invoice?", a: "A change order documents agreed extra work and its price before you do it; the cost then appears as an additional line on your progress or final invoice. The change order is the agreement, the invoice is the request for payment." },
      { q: "Should I take a deposit before starting a contracting job?", a: "For any job with significant material costs, a deposit is sensible. It covers your upfront outlay and signals commitment from the client. Show it as its own line and subtract it from the final balance so the remaining amount due is unmistakable." },
      { q: "How long should I keep copies of contractor invoices?", a: "Keep them as long as your tax authority requires for business records, which is often five to seven years, and ideally for the length of any warranty you offer on the work. A numbered PDF archive makes finding an old job quick if a warranty claim arises." },
    ],
  },

  "construction-invoice": {
    intro:
      "Construction invoices have to carry a lot of weight: labour across several trades, materials, plant, permits, and usually a string of payments spread across a long build. A clear, itemised construction invoice keeps clients confident about what they are funding at each stage and gives you a defensible record for every variation and milestone. On projects that run for months, the quality of your invoicing often determines how smoothly the money flows from one stage to the next.",
    sections: [
      {
        h: "Bill against a schedule of values",
        p: "On a sizeable build, the cleanest approach is to bill against a schedule of values - a breakdown of the contract sum into the major components of the work, such as groundworks, frame, roofing, first fix, and second fix. Each invoice then claims a percentage of completion against those line items rather than presenting one opaque figure. This lets the client (or their quantity surveyor) check progress against the claim, approve it quickly, and release funds without a lengthy back-and-forth. It also makes your own forecasting easier, because you can see at a glance how much of each work package has been billed.",
        list: [
          "Break the contract sum into work packages",
          "Claim a percentage complete against each package",
          "Show previously billed, this claim, and remaining",
          "Reference the contract or project number on every invoice",
        ],
      },
      {
        h: "Milestone and progress billing",
        p: "Most construction contracts pay in stages rather than on completion, which protects both sides on a long programme. Tie each invoice to an agreed milestone - completion of the slab, the structure reaching the eaves, watertight, handover - so the client knows precisely what they are paying for. Number your applications in sequence and date them clearly, because on a multi-month job the order of claims matters as much as the figures. Predictable, well-evidenced progress invoices keep cash moving and stop you funding the next phase out of your own pocket while you wait to be paid for the last one.",
      },
      {
        h: "Variations, extras, and retainage",
        p: "Two things derail construction billing more than anything else: unrecorded variations and forgotten retention. Capture every variation - a design change, an unforeseen ground condition, an upgraded specification - as a dated, priced extra and carry it onto the relevant invoice as its own line referencing the instruction.\n\nRetainage is the percentage the client withholds from each claim until the works are complete and any defects are made good. Show it as a deduction on every application so the running total of money held back is always visible, then claim it back in a final invoice once the maintenance period ends.",
        list: [
          "Log each variation with a date and reference",
          "Price extras separately from the base contract",
          "Deduct retainage on each progress claim",
          "Release the retained sum in a final invoice",
        ],
      },
      {
        h: "Why detailed records pay off",
        p: "Construction disputes are won and lost on documentation. A numbered invoice that ties back to a schedule of values, names the milestone, and lists every variation is the record that resolves a payment query without lawyers. Detailed billing also keeps you compliant with payment-terms legislation that many regions apply to construction work, where late or unclear payment notices carry real consequences. Keep every application, certificate, and variation together with the matching invoice, and the financial story of the whole project stays clear from first dig to final account.",
      },
    ],
    faqs: [
      { q: "What is a schedule of values on a construction invoice?", a: "It is a breakdown of the total contract sum into its main work packages, such as substructure, frame, and finishes. Each progress invoice claims a percentage of completion against those items, letting the client verify progress against the money requested." },
      { q: "How does retainage work on construction projects?", a: "The client withholds an agreed percentage from each payment as security against defects, typically until the works are complete and the maintenance period passes. Show it as a deduction on every claim, then invoice the accumulated retained amount once the conditions for release are met." },
      { q: "How should I invoice for variations and extras?", a: "Record each variation with a date and an instruction reference, price it separately, and add it as a distinct line on the next progress invoice rather than blending it into the base contract figure. This keeps the original contract sum and the agreed extras clearly separated." },
      { q: "What is the difference between milestone billing and percentage billing?", a: "Milestone billing releases a payment when a defined stage is reached, such as a watertight shell. Percentage billing claims a proportion of each work package as it progresses. Many contracts blend both, and your invoice can show milestones and percentages side by side." },
      { q: "Why do construction invoices need such detailed payment terms?", a: "Many regions regulate construction payments, requiring clear notices and timeframes for each application. Detailed terms and itemised claims keep you compliant, protect your right to be paid on time, and give you firm ground if a payment is delayed or disputed." },
    ],
  },

  "plumber-invoice": {
    intro:
      "A clear plumbing invoice does two jobs at once: it gets you paid on the spot and it stands as the record for any warranty on the work or the parts you fitted. Customers want to see the call-out fee, the labour, and the parts laid out plainly - and a professional, itemised invoice is exactly what separates a trusted plumbing business from someone scribbling a figure on a notepad. Whether it is a dripping tap or a burst main at midnight, tidy billing keeps the customer relationship clean.",
    sections: [
      {
        h: "Call-out, labour, and parts on separate lines",
        p: "Breaking the job into clear lines heads off disputes and shows the customer precisely what they are paying for. It also makes life simple when a landlord, letting agent, or insurer is settling the bill and needs a proper breakdown for their own records. The call-out fee covers your time getting there and diagnosing the fault; labour covers the time on the tools; parts cover everything from a washer to a new cylinder. Itemising fittings individually, rather than rolling them into labour, reassures the customer that the parts mark-up is fair and gives them a record of exactly what was installed.",
        list: [
          "Call-out or diagnostic fee",
          "Labour - hours on site at your hourly rate",
          "Parts and fittings, itemised with quantities",
          "Emergency or out-of-hours surcharge",
          "Tax such as VAT or GST where it applies",
        ],
      },
      {
        h: "Charging by the hour fairly",
        p: "Most plumbing labour is billed by the hour, often with a minimum first-hour charge. State your hourly rate on the invoice and show the hours against it so the customer can see how the labour figure was reached. Decide in advance how you round part-hours - to the quarter or half hour is common - and apply it consistently. Where a job runs over because of something unforeseen behind the wall, a short note on the invoice explaining the extra time prevents the bill from looking like a surprise and keeps the customer on side.",
      },
      {
        h: "Emergency and after-hours rates",
        p: "Out-of-hours, weekend, and emergency call-outs almost always carry a higher rate, and the cleanest way to handle that is a clearly labelled surcharge line rather than a quietly inflated hourly figure. State your emergency rate when the customer first calls, and show it again on the invoice so there is no dispute about why a 2am burst pipe cost more than a booked daytime visit. Transparency here matters: surprise emergency charges are one of the most common triggers for trade payment complaints, and a labelled line removes the argument entirely.",
        list: [
          "Standard daytime hourly rate",
          "Evening, weekend, or bank-holiday rate",
          "Emergency call-out surcharge",
          "Any minimum charge for the visit",
        ],
      },
      {
        h: "Note the parts warranty on the invoice",
        p: "Many fittings and appliances carry a manufacturer warranty, and your own workmanship guarantee sits alongside it. A short note on the invoice - for example that a fitted cylinder carries a two-year manufacturer warranty and your labour is guaranteed for twelve months - turns the document into the record the customer reaches for if something fails later. It also protects you, because the dated, numbered invoice proves when the work was done and what was fitted. Invoice on site or the same day with your bank details and a short payment window, and the generator above totals call-out, labour, parts, and tax for you so the figure is always right.",
      },
    ],
    faqs: [
      { q: "Should I charge a call-out fee separately from labour?", a: "Yes, keeping them separate is clearer for the customer. The call-out fee covers travel and diagnosis, while labour covers time on the tools. Showing both lines explains the total and is especially useful when a landlord or insurer needs an itemised breakdown to settle the account." },
      { q: "How do I bill an emergency plumbing call-out?", a: "Apply your emergency or out-of-hours rate as a clearly labelled surcharge line rather than hiding it in an inflated hourly figure. Quote the rate when the customer first calls and repeat it on the invoice so the higher cost of a late-night job is never a surprise." },
      { q: "Should I list every fitting and part on the invoice?", a: "Itemising parts individually reassures the customer that your mark-up is fair and gives them a record of exactly what was installed, which matters for future repairs and warranty claims. Roll only minor consumables, such as jointing compound, into a single sundries line." },
      { q: "How should I record a parts or workmanship warranty?", a: "Add a short note stating the manufacturer warranty on key parts and the period your own labour is guaranteed. The dated, numbered invoice then doubles as proof of when the work was done and what was fitted if the customer needs to claim later." },
      { q: "How do I handle a job that overran the estimated time?", a: "Show the actual hours worked against your rate and add a brief note explaining the extra time, such as a corroded joint that needed cutting out. A short explanation keeps the higher labour figure transparent and the customer far more willing to settle without query." },
    ],
  },

  "electrician-invoice": {
    intro:
      "Electrical work comes with paperwork, and your invoice is a central part of it. Customers, landlords, and insurers expect to see labour, materials, and any testing or certification itemised clearly. A professional electrician invoice gets you paid quickly and provides the documented record that electrical work so often demands - the kind of record a letting agent files for compliance or a homeowner produces when they sell. Clean billing and clean certification go hand in hand on a well-run electrical job.",
    sections: [
      {
        h: "What belongs on an electrical invoice",
        p: "Clear, separated line items make your invoice easy to approve and easy to keep on file for compliance. They also make it simple to bill landlords or managing agents, who almost always need a detailed breakdown rather than a single figure. Separating labour from materials shows the customer the value of the work against the cost of cable, accessories, and consumer units, and it lets you apply tax only where it is due. Where you have carried out testing or issued a certificate, that should appear as its own line so the paperwork and the payment line up.",
        list: [
          "Labour - hours or a day rate",
          "Materials and accessories, itemised",
          "Testing, inspection, or certification work",
          "Call-out or assessment fee",
          "Tax such as VAT or GST where it applies",
        ],
      },
      {
        h: "Reference testing and certification documents",
        p: "Electrical work frequently produces formal documents - installation certificates, minor works certificates, or periodic inspection reports - and your invoice is the natural place to tie them together. Reference the certificate number and the work it covers on the invoice so the customer can match the bill to the paperwork in one glance. This is invaluable for landlords meeting their inspection obligations, for insurers assessing a claim, and for any future buyer's solicitor. Charging for testing and certification as a distinct line also makes clear that this is skilled, regulated work with its own value, not an afterthought bundled into general labour.",
      },
      {
        h: "Note compliance and inspection clearly",
        p: "Where a job has to meet a wiring standard or be notified to a building-control body, recording that on the invoice closes the loop. A short note confirming the installation complies with the relevant standard, or that the work has been notified and a compliance certificate will follow, reassures the customer and strengthens your record.\n\nFor periodic inspections, state the date of the inspection and when the next is due, so landlords and facilities managers have a built-in reminder. The invoice then works as both a request for payment and a small compliance record in its own right.",
        list: [
          "Reference the certificate or report number",
          "Note compliance with the relevant wiring standard",
          "State the inspection date and next due date",
          "Flag any work notified to building control",
        ],
      },
      {
        h: "Look like the professional you are",
        p: "A tidy, branded invoice signals a reliable, qualified contractor and helps win the repeat and referral work that keeps an electrical business busy. Add your logo and registration details, list everything clearly, reference any certificates, set a short payment term, and download a print-ready PDF. The generator above totals labour, materials, testing, and tax in real time, so the figure is always right and you can hand over a professional document the moment the job is signed off rather than chasing the paperwork days later.",
      },
    ],
    faqs: [
      { q: "Should I charge separately for testing and certification?", a: "Yes. Listing testing and certification as their own line shows it as the skilled, regulated work it is rather than burying it in general labour. It also gives the customer a clear record of what the compliance paperwork cost, which matters for landlords and insurers." },
      { q: "How do I link a certificate to my invoice?", a: "Reference the certificate or report number on the relevant invoice line and describe the work it covers. The customer can then match the bill to the paperwork instantly, and the link is preserved in your records if a query or claim arises years later." },
      { q: "What should a landlord's electrical invoice include?", a: "Landlords need labour, materials, any inspection or testing, and the certificate reference, plus the inspection date and when the next is due. This gives them a single document that supports their compliance obligations and their own bookkeeping." },
      { q: "Should I note compliance with wiring standards on the invoice?", a: "A short note confirming the work meets the relevant standard, or that it has been notified to building control with a certificate to follow, reassures the customer and strengthens your record. It costs nothing to add and closes the loop between work, paperwork, and payment." },
      { q: "How do I invoice for a periodic inspection report?", a: "Charge the inspection as a distinct line, reference the report number, and state both the inspection date and the recommended date for the next one. That turns the invoice into a useful reminder for the landlord or facilities manager as well as a request for payment." },
    ],
  },

  "handyman-invoice": {
    intro:
      "Handyman work spans dozens of small jobs, and a clear invoice for each keeps your business organised and your customers confident. Listing labour, materials, and any call-out fee plainly means there is never a question about what is owed - and a professional PDF invoice helps you stand out from the casual, cash-only competition. Whether you are billing a single shelf fitting or a half-day of odd jobs around one house, tidy invoicing turns scattered small work into a properly run business.",
    sections: [
      {
        h: "List several small jobs on one invoice",
        p: "One of the most useful things a handyman can do is put a whole visit's worth of little jobs onto a single, clear invoice. Rather than one vague figure for a morning's work, give each task its own line - hang the curtain rail, re-seal the bath, replace the door handle, fix the gate latch - with a price beside it. The customer can see exactly what was done and what each job cost, which makes the total feel fair and answers the inevitable question about why the morning came to what it did. It also doubles as a handy checklist that nothing was missed.",
        list: [
          "One line per task, each with its own price",
          "A short, plain description of the job",
          "Materials used on that task, if charged",
          "Total time on site, if billing hourly",
          "Tax where it applies",
        ],
      },
      {
        h: "Flat-rate or hourly - pick the right one",
        p: "Quick, predictable jobs are usually cleanest as a flat price the customer agrees up front, while bigger or open-ended work suits hourly billing where the final time is genuinely unknown. Many handymen mix both on the same invoice: a flat fee for assembling a wardrobe, plus an hourly line for the unexpected repair found behind it. Whichever you use, state it clearly on the invoice so there is no confusion, and apply a sensible minimum charge for tiny call-outs so a five-minute job is still worth the trip. Consistency across visits builds the trust that turns one-off customers into regulars.",
      },
      {
        h: "Materials with a fair mark-up",
        p: "When you supply materials - screws, sealant, a new tap, a length of timber - you can reasonably add a modest mark-up to cover the time spent sourcing and collecting them. The honest approach is to list materials as their own line, separate from labour, so the customer sees what the parts cost rather than finding them hidden inside an inflated hourly rate.\n\nKeep your receipts, especially for larger items, in case a customer asks. A transparent materials line, even with a mark-up, reads as fair; a mysterious lump sum does not.",
        list: [
          "List materials separately from labour",
          "Apply a modest, consistent mark-up",
          "Keep receipts for larger purchases",
          "Note any items the customer supplied themselves",
        ],
      },
      {
        h: "Take a deposit on the bigger jobs",
        p: "Most handyman work is settled on the day, which is the fastest route to payment - finish, hand over a numbered invoice with your bank details or a payment link, and most customers pay on the spot. For larger jobs that need materials bought in advance or several days on site, a deposit is sensible: it covers your outlay and confirms the customer is serious. Show the deposit as its own line and subtract it from the final balance so the remaining amount is obvious. The generator above adds up every job line, materials, and tax automatically, so even a long list of small tasks totals correctly.",
      },
    ],
    faqs: [
      { q: "Can I put several different small jobs on one invoice?", a: "Yes, and it is the tidiest approach for a handyman. Give each task its own line with a short description and a price, then let the totals add up. The customer sees exactly what was done across the visit, and the invoice doubles as a checklist that nothing was missed." },
      { q: "Should I charge a flat rate or by the hour?", a: "Use a flat rate for quick, predictable jobs the customer agrees up front, and hourly billing for open-ended work where the time is genuinely unknown. You can mix both on one invoice, and a minimum charge keeps very small call-outs worth the trip." },
      { q: "Is it fair to mark up materials I buy for a job?", a: "A modest mark-up to cover sourcing and collecting materials is normal and accepted, provided you list materials as their own line rather than hiding the cost in labour. Keep receipts for larger items so you can show the customer the genuine cost if asked." },
      { q: "When should a handyman ask for a deposit?", a: "Take a deposit on larger jobs that need materials bought in advance or several days on site. It covers your outlay and confirms commitment. Show it as its own line and deduct it from the final balance so the remaining amount due is clear." },
      { q: "How do I handle materials the customer bought themselves?", a: "Note on the invoice that the customer supplied those materials so it is clear you are charging labour only for that task. This avoids any impression that parts are being double-charged and keeps the breakdown honest and easy to follow." },
    ],
  },

  "cleaning-services-invoice": {
    intro:
      "Cleaning businesses bill in many ways - per visit, by the hour, by the square metre, or on a recurring weekly or monthly plan. A clear cleaning invoice makes your pricing transparent and your recurring jobs effortless to bill, which is exactly what keeps domestic and commercial clients paying on time, month after month. From a single end-of-tenancy deep clean to a year-long office contract, the way you invoice sets the tone for a reliable, professional service.",
    sections: [
      {
        h: "One-off cleans versus recurring contracts",
        p: "A one-off job - a spring clean, an end-of-tenancy, a post-builders sweep - is usually clearest as a single agreed price, perhaps with a line for any extras like carpets or oven cleaning. Recurring contracts work differently: each invoice should name the period plainly, such as Office clean, June 2026, and keep an identical layout every cycle so the client recognises it at a glance. Distinguishing one-off work from standing contracts on the invoice helps the client's bookkeeper code each one correctly and makes your own income easy to separate between ad-hoc jobs and dependable recurring revenue.",
        list: [
          "Service type - standard, deep, or end-of-tenancy",
          "Pricing basis - per visit, hourly, or per area",
          "Number of visits in the period",
          "Extras such as carpets, oven, or windows",
          "Supplies or equipment, if charged",
        ],
      },
      {
        h: "Per-visit, hourly, or per-area pricing",
        p: "Different clients suit different pricing models, and your invoice should make the chosen basis obvious. Per-visit pricing is simple for regular domestic cleans where the scope is fixed. Hourly billing suits jobs where the workload varies, with the hours shown against your rate. Per-area or per-square-metre pricing is common for commercial spaces, where the rate is tied to floor area cleaned. Whichever you use, stating the basis on the invoice prevents the client wondering why this month differs from last, and it makes quoting new work consistent because you are pricing the same way every time.",
      },
      {
        h: "Standing invoices for recurring work",
        p: "Regular cleaning contracts are ideal for standing, recurring invoices. Save your template once, then each cycle update the period and the invoice number and send the same clean PDF on the same day - many clients come to expect it and pay on a predictable schedule. Consistency here is doing real work for you: it reduces your admin to a couple of minutes a month, it makes late payments obvious because the rhythm is broken, and it signals a professionally run service.\n\nFor clients who prepay a block of cleans, show the period the payment covers so both sides can track how many visits remain.",
        list: [
          "Reuse one consistent invoice layout each cycle",
          "Increment the invoice number every period",
          "Send on the same day each week or month",
          "Show the period a prepaid block covers",
        ],
      },
      {
        h: "Back it with a simple service agreement",
        p: "For commercial and ongoing domestic clients, a short service agreement sitting behind your invoices prevents most disputes before they start. It need only set out the scope of each clean, the visit frequency, what is included and excluded, the rate, and your cancellation and access arrangements. Your invoice then simply bills what the agreement describes, and any extra work appears as a clearly labelled additional line. Commercial clients in particular expect proper itemised invoices for their bookkeeping, and a branded PDF with your logo and clear payment details helps you win and keep contracts. The generator above handles totals and tax so every invoice is accurate.",
      },
    ],
    faqs: [
      { q: "How do I invoice a recurring cleaning contract?", a: "Reuse one consistent layout, name the period clearly such as the month and year, increment the invoice number each cycle, and send it on the same day every week or month. The predictable rhythm trains clients to pay on schedule and makes any late payment immediately obvious." },
      { q: "Should I price cleaning per visit, per hour, or per area?", a: "Per visit suits regular domestic cleans with a fixed scope, hourly suits jobs where the workload varies, and per area suits commercial spaces priced on floor size. State the basis on the invoice so each bill is consistent and the client understands any variation between periods." },
      { q: "How should I bill for cleaning supplies and equipment?", a: "If your price includes supplies, you need not itemise them. If the client is charged separately, list supplies or specialist equipment, such as a carpet machine, as their own line so the breakdown is transparent and the client can see exactly what is included in the fee." },
      { q: "Do I need a service agreement as well as invoices?", a: "For ongoing or commercial work a short agreement is wise. It sets the scope, frequency, inclusions, rate, and cancellation terms, so your invoices simply bill what was agreed. Extra work outside the scope then appears as a clearly labelled additional line." },
      { q: "How do I handle a client who prepays for a block of cleans?", a: "Show the period or number of visits the prepayment covers on the invoice so both sides can track how many cleans remain. This keeps a prepaid arrangement transparent and avoids any confusion about whether a particular visit has already been paid for." },
    ],
  },

  "auto-repair-invoice": {
    intro:
      "An auto repair invoice is both a bill and a service record - customers keep it for warranties, for resale, and for their own maintenance history. Clearly separating parts, labour, and diagnostics builds trust at the counter and gets you paid faster, while giving the customer the documented breakdown they expect from a professional garage. A vague total on a repair bill invites suspicion; a clean, itemised invoice reads as fair and keeps customers coming back for the next service.",
    sections: [
      {
        h: "Parts, labour, and diagnostics on their own lines",
        p: "Customers scrutinise repair bills more closely than almost any other trade invoice, so a transparent breakdown is essential. List each part with its quantity and price, show labour against each task at your shop rate, and bill any diagnostic time as its own line. This makes it obvious that you are charging fairly for parts and for skilled work, rather than presenting one figure the customer has to take on faith. Recording the vehicle details - make, model, mileage, and registration - alongside the work turns the document into a genuine service record the customer can rely on later.",
        list: [
          "Diagnostic or inspection fee",
          "Parts, itemised with quantities and prices",
          "Labour per task at your hourly shop rate",
          "Sundries - oil, fluids, and consumables",
          "Tax applied to the appropriate lines",
        ],
      },
      {
        h: "Labour hours times your shop rate",
        p: "Garage labour is normally billed as hours against a published shop rate, often using standard repair times for common jobs. Show the labour for each task as hours multiplied by your rate so the customer can see how the figure was built. Where you use standard times - a guidebook figure for, say, a clutch replacement - the customer benefits from a price agreed before the work starts rather than an open-ended bill. If a job runs over because of a seized bolt or a complication, a brief note explaining the extra labour keeps the higher figure transparent and the customer far more willing to settle without an argument.",
      },
      {
        h: "Estimate first, final invoice after",
        p: "Good practice on any non-trivial repair is to issue an estimate before you start and a final invoice once the work is done. The estimate sets the customer's expectation and gives you authority to proceed; the final invoice reflects what was actually fitted and done.\n\nWhere the final figure differs from the estimate - an extra part was needed, a fault turned out deeper than expected - flag the difference clearly and, ideally, get the customer's approval before exceeding the estimate. A documented estimate and a matching final invoice protect both sides and prevent the classic dispute over an unexpected total.",
        list: [
          "Issue a written estimate before starting",
          "Get approval before exceeding the estimate",
          "Produce a final invoice for the actual work",
          "Flag and explain any difference from the estimate",
        ],
      },
      {
        h: "Tax and warranty on a repair invoice",
        p: "Tax treatment can differ between parts and labour depending on your region, so keeping them on separate lines lets you apply it correctly rather than to the whole total. Note any warranty too: new parts often carry a manufacturer warranty, and your own labour may be guaranteed for a set period - stating both on the invoice gives the customer the record they need for any later claim. Because repair invoices resurface at resale and at the next service, a numbered, dated PDF with your garage branding is easy to file and find. The generator above totals parts, labour, and tax automatically so every repair invoice is accurate and professional.",
      },
    ],
    faqs: [
      { q: "Should parts and labour be taxed differently on a repair invoice?", a: "In some regions parts and labour are taxed at different rates or one is exempt, so keeping them on separate lines lets you apply tax correctly rather than to the whole total. Check your local rules and itemise accordingly so the invoice stays compliant and clear." },
      { q: "What is the difference between an estimate and a final invoice?", a: "An estimate is issued before the work to set expectations and authorise the repair; the final invoice reflects what was actually fitted and done. If the final figure exceeds the estimate, flag the difference and ideally get the customer's approval before going over." },
      { q: "How do I show a parts warranty on the invoice?", a: "Note the manufacturer warranty on new parts and the period your own labour is guaranteed. The dated, numbered invoice then serves as proof of when the repair was carried out and what was fitted, which the customer will need if a part fails within the warranty period." },
      { q: "Should I record vehicle details on the invoice?", a: "Yes. Recording the make, model, mileage, and registration turns the invoice into a genuine service record the customer can rely on at resale or for warranty claims, and it ensures the right work is tied to the right vehicle in your own records." },
      { q: "How should I handle a repair that ran over the estimated time?", a: "Show the actual labour hours against your rate and add a brief note explaining the extra time, such as a seized component that had to be cut out. A short explanation keeps the higher figure transparent and the customer much more willing to pay without dispute." },
    ],
  },

  "catering-invoice": {
    intro:
      "Catering invoices can be intricate - guest counts, menus, staff, rentals, and deposits all have to add up correctly for an event that may be months away. A clear, itemised catering invoice builds client confidence, locks in the deposit, and ensures the final balance is settled before or promptly after the big day. Weddings, corporate functions, and private parties all hinge on numbers that shift right up to the event, so billing that adjusts cleanly is part of running a calm, professional kitchen.",
    sections: [
      {
        h: "Per-head pricing and an itemised menu",
        p: "Most catering is priced per head, so the cleanest invoice multiplies your per-guest price by the confirmed headcount as a single clear line. Beneath or alongside it, an itemised menu reassures the client they are getting exactly what was agreed - canapes, three-course dinner, dessert table, evening buffet - and justifies the per-head figure. Where a client has chosen upgrades or additional courses, list those separately so the base package and the extras are easy to tell apart. A clear per-head structure also makes the inevitable changes painless: adjust the guest count and the line recalculates without rebuilding the whole invoice.",
        list: [
          "Per-head menu price multiplied by guest count",
          "Itemised menu so the client sees what is included",
          "Additional courses or menu upgrades",
          "Dietary or special-requirement meals, if priced separately",
          "Tax where it applies",
        ],
      },
      {
        h: "Staff, service charge, and equipment rentals",
        p: "Food is only part of a catered event. Service staff - chefs, servers, bar staff - are usually billed by the number of staff and the hours they work, shown as their own lines so the client sees the labour behind the service. A service charge, where you apply one, should be a clearly labelled line rather than a hidden uplift. Equipment that you hire in for the event - crockery, glassware, linen, a marquee kitchen, chafing dishes - is best itemised too, so the client understands what is food, what is people, and what is kit. This separation makes the quote easy to adjust if the client trims the package.",
      },
      {
        h: "Deposit, final headcount, then balance",
        p: "The standard catering rhythm is three steps: a deposit to confirm the booking, a final headcount a week or two before the event, and the balance once numbers are locked. Take the deposit early and show it as its own line; it secures the date and covers your initial outlay on ingredients and bookings.\n\nClose to the event, confirm the final guest count and raise the balance invoice against it, deducting the deposit already paid so the remaining amount is unmistakable. Clear deposit terms also protect you against late cancellations, where you may have already committed to suppliers and staff.",
        list: [
          "Deposit invoice to confirm the booking",
          "Confirm the final headcount before the event",
          "Balance invoice with the deposit deducted",
          "State your cancellation terms near the totals",
        ],
      },
      {
        h: "Gratuity and changing guest numbers",
        p: "Gratuity is best handled transparently: either leave it to the client, or include a clearly labelled, optional gratuity line so there is no ambiguity about whether service was included. Never bury it inside another figure. As for guest numbers, they shift right up to the day, which is exactly why a per-head structure is so useful - change the quantity and the subtotal, tax, and grand total all recalculate instantly in the generator above. That means your catering invoice stays accurate no matter how many times the final number moves between the deposit and the balance, and you can issue a corrected balance in seconds.",
      },
    ],
    faqs: [
      { q: "How do I handle changing guest numbers on a catering invoice?", a: "Use a per-head line that multiplies your price by the headcount, so adjusting the guest count recalculates the subtotal, tax, and total automatically. Confirm the final number shortly before the event and raise the balance invoice against the locked figure, deducting any deposit paid." },
      { q: "Should gratuity be added to the invoice or left to the client?", a: "Either is fine, but be transparent. Either leave gratuity entirely to the client or add a clearly labelled, optional gratuity line. Never fold it silently into another figure, as a hidden service charge is one of the quickest ways to upset an event client." },
      { q: "How should I bill for service staff at an event?", a: "Bill staff by the number of people and the hours they work, shown as their own lines separate from food. This lets the client see the labour behind the service and makes the package easy to adjust if they decide to reduce staffing or shorten the event." },
      { q: "What is the usual deposit and balance structure for catering?", a: "Most caterers take a deposit to confirm the booking, agree a final headcount a week or two before the event, then invoice the balance against that count with the deposit deducted. Clear deposit terms also protect you if the client cancels after you have committed to suppliers." },
      { q: "How do I invoice for equipment I hire in for an event?", a: "Itemise rented equipment such as crockery, glassware, linen, or chafing dishes as their own lines, separate from food and staff. This shows the client what is food, what is people, and what is kit, and keeps the quote easy to adjust if they change the scope." },
    ],
  },

  "personal-trainer-invoice": {
    intro:
      "Personal trainers bill in a variety of ways - single sessions, multi-session packages, or monthly coaching plans - and a clear invoice keeps each client's payments easy to track. A professional, branded invoice also reinforces that you run a real business, which helps justify your rates and keeps clients committed long term. Whether you train clients in a gym, in their homes, or remotely through an app, tidy billing is part of the professional experience that keeps people training with you.",
    sections: [
      {
        h: "Sessions, packages, and monthly plans",
        p: "Single sessions are clearest billed individually, while packages and monthly plans suit a single line for the agreed amount. Showing the per-session value of a package - for example a ten-session block with the effective per-session rate noted - highlights the saving and nudges clients to commit to more sessions up front. Monthly coaching plans, which may bundle sessions, programming, and check-ins, work best as one clear line naming the month covered. Whichever model a client is on, naming it on the invoice keeps their billing transparent and lets you see at a glance what each client is paying for.",
        list: [
          "Session type - one-to-one, group, or online",
          "Number of sessions or the plan period",
          "Per-session rate or package price",
          "Programming or nutrition add-ons",
          "Payment due date and method",
        ],
      },
      {
        h: "Set a clear cancellation and no-show policy",
        p: "Late cancellations and no-shows are the bane of a trainer's schedule, because a missed slot is income you cannot recover. State your cancellation policy plainly near your invoice terms - for instance that sessions cancelled with less than twenty-four hours notice are charged in full - and apply it consistently. When you do charge for a missed or late-cancelled session, add it as a clearly labelled line rather than quietly counting it against a package, so the client understands exactly what happened. A visible, fairly applied policy protects your time and trains clients to respect the booking.",
      },
      {
        h: "Recurring billing for ongoing clients",
        p: "Clients on monthly plans or standing weekly sessions are ideal for recurring invoices. Save your template, update the period and the invoice number each month, and send the same clean PDF on the same day - clients come to expect it and pay on a predictable schedule, which smooths your income.\n\nFor prepaid packages, track how many sessions remain and note it on the invoice or a follow-up, so both you and the client know when a top-up is due. A consistent invoice number per client makes a block of sessions easy to follow from purchase to the final session.",
        list: [
          "Reuse one layout each billing period",
          "Increment the invoice number every cycle",
          "Send on the same day each month",
          "Note remaining sessions on prepaid packages",
        ],
      },
      {
        h: "In-person and online coaching",
        p: "Many trainers now blend in-person sessions with online coaching, and the two can sit happily on one invoice as separate lines - say, four in-person sessions plus a monthly online programming fee. If you coach clients in different countries through an app, bill each in their own currency; the generator above supports multiple currency symbols so a client in dollars and a client in pounds each get a clean invoice. Add your branding, list the sessions or plan, set a due date, and download a polished PDF in a minute, leaving you free to spend your time coaching rather than wrestling with admin.",
      },
    ],
    faqs: [
      { q: "How do I bill for a session package versus single sessions?", a: "Bill single sessions individually and a package as one line for the agreed amount. Noting the effective per-session rate within a package highlights the saving and encourages clients to commit up front. Track how many sessions remain so you know when a top-up is due." },
      { q: "How should I charge for a no-show or late cancellation?", a: "Set a clear policy, such as full charge for cancellations inside twenty-four hours, state it near your invoice terms, and apply it consistently. When you do charge, add it as a clearly labelled line rather than silently using a package session, so the client understands the charge." },
      { q: "How do I set up recurring invoices for monthly coaching clients?", a: "Reuse one consistent layout, update the period and invoice number each month, and send on the same day every cycle. The predictable rhythm trains clients to pay on schedule and makes any late payment obvious because the pattern is broken." },
      { q: "Can I bill in-person and online coaching on the same invoice?", a: "Yes. List in-person sessions and any online programming or check-in fee as separate lines on one invoice. This shows the client exactly what each part of their training costs and keeps a blended package transparent and easy to adjust month to month." },
      { q: "How do I invoice online clients in other countries?", a: "Bill each client in their own currency. The generator above supports multiple currency symbols, so a client paying in dollars and one paying in pounds each receive a clean, correctly denominated invoice without you needing separate tools or manual conversion on the document." },
    ],
  },

  "tutor-invoice": {
    intro:
      "Whether you teach in person or online, a clear tutoring invoice makes billing parents and students straightforward and professional. Listing lessons, dates, and your rate removes any confusion about what is owed - and a tidy PDF invoice reassures parents that they are dealing with a serious, organised tutor. Good billing is quietly reassuring to families investing in their children's education, and it makes the difference between being seen as a casual helper and a professional whose time is worth the rate.",
    sections: [
      {
        h: "Per-lesson, hourly, or package billing",
        p: "List each lesson with its date so parents can match the invoice to their own calendar, or bill a block of lessons as a package for simplicity. Hourly billing suits sessions of varying length, with the hours shown against your rate. Many tutors offer a small discount for prepaid blocks - show it as its own clearly labelled line so the saving is obvious and the parent sees the value of committing to a term. Naming the subject and the student on each line keeps everything unambiguous, which matters when a parent is approving the cost of several weeks of work at once.",
        list: [
          "Subject and student name",
          "Lesson dates or number of sessions",
          "Hourly rate or package price",
          "Any prepaid or block discount",
          "Payment due date and method",
        ],
      },
      {
        h: "Invoicing parents clearly and professionally",
        p: "When you are billing a parent rather than the student, the invoice should make the arrangement plain: which child the lessons were for, the subject, the dates, and the agreed rate. Parents are often coordinating tutoring around school, exams, and other commitments, so an invoice that clearly states what was delivered and when reduces queries and gets you paid quickly. Send it promptly at the end of the agreed period with a short payment window, and include your preferred payment method directly on the document. A professional, branded invoice also quietly justifies your rate and encourages parents to continue booking.",
      },
      {
        h: "Recurring monthly statements",
        p: "For ongoing tuition, a recurring monthly statement is the tidiest approach. At the end of each month, list every lesson delivered that month with its date, total them, and send the same clean layout with an incrementing invoice number. Parents come to expect the monthly invoice and budget for it, which smooths your income and reduces chasing.\n\nThis monthly rhythm also makes it easy to spot a missed payment, because the regular pattern is broken, and it gives both sides a clear record of exactly how many lessons took place each month.",
        list: [
          "List each lesson delivered in the month",
          "Total the lessons into one monthly figure",
          "Reuse one layout with an incrementing number",
          "Send on a consistent day each month",
        ],
      },
      {
        h: "Cancellations and tutoring several siblings",
        p: "Set a clear cancellation policy near your terms - for example that lessons cancelled with less than twenty-four hours notice are charged - and apply it consistently; if you charge for a late cancellation, add it as a labelled line so the parent understands it. When you tutor more than one child in a family, you can bill all the siblings on a single invoice with a separate line per child and per subject, which is far easier for the parent than juggling multiple bills. The generator above totals every lesson line, any discount, and tax automatically, so even a busy month across several students adds up correctly in seconds.",
      },
    ],
    faqs: [
      { q: "Should I bill per lesson or sell lesson packages?", a: "Both work. Per-lesson billing with dates lets parents match the invoice to their calendar, while prepaid packages improve your cash flow and reduce no-shows. If you offer a package discount, show it as its own labelled line so the saving and the value of committing are clear." },
      { q: "How do I invoice parents rather than students?", a: "Make the arrangement plain: name the child, the subject, the lesson dates, and the agreed rate. Send promptly at the end of the period with a short payment window and your payment method on the document, so a busy parent can see what was delivered and settle quickly." },
      { q: "How should I bill for tutoring several siblings in one family?", a: "Put all the siblings on a single invoice with a separate line for each child and each subject. This is far easier for the parent than receiving multiple bills, and the totals add up automatically so a household's whole month of tuition appears on one clear document." },
      { q: "What should my cancellation policy say for tutoring?", a: "State a clear notice period, such as charging in full for lessons cancelled with less than twenty-four hours notice, place it near your invoice terms, and apply it consistently. When you do charge a late cancellation, add it as a clearly labelled line so the parent understands it." },
      { q: "How do I send a recurring monthly statement to parents?", a: "At each month end, list every lesson delivered that month with its date, total them into one figure, and send the same layout with an incrementing invoice number on a consistent day. Parents come to budget for it, and the regular rhythm makes any missed payment obvious." },
    ],
  },

  "invoice-generator-usa": {
    intro:
      "Billing in the United States works differently from countries with a single national VAT. There is no federal sales tax, payment terms tend to run in Net periods, and contractor income is documented through W-9 and 1099 forms rather than a tax invoice. The generator above bills in US dollars and gives you a clean, itemised document that fits how American businesses pay, whether you invoice a local client or a company across the country.",
    sections: [
      {
        h: "What a US invoice should contain",
        p: "There is no single legal template in the US, but business clients and their accounts-payable teams expect a consistent set of details, and including them up front means fewer queries and faster approval. A purchase-order number, where the client uses one, is often what gets your invoice paid on schedule, so ask for it before you bill.",
        list: [
          "Your business name, address, and an invoice number",
          "The client's billing name and address",
          "Issue date and a clear payment due date",
          "Itemised lines with quantity, rate, and amount",
          "Your payment details (ACH, wire, check, Zelle, or card)",
        ],
      },
      {
        h: "There is no federal VAT, only state sales tax",
        p: "The US has no nationwide value-added tax. Instead, sales tax is set by individual states, and often by counties or cities on top of that, and many services are not taxable at all. If you sell taxable goods, you apply the rate for the location where the sale is sourced and show it as its own line. If your work is exempt, or you have no tax obligation (nexus) in the buyer's state, you generally add no sales tax. Because rules vary widely, confirm your position with the relevant state department of revenue rather than assuming a single national rate.",
      },
      {
        h: "EIN or SSN on your paperwork",
        p: "US businesses are identified by a federal tax ID. Sole proprietors can operate under their Social Security Number, while most other businesses use an Employer Identification Number (EIN) from the IRS. You do not have to print this number on every invoice, but you will supply it on a W-9 so clients can issue year-end forms. Keeping an EIN separate from your SSN is a simple way to avoid sharing your personal number with every client you bill.",
      },
      {
        h: "Common payment terms in the US",
        p: "American invoices usually state terms as a Net period counted from the invoice date, and choosing the right one helps your cash flow. Whatever you pick, print the exact due date as well as the term, since a calendar date removes any argument about when payment was due.",
        list: [
          "Net 30: full amount due 30 days after the invoice date",
          "Net 15: a shorter term common for smaller or newer clients",
          "Due on receipt: payment expected immediately",
          "Early-payment discount: a small reduction for fast settlement",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I have to charge sales tax on my US invoices?",
        a: "Only if you sell taxable goods or services and have a tax obligation in the buyer's state. Many services are exempt, and rates differ by state, county, and city. When you do charge it, show it as a separate line and confirm the correct rate with the relevant state department of revenue.",
      },
      {
        q: "What is the difference between an EIN and an SSN for invoicing?",
        a: "An SSN is your personal Social Security Number, which sole proprietors may use for business. An EIN is a federal Employer Identification Number issued by the IRS to a business. Using an EIN lets you complete a W-9 and receive 1099 forms without exposing your personal SSN to every client.",
      },
      {
        q: "Why do US clients ask me for a W-9 before paying?",
        a: "Businesses collect a W-9 to capture your legal name and taxpayer ID so they can report payments to the IRS at year end. Completing it is normal and does not mean tax is withheld from you. Keep a copy, and make sure the name on your invoices matches the W-9 you supplied.",
      },
      {
        q: "What does Net 30 mean on a US invoice?",
        a: "Net 30 means the full amount is due 30 days from the invoice date. Net 15 means 15 days, and due on receipt means immediately. To avoid confusion, print the actual calendar due date on the invoice in addition to the Net term, so the client knows the exact deadline.",
      },
      {
        q: "Do I need to send my own 1099 forms?",
        a: "Generally you receive 1099-NEC forms from business clients who paid you, rather than issuing them. You would only file 1099s if you yourself pay other contractors above the IRS reporting threshold. Either way, keep numbered invoices so the totals you report match what clients submit to the IRS.",
      },
    ],
  },

  "freelance-invoice-template-usa": {
    intro:
      "Freelancing in the US means you are an independent contractor, not an employee, and your invoices double as the income record behind your tax return. This template bills in US dollars and is built for solo freelancers and consultants who need to look professional to agency and corporate clients, get paid on short terms, and keep clean records that line up with the W-9 and 1099 paperwork that follows freelance work.",
    sections: [
      {
        h: "The W-9 then 1099-NEC cycle",
        p: "Most US business clients follow a predictable order. Before your first payment they ask you to complete a Form W-9, which records your legal name and taxpayer ID. After year end, if they paid you above the IRS reporting threshold for the year, they send you a Form 1099-NEC summarising what they paid. Your invoices are the matching record. Keep every one numbered and dated so the totals you report reconcile cleanly against each 1099-NEC you receive, even if some small clients pay below the threshold and send nothing.",
        list: [
          "Complete a W-9 for each new business client",
          "Invoice your work in US dollars with clear line items",
          "Expect a 1099-NEC from clients who paid you above the threshold",
          "Report all freelance income, whether or not a 1099 arrives",
        ],
      },
      {
        h: "You usually do not charge sales tax on services",
        p: "Most freelance services such as writing, design, consulting, and development are not subject to sales tax in many states, though some states do tax specific digital or creative services. If you only provide services and have no obligation in the client's state, you typically bill the agreed fee with no sales tax line at all. If you sell taxable goods, or work in a state that taxes your type of service, apply the correct rate as a separate line and check the position with that state's department of revenue before you assume.",
      },
      {
        h: "Self-employment tax is your responsibility",
        p: "As a freelancer, no employer withholds tax from your pay, so you are responsible for income tax and self-employment tax on your net earnings, often paid through quarterly estimated payments to the IRS. Your invoice total is not your take-home figure; a portion is set aside for tax. This is why clean, numbered invoices matter so much for freelancers. They let you add up your gross income accurately, estimate what to set aside, and support every figure if your return is ever reviewed.",
      },
      {
        h: "Deposits and short payment terms",
        p: "Cash flow is everything when you work for yourself, so structure your billing to protect it. For larger projects, invoice a deposit up front and the balance on delivery, shown as separate lines so the remaining amount is obvious. For ongoing or smaller work, short terms keep money moving.",
        list: [
          "Take a deposit on bigger projects before starting",
          "Use Net 15 or Net 30 rather than long terms",
          "Show the deposit and balance as separate lines",
          "State the exact due date, not just the Net term",
          "List your accepted payment methods on every invoice",
        ],
      },
    ],
    faqs: [
      {
        q: "As a US freelancer, do I charge sales tax on my services?",
        a: "Often not. Many states do not tax professional services such as writing, design, or consulting, so you bill the agreed fee with no tax line. Some states tax certain digital or creative services, so confirm your situation with the relevant state department of revenue before deciding either way.",
      },
      {
        q: "What is self-employment tax and is it on my invoice?",
        a: "Self-employment tax covers Social Security and Medicare contributions that an employer would normally share. It is not added to your invoice; you owe it on your net freelance earnings, usually via quarterly estimated payments. Treat part of every invoice total as money reserved for this and income tax.",
      },
      {
        q: "Should I put my SSN on a freelance invoice?",
        a: "No. There is no need to print any taxpayer ID on the invoice itself. You provide your SSN or EIN privately on a Form W-9 when a client requests it. Many freelancers obtain an EIN specifically so they never have to share their personal SSN with clients.",
      },
      {
        q: "Why did a client not send me a 1099-NEC?",
        a: "A client only files a 1099-NEC when their payments to you reach the IRS reporting threshold for the year, and some smaller clients fall below it. Not receiving one does not make the income tax-free. You must still report every dollar, which is why your own invoice records are essential.",
      },
      {
        q: "How much deposit should a US freelancer ask for?",
        a: "There is no fixed rule, but many freelancers request 25 to 50 percent up front on larger projects to cover early work and confirm commitment. Show the deposit as its own line, then invoice the balance on delivery so the client can clearly see what has been paid and what remains.",
      },
    ],
  },

  "invoice-generator-uk": {
    intro:
      "UK invoicing centres on whether or not you are registered for VAT, and on the record-keeping HMRC expects from sole traders and limited companies. This generator bills in pounds sterling and lets you add VAT at the correct rate with your VAT number on display, so you can produce a tidy, compliant invoice in seconds whether you are a registered business or trading below the VAT threshold.",
    sections: [
      {
        h: "VAT-registered or not",
        p: "You can only charge VAT once you are VAT-registered with HMRC. Registration becomes compulsory when your taxable turnover passes the threshold, which is £90,000 in any rolling twelve-month period, and you can also register voluntarily below that. If you are not registered, you must not add VAT to your invoices or show a VAT number; doing so without registration is a serious offence. If you are registered, every standard invoice to another business should be a full VAT invoice showing the tax clearly.",
      },
      {
        h: "What a full VAT invoice must show",
        p: "HMRC sets out specific details a full VAT invoice must contain so that your VAT-registered customers can reclaim the tax. Leaving any of them off can cause your client's accounts team to reject the invoice, so it is worth getting the layout right once and reusing it. The generator above keeps these fields in a consistent place on every document.",
        list: [
          "A unique, sequential invoice number and the invoice date",
          "Your business name, address, and VAT registration number",
          "The customer's name and address",
          "A description of each supply, with the VAT rate and amount per line",
          "The total before VAT, the total VAT, and the gross amount due",
        ],
      },
      {
        h: "UK VAT rates",
        p: "Apply the rate that matches what you are selling, and if you handle a mix of rates, show each line separately so the VAT breakdown is clear to your customer and to HMRC. Note that exempt supplies, such as some financial and insurance services, are different from zero-rated ones and carry no VAT.",
        list: [
          "Standard rate of 20 percent on most goods and services",
          "Reduced rate of 5 percent on supplies such as domestic energy",
          "Zero rate of 0 percent on most food, children's clothing, and books",
          "Exempt supplies, which carry no VAT and differ from zero-rated",
        ],
      },
      {
        h: "Sole traders and sequential numbering",
        p: "Whether you are a sole trader reporting through Self Assessment or run a limited company, sequential invoice numbering is more than tidiness; it is what HMRC expects and what makes your records defensible. A continuous series, such as 2026-001 and 2026-002, with no gaps, lets you prove that every invoice is accounted for. Keep a copy of each one. HMRC generally requires business records to be retained for at least five years after the relevant Self Assessment deadline, and six years if you are VAT-registered.",
      },
    ],
    faqs: [
      {
        q: "When do I have to register for VAT in the UK?",
        a: "Registration is compulsory once your taxable turnover exceeds £90,000 over any rolling twelve-month period, or if you expect to pass it within the next 30 days. You may also register voluntarily below the threshold, which can let you reclaim VAT on business costs. Below it, you must not charge VAT.",
      },
      {
        q: "Can I put a VAT number on my invoice if I am not registered?",
        a: "No. Only VAT-registered businesses may show a VAT number and charge VAT. Displaying a number you do not hold, or charging VAT without being registered, is a serious offence under UK law. If you are not registered, simply invoice the agreed amount with no VAT line at all.",
      },
      {
        q: "What is the difference between zero-rated and exempt for VAT?",
        a: "Zero-rated supplies are taxable at 0 percent, so they count towards your turnover and you can reclaim related input VAT. Exempt supplies, such as some financial or insurance services, carry no VAT and do not allow you to reclaim related input tax. The distinction affects both your invoicing and your VAT return.",
      },
      {
        q: "Do sole traders need to issue VAT invoices?",
        a: "Only if you are VAT-registered. A sole trader below the threshold issues an ordinary invoice with no VAT. Once registered, you must issue full VAT invoices showing your VAT number, the rate, and the VAT amount. Either way, keep your numbering sequential and retain copies for HMRC.",
      },
      {
        q: "How long must I keep my UK invoices?",
        a: "HMRC generally expects business records to be kept for at least five years after the 31 January Self Assessment deadline they relate to. If you are VAT-registered, the requirement is six years. Numbered, dated PDF copies of every invoice are the simplest way to satisfy this and answer any enquiry.",
      },
    ],
  },

  "invoice-generator-canada": {
    intro:
      "Canadian invoicing revolves around GST and HST, with several provinces adding their own PST or QST on top. Which tax you charge depends entirely on where the supply is made, and registered businesses must show their tax number so customers can claim input tax credits. This generator bills in Canadian dollars and lets you apply the right combination for your province, so you can issue a compliant invoice in seconds.",
    sections: [
      {
        h: "GST, HST, and PST explained",
        p: "Canada layers a federal tax with provincial ones in different ways. The federal Goods and Services Tax (GST) of 5 percent applies across the country. In several provinces it is blended with the provincial portion into a single Harmonised Sales Tax (HST). Other provinces keep them separate, charging the 5 percent GST plus their own Provincial Sales Tax (PST), while Quebec runs its own Quebec Sales Tax (QST) alongside the GST. You charge based on the province where the supply is made, not necessarily where your business is based.",
        list: [
          "GST: 5 percent federal tax, applied nationwide",
          "HST provinces such as Ontario, New Brunswick, Nova Scotia, Newfoundland and Labrador, and Prince Edward Island",
          "GST plus PST provinces: British Columbia, Saskatchewan, and Manitoba",
          "Quebec: GST plus QST, administered provincially",
          "GST only: Alberta and the three territories",
        ],
      },
      {
        h: "When you must register for GST/HST",
        p: "The Canada Revenue Agency treats you as a small supplier until your worldwide taxable revenues exceed CA$30,000 in a single calendar quarter, or across four consecutive calendar quarters. Once you cross that figure you must register, begin charging GST/HST, and put your registration number on your invoices, starting with the very sale that takes you over the line. Below the threshold you can register voluntarily, which lets you claim input tax credits on your own costs, but you are not obliged to, in which case you should not charge any GST/HST at all.",
      },
      {
        h: "What a GST/HST invoice should show",
        p: "For your business customers to recover the tax they pay you, the CRA expects your invoice to carry certain information, and more detail is required as the invoice value rises. Getting it right protects your clients' input tax credit claims and keeps your own records clean. The generator above keeps these elements consistent on every invoice.",
        list: [
          "Your business name and the date of the invoice",
          "Your nine-digit business number with the GST/HST account suffix",
          "A clear description of the goods or services",
          "The total amount and the amount of GST/HST charged, or a note that it is included",
          "The customer's name and the terms, for higher-value invoices",
        ],
      },
      {
        h: "Your business number",
        p: "Most Canadian businesses are identified by a business number (BN) issued by the CRA, a nine-digit base with two-letter and four-digit suffixes for each program account. The GST/HST account uses the RT suffix. When you register for GST/HST, that full number is what you display on invoices so customers can verify your registration and support their own claims. If you are a small supplier who has not registered, you simply do not show a GST/HST number and do not charge the tax.",
      },
    ],
    faqs: [
      {
        q: "Which sales tax do I charge if my client is in another province?",
        a: "Generally you charge the rate for the province where the supply is made, which for many services is the customer's province. That can mean HST for an Ontario client and GST plus PST for a British Columbia client. The place-of-supply rules determine this, so confirm your situation with CRA guidance.",
      },
      {
        q: "What is the small-supplier threshold in Canada?",
        a: "You are a small supplier until your taxable revenues exceed CA$30,000 in a single calendar quarter or across four consecutive calendar quarters. Below that, registration is optional and you do not charge GST/HST. Once you pass it, you must register and start charging tax on the sale that takes you over.",
      },
      {
        q: "Do I need a business number to invoice in Canada?",
        a: "You can invoice without one if you are an unregistered small supplier. However, to charge and remit GST/HST you must register, which gives you a business number with a GST/HST account suffix. That number must appear on your invoices so customers can claim input tax credits.",
      },
      {
        q: "Why does the buyer's information matter on a Canadian invoice?",
        a: "The CRA requires progressively more detail as the invoice value increases, including the buyer's name and the terms of sale on higher-value invoices. Including the customer's full details helps protect their input tax credit claim and avoids the invoice being questioned by their bookkeeper or by the CRA.",
      },
      {
        q: "How do I show tax on a Canadian invoice for an HST province?",
        a: "In an HST province you apply the single combined rate for that province and can show it as one HST line, rather than splitting federal and provincial portions. State either the HST amount separately or note that the price includes HST, alongside your GST/HST registration number.",
      },
    ],
  },

  "invoice-template-canada": {
    intro:
      "A well-built Canadian invoice template does the tax thinking for you: it leaves room for your GST/HST number, separates the tax from the subtotal, and formats every figure in Canadian dollars. This template is laid out for Canada province by province, so freelancers and small businesses can drop in their details, apply the correct combination of GST, HST, PST, or QST, and download a clean PDF without reformatting a spreadsheet each time.",
    sections: [
      {
        h: "The fields a Canadian invoice template needs",
        p: "Beyond the usual business and client details, a Canadian template earns its keep by having the tax structure already in place. That means a clearly labelled tax line (or lines, where a province splits federal and provincial tax), a dedicated space for your registration number, and totals that recalculate as you edit. With the structure fixed, you fill in the work, and the layout stays professional no matter how many line items you add.",
        list: [
          "Your business name, address, and contact details",
          "A unique, sequential invoice number and the date",
          "Itemised lines with description, quantity, rate, and amount",
          "A subtotal, then a separate line for each applicable tax",
          "A space for your GST/HST (and PST/QST) registration numbers",
        ],
      },
      {
        h: "A province-by-province tax view",
        p: "The single most important choice on a Canadian invoice is which tax to apply, and that turns on the place of supply. Some provinces fold federal and provincial tax into one harmonised rate, which means a single tax line. Others keep two separate taxes, so your template needs two lines. Quebec and the territories are different again. Setting your province once in the template keeps every future invoice correct.",
        list: [
          "HST (one combined line): Ontario, New Brunswick, Nova Scotia, Newfoundland and Labrador, Prince Edward Island",
          "GST plus PST (two separate lines): British Columbia, Saskatchewan, Manitoba",
          "GST plus QST (two lines): Quebec",
          "GST only (one line): Alberta, Yukon, Northwest Territories, Nunavut",
        ],
      },
      {
        h: "Showing your GST/HST number",
        p: "If you are registered, your GST/HST registration number must appear on the invoice; it is what allows your business customers to claim the input tax credit on the tax you charged them. Place it near your business details or beside the tax line so it is easy to find. If you also collect PST or QST in a province that administers its own tax, show that registration number too. An unregistered small supplier leaves these fields blank and charges no sales tax, which is equally valid as long as it is consistent.",
      },
      {
        h: "Formatting amounts in Canadian dollars",
        p: "Clear money formatting prevents disputes and looks professional to a client's accounts team. Use the dollar symbol and label the currency as CAD where there is any chance of confusion, especially when you also work with US clients who use the same symbol. Keep two decimal places on every figure, align the amounts in a column, and let the template carry the subtotal, the tax, and the grand total down the page so the math is transparent. The generator above formats CA$ amounts and totals automatically as you type.",
      },
    ],
    faqs: [
      {
        q: "Which provinces use HST and which use GST plus PST?",
        a: "HST provinces with one combined rate are Ontario, New Brunswick, Nova Scotia, Newfoundland and Labrador, and Prince Edward Island. British Columbia, Saskatchewan, and Manitoba charge GST plus a separate PST. Quebec charges GST plus QST, and Alberta and the territories charge GST only.",
      },
      {
        q: "How do I show two taxes on an invoice for a PST province?",
        a: "In British Columbia, Saskatchewan, or Manitoba, list the 5 percent GST on one line and the provincial PST on a separate line beneath the subtotal. Showing them separately makes each tax transparent and lets the customer reconcile the GST portion against their input tax credit claim.",
      },
      {
        q: "Should I write CAD or just use the dollar sign on my template?",
        a: "Both are fine, but adding CAD removes ambiguity, since the dollar symbol is shared with the US and other currencies. If you ever invoice clients abroad, label the currency clearly as CAD so there is no doubt about what you expect to be paid. Keep two decimal places throughout.",
      },
      {
        q: "Where should the GST/HST number go on the template?",
        a: "Place it near your business name and address, or directly beside the tax line. The key point is that it is easy for a customer's bookkeeper to find, because they need it to claim the input tax credit. Include your PST or QST number too if you collect those taxes.",
      },
      {
        q: "Can I use one template for clients in different provinces?",
        a: "Yes, but you must switch the tax to match the place of supply for each client rather than always using your home province. A flexible template lets you select HST, GST plus PST, GST plus QST, or GST only as needed, so a single layout serves customers right across Canada.",
      },
    ],
  },

  "invoice-generator-australia": {
    intro:
      "In Australia, the document you give a GST-registered customer is not just an invoice; it is a tax invoice, and the term has a precise meaning to the ATO. Getting the required elements right is what lets your customers claim their GST credits and keeps you on the right side of the rules. This generator bills in Australian dollars, supports GST, and lays out the fields a valid tax invoice needs, so you can issue one in seconds.",
    sections: [
      {
        h: "What makes a valid tax invoice",
        p: "If you are registered for GST, a taxable sale generally calls for a tax invoice rather than an ordinary one, and the ATO sets out exactly what it must contain. Missing any element can stop your customer claiming their GST credit, which is the most common reason invoices get bounced back. Getting the layout right once and reusing it is the simplest fix, and the generator above keeps these elements in place on every document.",
        list: [
          "The words Tax invoice, shown prominently",
          "Your business or trading name and your ABN",
          "The date the invoice is issued",
          "A description of the items sold, with quantity and price",
          "The GST amount, or a statement that the price includes GST",
        ],
      },
      {
        h: "Why your ABN belongs on every invoice",
        p: "Your Australian Business Number (ABN) identifies your business in dealings with the ATO and with other businesses, and it is a required element of a tax invoice. It matters for a practical reason too. If you do not quote an ABN when you supply another business, that business is generally required to withhold 47 percent of the payment under the no-ABN withholding rule and remit it to the ATO. Quoting your ABN, which is free to obtain if you are carrying on an enterprise, means you receive the full amount you billed.",
      },
      {
        h: "Extra fields for invoices of A$1,000 or more",
        p: "The ATO requires more detail on larger tax invoices. For a taxable sale of A$1,000 or more (GST-inclusive), the invoice must also identify the buyer, by showing either the buyer's identity or their ABN, in addition to all the standard elements. For sales under A$1,000 the buyer's details are not strictly required, though many businesses include them anyway for clarity. If your invoice mixes taxable and GST-free items, it must also show clearly which items include GST so the breakdown is unambiguous.",
        list: [
          "All the standard tax invoice elements",
          "The buyer's identity or the buyer's ABN",
          "Clear identification of which items are taxable",
          "The GST amount or a price-includes-GST statement",
        ],
      },
      {
        h: "What happens if no ABN is quoted",
        p: "The no-ABN withholding rule is a frequent surprise for new businesses. When a supplier does not provide an ABN on an invoice for a taxable supply, the paying business must generally withhold tax at 47 percent from the payment, unless an exception applies, and pay it to the ATO. You then have to recover it through your tax return rather than from the client. The lesson is simple: get your ABN before you start invoicing, display it clearly, and you avoid the whole problem and get paid in full and on time.",
      },
    ],
    faqs: [
      {
        q: "What must the words on a valid Australian tax invoice say?",
        a: "A valid tax invoice must display the words Tax invoice prominently, not just Invoice. Alongside that it needs your ABN, your business name, the issue date, a description of what was sold, and the GST amount or a statement that the price includes GST. Larger invoices need the buyer's details too.",
      },
      {
        q: "What extra details are needed for invoices of A$1,000 or more?",
        a: "For a taxable sale of A$1,000 or more including GST, the tax invoice must also identify the buyer, by showing either the buyer's name or their ABN, in addition to all the standard elements. Below A$1,000 the buyer's details are not strictly required, though many suppliers include them anyway.",
      },
      {
        q: "What happens if I do not put my ABN on an invoice?",
        a: "If you supply another business and do not quote an ABN, that business is generally required to withhold 47 percent of the payment under the no-ABN withholding rule and send it to the ATO. You would then recover it via your tax return. Quoting your free ABN avoids this entirely.",
      },
      {
        q: "Do I need to issue a tax invoice if I am not registered for GST?",
        a: "No. Only GST-registered businesses issue tax invoices. If you are not registered, you must not charge GST or use the words Tax invoice; you issue an ordinary invoice for the agreed amount. You should still show your ABN so the customer is not required to withhold tax.",
      },
      {
        q: "Can one document show both taxable and GST-free items?",
        a: "Yes, but it must make clear which items include GST and which are GST-free, so the breakdown is unambiguous. Showing the GST amount that applies, and identifying the taxable lines, lets your customer claim the correct GST credit and keeps the invoice valid in the ATO's eyes.",
      },
    ],
  },

  "invoice-generator-australia-gst": {
    intro:
      "Once you cross the GST registration turnover threshold in Australia, GST shapes how you bill, what you can claim back, and what you report to the ATO. This generator is set up for GST billing: it shows your ABN, applies 10 percent GST, and produces a valid tax invoice your customers can use to claim their credits. The focus here is the GST lifecycle, from registering to charging, claiming, and reporting on your BAS.",
    sections: [
      {
        h: "GST registration and the turnover threshold",
        p: "You must register for GST once your GST turnover reaches A$75,000 or more in a rolling twelve-month period, counting the current month and the previous eleven, or as soon as you expect to reach it. There is a 21-day window to register from the point you become aware you will pass the threshold. Some businesses register voluntarily below A$75,000 so they can claim GST credits on their purchases. A higher threshold applies to non-profit bodies, and ride-sourcing and taxi drivers must register regardless of turnover.",
      },
      {
        h: "Charging 10 percent GST",
        p: "Once registered, you add 10 percent GST to most taxable sales you make in Australia and pay that amount to the ATO. Not everything is taxable: some supplies are GST-free, such as most basic food, certain health and education services, and exports, while others are input taxed. Most goods and services exported to overseas customers are GST-free, which is important if you bill clients abroad. On your invoices, show the GST clearly, and where a supply is GST-free, make that obvious so the zero treatment is not mistaken for an error.",
        list: [
          "Standard taxable sales in Australia: add 10 percent GST",
          "GST-free examples: most basic food, many health and education services",
          "Exports and most services to overseas clients: generally GST-free",
          "Input-taxed supplies: no GST charged and no credits on related costs",
        ],
      },
      {
        h: "Claiming GST credits",
        p: "Registration is not only about collecting tax; it lets you claim back the GST you pay on business purchases, known as GST credits or input tax credits. To claim a credit you generally need a valid tax invoice from your supplier for purchases above the low-value limit, the purchase must be for your business, and the price must have included GST. This is why holding correct tax invoices from your own suppliers matters as much as issuing them. Keep them filed so that, at reporting time, the credits you claim are all properly supported.",
      },
      {
        h: "BAS basics and valid tax invoices",
        p: "Registered businesses report GST to the ATO on a Business Activity Statement (BAS), usually quarterly or monthly depending on your turnover. On the BAS you report the GST you collected on sales and subtract the GST credits on your purchases, then pay the difference or receive a refund. The whole system depends on valid documentation, so make sure every invoice you issue meets the tax invoice requirements and that you hold a valid tax invoice for each credit you claim.",
        list: [
          "Report GST collected on your sales for the period",
          "Subtract GST credits on eligible business purchases",
          "Pay the net GST owing, or claim a refund if credits exceed it",
          "Keep valid tax invoices to support every figure",
          "Lodge by the due date for your reporting cycle",
        ],
      },
    ],
    faqs: [
      {
        q: "At what turnover must I register for GST in Australia?",
        a: "You must register once your GST turnover reaches A$75,000 or more over a rolling twelve-month period, or as soon as you expect to. You then have 21 days to register. Below that you can register voluntarily to claim GST credits. Non-profits have a higher threshold and rideshare drivers must register regardless.",
      },
      {
        q: "How do I charge GST on my invoices?",
        a: "Add 10 percent GST to the price of most taxable sales made in Australia and show it on the tax invoice, either as a separate amount or by stating the price includes GST. Some supplies, including most exports and many services to overseas clients, are GST-free, so no GST is added to those.",
      },
      {
        q: "What is a GST credit and how do I claim it?",
        a: "A GST credit, or input tax credit, is the GST you paid on a business purchase that you can recover from the ATO. To claim it you generally need a valid tax invoice from the supplier for purchases above the low-value limit, the purchase must be for your business, and GST must have been included in the price.",
      },
      {
        q: "What is a BAS?",
        a: "A Business Activity Statement is the form GST-registered businesses lodge with the ATO, usually quarterly or monthly. On it you report the GST you collected on sales, subtract the GST credits on your purchases, and pay the net amount owing or receive a refund. It relies on accurate invoice records.",
      },
      {
        q: "Why does my customer need a valid tax invoice to claim GST?",
        a: "The ATO only allows a GST credit where the buyer holds a valid tax invoice for purchases above the low-value limit. If your invoice is missing required elements, such as the words Tax invoice, your ABN, or the GST amount, your customer cannot claim the credit, which is why issuing a compliant tax invoice matters.",
      },
    ],
  },

  "invoice-generator-india": {
    intro:
      "Invoicing in India is governed by GST, and for business-to-business work a correctly formatted tax invoice is what lets your client claim input tax credit. That makes accuracy commercially valuable, not just a compliance chore. This generator bills in rupees and supports the fields a GST tax invoice needs, from your GSTIN to HSN or SAC codes and the right CGST, SGST, or IGST split, so you can issue a clean, credit-ready invoice in seconds.",
    sections: [
      {
        h: "The GST tax invoice format",
        p: "A GST tax invoice has a defined set of mandatory particulars so that your registered customers can claim the tax back. The exact level of HSN or SAC detail required scales with your turnover, but the core fields are consistent. Getting them right is what separates a valid tax invoice from a document a client's accountant will reject. The generator above keeps these particulars in a consistent place on every invoice you raise.",
        list: [
          "Your name, address, and GSTIN",
          "A consecutive invoice number, up to sixteen characters, and the date",
          "The customer's name, address, and GSTIN for B2B supplies",
          "HSN code for goods or SAC code for services",
          "Taxable value, the tax rate, and the CGST, SGST, or IGST amounts",
        ],
      },
      {
        h: "CGST and SGST or IGST, and place of supply",
        p: "Which tax you charge depends on the place of supply relative to where you are located. For an intra-state supply, where the supplier and the place of supply are in the same state, you split the tax into Central GST (CGST) and State or Union Territory GST (SGST or UTGST) in equal halves. For an inter-state supply, across state lines, you charge a single Integrated GST (IGST) instead, broadly equal to the combined CGST and SGST. Determining the place of supply correctly is essential, because charging the wrong head can cause problems for both you and your customer.",
      },
      {
        h: "HSN and SAC codes",
        p: "Every product or service on a GST invoice is classified by a code. Goods use the Harmonised System of Nomenclature (HSN), while services use the Services Accounting Code (SAC). How many digits you must quote depends on your turnover in the preceding year, with larger businesses required to show more detail. Quoting the correct code matters because it ties each line to the right tax rate. If you are unsure which code applies to what you sell, check the official GST rate schedules rather than guessing, and keep the codes consistent across your invoices.",
        list: [
          "HSN classifies goods; SAC classifies services",
          "The number of digits required rises with your turnover",
          "The code determines the applicable GST rate for the line",
          "Keep codes consistent across all your invoices",
        ],
      },
      {
        h: "Who must register for GST",
        p: "GST registration becomes mandatory once your aggregate turnover crosses the threshold, which is commonly Rs 40 lakh for a supplier of goods and Rs 20 lakh for a supplier of services in normal-category states, with lower limits of Rs 20 lakh and Rs 10 lakh in certain special-category states. Some situations require registration regardless of turnover, such as making inter-state taxable supplies or selling through e-commerce operators. Below the threshold and not otherwise required, you can issue a bill of supply instead of a tax invoice and do not charge GST. Confirm the limit for your state, as thresholds can differ.",
      },
    ],
    faqs: [
      {
        q: "When do I charge CGST and SGST instead of IGST?",
        a: "You charge CGST and SGST together when the supply is intra-state, meaning the supplier and the place of supply are in the same state or union territory. When the supply crosses state lines, it is inter-state and you charge a single IGST instead. The place of supply, not your customer's billing address alone, decides this.",
      },
      {
        q: "Do I have to put HSN or SAC codes on every invoice?",
        a: "Goods are coded with HSN and services with SAC, and the number of digits you must show depends on your turnover in the preceding financial year, with larger businesses required to display more detail. Quoting the correct code is important because it links each line to the right GST rate.",
      },
      {
        q: "What is the GST registration threshold in India?",
        a: "It is commonly Rs 40 lakh aggregate turnover for suppliers of goods and Rs 20 lakh for suppliers of services in normal-category states, with lower limits in certain special-category states. Some activities, such as inter-state supply or selling via e-commerce, require registration regardless of turnover, so check the rule for your state.",
      },
      {
        q: "What is a bill of supply and when do I use it?",
        a: "A bill of supply is issued instead of a tax invoice when you cannot charge GST, for example if you are unregistered and below the threshold, or you supply exempt goods or services. It looks similar to a tax invoice but shows no GST, because there is no tax for the customer to claim.",
      },
      {
        q: "Why does my GSTIN matter to my B2B clients?",
        a: "Your GSTIN on a valid tax invoice is what allows a registered business customer to claim input tax credit for the GST you charged. Without your correct GSTIN and the other mandatory particulars, their claim can be denied, so accurate B2B invoices make you easier and cheaper for other businesses to work with.",
      },
    ],
  },

  "invoice-generator-pakistan": {
    intro:
      "For businesses and freelancers in Pakistan, a clear, professional invoice supports getting paid, claiming the right tax position, and keeping records the FBR may want to see. Sales tax here is split between the federal level for goods and the provinces for services, which affects what your invoice shows. This generator bills in rupees or a foreign currency such as US dollars, so you can produce a polished PDF for a local client or an overseas one in seconds.",
    sections: [
      {
        h: "What a professional Pakistani invoice includes",
        p: "Whether or not you are registered for sales tax, a clean invoice carries the same core details so the client knows exactly what they owe and you have a solid record. If you are registered, your tax registration number and the tax charged become essential additions. A consistent, numbered format also makes your annual income tax return far easier to compile, since you can total your invoices rather than reconstructing the year from memory.",
        list: [
          "Your business name, address, and contact details",
          "Your NTN, and STRN if you are registered for sales tax",
          "A unique invoice number and the date",
          "Itemised lines with description, quantity, and amount",
          "Any sales tax charged, shown as its own line, and the total",
        ],
      },
      {
        h: "NTN and STRN",
        p: "Two registration numbers commonly appear in Pakistani business. The National Tax Number (NTN) identifies you for income tax with the FBR and is the baseline most businesses and many freelancers hold. The Sales Tax Registration Number (STRN) is separate; you obtain it when you register for sales tax, and once you have it you are required to show it on your sales tax invoices, charge the applicable tax, and file periodic returns. If you are not registered for sales tax, you do not show an STRN or charge sales tax, but you may still hold an NTN for income tax purposes.",
      },
      {
        h: "Sales tax on goods versus services",
        p: "Pakistan splits sales tax by what you supply. Sales tax on goods is administered federally by the Federal Board of Revenue (FBR), while sales tax on services is administered by the provincial authorities, such as the Sindh Revenue Board (SRB) in Sindh, the Punjab Revenue Authority (PRA) in Punjab, and the equivalent authorities in Khyber Pakhtunkhwa and Balochistan. This means the body you register with, the rate, and the return you file depend on whether you sell goods or services and in which province. Confirm your obligations with the authority that applies to your activity rather than assuming one rate covers everything.",
        list: [
          "Goods: federal sales tax administered by the FBR",
          "Services: provincial sales tax via SRB, PRA, and the other provincial authorities",
          "Your applicable rate depends on the activity and province",
          "Registration and returns are filed with the relevant authority",
        ],
      },
      {
        h: "Withholding tax and billing international clients",
        p: "Some Pakistani clients, particularly larger companies and government bodies, may withhold tax at source when they pay you and issue a deduction certificate, which you then account for on your own return. Organised invoices make reconciling these deductions much simpler. Many Pakistani freelancers also bill clients abroad in US dollars or another currency. Set the currency to match your client, describe each service clearly, and keep every invoice, as they support your foreign-remittance records when funds arrive through your bank or a service such as Payoneer or Wise.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between an NTN and an STRN in Pakistan?",
        a: "An NTN, or National Tax Number, identifies you for income tax with the FBR and is the baseline registration most businesses hold. An STRN, or Sales Tax Registration Number, is separate and is issued when you register for sales tax. You must show your STRN on sales tax invoices, while an NTN supports your income tax return.",
      },
      {
        q: "Who do I register with for sales tax, the FBR or my province?",
        a: "It depends on what you supply. Sales tax on goods is administered federally by the FBR, while sales tax on services is handled by provincial authorities such as the SRB in Sindh or the PRA in Punjab. Confirm your obligation with the authority that matches your activity and province.",
      },
      {
        q: "Do I need to add sales tax to my invoice as a freelancer?",
        a: "Only if you are registered for sales tax with the relevant authority. If you provide services you would deal with your provincial authority; if you are not registered, you do not show an STRN or charge sales tax. Many freelancers still hold an NTN for income tax even when not registered for sales tax.",
      },
      {
        q: "Can I invoice an overseas client in US dollars from Pakistan?",
        a: "Yes. Set the invoice currency to US dollars or your client's currency, give a clear description of the service, and keep a numbered copy of each invoice. These records support your foreign-remittance documentation when payments arrive through your bank or a service such as Payoneer or Wise.",
      },
      {
        q: "What is withholding tax and how does it affect my invoice?",
        a: "Some clients, especially large companies and government bodies, deduct tax when they pay you and issue a deduction certificate. The amount you receive is then net of that deduction, which you account for on your own tax return. Keeping invoices organised makes it easy to reconcile what was billed against what was withheld and remitted correctly.",
      },
    ],
  },

  "self-employed-invoice": {
    intro:
      "When you work for yourself, an invoice does double duty: it is how you ask a client for money, and it is the record you lean on at tax time. With no payroll department behind you, the responsibility for clear billing and tidy bookkeeping sits entirely with you. A consistent, professional invoice gets you paid without awkward chasing and quietly builds the paper trail that turns your annual tax return into a simple adding-up exercise rather than a frantic reconstruction.",
    sections: [
      {
        h: "What a self-employed invoice should include",
        p: "Working without an employer means there is no standard template handed to you, so it helps to know the elements a client and a tax inspector both expect to see. Each one removes a reason for payment to stall and makes your records easier to reconcile later.",
        list: [
          "Your trading name, address, and the payment details you accept",
          "The client's name and billing contact",
          "A unique, sequential invoice number and the issue date",
          "A line for each piece of work, with quantity or hours and your rate",
          "The subtotal, any tax, the total due, and a clear due date",
        ],
      },
      {
        h: "Keeping copies for your tax return",
        p: "Because you report your own income, every invoice you raise is a building block of your end-of-year figures. Save a PDF copy of each one the moment you send it, name the files consistently, and store them somewhere you will still have access to next spring. Most tax authorities expect self-employed people to retain business records for several years in case of a query, so a dated, numbered archive is not just convenient, it is protection.\n\nKeeping copies as you go also means you never have to guess what you earned. When the return is due, you simply total the invoices for the period rather than trawling through bank statements trying to remember which deposit related to which job.",
      },
      {
        h: "Setting sensible payment terms",
        p: "As a one-person operation your cash flow is personal, so terms matter. Shorter windows such as Net 7 or Net 14 keep money moving and reduce the time you spend chasing. State the due date plainly, list the methods you accept, and consider asking for a deposit on larger jobs so you are not financing the work yourself. A short, friendly reminder a day or two after the due date resolves most late payments, and a numbered invoice makes that follow-up quick to write.",
        list: [
          "Net 7 or Net 14 for steady, predictable cash flow",
          "A deposit up front on larger or longer projects",
          "The payment methods you accept, listed on the invoice",
          "A polite reminder ready to send just after the due date",
        ],
      },
      {
        h: "Looking professional as a one-person business",
        p: "Clients cannot see an office or a team behind you, so the invoice is often what tells them you are serious. A clean layout, your own logo, and consistent numbering signal that you run an organised business, which makes finance departments more comfortable approving your payment quickly. You do not need accounting software to achieve this. Fill in the generator above, add your details once, and download a polished PDF that looks every bit as established as a larger firm's.",
      },
    ],
    faqs: [
      {
        q: "Do I need a registered company to send a self-employed invoice?",
        a: "No. Sole traders and freelancers can invoice under their own name without forming a company. Include your name, address, and payment details, give each invoice a unique number, and that is a perfectly valid bill. You only need a company registration number on invoices if you have actually incorporated a limited company.",
      },
      {
        q: "What invoice number should I start with if I am brand new?",
        a: "Start wherever you like, as long as the sequence is unbroken from then on. Many people begin at 001 or 1001. The important thing is that numbers never repeat or skip, because a continuous series proves to a tax authority that you have not hidden any invoices.",
      },
      {
        q: "How do I invoice a client in another country as a sole trader?",
        a: "Set the currency to your client's currency in the generator above, include your full payment details such as an IBAN or a service like Wise or Payoneer, and keep the PDF for your records. Cross-border work can affect how tax applies, so check whether you charge or zero-rate tax for overseas clients.",
      },
      {
        q: "Can I invoice for work before I finish the whole project?",
        a: "Yes. Staged or milestone billing is common when you are self-employed and helps your cash flow. Invoice an agreed percentage up front or at set points, label each invoice clearly with what it covers, and issue a final invoice for the balance on completion.",
      },
      {
        q: "What if a self-employed client refuses to pay?",
        a: "Start with a polite reminder referencing the invoice number and due date, then a firmer follow-up. A clear, numbered, dated invoice is your evidence if you need to escalate to a formal demand or a small-claims process, which is exactly why keeping consistent records matters so much for the self-employed.",
      },
    ],
  },

  "rent-receipt": {
    intro:
      "A rent receipt is the simple but important document a landlord gives a tenant to confirm that rent has been paid for a particular period. It records who paid, how much, when, and for which dates, turning a routine transfer of money into evidence both sides can rely on. Tenants keep receipts to prove payment, support tax or allowance claims, and back up loan or visa applications, while landlords use them to maintain clean, dispute-proof records. The tool above produces a tidy receipt you can issue in seconds.",
    sections: [
      {
        h: "What a rent receipt must show",
        p: "A receipt only protects either party if it is unambiguous about the payment it records. Leaving out the period or the property invites confusion later, so include every detail below. Together they make the receipt stand up as evidence for a tax claim, a deposit dispute, or a reference request.",
        list: [
          "The tenant's name and the full property address",
          "The landlord's or agent's name, with an optional signature",
          "The amount paid and the currency",
          "The rental period the payment covers, such as the month and year",
          "The payment method, the date received, and any remaining balance",
        ],
      },
      {
        h: "Why tenants need rent receipts",
        p: "For a tenant, a receipt is the only solid proof that rent was actually paid, which matters far more than it seems until a dispute arises. If a landlord later claims a month was missed, a dated receipt settles it instantly. Receipts also support applications where you must demonstrate a steady housing cost or a reliable payment history, such as a mortgage, a loan, or a visa.\n\nIn several countries, salaried employees use rent receipts to claim a housing allowance against their taxable income. Tax offices may ask to see receipts as supporting evidence, and above a certain monthly rent they often require the landlord's tax identification number on the receipt, so a complete, consistent record each month keeps the tenant covered.",
      },
      {
        h: "Issuing receipts every month",
        p: "The cleanest approach is to issue a receipt each time rent is paid, on the same day every month, with a running receipt number. A monthly rhythm means neither side has to reconstruct a year of payments from a bank feed, and it gives the tenant a complete set to present whenever proof is needed. For tenants claiming a housing allowance, a full set of twelve consistent receipts is usually what the tax authority expects to see.",
        list: [
          "Issue one receipt per payment, on a consistent day",
          "Use a running receipt number for an unbroken record",
          "State the exact period each receipt covers",
          "Keep a copy for both landlord and tenant",
        ],
      },
      {
        h: "Adding a signature and other optional details",
        p: "A receipt is valid without a signature, but a signed one carries extra weight in a dispute and is sometimes expected for higher-value tax claims. You can also add the landlord's tax identification number where the rules require it, a note of the payment reference, or details of any partial payment and the balance still owed. The generator above lets you include these fields and download a clean PDF, so each receipt is as complete as the situation demands without becoming cluttered.",
      },
    ],
    faqs: [
      {
        q: "Is a rent receipt the same as a lease or tenancy agreement?",
        a: "No. A tenancy agreement is the contract that sets out the terms of the let, such as the rent, the deposit, and the length of the tenancy. A rent receipt is a much shorter document that simply confirms a specific payment was made for a specific period. You keep the agreement once and issue receipts repeatedly.",
      },
      {
        q: "Can I claim a housing allowance without rent receipts?",
        a: "Usually not. Where a salary includes a house rent allowance, the tax authority generally requires receipts as proof before the exemption is granted, and above a set monthly rent often wants the landlord's tax identification number on them too. Keeping a complete monthly set is the safest way to support the claim.",
      },
      {
        q: "Does a rent receipt need the landlord's signature to be valid?",
        a: "A receipt is generally valid without a signature if it clearly records the payment, period, and parties. That said, a signature adds credibility in a dispute and is sometimes required for tax purposes above a certain rent. The generator above includes an optional signature field for when you want that extra assurance.",
      },
      {
        q: "How should I record a part payment on a rent receipt?",
        a: "Show the amount actually received, state the period it relates to, and note the balance still outstanding. This keeps the record honest and makes it clear that the month was only partly settled, which protects both sides if the shortfall is queried or paid later.",
      },
      {
        q: "Who keeps the rent receipt, the landlord or the tenant?",
        a: "Both should. The tenant needs it as proof of payment and for any allowance or application; the landlord keeps a matching copy for clean records and tax. Issuing a PDF makes this easy, since the same document can be saved by both parties without any handwriting to decipher.",
      },
    ],
  },

  "proforma-invoice": {
    intro:
      "A proforma invoice is a good-faith document a seller sends before a sale is finalised, setting out what the buyer can expect to receive and what it will cost. The Latin phrase means as a matter of form, and that is exactly its role: it looks like an invoice and itemises everything, but it is not a demand for payment and it is not a tax document. Buyers use it to approve a purchase internally, arrange funds, or give customs an early estimate, while the seller commits to the terms quoted.",
    sections: [
      {
        h: "What a proforma invoice actually is",
        p: "A proforma is best understood as a detailed, formal quotation dressed in the layout of an invoice. It states the goods or services, the quantities, the unit prices, and the estimated total, along with any shipping or tax that would apply, so the buyer sees the full expected cost before committing. Crucially, it does not create an account-receivable for the seller or an account-payable for the buyer.\n\nBecause it is issued before the sale is confirmed, a proforma is never entered in your books as revenue and cannot be used by either party to reclaim or report tax. It signals intent and good faith, giving the buyer the confidence to proceed while leaving room for final quantities or prices to be adjusted on the real invoice that follows.",
      },
      {
        h: "When a proforma invoice is used",
        p: "Reach for a proforma whenever a buyer needs a formal document to act on before the sale is locked in. It is the standard way to turn a verbal quote into something a purchasing department can approve, and it is widely used in international trade and project work where money has to be arranged in advance.",
        list: [
          "Giving a customer a formal quote for internal sign-off",
          "Requesting an advance payment or a deposit before production",
          "Providing customs with an estimated value for an import or export",
          "Helping a buyer arrange financing, a letter of credit, or a budget",
          "Confirming terms when final quantities or prices may still shift",
        ],
      },
      {
        h: "How it differs from a final invoice",
        p: "The difference is timing and legal force. A proforma comes before the sale and is provisional; the final or commercial invoice comes once the deal is agreed or the goods are shipped, and it is the binding request for payment and the official accounting record. The proforma is not recorded as a sale and carries no tax point, whereas the final invoice is booked as revenue, triggers any tax due, and is the document used to chase payment.",
        list: [
          "A proforma is issued before the sale; the final invoice after",
          "A proforma estimates; the final invoice demands payment",
          "A proforma is not a tax document; the final invoice is",
          "A proforma can change; the final invoice is the definitive record",
        ],
      },
      {
        h: "Setting a validity period",
        p: "Because prices, exchange rates, and stock can move, a proforma should carry a validity period, for example valid for 30 days, so the buyer knows how long the quoted figures hold. Stating an expiry protects you if costs rise before the buyer commits, and it gently encourages a timely decision. When the buyer accepts and the order proceeds, you convert the proforma into a final invoice, ideally with the same numbering trail so the two documents are easy to match. The generator above lets you label the document clearly and add a validity note.",
      },
    ],
    faqs: [
      {
        q: "Can a buyer use a proforma invoice to make a payment?",
        a: "Often yes, in practice. A buyer may pay against a proforma to release an order or a shipment, which is common where a deposit is required before production. But the proforma itself is not the seller's formal demand or accounting record. Once payment or the sale is confirmed, the seller should issue a final invoice to book the revenue and account for any tax.",
      },
      {
        q: "Can I reclaim or report tax using a proforma invoice?",
        a: "No. A proforma has no tax point and is not a valid tax document, so neither side can use it to reclaim input tax or report a sale. Tax is accounted for on the final or commercial invoice issued once the sale is agreed. Treating a proforma as a tax invoice is a common and costly mistake.",
      },
      {
        q: "How long is a proforma invoice valid?",
        a: "For as long as you state on it. Sellers commonly set a validity period such as 14 or 30 days because prices, exchange rates, and stock can change. After the date passes you are free to requote. Including an expiry protects your margins and prompts the buyer to decide before the figures move.",
      },
      {
        q: "Should the proforma and the final invoice show the same numbers?",
        a: "Ideally yes, unless something genuinely changed. If final quantities, freight, or exchange rates shift, the final invoice reflects the actual deal and may differ. Keeping the figures aligned where possible, and referencing the proforma number on the final invoice, makes the two documents easy to reconcile for both parties and for customs.",
      },
      {
        q: "Do I record a proforma invoice in my accounts?",
        a: "No. Because the sale is not yet confirmed, a proforma is not entered as revenue or as a receivable. You only record the transaction when you raise the final invoice. This is why a proforma is safe to issue freely as a quote without affecting your books or your tax position.",
      },
    ],
  },

  "commercial-invoice": {
    intro:
      "A commercial invoice is the central document in any international shipment of goods. Customs authorities on both sides of a border rely on it to identify what is being shipped, value it, and calculate the duties and taxes due, while it also serves as the legal record of the cross-border sale between exporter and importer. An incomplete or vague commercial invoice is one of the most common reasons parcels are held at customs, so accuracy and detail directly affect how quickly your goods move.",
    sections: [
      {
        h: "What a commercial invoice is for",
        p: "Unlike a domestic bill, a commercial invoice exists primarily to satisfy customs rather than to chase payment, although it does both. When goods cross a border, the receiving country's customs service uses the invoice to classify the items, confirm their declared value, check the country of origin, and work out the import duty and tax the consignee must pay.\n\nBecause real money and legal liability hinge on these figures, the commercial invoice must describe the goods honestly and precisely. Under-declaring value or using a vague description like samples or gift can lead to fines, seizure, or long delays, so the document is treated as a formal customs declaration as much as a sales record.",
      },
      {
        h: "Required fields on a commercial invoice",
        p: "Customs officers need enough detail to value and classify a shipment without guessing. Missing fields are the usual cause of held parcels, so be thorough. Include every item below, and give a genuine, specific description of each product rather than a generic category.",
        list: [
          "Full shipper or exporter and consignee or importer details",
          "A clear description of each item, with quantity and unit value",
          "Harmonised System (HS) tariff codes for the goods",
          "Country of origin where the goods were made",
          "The currency, total value, and the reason for export",
          "The agreed Incoterms, such as DAP or DDP, and shipping details",
        ],
      },
      {
        h: "How Incoterms and HS codes work",
        p: "Two fields trip people up most. Incoterms are standard three-letter trade terms that state who pays for shipping, insurance, and import duties, and at what point responsibility passes from seller to buyer. Stating them removes any argument about who covers the customs bill. HS codes are an internationally recognised numbering system that classifies every type of product, and customs uses the code to set the correct duty rate.",
        list: [
          "Incoterms define who pays freight, insurance, and duties",
          "Common terms include EXW, FOB, CIF, DAP, and DDP",
          "HS codes classify each product for tariff purposes",
          "The right HS code sets the duty rate the importer pays",
        ],
      },
      {
        h: "Commercial versus proforma invoice",
        p: "The two are easy to confuse because they look alike, but their roles differ. A proforma invoice is sent before the sale is confirmed, giving the buyer and customs an early estimate and carrying no demand for payment. The commercial invoice is the final, definitive document that travels with the goods, clears customs, and supports the actual payment. The values on the two should match unless the order genuinely changed between quote and shipment, and the commercial invoice is the one customs treats as binding.",
      },
    ],
    faqs: [
      {
        q: "What happens if the value on a commercial invoice is wrong?",
        a: "Customs uses the declared value to assess duty and tax, so an incorrect figure can lead to delays while it is queried, recalculated charges, penalties, or even seizure of the goods. Deliberately under-declaring to reduce duty is treated as a serious offence. Always state the true transaction value in the stated currency.",
      },
      {
        q: "Do I need an HS code on every commercial invoice?",
        a: "For most international shipments, yes. Harmonised System codes let customs classify your goods and apply the correct tariff, and many carriers and destinations now require them. Using the right code speeds clearance and ensures the importer is charged the proper duty. You can look up codes through your national customs or trade authority.",
      },
      {
        q: "Who is responsible for the duties shown on a commercial invoice?",
        a: "It depends on the Incoterms agreed between buyer and seller. Under DDP, the seller covers duties and delivers cleared; under DAP or most other terms, the buyer pays the import duty and tax. Stating the Incoterm on the invoice makes this explicit, so neither party is surprised by a customs bill.",
      },
      {
        q: "How many copies of a commercial invoice do I need?",
        a: "Carriers typically ask for several copies: one travels inside the parcel, others are attached to the outside in a documents pouch, and the importer keeps a copy. Requirements vary by carrier and destination, but three copies is a common baseline. Producing a clean PDF means you can print as many identical copies as needed.",
      },
      {
        q: "Is a commercial invoice needed for a gift or sample shipment?",
        a: "Yes. Even gifts and samples crossing a border generally need a commercial invoice with a realistic value so customs can assess any duty. Marking an item as a gift does not exempt it, and declaring a token value to dodge duty can cause delays or penalties. State an honest value and a clear description.",
      },
    ],
  },

  "small-business-invoice": {
    intro:
      "For a small business, invoicing is the engine of cash flow, and getting it right is the difference between steady income and constant chasing. A good invoice is more than a request for money: it is a legally meaningful record, a marketing touchpoint, and a piece of your bookkeeping all at once. Whether you send a handful of invoices a month or dozens, a consistent routine with proper numbering, clear terms, and a professional layout keeps payments arriving on time and your accounts ready for inspection.",
    sections: [
      {
        h: "The essential elements every invoice needs",
        p: "Most tax authorities expect a business invoice to carry certain details before it counts as a proper record, and customers' finance teams look for the same things before they approve payment. Including each element below keeps you compliant and removes the small ambiguities that quietly delay payment.",
        list: [
          "The word Invoice, your business name, address, and contact details",
          "The customer's name and billing address",
          "A unique, sequential invoice number and the issue date",
          "An itemised list of goods or services with quantities and prices",
          "The subtotal, any tax with its rate, the total due, and the due date",
        ],
      },
      {
        h: "Sequential numbering and record-keeping",
        p: "Every invoice should carry a unique number in an unbroken sequence, such as INV-0001, INV-0002, and so on. A continuous series makes it impossible to lose track of what has been billed, shows a tax inspector that no invoices have been hidden or duplicated, and makes any single invoice easy to find when a customer queries it.\n\nKeep a saved copy of every invoice and receipt, because most jurisdictions require businesses to retain financial records for several years. Tidy, dated records turn tax filing from a scramble into a simple summary, and they protect you if your accounts are ever examined. A consistent file-naming habit, matched to your invoice numbers, makes the archive genuinely usable.",
      },
      {
        h: "The quote, invoice, and receipt cycle",
        p: "Small businesses rarely need just one document. A typical job flows through three: you win the work with a quotation, you bill it with an invoice once the work is done or the order is placed, and you confirm settlement with a receipt. Handling all three in one consistent design looks far more professional than a patchwork of files and keeps your records joined up from first enquiry to final payment.",
        list: [
          "Quotation, the branded estimate that wins the work",
          "Invoice, the itemised request for payment with a due date",
          "Receipt, the confirmation that payment was received",
          "One consistent layout across all three for a coherent paper trail",
        ],
      },
      {
        h: "Branding and getting paid on time",
        p: "A branded, well-formatted invoice signals reliability, and for a small business competing with bigger names that polish builds trust and encourages repeat custom. Add your logo, set an accent colour, and keep the layout the same on every document so customers recognise you instantly. To actually get paid, pair that professionalism with clear, short terms and a simple follow-up habit: state the due date plainly, list how to pay, and send a friendly reminder soon after anything falls overdue. The generator above produces all three document types from one place at no cost.",
      },
    ],
    faqs: [
      {
        q: "Does my small business legally have to put a tax number on invoices?",
        a: "Only if you are registered for a sales tax such as VAT or GST. Registered businesses must show their tax registration number and break out the tax charged. If your turnover is below the registration threshold and you are not registered, you do not add tax and have no number to display, though all the other invoice elements still apply.",
      },
      {
        q: "What is the difference between a quote and an invoice for my business?",
        a: "A quotation is an offer that tells a customer what a job will cost before they commit, and it carries no obligation to pay. An invoice is issued once the work is agreed or delivered and is a formal request for payment with a due date. Many businesses convert an accepted quote straight into an invoice to keep the figures aligned.",
      },
      {
        q: "How long should a small business keep copies of its invoices?",
        a: "It varies by country, but several years is typical, and longer if you are registered for a sales tax. Retaining numbered, dated PDFs of every invoice and receipt satisfies these rules and makes both routine tax filing and any audit far simpler. Treat your invoice archive as a permanent business asset, not disposable paperwork.",
      },
      {
        q: "What payment terms should a small business put on an invoice?",
        a: "Shorter terms protect your cash flow, so many small businesses use Net 14 or Net 30, or request payment on receipt for smaller jobs. State the exact due date rather than just a number of days, list the payment methods you accept, and consider a deposit on larger orders so you are not funding the work yourself.",
      },
      {
        q: "Can I reuse the same invoice number if I make a mistake?",
        a: "No. Never reuse or skip a number, as that breaks the audit trail. If an invoice is wrong, either issue a clearly labelled corrected invoice with the next number in the sequence, or raise a credit note against the original. Keeping the sequence unbroken is what proves to a tax authority that nothing has been concealed.",
      },
    ],
  },

  "bill-generator": {
    intro:
      "A bill and an invoice are the same document under two names: a request for payment that lists what you supplied and what it costs. If you run a shop, a stall, or a service business, a clean printed bill reassures customers and keeps your own records straight. The generator above turns your line items, tax, and totals into a tidy PDF bill you can print or send in seconds, with your own business name and logo at the top.",
    sections: [
      {
        h: "What every bill should include",
        p: "A clear bill answers three questions at a glance: who issued it, what was supplied, and how much is due. Keeping the same fields on every bill makes you look established and prevents disputes later, because nothing important is left to memory.",
        list: [
          "Your business name, contact details, and logo",
          "A bill number and the date of sale",
          "Each item or service with quantity and unit price",
          "Any tax shown as its own line",
          "The total due and how the customer can pay",
        ],
      },
      {
        h: "Cash bills and credit bills",
        p: "Not every bill is a request for future payment. When a customer pays on the spot, which is common in shops and for small services, you can mark the bill as paid and hand it over as proof of the transaction. Setting the status to paid turns the same document into a receipt, so you do not need a separate template. For credit customers, leave it unpaid and add a due date so both sides know exactly when the money is expected.",
      },
      {
        h: "Bill or invoice, does the word matter?",
        p: "In everyday use the two words are interchangeable, and customers in different countries simply prefer one term over the other. What counts legally and practically is the content, not the heading at the top. The generator lets you label the document as a bill, invoice, receipt, or quotation while keeping the same professional layout underneath, so you can match whatever your customers expect without rebuilding anything.",
      },
      {
        h: "Print it or send it as a PDF",
        p: "Once your bill is filled in, you can print it for a walk-in customer or download the PDF to email or message. A PDF cannot be altered as easily as a word-processor file, so the figures the customer receives are the figures you sent. Keeping a numbered copy of every bill, paid or unpaid, gives you a simple running record of your sales across the week, the month, and the year.",
      },
    ],
    faqs: [
      { q: "Is a bill the same as an invoice?", a: "In practice, yes. Both are itemised requests for payment that show what was supplied and the amount due. The choice of word is regional preference: many shops say bill, while businesses billing other businesses often say invoice. The structure and legal purpose are the same either way." },
      { q: "How do I turn a bill into a receipt?", a: "Mark the bill as paid. Once a customer has settled it, the same document showing a paid status works as a receipt and proof of payment. That saves keeping two separate templates, because one document covers both the request and the confirmation." },
      { q: "Can I make a simple cash bill?", a: "Yes. Add your items and totals, mark it paid if the customer is paying now, and download or print it. A cash bill needs nothing more than your details, the items, the total, and the date, though adding a bill number keeps your records in order." },
      { q: "Do I need to show tax on a bill?", a: "Only if you are registered to charge it. If you collect sales tax, VAT, or GST, show it as its own line so the customer can see both the tax and the pre-tax amount. If you are not registered, simply bill the agreed amount with no tax line at all." },
      { q: "How should I number my bills?", a: "Use a simple, continuous sequence such as 001, 002, 003, or a dated format like 2026-001. Sequential numbers with no gaps make it easy to find a specific sale, reconcile your takings, and answer a query from a customer or the tax office later." },
    ],
  },
  "online-bill-maker": {
    intro:
      "Making a bill online beats a handwritten pad or a fiddly word-processor file in almost every way: the maths is automatic, the layout stays neat, and the result is a professional PDF you can send before the customer has even left. The bill maker above runs in your browser on a phone, tablet, or laptop, so you can raise a bill at the counter, out on a job, or at your desk and have it ready to print or message in under a minute.",
    sections: [
      {
        h: "Why make a bill online instead of by hand",
        p: "A handwritten bill is slow, easy to get wrong, and hard to read back later. Making one online fixes all three problems at once and leaves you with a copy you can resend whenever a customer misplaces theirs.",
        list: [
          "Totals and tax are calculated for you, so there are no maths slips",
          "The layout stays neat no matter how many lines you add",
          "It looks professional, which helps you get paid",
          "Every bill is easy to store, search, and resend",
          "You can raise one from any device, anywhere",
        ],
      },
      {
        h: "Works on any device, nothing to install",
        p: "There is no app to download and no software to set up. The bill maker opens in the same browser you already use, whether that is on a phone in the field or a laptop at home. Your details and figures stay in the browser as you work, so you are not handing sensitive customer information to a third party just to print a bill.",
      },
      {
        h: "Common bills you can make",
        p: "One layout covers most everyday billing needs, so you learn it once and reuse it for whatever the day brings.",
        list: [
          "A retail or shop sale bill handed over at the counter",
          "A service bill for a job completed on site",
          "An hourly bill that lists time worked against your rate",
          "A recurring monthly bill for an ongoing customer",
          "A quotation sent before a job is agreed",
        ],
      },
      {
        h: "Tips for a bill customers trust",
        p: "A few small habits make a bill look credible and get it paid faster. Put your full contact details at the top, itemise the work clearly rather than lumping it into one line, show any tax separately, and add a short note telling the customer how and when to pay. Finishing with a consistent bill number ties the document into your records and makes follow-up simple if the payment is slow to arrive.",
      },
    ],
    faqs: [
      { q: "Can I make a bill from my phone?", a: "Yes. The bill maker runs in your phone browser, so you can create and download a bill at the counter or on a job without a computer. The layout adapts to the screen, and the finished PDF looks the same whether you made it on a phone, tablet, or laptop." },
      { q: "Does the bill download as a PDF or print directly?", a: "Both. You can download a clean PDF to email or message to the customer, or send it straight to a printer for a walk-in sale. The PDF keeps your layout fixed, so the customer sees exactly what you produced." },
      { q: "Is my customer and pricing data stored anywhere?", a: "No. The bill is built in your browser, and your customer names, rates, and totals are not uploaded or saved on a server. Only if you choose to sign in and save a document is anything stored, and that is always your decision." },
      { q: "Can I edit a bill after I have made it?", a: "Yes. While it is open you can change any field and the totals update instantly. For a bill you have already sent, the cleanest approach is to issue a corrected one with a new number rather than quietly altering the original, so your records stay consistent." },
      { q: "Can I bill an overseas customer in another currency?", a: "Yes. You can choose the currency before you download, so a bill for an international customer shows the right symbol and formatting. This is useful for freelancers and small exporters who invoice clients in another country." },
    ],
  },
  "bill-format": {
    intro:
      "A good bill format is simply a layout that puts the right information where people expect to find it: who the bill is from and to at the top, the items in the middle, and the totals and tax at the bottom. A consistent format makes your bills quicker to read, easier to pay, and simpler to file. The generator above applies a clean, professional bill format automatically, so you fill in the details and download a print-ready PDF without designing anything yourself.",
    sections: [
      {
        h: "The anatomy of a clear bill format",
        p: "Most well-designed bills share the same building blocks, arranged from top to bottom in a predictable order. Following this structure means a customer, or their accounts team, can find any figure in seconds.",
        list: [
          "A header with your business name, logo, and contact details",
          "The customer name and address (the bill-to block)",
          "A bill number and the issue and due dates",
          "An itemised table: description, quantity, rate, and amount",
          "Subtotal, tax, and the final total due",
          "A footer for payment terms, bank details, or a thank-you note",
        ],
      },
      {
        h: "Simple format or detailed format?",
        p: "A simple bill format suits a quick cash sale: your details, one or two lines, and a total. A detailed format suits larger jobs where the customer wants to see labour, materials, and tax broken out separately. Neither is more correct than the other; the right choice depends on the sale. What matters most is that you use the format consistently, so your bills are recognisable and your records line up.",
      },
      {
        h: "Cash bill format",
        p: "A cash bill is the format you use when payment happens immediately, such as at a shop counter or after a small on-site job. It carries the same core fields as any bill but is marked paid and handed over on the spot, doubling as the customer's receipt. Even for cash sales it is worth giving each bill a number and keeping a copy, so your daily takings can be reconciled at the end of the day.",
      },
      {
        h: "Why a PDF format beats an editable file",
        p: "Word and spreadsheet files shift their layout depending on the device and fonts available, and anyone can change the numbers after the fact. A PDF locks the figures and the design in place, prints the same everywhere, and looks far more professional than a document that arrives with a broken table. That reliability is why a PDF is the standard format businesses expect to receive.",
      },
    ],
    faqs: [
      { q: "What information goes at the top of a bill?", a: "The top of a bill carries your business name, logo, and contact details, followed by the customer name and address. Placing the issuer and recipient first lets anyone identify the parties immediately before reading the items and totals below." },
      { q: "What is the difference between a simple and a detailed bill format?", a: "A simple format lists a total with one or two lines, ideal for quick sales. A detailed format breaks out labour, materials, quantities, and tax on separate lines, which suits larger jobs where the customer wants to see exactly what they are paying for." },
      { q: "What is a cash bill format?", a: "A cash bill format is used when the customer pays on the spot. It shows the same core fields as any bill but is marked paid and handed over immediately, serving as the receipt. Numbering each one and keeping a copy makes daily reconciliation simple." },
      { q: "Should I use Word, Excel, or a PDF for my bill format?", a: "Fill in the details online and download a PDF. Word and Excel files reflow on different devices and can be edited after sending, while a PDF keeps your layout and figures fixed, prints consistently, and looks more professional to the customer." },
      { q: "Can I reuse the same format for invoices and receipts?", a: "Yes. The same underlying format works for invoices, bills, receipts, and quotations; you simply change the document label and payment status. Reusing one consistent layout keeps all your paperwork recognisable and easy to file." },
    ],
  },
  "free-invoice-generator": {
    intro:
      "An invoice generator does the work a blank template cannot: it calculates your subtotals, applies tax, formats the currency, and lays everything out on a clean page while you simply type the details. Because this one is free and needs no signup, you can raise a professional invoice the moment you need it and download the PDF straight away. It is built for anyone who bills occasionally or often and does not want a monthly fee or a fight with a spreadsheet.",
    sections: [
      {
        h: "A generator does more than a static template",
        p: "A downloaded Word or Excel template still leaves you doing the arithmetic, fixing the layout when a line wraps, and formatting the currency by hand. A generator handles all of that automatically: add a line and the subtotal, tax, and total recalculate instantly, and the design stays intact. That means fewer errors on the document a client uses to pay you, and a lot less time spent fiddling.",
      },
      {
        h: "Why free and no signup matters",
        p: "Paid invoicing tools make sense at scale, but they are overkill when you just need to send a bill today. A free, signup-free generator removes every barrier between you and a finished invoice.",
        list: [
          "No monthly subscription to justify",
          "No account to create or password to remember",
          "No email address handed over before you can start",
          "Nothing to cancel later",
        ],
      },
      {
        h: "Your data stays in your browser",
        p: "Invoices hold sensitive details: client names, your rates, and how much you earn. With a browser-based generator, none of that is uploaded or stored on a server as you work. The document is built on your own device, and when you close the tab the data is gone. Only if you deliberately sign in to save an invoice is a copy kept, which keeps you in control of your own financial information.",
      },
      {
        h: "Who uses a free invoice generator",
        p: "It suits anyone who needs an occasional or regular invoice without the overhead of accounting software.",
        list: [
          "Freelancers and contractors billing clients",
          "Side-hustlers sending their first few invoices",
          "Small shops and service providers",
          "Anyone who needs one clean invoice in a hurry",
        ],
      },
    ],
    faqs: [
      { q: "What is the difference between an invoice generator and an invoice template?", a: "A template is a fixed file you fill in and format yourself, doing the maths by hand. A generator calculates totals and tax for you, keeps the layout intact as you add lines, and outputs a finished PDF, which means fewer mistakes and far less effort." },
      { q: "Will there be a watermark on my downloaded invoice?", a: "No. The downloaded PDF is clean and carries only your business details and branding, not a tool logo or watermark. That keeps the invoice looking professional when it reaches your client." },
      { q: "Is there a limit on how many invoices I can create?", a: "No. You can create and download as many invoices as you like at no cost. There is no monthly cap on documents, so it works equally well for a one-off invoice and for regular billing." },
      { q: "Do I have to enter card details to use it?", a: "No. Creating and downloading invoices is free and never asks for payment or card details. An optional paid upgrade exists for extra features, but the core generator is fully usable without it." },
      { q: "Can I use it for just a single one-off invoice?", a: "Absolutely. There is no account or commitment, so it is well suited to sending a single invoice. Fill in the details, download the PDF, and you are done, with nothing to cancel afterwards." },
    ],
  },
  "invoice-template-free": {
    intro:
      "A free invoice template gives you a proven structure, so you are not deciding what to include every time you bill. The difference here is that you fill it out online and download a finished PDF, rather than downloading a word-processor file and reformatting it by hand. The template above already contains every field a professional invoice needs; you add your details, logo, and items, and the totals and tax calculate themselves.",
    sections: [
      {
        h: "What a strong invoice template includes",
        p: "A complete template prompts you for everything a client and their accounts team expect to see, so nothing is forgotten in a hurry.",
        list: [
          "Your business name, contact details, and logo",
          "The client name and address",
          "A unique invoice number, issue date, and due date",
          "Itemised lines with description, quantity, and rate",
          "Subtotal, tax, and total",
          "Payment terms and bank or payment details",
        ],
      },
      {
        h: "Customise it to your business",
        p: "A good template should bend to your brand rather than the other way around. You can upload your logo, set an accent colour, choose your currency, and apply tax as inclusive or exclusive of the total. You can also switch the document between an invoice, receipt, or quotation. These small touches make the template feel like your own stationery rather than a generic form.",
      },
      {
        h: "A fillable online template beats a downloaded file",
        p: "Downloaded Word and Excel templates look fine until a long description wraps a line, a total fails to update, or the layout breaks on someone else's software. Filling in an online template avoids all of that: the maths is automatic, the design holds together, and the PDF you download looks identical on every device. You get the familiarity of a template with none of the formatting headaches.",
      },
      {
        h: "Reuse your details to bill faster",
        p: "The real time-saving comes with repeat clients. Rather than starting from a blank file each time, you can reuse your business details and keep your invoice numbering running in a clean sequence. Signing in lets you save invoices so you can duplicate a past one, change the dates and amounts, and send it in moments, which is ideal for recurring monthly billing.",
      },
    ],
    faqs: [
      { q: "What fields should a professional invoice template have?", a: "At minimum: your business and contact details, the client details, a unique invoice number with issue and due dates, itemised lines, a subtotal, tax, the total, and your payment details. A template that prompts for all of these keeps every invoice complete and consistent." },
      { q: "Can I change the currency and tax on the template?", a: "Yes. You can pick your currency before downloading and apply tax as either inclusive or exclusive of the total. This lets one template serve clients in different countries and suit whether or not you are registered to charge sales tax, VAT, or GST." },
      { q: "Why use an online template instead of a Word or Excel one?", a: "An online template calculates totals automatically and keeps its layout intact, while Word and Excel files reflow on different devices and can break when a line wraps. You also avoid manual maths errors and download a fixed, professional PDF every time." },
      { q: "Can I save the template with my business details for next time?", a: "Yes. By signing in you can save invoices, which lets you reuse your details, duplicate a previous invoice, and keep your numbering sequential. That turns repeat billing into a quick edit rather than a fresh start each time." },
      { q: "Does the template work for receipts and quotations too?", a: "Yes. The same template switches between invoice, receipt, and quotation while keeping its professional layout. You can quote a job, invoice the work, and confirm payment with one consistent design rather than three separate files." },
    ],
  },
  "free-invoice-maker": {
    intro:
      "If you have never sent an invoice before, a free invoice maker takes the guesswork out of it. You do not need design skills, accounting software, or a template you have to format yourself; you fill in a few fields and download a polished PDF. The maker above is built for people sending their first invoices: solo workers, side-hustlers, and small businesses who just need to bill a client quickly and look professional doing it.",
    sections: [
      {
        h: "Make your first invoice in a few steps",
        p: "Sending an invoice is far simpler than it looks once the structure is laid out for you. The maker walks you through it in order.",
        list: [
          "Add your name or business and your contact details",
          "Add the client you are billing",
          "List what you did, with quantities and amounts",
          "Set an invoice number and a due date",
          "Download the PDF and send it to the client",
        ],
      },
      {
        h: "No design or accounting skills needed",
        p: "The two things that put people off invoicing are layout and maths, and the maker handles both. Your figures are totalled automatically, the tax is applied for you, and the page stays clean and aligned no matter what you type. You concentrate on describing the work you did; the document takes care of looking professional, which matters most when you are billing a client for the first time.",
      },
      {
        h: "Clean downloads, no watermark, no limits",
        p: "Some free tools stamp a logo across your invoice or cap how many you can make until you pay. This one does not. Your downloaded PDF is clean and carries only your own branding, and there is no limit on how many invoices you create. That means the very first invoice you send looks just as professional as one from an established business.",
      },
      {
        h: "Small habits that get you paid faster",
        p: "Making the invoice is only half the job; getting paid is the other half, and a few habits make a real difference.",
        list: [
          "Send the invoice the same day you finish the work",
          "Use short, clear payment terms such as Net 7 or Net 14",
          "Put your bank or payment details on the invoice itself",
          "Number every invoice so both sides can reference it",
          "Send a brief, polite reminder if the due date passes",
        ],
      },
    ],
    faqs: [
      { q: "I have never invoiced before, where do I start?", a: "Start with your details and the client's, then list the work with amounts, add an invoice number and a due date, and download the PDF. The maker lays these steps out in order, so you do not need to know invoicing conventions in advance to produce a correct, professional document." },
      { q: "Will my downloaded invoice have a watermark?", a: "No. The PDF is clean and shows only your own business name and branding, with no tool logo or watermark across it. Your first invoice looks just as polished as one from a long-established business." },
      { q: "Can I make an invoice on my phone?", a: "Yes. The maker runs in your phone browser, so you can create and download an invoice without a computer. It is handy for billing as soon as a job is finished rather than waiting until you are back at a desk." },
      { q: "What payment terms should a beginner use?", a: "Short terms get you paid sooner. Net 7 or Net 14, meaning payment due within 7 or 14 days, are common and reasonable for small jobs. State the due date clearly on the invoice so there is no ambiguity about when the money is expected." },
      { q: "How do I follow up if a client does not pay?", a: "Wait a day or two after the due date, then send a short, friendly reminder attaching the same invoice. Because each invoice is numbered and dated, you can reference it precisely, which keeps the nudge professional and usually resolves the delay." },
    ],
  },
  "invoice-generator-for-small-business": {
    intro:
      "For a small business, invoicing is not just admin, it is your cash flow. Slow or messy billing is one of the most common reasons small firms run short of money even when they are busy. A free invoice generator helps you bill consistently and look professional without paying for accounting software before you need it. The generator above keeps your branding, numbering, and totals consistent across every client, so getting paid becomes a routine rather than a scramble.",
    sections: [
      {
        h: "Keep your branding consistent",
        p: "When every invoice carries the same logo, colour, and layout, clients recognise your business instantly and take it more seriously. Consistency signals that you are organised and established, which subtly encourages prompt payment. A generator applies your branding the same way each time, so you never send a polished invoice one week and a plain one the next, even when you are rushing between jobs.",
      },
      {
        h: "Handle recurring clients and repeat work",
        p: "Most small businesses bill the same clients again and again, so the goal is to make repeat invoicing fast and error-free.",
        list: [
          "Reuse your saved business details on every invoice",
          "Duplicate a past invoice and update the dates and amounts",
          "Keep invoice numbers running in one clean sequence",
          "Apply the same standard payment terms each time",
        ],
      },
      {
        h: "Numbering and cash flow go together",
        p: "Sequential invoice numbers are not just tidiness; they are how you keep track of money owed. With every invoice numbered, dated, and given a due date, you can see at a glance what is outstanding and chase it before it becomes a problem. Predictable billing leads to predictable cash flow, which is what keeps a small business solvent through quiet months as well as busy ones.",
      },
      {
        h: "When to consider paid accounting software",
        p: "A free generator is more than enough when you are starting out or running lean. It becomes worth looking at paid accounting software once you are managing many recurring invoices, handling payroll, tracking expenses for tax, or needing your invoicing to connect directly to your bookkeeping. Until you hit that point, keeping costs down and billing simply is the smarter use of your money.",
      },
    ],
    faqs: [
      { q: "How does invoicing affect my small business cash flow?", a: "Invoicing is the trigger for getting paid, so slow or inconsistent billing directly slows your cash flow. Sending invoices promptly, with clear due dates, and following up on overdue ones keeps money coming in steadily, which matters more to a small business than almost anything else." },
      { q: "How should a small business number its invoices?", a: "Use one continuous sequence with no gaps, such as 1001, 1002, 1003, or a dated style like 2026-001. Consistent numbering lets you track what is owed, find any invoice quickly, and keep clean records for tax, which is harder if numbers are random or reused." },
      { q: "Can I keep my branding the same on every invoice?", a: "Yes. You can apply your logo, accent colour, and a consistent layout to every invoice, so clients see the same professional look each time. Consistent branding builds recognition and trust, which helps repeat clients pay you without hesitation." },
      { q: "When should a small business switch to paid accounting software?", a: "Consider it once you are juggling many recurring invoices, payroll, expense tracking, or need invoicing tied into full bookkeeping. Before that, a free generator covers your needs, and staying lean keeps your overheads down while the business is still finding its feet." },
      { q: "How do I keep track of unpaid invoices?", a: "Give every invoice a number and a due date, and keep a copy of each one. Reviewing your outstanding invoices regularly lets you see what is overdue and send a reminder before it drifts too far, which protects your cash flow without needing dedicated software." },
    ],
  },

};
