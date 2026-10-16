import type { Metadata } from "next";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import HomeSections from "@/components/HomeSections";
import SeoContent from "@/components/SeoContent";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { softwareSchema, faqSchema, howToSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Free PDF Invoice Generator — Create & Download Invoices Instantly",
  description:
    "Free PDF invoice generator and bill maker. Create professional invoices, bills, receipts, quotations and estimates — add line items, apply tax, and download a clean PDF in seconds. No signup, no watermark.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* The interactive tool (hero + generator) */}
      <InvoiceGenerator />

      {/* Real document specimens · how it works · plain statements · link lists · Pro */}
      <HomeSections />

      {/* SEO body + FAQ (indexable, server-rendered) — includes one in-article ad */}
      <SeoContent midAdSlot={SITE.adSlots.homeMid} />

      {/* Ad — after the article, before the footer */}
      <AdSlot slot={SITE.adSlots.homeBottom} />

      {/* Structured data — search + AI engines */}
      <JsonLd data={softwareSchema(SITE.url)} />
      <JsonLd data={howToSchema(SITE.url)} />
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE.url }])} />
    </>
  );
}
