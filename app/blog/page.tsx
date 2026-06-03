import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { POST_LIST } from "@/lib/posts";
import { SITE } from "@/lib/config";
import BlogGrid from "@/components/BlogGrid";

export const metadata: Metadata = {
  title: "Invoicing Blog — Guides for Freelancers & Small Businesses",
  description:
    "Free guides on invoicing, getting paid, and running a small business — how to make an invoice, payment terms, VAT/GST, and more.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <PageShell width="5xl">
      <PageHero
        badge="Blog"
        title="Invoicing guides & tips"
        subtitle="Practical, no-jargon guides on invoicing, getting paid, and running your business — written for freelancers and small businesses."
      />

      <BlogGrid posts={POST_LIST} />

      <JsonLd data={blogSchema(POST_LIST.map((p) => ({ title: p.title, url: `${SITE.url}/blog/${p.slug}`, date: p.date })))} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Blog", url: `${SITE.url}/blog` },
      ])} />
    </PageShell>
  );
}
