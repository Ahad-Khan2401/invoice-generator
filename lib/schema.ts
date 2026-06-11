import { SITE } from "@/lib/config";
import { FAQS } from "@/lib/faq";

/* SoftwareApplication — tells Google your tool is a free web app. */
export function softwareSchema(url: string = SITE.url) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE.name} — Free Invoice & Bill Generator`,
    alternateName: ["Free Bill Generator", "Free Invoice Generator", "Online Bill Maker"],
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser (Windows, macOS, Android, iOS)",
    description:
      "Free online invoice generator and bill maker to create and download professional PDF invoices, bills, receipts, and quotations. No signup required.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Free PDF invoice generator and bill maker",
      "Invoice, bill, receipt and quotation templates",
      "Brand logo upload",
      "Tax inclusive or exclusive",
      "Multi-currency support",
      "No signup, browser-only privacy",
    ],
  };
}

/* FAQPage — built from the SAME data as the visible FAQ section. */
export function faqSchema() {
  return faqSchemaFrom(FAQS);
}

/* FAQPage from a custom list of Q&As (for tools, calculators, etc.). */
export function faqSchemaFrom(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* WebApplication — for a free online tool / calculator page. */
export function toolSchema(p: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: p.name,
    url: p.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser (Windows, macOS, Android, iOS)",
    description: p.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

/* Organization — brand identity for Google Knowledge Panel / AI answers. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/og.png`,
    description:
      "Free online generator for professional invoices, receipts, and quotations — download as PDF, no signup.",
    email: "support@pdfbillbuilder.com",
    founder: { "@type": "Person", name: SITE.author },
  };
}

/* WebSite — site name for sitelinks + AI engines. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en",
  };
}

/* HowTo — powers Google "how to make an invoice" + AI step answers. */
export function howToSchema(url: string = SITE.url) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to make an invoice online for free",
    description:
      "Create and download a professional PDF invoice in four simple steps — no signup required.",
    totalTime: "PT2M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Choose document type", text: "Pick Invoice, Receipt, or Quotation and set the payment status." },
      { "@type": "HowToStep", position: 2, name: "Add your details", text: "Enter your business and client details, upload your logo, and pick a brand colour and currency." },
      { "@type": "HowToStep", position: 3, name: "List items and tax", text: "Add each item with quantity and rate; the subtotal, tax, and total calculate automatically." },
      { "@type": "HowToStep", position: 4, name: "Download the PDF", text: "Click Download PDF to get a clean, print-ready invoice you can email or print." },
    ],
    url,
  };
}

/* BreadcrumbList — clean breadcrumbs in search + AI context. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/* BlogPosting — for individual articles (rich results + AI citations). */
export function articleSchema(p: {
  title: string; description: string; url: string; date: string; updated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated,
    url: p.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": p.url },
    image: `${SITE.url}/og.png`,
    author: { "@type": "Person", name: SITE.author, url: `${SITE.url}/about` },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/og.png` },
    },
  };
}

/* Blog — for the blog index listing. */
export function blogSchema(posts: { title: string; url: string; date: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} Blog`,
    url: `${SITE.url}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: p.url,
      datePublished: p.date,
    })),
  };
}
