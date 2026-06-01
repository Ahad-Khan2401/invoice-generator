import Link from "next/link";
import { CTAButton } from "@/components/ui";
import { LANDING_SLUGS } from "@/lib/landing";

const shortLabel = (slug: string) =>
  slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

export default function NotFound() {
  const links = [
    { href: "/how-it-works", label: "How it works" },
    { href: "/about",        label: "About" },
    ...LANDING_SLUGS.map((s) => ({ href: `/${s}`, label: shortLabel(s) })),
  ];

  return (
    <div className="flex min-h-screen items-center bg-[linear-gradient(160deg,#f0f4ff_0%,#f8faff_55%,#faf5ff_100%)]">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="bg-gradient-to-br from-indigo-600 to-violet-600 bg-clip-text text-[88px] sm:text-[120px] font-black leading-none tracking-tight text-transparent">
          404
        </p>
        <h1 className="mb-3 mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
          This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mb-8 max-w-md text-[15px] text-slate-500">
          The page you&apos;re looking for may have moved or never existed. Let&apos;s get you back to making documents.
        </p>

        <CTAButton href="/">Go to the generator</CTAButton>

        <div className="mt-12">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-600 transition-all hover:border-indigo-300 hover:text-indigo-600">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
