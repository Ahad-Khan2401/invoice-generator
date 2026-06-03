import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import SeoContent from "@/components/SeoContent";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { softwareSchema, faqSchema, howToSchema, breadcrumbSchema } from "@/lib/schema";
import { LANDING, LANDING_SLUGS } from "@/lib/landing";
import { SITE } from "@/lib/config";

/* Only the whitelisted slugs are built. Anything else → 404,
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
  const languages = Object.fromEntries([
    ...SITE.hreflangLocales.map((l) => [l, `/${profession}`]),
    ["x-default", `/${profession}`],
  ]);
  return {
    title: data.title,
    description: data.desc,
    keywords: data.keywords,
    alternates: { canonical: `/${profession}`, languages },
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

  const url = `${SITE.url}/${profession}`;

  return (
    <>
      <InvoiceGenerator heading={data.h1} subheading={data.sub} defaultCurrency={data.currencySymbol} />

      <AdSlot slot={SITE.adSlots.homeTop} />

      <SeoContent profession={data.profession} midAdSlot={SITE.adSlots.homeMid} />

      <AdSlot slot={SITE.adSlots.homeBottom} />

      {/* Structured data — search + AI engines */}
      <JsonLd data={softwareSchema(url)} />
      <JsonLd data={howToSchema(url)} />
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: data.h1, url },
      ])} />
    </>
  );
}
