/* ───────────────────────────────────────────────
   Free mini-tools registry.
   Each tool is its own indexable page at /tools/<slug>,
   targeting a specific keyword — more pages, more rankings.
   Listed by app/tools/page.tsx and app/sitemap.ts.
─────────────────────────────────────────────── */
export interface ToolMeta {
  slug: string;
  name: string;        // H1 / card title
  short: string;       // card subtitle
  title: string;       // <title>
  desc: string;        // meta description
  keywords: string[];
  icon: string;        // emoji for the card
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "late-fee-calculator",
    name: "Late Payment Fee Calculator",
    short: "Work out interest and late fees on an overdue invoice.",
    title: "Late Payment Fee Calculator — Invoice Late Fee & Interest (Free)",
    desc: "Free late payment fee calculator. Work out the interest and late fee owed on an overdue invoice by amount, rate, and days late. Instant, no signup.",
    keywords: ["late payment fee calculator", "invoice late fee calculator", "late payment interest calculator", "overdue invoice interest", "how to calculate late fees"],
    icon: "⏰",
  },
  {
    slug: "freelance-hourly-rate-calculator",
    name: "Freelance Hourly Rate Calculator",
    short: "Find the hourly rate you need to hit your income goal.",
    title: "Freelance Hourly Rate Calculator — What to Charge per Hour (Free)",
    desc: "Free freelance hourly rate calculator. Enter your target income, working hours, and expenses to find the hourly rate you should charge. Instant result.",
    keywords: ["freelance hourly rate calculator", "how much should i charge per hour", "freelance rate calculator", "hourly rate calculator", "what to charge freelance"],
    icon: "💼",
  },
  {
    slug: "sales-tax-calculator",
    name: "Sales Tax, VAT & GST Calculator",
    short: "Add or remove tax from any amount in seconds.",
    title: "Sales Tax, VAT & GST Calculator — Add or Remove Tax (Free)",
    desc: "Free sales tax, VAT, and GST calculator. Add tax to a net amount or remove tax from a gross amount at any rate. Instant breakdown, no signup.",
    keywords: ["sales tax calculator", "vat calculator", "gst calculator", "add vat calculator", "remove vat calculator", "reverse sales tax calculator"],
    icon: "🧾",
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    short: "Calculate the final price after a percentage discount.",
    title: "Discount Calculator — Final Price After % Off (Free)",
    desc: "Free discount calculator. Enter a price and a discount percentage to instantly see the amount saved and the final price. Works for any currency.",
    keywords: ["discount calculator", "percentage off calculator", "sale price calculator", "how to calculate discount", "percent off calculator"],
    icon: "🏷️",
  },
  {
    slug: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    short: "Find your margin and markup from cost and price.",
    title: "Profit Margin Calculator — Margin & Markup from Cost (Free)",
    desc: "Free profit margin calculator. Enter your cost and selling price to instantly see your profit, profit margin percentage, and markup percentage.",
    keywords: ["profit margin calculator", "margin calculator", "markup calculator", "gross margin calculator", "how to calculate profit margin"],
    icon: "📈",
  },
];

export const TOOL_SLUGS = TOOLS.map((t) => t.slug);
export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
