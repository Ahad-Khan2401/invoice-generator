import Link from "next/link";

/* Shared, server-rendered page primitives. Paper background, serif H1,
   hairline-bordered sheets. Pure CSS — zero client JS. */

export function PageShell({
  children,
  width = "4xl",
}: {
  children: React.ReactNode;
  width?: "3xl" | "4xl" | "5xl";
}) {
  const max = width === "3xl" ? "max-w-3xl" : width === "5xl" ? "max-w-5xl" : "max-w-4xl";
  return (
    <div className="min-h-screen bg-paper">
      <div className={`mx-auto ${max} px-4 sm:px-6 py-10 sm:py-16`}>{children}</div>
    </div>
  );
}

/* Page heading: serif H1, a short red rule, and a plain sentence.
   `badge` is accepted for older call sites and intentionally not drawn —
   a tiny tracked label above every title is template grammar. */
export function PageHero({
  title,
  subtitle,
}: {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <header className="mb-10 sm:mb-14 max-w-3xl">
      <h1 className="text-[clamp(2rem,4.6vw,3.3rem)] text-ink">{title}</h1>
      <span aria-hidden="true" className="mt-5 block h-[3px] w-14 bg-[var(--red)]" />
      {subtitle && (
        <p className="mt-5 max-w-2xl text-[16.5px] sm:text-[17.5px] leading-relaxed text-ink-500">
          {subtitle}
        </p>
      )}
    </header>
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
    <div className={`rounded-lg border border-[var(--rule)] bg-white p-6 sm:p-8 md:p-10 ${className}`}>
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
      className="inline-flex items-center gap-2 rounded-lg bg-ink px-7 py-3.5 font-semibold text-white transition-colors hover:bg-ink-700"
    >
      {children}
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export function BackToTool() {
  return (
    <div className="text-center mt-10">
      <Link href="/" className="inline-flex items-center gap-2 font-semibold text-accent-600 underline underline-offset-4 decoration-accent-200 hover:decoration-accent-600">
        ← Back to the generator
      </Link>
    </div>
  );
}
