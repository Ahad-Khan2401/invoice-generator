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
    "Free online calculators for freelancers and small businesses — VAT, GST, sales tax, late payment fees, hourly rates, discounts, and profit margins. No signup.",
  alternates: { canonical: "/tools" },
};

export default function ToolsHub() {
  return (
    <PageShell width="5xl">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        <span aria-current="page">Calculators</span>
      </nav>
      <PageHero
        title="Free calculators for invoicing and pricing"
        subtitle="Quick, free calculators for freelancers and small businesses. No signup. Use them on their own, or alongside the invoice generator."
      />

      <ul className="rule-list">
        {TOOLS.map((t) => (
          <li key={t.slug}>
            <Link href={`/tools/${t.slug}`}>
              <span className="rule-list__t">{t.name}</span>
              <span className="rule-list__d">{t.short}</span>
              <span className="rule-list__go" aria-hidden="true">Open →</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <CTAButton href="/">Create a free invoice</CTAButton>
      </div>

      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Tools", url: `${SITE.url}/tools` },
      ])} />
    </PageShell>
  );
}
