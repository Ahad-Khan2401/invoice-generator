import { LANDING_CONTENT } from "@/lib/landing-content";

/* ───────────────────────────────────────────────
   Renders the UNIQUE per-page content for a landing
   page (intro + custom sections). This is what makes
   every /slug page genuinely different — essential for
   SEO (no duplicate content) and AdSense approval.

   Server component (zero JS) → fast + fully indexable.
   If a slug has no unique content, renders nothing.
─────────────────────────────────────────────── */
export default function LandingContent({ slug }: { slug: string }) {
  const data = LANDING_CONTENT[slug];
  if (!data) return null;

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
      </article>
    </section>
  );
}
