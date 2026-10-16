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
        className="hidden rounded-md px-3 py-2 text-[14px] font-medium text-ink-700 underline-offset-4 transition-colors hover:underline sm:inline-flex"
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
        className="flex items-center gap-2 rounded-md border border-[var(--rule)] bg-white px-2.5 py-1.5 transition-colors hover:border-[var(--rule-strong)]"
      >
        <span style={{
          width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
          background: isPro ? "#151a24" : "#e3ddd0",
          color: isPro ? "white" : "#2f3542",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800,
        }} aria-hidden="true">
          {initials}
        </span>
        <span className="hidden max-w-[100px] truncate text-[13px] font-semibold text-ink-700 sm:block">
          {user?.name?.split(" ")[0] ?? "User"}
        </span>
        {isPro && (
          <span className="rounded-sm bg-accent-600 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
            {plan === "business" ? "BUSINESS" : "PRO"}
          </span>
        )}
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-11 z-50 w-52 rounded-lg border border-[var(--rule)] bg-white p-1.5 shadow-lg">
          <div className="border-b border-[var(--rule)] px-3 py-2 mb-1">
            <p className="text-[13px] font-semibold text-ink truncate">{user?.name}</p>
            <p className="text-[11px] text-ink-500">{isPro ? `${plan === "business" ? "Business" : "Pro"} member` : "Free account"}</p>
          </div>
          <button
            type="button" role="menuitem"
            onClick={() => { setOpen(false); router.push("/dashboard"); }}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13.5px] font-medium text-ink-700 transition-colors hover:bg-paper-2"
          >
            <LayoutDashboard size={14} aria-hidden="true" /> Dashboard
          </button>
          {!isPro && (
            <button
              type="button" role="menuitem"
              onClick={() => { setOpen(false); openModal("upgrade", "header_menu"); }}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13.5px] font-medium text-accent-600 transition-colors hover:bg-accent-50"
            >
              <Crown size={14} aria-hidden="true" /> Upgrade to Pro
            </button>
          )}
          <div className="my-1 border-t border-[var(--rule)]" />
          <button
            type="button" role="menuitem"
            onClick={() => { setOpen(false); signOut(); }}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13.5px] font-medium text-ink-500 transition-colors hover:bg-paper-2 hover:text-accent-600"
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
    <div className="sticky top-0 z-50 w-full border-b border-[var(--rule)] bg-paper no-print">
      <header className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <nav className="flex h-16 items-center justify-between gap-4" aria-label="Main">

          <Link href="/" className="flex shrink-0 items-center rounded-md transition-opacity hover:opacity-80" aria-label="PDF Bill Builder home">
            <Logo size={30} />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {NAV.map(({ href, label }) => {
              const active = path === href;
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined}
                  className={`border-b-2 py-1 text-[14px] font-medium transition-colors ${
                    active ? "border-[var(--red)] text-ink" : "border-transparent text-ink-500 hover:text-ink"
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
              className="rounded-md bg-ink px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-ink-700"
            >
              {primaryLabel}
            </button>
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--rule)] text-ink-700 transition-colors hover:bg-paper-2 md:hidden">
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-[60] bg-ink/40 md:hidden" onClick={() => setOpen(false)} />
          <div role="dialog" aria-modal="true" aria-label="Menu" className="drawer-in fixed inset-y-0 left-0 z-[70] flex w-72 max-w-[82%] flex-col bg-paper shadow-2xl md:hidden">
            <div className="flex items-center justify-between border-b border-[var(--rule)] p-4">
              <Logo size={26} />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-md text-ink-500 hover:bg-paper-2">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="grid flex-1 content-start gap-0.5 overflow-y-auto p-3">
              {NAV.map(({ href, label }) => {
                const active = path === href;
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined}
                    className={`rounded-md px-4 py-2.5 text-[15px] font-medium ${
                      active ? "bg-paper-2 text-ink" : "text-ink-700 hover:bg-paper-2"
                    }`}>
                    {label}
                  </Link>
                );
              })}
              <Link href="/about" onClick={() => setOpen(false)} className="rounded-md px-4 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-paper-2">About</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="rounded-md px-4 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-paper-2">Contact</Link>
              {isLoggedIn && (
                <Link href="/dashboard" onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-paper-2">
                  Dashboard
                </Link>
              )}
            </div>
            <div className="grid gap-2 border-t border-[var(--rule)] p-4">
              {!isLoggedIn && (
                <button type="button" onClick={() => { setOpen(false); openModal("signin", "drawer_signin"); }}
                  className="rounded-md border border-[var(--rule-strong)] py-2.5 text-center text-sm font-medium text-ink-700">
                  Sign in
                </button>
              )}
              <button type="button" onClick={() => { setOpen(false); primaryAction(); }}
                className="rounded-md bg-ink py-2.5 text-center text-sm font-semibold text-white">
                {primaryLabel}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
