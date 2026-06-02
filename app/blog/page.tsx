import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { POST_LIST } from "@/lib/posts";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Invoicing Blog — Guides for Freelancers & Small Businesses",
  description:
    "Free guides on invoicing, getting paid, and running a small business — how to make an invoice, payment terms, VAT/GST, and more.",
  alternates: { canonical: "/blog" },
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default function BlogIndex() {
  return (
    <PageShell width="5xl">
      <PageHero
        badge="Blog"
        title="Invoicing guides & tips"
        subtitle="Practical, no-jargon guides on invoicing, getting paid, and running your business — written for freelancers and small businesses."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {POST_LIST.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`}
            className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="mb-3 flex items-center gap-2 text-[12px] font-medium text-slate-400">
              <span>{fmt(p.date)}</span>
              <span>·</span>
              <span>{p.readMins} min read</span>
            </div>
            <h2 className="text-[18px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
              {p.title}
            </h2>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate-500">{p.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-semibold text-indigo-600">
              Read guide
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </Link>
        ))}
      </div>

      <JsonLd data={blogSchema(POST_LIST.map((p) => ({ title: p.title, url: `${SITE.url}/blog/${p.slug}`, date: p.date })))} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Blog", url: `${SITE.url}/blog` },
      ])} />
    </PageShell>
  );
}
