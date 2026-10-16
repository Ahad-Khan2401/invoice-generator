"use client";
import Link from "next/link";
import { useState } from "react";

const PER_PAGE = 10;

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

interface PostItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
}

export default function BlogGrid({ posts }: { posts: PostItem[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / PER_PAGE);
  const visible = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = (n: number) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <ul className="rule-list">
        {visible.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>
              <span>
                <span className="rule-list__t">{p.title}</span>
                <span className="mt-1 block text-[12.5px] font-medium text-ink-500">{fmt(p.date)} · {p.readMins} min read</span>
              </span>
              <span className="rule-list__d">{p.excerpt}</span>
              <span className="rule-list__go" aria-hidden="true">Read →</span>
            </Link>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => goTo(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-ink-300 hover:text-accent-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goTo(n)}
              aria-label={`Page ${n}`}
              aria-current={n === page ? "page" : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-md text-[14px] font-semibold transition-colors ${
                n === page
                  ? "bg-ink-600 text-white shadow-sm"
                  : "border border-slate-200 text-slate-500 hover:border-ink-300 hover:text-accent-600"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => goTo(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-ink-300 hover:text-accent-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <p className="mt-3 text-center text-[13px] text-ink-500">
          Page {page} of {totalPages} · {posts.length} guides
        </p>
      )}
    </>
  );
}
