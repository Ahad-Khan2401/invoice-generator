"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/",             label: "Generator"    },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about",        label: "About"        },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
          </span>
          <span className="text-[16px] sm:text-[17px] font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
            <span className="text-indigo-600">PDF</span> Invoice Builder
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label }) => {
            const active = path === href;
            return (
              <Link key={href} href={href}
                className={`rounded-[10px] px-4 py-2 text-[14px] font-medium transition-colors ${
                  active ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/about" className="px-3 py-2 text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Sign In
          </Link>
          <Link href="/"
            className="rounded-[10px] bg-indigo-600 px-5 py-2 text-[13.5px] font-semibold text-white shadow-lg shadow-indigo-500/30 transition-colors hover:bg-indigo-700">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3">
          {NAV.map(({ href, label }) => {
            const active = path === href;
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-2.5 text-[15px] font-medium ${
                  active ? "bg-indigo-50 text-indigo-600" : "text-slate-600"
                }`}>
                {label}
              </Link>
            );
          })}
          <div className="mt-3 flex gap-2.5 border-t border-slate-100 pt-3">
            <Link href="/about" onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-slate-200 py-2.5 text-center text-[14px] font-medium text-slate-600">
              Sign In
            </Link>
            <Link href="/" onClick={() => setOpen(false)}
              className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-center text-[14px] font-semibold text-white">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
