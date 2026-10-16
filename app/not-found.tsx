import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/",                    label: "Invoice generator" },
  { href: "/receipt-generator",   label: "Receipt generator" },
  { href: "/quotation-generator", label: "Quotation generator" },
  { href: "/templates",           label: "All templates" },
  { href: "/tools",               label: "Free calculators" },
  { href: "/blog",                label: "Invoicing guides" },
  { href: "/pricing",             label: "Pricing" },
  { href: "/how-it-works",        label: "How it works" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-paper">
      <div className="mx-auto w-full max-w-3xl px-6 py-20">
        <span className="stamp stamp--hero" style={{ marginBottom: 28 }}>404 · Not found</span>
        <h1 className="mb-4 text-[clamp(2.2rem,5vw,3.6rem)] text-ink">This page doesn&apos;t exist</h1>
        <p className="mb-8 max-w-xl text-[17px] leading-relaxed text-ink-500">
          It may have moved or never existed. The generator is one click away, and nothing you were working on is lost if you had it open in another tab.
        </p>

        <CTAButton href="/">Go to the generator</CTAButton>

        <nav className="mt-14" aria-label="Popular pages">
          <h2 className="mb-3 font-display text-[20px] font-semibold text-ink">Or try one of these</h2>
          <ul className="rule-list" style={{ borderTopWidth: 2 }}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} style={{ gridTemplateColumns: "1fr auto" }}>
                  <span className="text-[15.5px] font-medium text-ink">{l.label}</span>
                  <span className="rule-list__go" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
