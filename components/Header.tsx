"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/",             label: "Generator"    },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about",        label: "About"        },
];

export default function Header() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)" }}
          >
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
          </div>
          <span className="text-[17px] font-extrabold text-slate-900 tracking-tight">InvoiceQuick</span>
        </Link>

        {/* Nav — centered */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV.map(({ href, label }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 rounded-xl text-[13.5px] font-semibold transition-all duration-150 ${
                  active
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right badge */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            100% Free
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="3" y1="6"  x2="21" y2="6"  />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

      </div>
    </header>
  );
}
