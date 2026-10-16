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
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        <span aria-current="page">Templates</span>
      </nav>
      <PageHero
        title="Every free invoice template, in one place"
        subtitle="All templates use the same fast generator — they just start pre-configured for your profession, country, or document type. Pick one and download your PDF in minutes."
      />

      {/* PDF style gallery — Classic free, Minimal/Bold Pro */}
      <section className="mb-16" aria-labelledby="styles-h">
        <h2 id="styles-h" className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-tight text-ink">Three PDF styles, one generator</h2>
        <p className="mb-8 mt-2 max-w-xl text-[15.5px] text-ink-500">
          Every template below can be downloaded in any of these looks. Classic is free forever; Minimal and Bold come with Pro.
        </p>
        <TemplateStyleCards showCta />
      </section>

      {GROUPS.map((g) => (
        <section key={g.title} className="mb-14">
          <h2 className="font-display text-[clamp(1.5rem,2.6vw,1.9rem)] font-semibold tracking-tight text-ink">{g.title}</h2>
          <p className="mb-5 mt-1 text-[15px] text-ink-500">{g.blurb}</p>
          <ul className="rule-list">
            {g.slugs.map((slug) => {
              const t = LANDING[slug];
              if (!t) return null;
              return (
                <li key={slug}>
                  <Link href={`/${slug}`}>
                    <span className="rule-list__t">{t.h1.replace(/^Free /, "")}</span>
                    <span className="rule-list__d">{t.sub}</span>
                    <span className="rule-list__go" aria-hidden="true">Open →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Templates", url: `${SITE.url}/templates` },
      ])} />
    </PageShell>
  );
}
