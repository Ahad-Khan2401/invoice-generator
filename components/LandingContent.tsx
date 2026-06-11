import Link from "next/link";
import { LANDING_CONTENT } from "@/lib/landing-content";
import { POST_LIST } from "@/lib/posts";

/* ───────────────────────────────────────────────
   Renders the UNIQUE per-page content for a landing
   page (intro + custom sections). This is what makes
   every /slug page genuinely different — essential for
   SEO (no duplicate content) and AdSense approval.

   Server component (zero JS) → fast + fully indexable.
   If a slug has no unique content, renders nothing.

   At the end it links to 2 related blog guides, picked
   deterministically per slug so link equity spreads across
   the whole blog (and every page links differently).
─────────────────────────────────────────────── */
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export default function LandingContent({ slug }: { slug: string }) {
  const data = LANDING_CONTENT[slug];
  if (!data) return null;

  const h = hash(slug);
  const guides = [
    POST_LIST[h % POST_LIST.length],
    POST_LIST[(h + 13) % POST_LIST.length],
  ].filter((g, i, arr) => arr.findIndex(x => x.slug === g.slug) === i);

  return (
    <section
      style={{ background: "#fafbff", borderTop: "1px solid #f0f3fa", padding: "56px 24px 8px" }}
      aria-label="About this page"
    >
      <article style={{ maxWidth: 820, margin: "0 auto" }} className="seo-prose">
        <p style={{ fontSize: "1.05rem", lineHeight: 1.75 }}>{data.intro}</p>

        {data.sections.map((s, i) => (
          <div key={i}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
            {s.list && (
              <ul>
                {s.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <p style={{ fontSize: "0.95rem" }}>
          <strong>Helpful guides:</strong>{" "}
          {guides.map((g, i) => (
            <span key={g.slug}>
              {i > 0 && " · "}
              <Link href={`/blog/${g.slug}`}>{g.title}</Link>
            </span>
          ))}
          {" · "}
          <Link href="/tools">Free billing calculators</Link>
        </p>
      </article>
    </section>
  );
}
