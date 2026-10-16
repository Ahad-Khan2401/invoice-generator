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
    <div className="flex min-h-[70vh] items-center bg-[linear-gradient(160deg,#f0f4ff_0%,#f8faff_55%,#faf5ff_100%)]">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="bg-gradient-to-br from-indigo-600 to-violet-600 bg-clip-text text-[88px] sm:text-[120px] font-black leading-none tracking-tight text-transparent" aria-hidden="true">
          404
        </p>
        <h1 className="mb-3 mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
          This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mb-8 max-w-md text-[15px] text-slate-600">
          The page may have moved or never existed. The generator is one click away — nothing you were working on is lost if you had it open in another tab.
        </p>

        <CTAButton href="/">Go to the generator</CTAButton>

        <nav className="mt-12" aria-label="Popular pages">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-600 transition-all hover:border-indigo-300 hover:text-indigo-600">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
