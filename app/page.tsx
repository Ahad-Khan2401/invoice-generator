import type { Metadata } from "next";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import SeoContent from "@/components/SeoContent";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { softwareSchema, faqSchema, howToSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Free Invoice & Bill Generator — Create & Download PDF Invoices Instantly",
  description:
    "Free online invoice generator and bill maker. Create professional invoices, bills, receipts, and quotations — add line items, apply tax, and download a clean PDF in seconds. No signup.",
  keywords: [
    "free invoice generator", "invoice maker", "bill generator", "bill maker",
    "online bill maker", "create invoice online", "make a bill online",
    "pdf invoice", "receipt generator", "quotation generator",
  ],
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* The interactive tool (hero + generator + feature grid) */}
      <InvoiceGenerator />

      {/* SEO body + FAQ (indexable, server-rendered) — includes one in-article ad */}
      <SeoContent midAdSlot={SITE.adSlots.homeMid} />

      {/* Ad #2 — after the article, before the footer */}
      <AdSlot slot={SITE.adSlots.homeBottom} />

      {/* Structured data — search + AI engines */}
      <JsonLd data={softwareSchema(SITE.url)} />
      <JsonLd data={howToSchema(SITE.url)} />
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE.url }])} />
    </>
  );
}
