import Link from "next/link";

/* Shared, server-rendered UI primitives so every page matches the
   home page's look. Pure CSS/Tailwind — zero client JS, fast to load. */

const GRADIENT_BG =
  "min-h-screen bg-[linear-gradient(160deg,#f0f4ff_0%,#f8faff_55%,#faf5ff_100%)]";

export function PageShell({
  children,
  width = "4xl",
}: {
  children: React.ReactNode;
  width?: "3xl" | "4xl" | "5xl";
}) {
  const max = width === "3xl" ? "max-w-3xl" : width === "5xl" ? "max-w-5xl" : "max-w-4xl";
  return (
    <div className={GRADIENT_BG}>
      <div className={`mx-auto ${max} px-4 sm:px-6 py-12 sm:py-16`}>{children}</div>
    </div>
  );
}

export function PageHero({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-indigo-600 mb-5">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
        {badge}
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 md:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_18px_50px_rgba(15,23,42,0.06)] ${className}`}>
      {children}
    </div>
  );
}

export function CTAButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 sm:px-8 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:-translate-y-0.5"
    >
      {children}
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export function BackToTool() {
  return (
    <div className="text-center mt-10">
      <Link href="/" className="inline-flex items-center gap-2 font-semibold text-indigo-600 transition-all hover:gap-3">
        ← Back to the generator
      </Link>
    </div>
  );
}
