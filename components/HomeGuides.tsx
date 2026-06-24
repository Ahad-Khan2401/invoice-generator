import Link from "next/link";
import { POST_LIST } from "@/lib/posts";

/* Prominent "Invoicing guides" grid for the homepage. Surfaces real editorial
   content (blog guides) high on the page so visitors - and reviewers - see depth
   beyond the tool, and spreads internal link equity to the blog. Server component. */
export default function HomeGuides() {
  const posts = POST_LIST.slice(0, 9);
  return (
    <section
      style={{ background: "#fafbff", borderTop: "1px solid #f0f3fa", padding: "60px 24px" }}
      aria-label="Invoicing guides and resources"
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0d1117", letterSpacing: "-0.02em", margin: 0 }}>
          Invoicing guides &amp; resources
        </h2>
        <p style={{ fontSize: "1rem", color: "#64748b", margin: "8px 0 0", maxWidth: 660 }}>
          Practical, up-to-date guides on invoicing, getting paid faster, and tax &mdash; written for
          freelancers, contractors, and small businesses.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
            marginTop: 28,
          }}
        >
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={{
                display: "block",
                background: "white",
                border: "1px solid #e9edf5",
                borderRadius: 14,
                padding: "18px 20px",
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              }}
            >
              <span style={{ display: "block", fontSize: "1rem", fontWeight: 700, color: "#1e293b", lineHeight: 1.35 }}>
                {p.title}
              </span>
              <span style={{ display: "block", fontSize: "0.9rem", color: "#64748b", marginTop: 8, lineHeight: 1.55 }}>
                {p.excerpt}
              </span>
              <span style={{ display: "block", fontSize: "0.85rem", color: "#4f46e5", fontWeight: 600, marginTop: 10 }}>
                Read guide &rarr;
              </span>
            </Link>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 28 }}>
          <Link href="/blog" style={{ fontSize: "0.95rem", fontWeight: 700, color: "#4f46e5", textDecoration: "none" }}>
            View all invoicing guides &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
