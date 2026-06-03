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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {visible.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
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
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => goTo(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
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
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-[14px] font-semibold transition-colors ${
                n === page
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => goTo(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <p className="mt-3 text-center text-[13px] text-slate-400">
          Page {page} of {totalPages} · {posts.length} guides
        </p>
      )}
    </>
  );
}
