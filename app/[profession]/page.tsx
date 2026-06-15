import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import LandingContent from "@/components/LandingContent";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { softwareSchema, faqSchemaFrom, breadcrumbSchema } from "@/lib/schema";
import { LANDING, LANDING_SLUGS } from "@/lib/landing";
import { LANDING_CONTENT } from "@/lib/landing-content";
import { SITE } from "@/lib/config";

/* Only the whitelisted slugs are built. Anything else -> 404,
   so this dynamic segment never swallows /about, /how-it-works, etc. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_SLUGS.map((profession) => ({ profession }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ profession: string }> }
): Promise<Metadata> {
  const { profession } = await params;
  const data = LANDING[profession];
  if (!data) return {};
  const url = `${SITE.url}/${profession}`;
  return {
    title: data.title,
    description: data.desc,
    keywords: data.keywords,
    alternates: { canonical: `/${profession}` },
    openGraph: { title: data.title, description: data.desc, url, images: ["/og.png"] },
    twitter: { card: "summary_large_image", title: data.title, description: data.desc, images: ["/og.png"] },
  };
}

export default async function ProfessionPage(
  { params }: { params: Promise<{ profession: string }> }
) {
  const { profession } = await params;
  const data = LANDING[profession];
  if (!data) notFound();

  const content = LANDING_CONTENT[profession];
  const url = `${SITE.url}/${profession}`;

  return (
    <>
      <InvoiceGenerator heading={data.h1} subheading={data.sub} defaultCurrency={data.currencySymbol} />

      {/* Unique, self-contained content: intro + sections + in-article ad + page-specific FAQ. */}
      <LandingContent slug={profession} midAdSlot={SITE.adSlots.homeMid} />

      {/* Ad after the article, before the footer */}
      <AdSlot slot={SITE.adSlots.homeBottom} />

      {/* Per-page structured data. FAQ schema is built from this page's own unique FAQs. */}
      <JsonLd data={softwareSchema(url)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: data.h1, url },
      ])} />
      {content?.faqs && content.faqs.length > 0 && (
        <JsonLd data={faqSchemaFrom(content.faqs)} />
      )}
    </>
  );
}
