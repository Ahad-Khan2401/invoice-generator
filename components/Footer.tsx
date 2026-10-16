import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE } from "@/lib/config";

const TEMPLATES = [
  { slug: "receipt-generator",         label: "Receipt generator" },
  { slug: "quotation-generator",       label: "Quotation generator" },
  { slug: "estimate-generator",        label: "Estimate generator" },
  { slug: "freelancer-invoice",        label: "Freelancer invoice" },
  { slug: "invoice-generator-usa",     label: "Invoice generator USA" },
  { slug: "invoice-generator-uk",      label: "Invoice generator UK" },
];

const TOOLS = [
  { slug: "vat-calculator",                   label: "VAT calculator" },
  { slug: "gst-calculator",                   label: "GST calculator" },
  { slug: "sales-tax-calculator",             label: "Sales tax calculator" },
  { slug: "late-fee-calculator",              label: "Late fee calculator" },
  { slug: "freelance-hourly-rate-calculator", label: "Hourly rate calculator" },
  { slug: "profit-margin-calculator",         label: "Profit margin calculator" },
];

const LINK = "text-ink-500 underline-offset-4 transition-colors hover:text-ink hover:underline";
const HEAD = "mb-3 text-[13px] font-semibold text-ink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-2 border-ink bg-paper no-print">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 pt-12 pb-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label="PDF Bill Builder home" className="inline-block">
              <Logo size={30} />
            </Link>
            <p className="mt-4 font-display text-[19px] leading-snug text-ink">
              Invoices, receipts and quotations for people who&apos;d rather be doing the work.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
              Free, in your browser, no signup and no watermark.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-[14px] sm:grid-cols-4">
            <nav aria-label="Product">
              <h3 className={HEAD}>Product</h3>
              <ul className="space-y-2.5">
                <li><Link className={LINK} href="/">Generator</Link></li>
                <li><Link className={LINK} href="/templates">Templates</Link></li>
                <li><Link className={LINK} href="/how-it-works">How it works</Link></li>
                <li><Link className={LINK} href="/pricing">Pricing</Link></li>
                <li><Link className={LINK} href="/dashboard">Dashboard</Link></li>
              </ul>
            </nav>
            <nav aria-label="Calculators">
              <h3 className={HEAD}>Calculators</h3>
              <ul className="space-y-2.5">
                {TOOLS.map(({ slug, label }) => (
                  <li key={slug}><Link className={LINK} href={`/tools/${slug}`}>{label}</Link></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Templates">
              <h3 className={HEAD}>Make a…</h3>
              <ul className="space-y-2.5">
                {TEMPLATES.map(({ slug, label }) => (
                  <li key={slug}><Link className={LINK} href={`/${slug}`}>{label}</Link></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Company">
              <h3 className={HEAD}>Company</h3>
              <ul className="space-y-2.5">
                <li><Link className={LINK} href="/blog">Guides</Link></li>
                <li><Link className={LINK} href="/about">About</Link></li>
                <li><Link className={LINK} href="/contact">Contact</Link></li>
                <li><Link className={LINK} href="/privacy">Privacy</Link></li>
                <li><Link className={LINK} href="/terms">Terms</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--rule)] pt-5 text-[13px] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PDF Bill Builder. Not legal, tax or accounting advice.</p>
          <a href={`mailto:${SITE.supportEmail}`} className="underline-offset-4 hover:text-ink hover:underline">{SITE.supportEmail}</a>
        </div>
      </div>
    </footer>
  );
}
