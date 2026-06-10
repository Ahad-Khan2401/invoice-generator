import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell, PageHero, CTAButton } from "@/components/ui";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { toolSchema, faqSchemaFrom, breadcrumbSchema } from "@/lib/schema";
import { TOOLS, TOOL_SLUGS, getTool } from "@/lib/tools";
import { TOOLS_CONTENT } from "@/lib/tools-content";
import { SITE } from "@/lib/config";

import LateFeeCalculator from "@/components/tools/LateFeeCalculator";
import HourlyRateCalculator from "@/components/tools/HourlyRateCalculator";
import SalesTaxCalculator from "@/components/tools/SalesTaxCalculator";
import DiscountCalculator from "@/components/tools/DiscountCalculator";
import ProfitMarginCalculator from "@/components/tools/ProfitMarginCalculator";

export const dynamicParams = false;

const CALCULATORS: Record<string, React.ComponentType> = {
  "late-fee-calculator": LateFeeCalculator,
  "freelance-hourly-rate-calculator": HourlyRateCalculator,
  "sales-tax-calculator": SalesTaxCalculator,
  "discount-calculator": DiscountCalculator,
  "profit-margin-calculator": ProfitMarginCalculator,
};

export function generateStaticParams() {
  return TOOL_SLUGS.map((tool) => ({ tool }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ tool: string }> }
): Promise<Metadata> {
  const { tool } = await params;
  const t = getTool(tool);
  if (!t) return {};
  const url = `${SITE.url}/tools/${tool}`;
  return {
    title: t.title,
    description: t.desc,
    keywords: t.keywords,
    alternates: { canonical: `/tools/${tool}` },
    openGraph: { title: t.title, description: t.desc, url, images: ["/og.png"] },
    twitter: { card: "summary_large_image", title: t.title, description: t.desc, images: ["/og.png"] },
  };
}

export default async function ToolPage(
  { params }: { params: Promise<{ tool: string }> }
) {
  const { tool } = await params;
  const t = getTool(tool);
  const content = TOOLS_CONTENT[tool];
  const Calculator = CALCULATORS[tool];
  if (!t || !content || !Calculator) notFound();

  const url = `${SITE.url}/tools/${tool}`;
  const others = TOOLS.filter((x) => x.slug !== tool).slice(0, 4);

  return (
    <PageShell>
      <PageHero badge="Free Tool" title={t.name} subtitle={t.short} />

      {/* The interactive calculator */}
      <Calculator />

      {/* Ad — below the tool, above the article */}
      <div className="my-12">
        <AdSlot slot={SITE.adSlots.howItWorks} />
      </div>

      {/* Unique SEO article */}
      <article className="seo-prose mx-auto max-w-2xl">
        <p style={{ fontSize: "1.05rem", lineHeight: 1.75 }}>{content.intro}</p>
        {content.sections.map((s, i) => (
          <div key={i}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
            {s.list && (
              <ul>
                {s.list.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            )}
          </div>
        ))}

        <h2 id="faq">Frequently Asked Questions</h2>
        <div className="faq-list">
          {content.faq.map((f, i) => (
            <details key={i} className="faq-item" {...(i === 0 ? { open: true } : {})}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </article>

      {/* Related tools */}
      <div className="mx-auto mt-14 max-w-2xl">
        <h2 className="mb-4 text-center text-lg font-extrabold text-slate-900">More free tools</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/tools/${o.slug}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md">
              <span className="text-2xl">{o.icon}</span>
              <span className="text-[13.5px] font-bold text-slate-800">{o.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <CTAButton href="/">Create a Free Invoice</CTAButton>
      </div>

      <JsonLd data={toolSchema({ name: t.name, description: t.desc, url })} />
      <JsonLd data={faqSchemaFrom(content.faq)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Tools", url: `${SITE.url}/tools` },
        { name: t.name, url },
      ])} />
    </PageShell>
  );
}
