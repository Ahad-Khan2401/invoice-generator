import Link from "next/link";
import { LANDING_CONTENT } from "@/lib/landing-content";
import { POST_LIST } from "@/lib/posts";
import AdSlot from "@/components/AdSlot";

/*
  Renders the UNIQUE, self-contained content for a landing page:
  intro + custom sections + one in-article ad + page-specific FAQs.
  Landing pages NO LONGER share the homepage SeoContent block or the
  homepage FAQ, so every /slug page stands on its own unique content
  (this is what fixes the AdSense duplicate / scaled content problem).
  Server component (zero JS). Intro/section bodies may contain
  blank-line-separated paragraphs which render as separate <p> tags.
  If a slug has no entry, renders nothing.
*/
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export default function LandingContent({ slug, midAdSlot }: { slug: string; midAdSlot?: string }) {
  const data = LANDING_CONTENT[slug];
  if (!data) return null;

  const h = hash(slug);
  const guides = [
    POST_LIST[h % POST_LIST.length],
    POST_LIST[(h + 13) % POST_LIST.length],
  ].filter((g, i, arr) => arr.findIndex((x) => x.slug === g.slug) === i);

  const adAfter = midAdSlot ? Math.floor(data.sections.length / 2) : -1;

  return (
    <section
      style={{ background: "#fafbff", borderTop: "1px solid #f0f3fa", padding: "56px 24px 72px" }}
      aria-label="About this page"
    >
      <article style={{ maxWidth: 820, margin: "0 auto" }} className="seo-prose">
        {data.intro.split("\n\n").map((para, k) => (
          <p key={k} style={k === 0 ? { fontSize: "1.05rem", lineHeight: 1.75 } : undefined}>
            {para}
          </p>
        ))}

        {data.sections.map((s, i) => (
          <div key={i}>
            <h2>{s.h}</h2>
            {s.p.split("\n\n").map((para, k) => (
              <p key={k}>{para}</p>
            ))}
            {s.list && (
              <ul>
                {s.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
            {i === adAfter && (
              <div style={{ margin: "8px 0" }}>
                <AdSlot slot={midAdSlot!} />
              </div>
            )}
          </div>
        ))}

        <p style={{ fontSize: "0.95rem" }}>
          <strong>Helpful guides:</strong>{" "}
          {guides.map((g, i) => (
            <span key={g.slug}>
              {i > 0 && " / "}
              <Link href={`/blog/${g.slug}`}>{g.title}</Link>
            </span>
          ))}
          {" / "}
          <Link href="/tools">Free billing calculators</Link>
        </p>

        {data.faqs && data.faqs.length > 0 && (
          <>
            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="faq-list">
              {data.faqs.map((f, i) => (
                <details key={i} className="faq-item" {...(i === 0 ? { open: true } : {})}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </>
        )}
      </article>
    </section>
  );
}
