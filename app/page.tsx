import type { Metadata } from "next";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import SeoContent from "@/components/SeoContent";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { softwareSchema, faqSchema, howToSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";

const hreflang = Object.fromEntries([
  ...SITE.hreflangLocales.map((l) => [l, "/"]),
  ["x-default", "/"],
]);

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create & Download PDF Invoices Instantly",
  description:
    "Generate professional invoices, receipts, and quotations online for free. No signup needed. Add line items, apply tax, then download a clean PDF in seconds.",
  alternates: { canonical: "/", languages: hreflang },
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

      {/* Structured data — search + AI engines */}
      <JsonLd data={softwareSchema(SITE.url)} />
      <JsonLd data={howToSchema(SITE.url)} />
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE.url }])} />
    </>
  );
}
