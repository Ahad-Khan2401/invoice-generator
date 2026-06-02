"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/",             label: "Generator"    },
  { href: "/how-it-works", label: "How it works" },
  { href: "/blog",         label: "Blog"         },
  { href: "/about",        label: "About"        },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change + lock body scroll while open
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="sticky top-3 sm:top-5 z-50 w-full px-3">
      <header className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200/70 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.10)] backdrop-blur-lg supports-[backdrop-filter]:bg-white/75">
        <nav className="flex items-center justify-between gap-3 p-2 pl-3 sm:pl-4">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center rounded-lg transition-opacity hover:opacity-80">
            <Logo size={30} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV.map(({ href, label }) => {
              const active = path === href;
              return (
                <Link key={href} href={href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}>
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link href="/about"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-flex">
              Sign In
            </Link>
            <Link href="/"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-[13.5px] font-semibold text-white shadow-md shadow-indigo-500/30 transition-colors hover:bg-indigo-700">
              Get Started
            </Link>
            <button onClick={() => setOpen(true)} aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 md:hidden">
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />
          <div className="drawer-in fixed inset-y-0 left-0 z-[70] flex w-72 max-w-[82%] flex-col bg-white shadow-2xl md:hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <Logo size={26} />
              <button onClick={() => setOpen(false)} aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                <X className="size-4" />
              </button>
            </div>
            <div className="grid flex-1 content-start gap-1 overflow-y-auto p-3">
              {NAV.map(({ href, label }) => {
                const active = path === href;
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-2.5 text-[15px] font-medium ${
                      active ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
                    }`}>
                    {label}
                  </Link>
                );
              })}
            </div>
            <div className="grid gap-2 border-t border-slate-100 p-4">
              <Link href="/about" onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-700">
                Sign In
              </Link>
              <Link href="/" onClick={() => setOpen(false)}
                className="rounded-lg bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white">
                Get Started
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
