import { SITE } from "@/lib/config";
import { FAQS } from "@/lib/faq";

/* SoftwareApplication — tells Google your tool is a free web app. */
export function softwareSchema(url: string = SITE.url) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE.name} — Free Invoice Generator`,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser (Windows, macOS, Android, iOS)",
    description:
      "Free online invoice generator to create and download professional PDF invoices, receipts, and quotations. No signup required.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1283",
    },
    featureList: [
      "Free PDF invoice generator",
      "Invoice, receipt and quotation templates",
      "Brand logo upload",
      "Tax inclusive or exclusive",
      "Multi-currency support",
      "No signup, browser-only privacy",
    ],
  };
}

/* FAQPage — built from the SAME data as the visible FAQ section. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
