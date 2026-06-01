import type { Metadata } from "next";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import SeoContent from "@/components/SeoContent";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { softwareSchema, faqSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create & Download PDF Invoices Instantly",
  description:
    "Generate professional invoices, receipts, and quotations online for free. No signup needed. Add line items, apply tax, then download a clean PDF in seconds.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* The interactive tool (hero + generator + feature grid) */}
      <InvoiceGenerator />

      {/* Ad #1 — between the tool and the article (in-content, high viewability) */}
      <AdSlot slot={SITE.adSlots.homeTop} />

      {/* SEO body + FAQ (indexable, server-rendered) — includes one in-article ad */}
      <SeoContent midAdSlot={SITE.adSlots.homeMid} />

      {/* Ad #2 — after the article, before the footer */}
      <AdSlot slot={SITE.adSlots.homeBottom} />

      {/* Structured data */}
      <JsonLd data={softwareSchema(SITE.url)} />
      <JsonLd data={faqSchema()} />
    </>
  );
}
