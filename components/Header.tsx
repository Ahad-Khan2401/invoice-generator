"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, LayoutDashboard, LogOut, Crown } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/components/AuthProvider";

const NAV = [
  { href: "/",             label: "Generator"    },
  { href: "/templates",    label: "Templates"    },
  { href: "/tools",        label: "Calculators"  },
  { href: "/pricing",      label: "Pricing"      },
  { href: "/blog",         label: "Guides"       },
  { href: "/how-it-works", label: "How it works" },
];

/* ─── User avatar + dropdown ─────────────────────── */
function UserMenu() {
  const { user, isLoggedIn, isPro, plan, signOut, openModal } = useAuth();
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);
  const router          = useRouter();

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", handle); document.removeEventListener("keydown", onKey); };
  }, [open]);

  if (!isLoggedIn) {
    return (
      <button
        type="button"
        onClick={() => openModal("signin", "header_signin")}
        className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-flex"
      >
        Sign in
      </button>
    );
  }

  const initials = (user?.name ?? "U").slice(0, 1).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 transition-all hover:border-indigo-300"
      >
        <span style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: isPro ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "#e4e9f2",
          color: isPro ? "white" : "#475569",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800,
        }} aria-hidden="true">
          {initials}
        </span>
        <span className="hidden max-w-[100px] truncate text-[13px] font-semibold text-slate-700 sm:block">
          {user?.name?.split(" ")[0] ?? "User"}
        </span>
        {isPro && (
          <span style={{ fontSize: 10, fontWeight: 700, background: "#ede9fe", color: "#6d28d9", borderRadius: 99, padding: "2px 7px" }}>
            {plan === "business" ? "BUSINESS" : "PRO"}
          </span>
        )}
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-11 z-50 w-52 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl">
          <div className="border-b border-slate-100 px-3 py-2 mb-1">
            <p className="text-[13px] font-semibold text-slate-800 truncate">{user?.name}</p>
            <p className="text-[11px] text-slate-500">{isPro ? `✦ ${plan === "business" ? "Business" : "Pro"} member` : "Free account"}</p>
          </div>
          <button
            type="button" role="menuitem"
            onClick={() => { setOpen(false); router.push("/dashboard"); }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <LayoutDashboard size={14} aria-hidden="true" /> Dashboard
          </button>
          {!isPro && (
            <button
              type="button" role="menuitem"
              onClick={() => { setOpen(false); openModal("upgrade", "header_menu"); }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              <Crown size={14} aria-hidden="true" /> Upgrade to Pro
            </button>
          )}
          <div className="my-1 border-t border-slate-100" />
          <button
            type="button" role="menuitem"
            onClick={() => { setOpen(false); signOut(); }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-red-600"
          >
            <LogOut size={14} aria-hidden="true" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Header ─────────────────────────────────────── */
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isLoggedIn, isPro, openModal } = useAuth();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const primaryLabel = !isLoggedIn ? "Get started" : isPro ? "Dashboard" : "Go Pro";
  const primaryAction = () => {
    if (!isLoggedIn) openModal("choose", "header_cta");
    else if (isPro) window.location.assign("/dashboard");
    else openModal("upgrade", "header_cta");
  };

  return (
    <div className="sticky top-3 sm:top-5 z-50 w-full px-3 no-print">
      <header className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200/70 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.10)] backdrop-blur-lg supports-[backdrop-filter]:bg-white/75">
        <nav className="flex items-center justify-between gap-3 p-2 pl-3 sm:pl-4" aria-label="Main">

          <Link href="/" className="flex shrink-0 items-center rounded-lg transition-opacity hover:opacity-80" aria-label="PDF Bill Builder home">
            <Logo size={30} />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map(({ href, label }) => {
              const active = path === href;
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}>
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <UserMenu />
            <button
              type="button"
              onClick={primaryAction}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-[13.5px] font-semibold text-white shadow-md shadow-indigo-500/30 transition-colors hover:bg-indigo-700"
            >
              {primaryLabel}
            </button>
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 md:hidden">
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />
          <div role="dialog" aria-modal="true" aria-label="Menu" className="drawer-in fixed inset-y-0 left-0 z-[70] flex w-72 max-w-[82%] flex-col bg-white shadow-2xl md:hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <Logo size={26} />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="grid flex-1 content-start gap-1 overflow-y-auto p-3">
              {NAV.map(({ href, label }) => {
                const active = path === href;
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined}
                    className={`rounded-lg px-4 py-2.5 text-[15px] font-medium ${
                      active ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"
                    }`}>
                    {label}
                  </Link>
                );
              })}
              <Link href="/about" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50">About</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50">Contact</Link>
              {isLoggedIn && (
                <Link href="/dashboard" onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50">
                  Dashboard
                </Link>
              )}
            </div>
            <div className="grid gap-2 border-t border-slate-100 p-4">
              {!isLoggedIn && (
                <button type="button" onClick={() => { setOpen(false); openModal("signin", "drawer_signin"); }}
                  className="rounded-lg border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-700">
                  Sign in
                </button>
              )}
              <button type="button" onClick={() => { setOpen(false); primaryAction(); }}
                className="rounded-lg bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white">
                {primaryLabel}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
