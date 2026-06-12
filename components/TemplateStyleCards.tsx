import Link from "next/link";

/* ───────────────────────────────────────────────
   Mini CSS mockups of the three PDF template styles
   (Classic free · Minimal/Bold Pro). Pure divs — no
   images, zero JS — used on /pricing and /templates
   to show what Pro actually unlocks.
─────────────────────────────────────────────── */

function ClassicMock() {
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 to-indigo-400" />
      <div className="mt-1.5 flex items-start justify-between">
        <div>
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400" />
          <div className="mt-1.5 h-1.5 w-16 rounded bg-slate-700" />
          <div className="mt-1 h-1 w-12 rounded bg-slate-200" />
        </div>
        <div className="flex flex-col items-end">
          <div className="h-3 w-16 rounded bg-slate-100" />
          <div className="mt-1.5 h-1.5 w-10 rounded bg-slate-700" />
        </div>
      </div>
      <div className="mt-3 h-7 rounded-lg border border-slate-100 bg-slate-50" />
      <div className="mt-2.5 h-2 rounded bg-indigo-100/70" />
      <div className="mt-1.5 h-1 w-5/6 rounded bg-slate-100" />
      <div className="mt-1 h-1 w-4/6 rounded bg-slate-100" />
      <div className="ml-auto mt-2.5 h-2 w-14 rounded bg-indigo-500" />
    </div>
  );
}

function MinimalMock() {
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="h-5 w-5 rounded-md bg-slate-900" />
          <div className="mt-1.5 h-1.5 w-16 rounded bg-slate-700" />
          <div className="mt-1 h-1 w-12 rounded bg-slate-200" />
        </div>
        <div className="flex flex-col items-end">
          <div className="h-2.5 w-14 rounded bg-slate-900" />
          <div className="mt-1.5 h-1.5 w-10 rounded bg-slate-400" />
        </div>
      </div>
      <div className="mt-3 h-1.5 w-20 rounded bg-slate-300" />
      <div className="mt-3 border-b-2 border-slate-200 pb-1.5">
        <div className="h-1 w-3/4 rounded bg-slate-200" />
      </div>
      <div className="mt-1.5 h-1 w-5/6 rounded bg-slate-100" />
      <div className="mt-1 h-1 w-4/6 rounded bg-slate-100" />
      <div className="ml-auto mt-3 h-2 w-14 rounded bg-slate-900" />
    </div>
  );
}

function BoldMock() {
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-3.5 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-5 w-5 rounded-md bg-white/95" />
            <div className="mt-1.5 h-1.5 w-16 rounded bg-white/90" />
            <div className="mt-1 h-1 w-12 rounded bg-white/50" />
          </div>
          <div className="flex flex-col items-end">
            <div className="h-3 w-14 rounded bg-white/30" />
            <div className="mt-1.5 h-1.5 w-9 rounded bg-white/90" />
          </div>
        </div>
      </div>
      <div className="p-3.5 pt-2.5">
        <div className="h-2 rounded bg-indigo-600" />
        <div className="mt-1.5 h-1 w-5/6 rounded bg-slate-100" />
        <div className="mt-1 h-1 w-4/6 rounded bg-slate-100" />
        <div className="ml-auto mt-2.5 h-2 w-14 rounded bg-indigo-600" />
      </div>
    </div>
  );
}

const STYLES = [
  { name: "Classic", chip: "Free",  chipCls: "bg-emerald-50 text-emerald-600 border-emerald-200", desc: "Colour accents and a clean accent stripe — the signature look.", Mock: ClassicMock },
  { name: "Minimal", chip: "✦ Pro", chipCls: "bg-violet-50 text-violet-600 border-violet-200",   desc: "Understated black & white. Lets serious work speak quietly.",    Mock: MinimalMock },
  { name: "Bold",    chip: "✦ Pro", chipCls: "bg-violet-50 text-violet-600 border-violet-200",   desc: "A full-colour header band that makes your brand unmissable.",   Mock: BoldMock },
];

export default function TemplateStyleCards({ showCta = false }: { showCta?: boolean }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {STYLES.map(({ name, chip, chipCls, desc, Mock }) => (
          <div key={name}>
            <Mock />
            <div className="mt-2.5 flex items-center justify-between px-1">
              <p className="text-[14px] font-bold text-slate-900">{name}</p>
              <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${chipCls}`}>{chip}</span>
            </div>
            <p className="mt-1 px-1 text-[12.5px] leading-relaxed text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
      {showCta && (
        <p className="mt-5 text-center text-[13.5px] text-slate-500">
          Every template works with your logo, colours, tax and currency.{" "}
          <Link href="/" className="font-semibold text-indigo-600 hover:text-indigo-700">Try the generator free</Link>
          {" "}or{" "}
          <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-700">see Pro pricing</Link>.
        </p>
      )}
    </div>
  );
}
