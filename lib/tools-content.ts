/* ───────────────────────────────────────────────
   Unique SEO content for each tool page (below the calculator).
   Keeps every /tools/<slug> page substantial and distinct —
   good for ranking and for AdSense content quality.
─────────────────────────────────────────────── */
export interface ToolContent {
  intro: string;
  sections: { h: string; p: string; list?: string[] }[];
  faq: { q: string; a: string }[];
}

export const TOOLS_CONTENT: Record<string, ToolContent> = {
  "late-fee-calculator": {
    intro:
      "When an invoice goes unpaid past its due date, you may be entitled to charge interest or a late fee — provided you set it out in your payment terms beforehand. This free late payment fee calculator works out the interest owed based on the invoice amount, the interest rate, and how many days the payment is overdue, so you know exactly what to add to your follow-up invoice.",
    sections: [
      {
        h: "How late payment interest is calculated",
        p: "The most common method is simple daily interest: the invoice amount multiplied by the annual interest rate, multiplied by the number of days overdue divided by 365. For example, a $1,000 invoice at 8% per year that's 30 days late accrues about $6.58 in interest. Many businesses also add a fixed flat fee on top.",
      },
      {
        h: "Can you legally charge a late fee?",
        p: "In most places, yes — but only if you stated the late-fee or interest policy in your terms before the work began. Some countries set statutory rates: the UK, for instance, allows statutory interest of 8% above the Bank of England base rate plus a fixed recovery fee for late commercial payments. Always check your local rules and put your policy on the original invoice.",
        list: [
          "State your late-fee policy on the invoice up front",
          "Use a reasonable rate (commonly 1–2% per month or a statutory rate)",
          "Add a flat recovery fee if your jurisdiction allows it",
          "Send a clear reminder before applying charges",
        ],
      },
    ],
    faq: [
      { q: "How do I calculate a late payment fee?", a: "Multiply the invoice amount by the annual interest rate, then multiply by the number of days overdue divided by 365. Add any flat late fee on top. This calculator does it instantly." },
      { q: "What is a typical late fee for an invoice?", a: "Common late fees are 1–2% of the invoice per month, or a statutory interest rate set by your country. You can also charge a fixed flat fee if you stated it in your terms." },
      { q: "Can I charge interest on an overdue invoice?", a: "Yes, as long as you set out the interest or late-fee policy in your payment terms before doing the work. Many countries also have statutory late-payment interest rules for business invoices." },
    ],
  },

  "freelance-hourly-rate-calculator": {
    intro:
      "Setting your freelance hourly rate by guessing — or by copying what others charge — is how freelancers end up underpaid. This calculator works backwards from the income you actually want to take home. Enter your target yearly income, your realistic billable hours, and your business expenses, and it tells you the hourly rate you need to charge to hit that goal.",
    sections: [
      {
        h: "Why your rate is higher than you think",
        p: "Freelancers don't bill 40 hours a week, 52 weeks a year. Holidays, sick days, admin, marketing, and gaps between projects mean your billable hours are far lower than your working hours — often 25–30 a week across 46–48 weeks. Because your expenses and unpaid time still have to be covered, your hourly rate needs to be higher than a salaried equivalent.",
      },
      {
        h: "How to use the result",
        p: "Treat the calculated rate as your floor, not your ceiling. It's the minimum you need to charge to hit your income goal. From there, adjust up for your experience, the value you deliver, rush jobs, and difficult clients. Reviewing it once a year keeps your pricing in line with your goals.",
        list: [
          "Be honest about billable vs total hours",
          "Include ALL business expenses (software, equipment, taxes set aside)",
          "Round to a clean, confident number",
          "Raise it as your skills and demand grow",
        ],
      },
    ],
    faq: [
      { q: "How do I calculate my freelance hourly rate?", a: "Add your target yearly income to your yearly business expenses, then divide by your realistic billable hours per year (working weeks × billable hours per week). The result is the minimum hourly rate you should charge." },
      { q: "How many billable hours can a freelancer realistically work?", a: "Most freelancers bill 25–30 hours per week across about 46–48 weeks a year, once you account for holidays, admin, marketing, and downtime between projects." },
      { q: "Should I charge more than the calculated rate?", a: "Yes — treat the calculated rate as your minimum. Adjust upward for experience, the value you deliver, rush work, and demand. The calculator gives you a floor to negotiate from." },
    ],
  },

  "sales-tax-calculator": {
    intro:
      "This free calculator adds or removes sales tax, VAT, or GST from any amount at any rate. Use 'Add tax' to find the gross price from a net figure, or 'Remove tax' to work out how much tax is hidden inside a tax-inclusive total. It's handy whenever you're pricing a job, checking an invoice, or reverse-calculating VAT for your records.",
    sections: [
      {
        h: "Adding vs removing tax",
        p: "Adding tax is straightforward: multiply the net amount by the tax rate and add it on. Removing tax (a 'reverse' calculation) is trickier because the tax is already baked into the total — you can't just subtract the percentage. Instead you divide the gross amount by 1 plus the rate. This calculator handles both correctly.",
      },
      {
        h: "VAT, GST, and sales tax — same maths, different names",
        p: "The calculation is identical whether you call it VAT (UK, EU), GST (Australia, Canada, India, NZ), or sales tax (US). Just enter the rate that applies to you — 20% standard VAT in the UK, 10% GST in Australia, or your local sales-tax rate in the US — and the calculator does the rest.",
        list: [
          "UK standard VAT — 20%",
          "Australia GST — 10%",
          "Canada GST — 5% (plus provincial tax where it applies)",
          "India GST — commonly 5%, 12%, 18%, or 28%",
        ],
      },
    ],
    faq: [
      { q: "How do I remove VAT from a price?", a: "Divide the tax-inclusive (gross) amount by 1 plus the tax rate. For 20% VAT, divide by 1.20. The result is the net amount; the difference is the VAT. Use the 'Remove tax' mode above to do this instantly." },
      { q: "How do I add sales tax to a price?", a: "Multiply the net amount by the tax rate and add it to the original price. For 8% sales tax on $100, that's $100 + $8 = $108. Use the 'Add tax' mode above." },
      { q: "Is the VAT and GST calculation the same?", a: "Yes. VAT, GST, and sales tax all use the same percentage maths. Only the name and the typical rate differ by country — just enter the rate that applies to you." },
    ],
  },

  "discount-calculator": {
    intro:
      "Work out a sale price in seconds. Enter the original price and the discount percentage, and this calculator shows you exactly how much you save and what the final price will be. It's perfect for pricing promotions, checking a shop's sale claim, or applying a client discount on a quote.",
    sections: [
      {
        h: "How to calculate a percentage discount",
        p: "Multiply the original price by the discount percentage to find the amount saved, then subtract that from the original price for the final price. For example, 15% off $100 is $15 saved, leaving a final price of $85. This calculator does it instantly for any price and percentage.",
      },
      {
        h: "Using discounts in your business",
        p: "Discounts are a powerful tool — early-payment discounts encourage clients to pay invoices faster, while bulk or loyalty discounts reward repeat customers. Just make sure the discount still leaves you a healthy profit margin (you can check that with our profit margin calculator).",
        list: [
          "Early-payment discounts (e.g. 2% off if paid in 10 days)",
          "Bulk-order discounts for larger quantities",
          "Loyalty discounts for repeat clients",
          "Seasonal or promotional sale pricing",
        ],
      },
    ],
    faq: [
      { q: "How do I calculate a discount?", a: "Multiply the original price by the discount percentage to get the savings, then subtract that from the original price. For 20% off $50: $50 × 0.20 = $10 saved, final price $40." },
      { q: "How do I calculate the final price after a discount?", a: "Subtract the discount amount from the original price. Or multiply the price by (1 minus the discount as a decimal) — e.g. $80 at 25% off is $80 × 0.75 = $60." },
    ],
  },

  "profit-margin-calculator": {
    intro:
      "Enter your cost and your selling price, and this calculator instantly shows your profit, your profit margin percentage, and your markup percentage. Knowing these numbers is essential for pricing products and services so your business stays profitable — and for spotting when a 'good' price actually loses you money.",
    sections: [
      {
        h: "Margin vs markup — they're not the same",
        p: "This trips up a lot of business owners. Markup is your profit as a percentage of cost, while margin is your profit as a percentage of the selling price. A 50% markup is only a 33% margin. Because margin is based on the higher number (the price), it's always the smaller percentage — and it's the one investors and accountants care about.",
      },
      {
        h: "How to price for a target margin",
        p: "To hit a specific profit margin, divide your cost by (1 minus the target margin as a decimal). For a 40% margin on a $60 item: $60 ÷ 0.60 = $100 selling price. Pricing to a margin rather than a markup ensures you actually keep the percentage of revenue you intend to.",
        list: [
          "Profit = selling price − cost",
          "Margin = profit ÷ selling price",
          "Markup = profit ÷ cost",
          "Price for a target margin: cost ÷ (1 − margin)",
        ],
      },
    ],
    faq: [
      { q: "What is the difference between margin and markup?", a: "Markup is profit as a percentage of cost; margin is profit as a percentage of the selling price. A 50% markup equals a 33% margin because margin is calculated on the higher number." },
      { q: "How do I calculate profit margin?", a: "Subtract the cost from the selling price to get the profit, then divide the profit by the selling price and multiply by 100. For a $100 item costing $70: ($30 ÷ $100) × 100 = 30% margin." },
      { q: "What is a good profit margin?", a: "It varies by industry, but many small businesses aim for a gross margin of 30–50%. Service businesses often run higher; retail and wholesale typically lower. The key is covering all costs and leaving a sustainable profit." },
    ],
  },

  "vat-calculator": {
    intro:
      "This VAT calculator adds VAT to a net price or strips it back out of a VAT-inclusive total. Pick a preset rate from the list, or type your own, then switch between adding and removing to see the net amount, the VAT, and the gross figure side by side. It is built for the everyday moments when you need the number quickly: pricing a job, checking a supplier's invoice, or working out how much of a till total is tax.",
    sections: [
      {
        h: "How VAT is calculated, with a worked example",
        p: "Value added tax is charged as a percentage of the net selling price, so adding it is a single multiplication. Take the net price, multiply by the rate expressed as a decimal, and that is the VAT. Add it to the net price to get the gross, which is what the customer actually pays. Say you charge 850.00 for a piece of design work and the rate that applies to you is 20 percent. In the calculator above, choose the 20 percent preset, leave the mode on Add VAT, type 850, and all three figures appear instantly; change the preset to a reduced or zero rate and you can see at once how the gross changes for different kinds of supply.",
        list: [
          "Net price: 850.00",
          "VAT at 20 percent: 850.00 × 0.20 = 170.00",
          "Gross total on the invoice: 850.00 + 170.00 = 1,020.00",
          "At a 5 percent reduced rate the same job would carry 42.50 of VAT and total 892.50",
        ],
      },
      {
        h: "Reverse-calculating VAT from a gross price",
        p: "The mistake nearly everyone makes at least once is to take a gross price and knock off the rate percentage. That gives the wrong answer, because the percentage was applied to the smaller net figure, not the larger gross one. To reverse the calculation you divide the gross by one plus the rate: at 20 percent, divide by 1.20; at 5 percent, divide by 1.05. Take a gross receipt of 240.00 at 20 percent as an example. The Remove VAT mode above does the division for you and shows the divisor it used, so you can check the working on a receipt or an expense claim without a spreadsheet.",
        list: [
          "Net: 240.00 ÷ 1.20 = 200.00",
          "VAT: 240.00 − 200.00 = 40.00",
          "The wrong way: 240.00 less 20 percent = 192.00, which understates the net and overstates the tax by 8.00",
        ],
      },
      {
        h: "What a VAT invoice needs to show",
        p: "If you are registered for VAT, the invoice you issue is the document your customer relies on to reclaim the tax, so it has to carry more than an ordinary bill. Exact requirements are set by each country's tax authority, but the elements below appear in almost every set of rules and are a sensible checklist wherever you trade.",
        list: [
          "Your business name, address, and VAT registration number",
          "A unique sequential invoice number and the date of issue, plus the date of supply if different",
          "The customer's name and address, and their VAT number where that is required for the type of sale",
          "A description of each item or service, with quantity, unit price excluding VAT, and the rate applied",
          "The net total, the VAT amount for each rate used, and the gross total payable",
          "Where an item is zero-rated or exempt, a note saying so rather than leaving the rate blank",
        ],
      },
      {
        h: "Common VAT calculation mistakes",
        p: "Beyond the reverse-calculation trap, a few errors come up again and again. Rounding each line's VAT and then adding the lines can produce a total a few pence or cents different from calculating VAT on the subtotal; pick one method and use it consistently so your invoices reconcile. Mixing rates on one invoice without showing the VAT for each rate separately makes the document hard for the customer to process. Applying VAT to a price that already includes it doubles up the tax, which is why it helps to label every figure clearly as net or gross. And quoting prices to business customers without saying whether VAT is included invites a dispute at invoice time.",
      },
      {
        h: "Showing prices VAT inclusive or exclusive",
        p: "Who you are selling to usually decides the format. Consumers expect to see the price they will pay, so retail prices are normally shown inclusive of VAT, with the tax broken out on the receipt. Business customers who can reclaim VAT care about the net figure, so trade quotes and invoices normally lead with the net price and show VAT as a separate line. Whichever you choose, say which it is: a quote that reads 1,000 plus VAT and one that reads 1,000 including VAT differ by a meaningful amount. Thresholds for registration, the rates for different goods, and the rules on what you can reclaim all vary by country, so check with your tax authority before relying on any figure for your return.",
      },
    ],
    faq: [
      { q: "How do I add VAT to a price?", a: "Multiply the net price by the VAT rate as a decimal and add the result to the net price. For 850.00 at 20 percent, the VAT is 170.00 and the gross is 1,020.00. Select a preset rate above, or type your own, and the calculator shows net, VAT, and gross together." },
      { q: "How do I take VAT off a gross price?", a: "Divide the gross amount by one plus the rate as a decimal: by 1.20 for 20 percent, 1.05 for 5 percent. The result is the net price, and the difference is the VAT. Do not simply subtract the percentage from the gross; that gives the wrong figure." },
      { q: "Which VAT rate should I use?", a: "The rate depends on where you are registered and what you are selling. The presets above cover the standard rates most commonly needed, plus reduced and zero rates, but the correct rate for a particular supply is set by your tax authority, so check their guidance if you are unsure." },
      { q: "Why does my VAT total differ by a few pence from the invoice?", a: "Usually because of rounding. Calculating VAT on each line and summing the results can differ slightly from calculating VAT on the subtotal. Both are generally acceptable if applied consistently; the calculator above works on the single amount you enter." },
      { q: "Do I need to charge VAT at all?", a: "Only if you are registered for VAT, and registration rules and thresholds vary by country. If you are not registered you should not add VAT or show a VAT amount on your invoices. If you are close to a threshold or trade across borders, check with your tax authority or an accountant." },
    ],
  },

  "gst-calculator": {
    intro:
      "Use this GST calculator to add goods and services tax to a price or to work out how much GST is already inside a tax-inclusive amount. Choose from preset rates for the countries where GST is most commonly used, or enter any custom rate, then switch between Add GST and Remove GST to see the before-tax price, the tax, and the final total. It is designed for quick checks when you are preparing a tax invoice, reviewing a supplier's bill, or deciding what to charge.",
    sections: [
      {
        h: "How GST is worked out, with an example",
        p: "GST is a percentage added to the price before tax. To add it, multiply the pre-tax amount by the rate as a decimal; the result is the GST, and the pre-tax amount plus the GST is the total the customer pays. The arithmetic is the same at every rate; only the percentage changes. Suppose a tradesperson charges 1,250.00 before tax for a day's work and materials. Select the matching preset above, type 1250, and the three figures update as you switch between rates, which makes it easy to compare how a price lands in different markets.",
        list: [
          "Pre-tax amount: 1,250.00",
          "GST at 10 percent: 1,250.00 × 0.10 = 125.00, so the invoice total is 1,375.00",
          "GST at 15 percent: 1,250.00 × 0.15 = 187.50, so the invoice total is 1,437.50",
          "GST at 18 percent: 1,250.00 × 0.18 = 225.00, so the invoice total is 1,475.00",
        ],
      },
      {
        h: "Finding the GST inside a tax-inclusive price",
        p: "Many receipts and retail prices are quoted with GST included, and you often need to know how much of that total is tax, for example when claiming it back or recording a purchase. Because the tax was added to the smaller pre-tax amount, you cannot just take the percentage off the total. Instead, divide the inclusive price by one plus the rate. A useful shortcut at exactly 10 percent is that the GST is one eleventh of the inclusive total. The Remove GST mode above shows the divisor it is using so you can follow the working.",
        list: [
          "At 10 percent, divide by 1.10: an inclusive 330.00 is 300.00 before tax plus 30.00 GST",
          "At 15 percent, divide by 1.15: an inclusive 460.00 is 400.00 before tax plus 60.00 GST",
          "At 18 percent, divide by 1.18: an inclusive 590.00 is 500.00 before tax plus 90.00 GST",
        ],
      },
      {
        h: "What a GST tax invoice should include",
        p: "If you are registered for GST, your customers need a compliant tax invoice to claim credits for the tax you charge them, and the tax authority will expect certain details to be present. The specifics differ from country to country, and some set different requirements for small-value sales, but the following list covers what is almost always expected.",
        list: [
          "The words Tax Invoice, your business name, and your GST or business registration number",
          "The date of issue and a unique invoice number",
          "The customer's name, and their registration number for larger sales where the rules require it",
          "A description of each item or service with quantity and price",
          "The GST amount shown clearly, either per line or as a total, and a statement of whether prices include GST",
          "The total amount payable including GST",
        ],
      },
      {
        h: "Mistakes to avoid when calculating GST",
        p: "The most frequent error is subtracting the rate from an inclusive total instead of dividing, which overstates the tax and understates the pre-tax price. Another is forgetting that some goods or services may be exempt or taxed at a different rate, then applying the standard rate to everything on the invoice. Where several rates apply, the GST for each rate should be shown separately rather than blended into one figure. Businesses that quote prices before tax to consumers who expect inclusive prices create friction at payment time, while those that quote inclusive prices to registered businesses make it harder for the customer to see the credit they can claim. Finally, rounding GST on each line and then on the total can produce a mismatch of a cent or two; choose one approach and stick to it.",
      },
      {
        h: "Quoting GST inclusive or exclusive",
        p: "The right format depends on your customer. Private consumers generally expect to see the full price they will pay, so advertising and retail pricing are normally GST inclusive with the tax identified on the receipt. Registered businesses can usually claim the GST back, so they care about the pre-tax price and expect quotes and invoices that show GST as a separate line. Whichever format you use, label it plainly so a quote of 2,000 is never read as inclusive by one party and exclusive by the other. Registration thresholds, the rates for particular categories, and the rules on claiming credits all vary by country, so treat this calculator as a quick arithmetic check and confirm the rules that apply to you with your tax authority.",
      },
    ],
    faq: [
      { q: "How do I calculate GST on a price?", a: "Multiply the pre-tax price by the GST rate as a decimal and add it on. For 1,250.00 at 10 percent, the GST is 125.00 and the total is 1,375.00. Choose a preset rate above or enter your own, and the calculator shows the pre-tax price, the GST, and the total." },
      { q: "How do I work out GST from a total that includes it?", a: "Divide the inclusive total by one plus the rate: by 1.10 at 10 percent, by 1.15 at 15 percent, by 1.18 at 18 percent. The result is the pre-tax price and the remainder is the GST. At exactly 10 percent, the GST is one eleventh of the total." },
      { q: "Is GST the same as VAT?", a: "They are different names for the same kind of consumption tax, and the arithmetic is identical. Countries such as Australia, New Zealand, Singapore, Canada, and India use the term GST, while the UK and much of Europe use VAT. The rates, invoice rules, and registration thresholds are set separately by each country." },
      { q: "Which GST rate should I choose from the presets?", a: "Pick the rate that applies to your country and the type of goods or services you sell. The presets cover commonly used standard rates, including the multiple rate bands some countries use, but the correct rate for a specific item is defined by your tax authority, so check their guidance when in doubt." },
      { q: "Do I have to register for GST?", a: "That depends on where you operate and how much you sell; registration thresholds and rules vary by country and sometimes by type of business. If you are not registered you should not charge GST or show it on invoices. If you are unsure, check with your tax authority or an accountant." },
    ],
  },
};
