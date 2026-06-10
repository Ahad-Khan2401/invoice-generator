import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, CTAButton } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { TOOLS } from "@/lib/tools";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Free Business & Invoice Calculators — Tools",
  description:
    "Free online calculators for freelancers and small businesses — late payment fees, hourly rates, sales tax/VAT/GST, discounts, and profit margins. No signup.",
  alternates: { canonical: "/tools" },
};

export default function ToolsHub() {
  return (
    <PageShell width="5xl">
      <PageHero
        badge="Free Tools"
        title="Free Business & Invoice Calculators"
        subtitle="Quick, free calculators for freelancers and small businesses — no signup, no ads in your way. Pair them with our free invoice generator."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`}
            className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
              {t.icon}
            </span>
            <h2 className="mb-1.5 text-[16px] font-bold text-slate-900 group-hover:text-indigo-600">{t.name}</h2>
            <p className="text-[13.5px] leading-relaxed text-slate-500">{t.short}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-indigo-600">
              Open tool
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14 text-center">
        <CTAButton href="/">Create a Free Invoice</CTAButton>
      </div>

      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Tools", url: `${SITE.url}/tools` },
      ])} />
    </PageShell>
  );
}
