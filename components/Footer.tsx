import Link from "next/link";
import { LANDING_SLUGS } from "@/lib/landing";

const shortLabel = (slug: string) =>
  slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

const COLS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/",             label: "Invoice Generator" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/about",        label: "About" },
    ],
  },
  {
    title: "Templates",
    links: LANDING_SLUGS.map((s) => ({ href: `/${s}`, label: shortLabel(s) })),
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms",   label: "Terms of Service" },
      { href: "/about",   label: "Contact Us" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-white" style={{ borderColor: "#f1f5f9" }}>
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-[15px] font-bold text-slate-900">
              <span className="text-indigo-600">PDF</span> Invoice Builder
            </p>
            <p className="text-[13px] text-slate-500 mt-2 leading-relaxed max-w-[220px]">
              Free invoices, receipts &amp; quotations. Built in your browser — private, fast, no signup.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <nav key={col.title}>
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}
                      className="text-[13px] text-slate-500 hover:text-indigo-600 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
             style={{ borderColor: "#f1f5f9" }}>
          <p className="text-[12px] text-slate-400">© 2026 PDF Invoice Builder. All rights reserved.</p>
          <p className="text-[12px] text-slate-400">Made for freelancers &amp; small businesses worldwide.</p>
        </div>

      </div>
    </footer>
  );
}
