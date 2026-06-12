import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import TemplateStyleCards from "@/components/TemplateStyleCards";
import { breadcrumbSchema } from "@/lib/schema";
import { LANDING } from "@/lib/landing";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Free Invoice Templates — by Profession, Country & Use-Case",
  description:
    "Browse every free invoice template: freelancers, contractors, trades, photographers and more — plus country templates with GST, VAT and sales tax built in.",
  alternates: { canonical: "/templates" },
};

/* Group the landing pages into browsable sections. Slugs not listed
   fall into the last group automatically, so new pages always appear. */
const GROUPS: { title: string; blurb: string; slugs: string[] }[] = [
  {
    title: "By profession",
    blurb: "Templates tuned to how your trade actually bills — hours, parts, sessions, or projects.",
    slugs: [
      "freelancer-invoice", "contractor-invoice", "consultant-invoice", "small-business-invoice",
      "self-employed-invoice", "photographer-invoice", "graphic-designer-invoice", "web-developer-invoice",
      "plumber-invoice", "electrician-invoice", "cleaning-services-invoice", "tutor-invoice",
      "virtual-assistant-invoice", "handyman-invoice", "catering-invoice", "auto-repair-invoice",
      "personal-trainer-invoice", "construction-invoice",
    ],
  },
  {
    title: "By country",
    blurb: "Open with the right currency and tax wording — GST, VAT, HST, or sales tax.",
    slugs: [
      "invoice-generator-usa", "invoice-generator-canada", "invoice-generator-uk",
      "invoice-generator-australia", "invoice-generator-australia-gst", "invoice-generator-india",
      "invoice-generator-pakistan", "freelance-invoice-template-usa", "invoice-template-canada",
    ],
  },
  {
    title: "By document & use-case",
    blurb: "Beyond the standard invoice — receipts, quotes, and special formats.",
    slugs: [], // filled with everything not listed above
  },
];

const listed = new Set(GROUPS.flatMap((g) => g.slugs));
GROUPS[2].slugs = Object.keys(LANDING).filter((s) => !listed.has(s));

export default function Templates() {
  return (
    <PageShell width="5xl">
      <PageHero
        badge="Templates"
        title="Every free invoice template, in one place"
        subtitle="All templates use the same fast generator — they just start pre-configured for your profession, country, or document type. Pick one and download your PDF in minutes."
      />

      {/* PDF style gallery — Classic free, Minimal/Bold Pro */}
      <section className="mb-14">
        <h2 className="text-[20px] font-extrabold tracking-tight text-slate-900">Three PDF styles, one generator</h2>
        <p className="mb-5 mt-1 text-[14px] text-slate-500">
          Every template below can be downloaded in any of these looks. Classic is free forever; Minimal and Bold come with Pro.
        </p>
        <TemplateStyleCards showCta />
      </section>

      {GROUPS.map((g) => (
        <section key={g.title} className="mb-12">
          <h2 className="text-[20px] font-extrabold tracking-tight text-slate-900">{g.title}</h2>
          <p className="mb-5 mt-1 text-[14px] text-slate-500">{g.blurb}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.slugs.map((slug) => {
              const t = LANDING[slug];
              if (!t) return null;
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md"
                >
                  <h3 className="text-[15px] font-bold leading-snug text-slate-900 group-hover:text-indigo-600">
                    {t.h1}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{t.sub}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Templates", url: `${SITE.url}/templates` },
      ])} />
    </PageShell>
  );
}
