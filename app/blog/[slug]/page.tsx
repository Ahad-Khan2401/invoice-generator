import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui";
import BlogContent from "@/components/BlogContent";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { POSTS, POST_SLUGS, POST_LIST } from "@/lib/posts";
import { SITE } from "@/lib/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  const url = `${SITE.url}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, url, images: ["/og.png"], publishedTime: post.date, modifiedTime: post.updated },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: ["/og.png"] },
  };
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const url = `${SITE.url}/blog/${slug}`;
  const related = POST_LIST.filter((p) => p.slug !== slug).slice(0, 2);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <PageShell width="3xl">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-[13px] text-slate-400">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
      </nav>

      <article>
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-slate-400">
            <span>{fmt(post.date)}</span><span>·</span><span>{post.readMins} min read</span>
          </div>
          <h1 className="text-[28px] sm:text-[38px] font-extrabold leading-tight tracking-tight text-slate-900">
            {post.title}
          </h1>
          <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-slate-500">{post.excerpt}</p>
        </header>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <BlogContent blocks={post.body} />
        </div>

        {/* Ad */}
        <div className="my-8"><AdSlot slot={SITE.adSlots.homeMid} /></div>

        {/* FAQ */}
        {post.faq.length > 0 && (
          <section className="mt-4">
            <h2 className="mb-4 text-[22px] font-extrabold tracking-tight text-slate-900">Frequently asked questions</h2>
            <div className="space-y-3">
              {post.faq.map((f) => (
                <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <h3 className="mb-1.5 text-[15px] font-bold text-slate-900">{f.q}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-500">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-10 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-center shadow-lg shadow-indigo-500/25">
          <h2 className="text-[22px] font-extrabold text-white">Create your invoice now — free</h2>
          <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-relaxed text-white/80">
            Invoices, receipts, and quotations. Add your logo, apply tax, download a PDF in seconds. No signup.
          </p>
          <Link href="/" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-bold text-indigo-700 transition-transform hover:-translate-y-0.5">
            Open the free generator
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-[18px] font-bold text-slate-900">Keep reading</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <h3 className="text-[15px] font-bold leading-snug text-slate-900 group-hover:text-indigo-600">{p.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <JsonLd data={articleSchema({ title: post.title, description: post.description, url, date: post.date, updated: post.updated })} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Blog", url: `${SITE.url}/blog` },
        { name: post.title, url },
      ])} />
    </PageShell>
  );
}
