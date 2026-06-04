import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import { LANDING_PT, LANDING_PT_SLUGS } from "@/lib/landing-pt";
import { SITE } from "@/lib/config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return LANDING_PT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = LANDING_PT[slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.desc,
    alternates: {
      canonical: `/pt/${slug}`,
      languages: { "en": `${SITE.url}`, "pt-BR": `${SITE.url}/pt/${slug}`, "x-default": `${SITE.url}` },
    },
    openGraph: { title: page.title, description: page.desc, url: `${SITE.url}/pt/${slug}` },
  };
}

export default async function PtLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = LANDING_PT[slug];
  if (!page) notFound();

  return (
    <>
      <InvoiceGenerator
        heading={page.h1}
        subheading={page.sub}
      />

      {/* Portuguese SEO content */}
      <section className="mx-auto max-w-3xl px-6 py-16 space-y-10">
        <div className="space-y-6">
          {page.body.map((b, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{b.h2}</h2>
              <p className="text-slate-600 leading-relaxed">{b.p}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas frequentes</h2>
          <div className="space-y-5">
            {page.faq.map((f, i) => (
              <div key={i} className="border-b border-slate-100 pb-5">
                <h3 className="font-semibold text-slate-900 mb-1">{f.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema([
        { name: "Início", url: SITE.url },
        { name: page.h1, url: `${SITE.url}/pt/${slug}` },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": page.faq.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      }} />
    </>
  );
}
