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
};
