import type { Metadata } from "next";
import { PageShell, PageHero, Card, CTAButton } from "@/components/ui";
import AdSlot from "@/components/AdSlot";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "PDF Bill Builder is a free, privacy-first generator for invoices, receipts, and quotations — built for freelancers, consultants, and small businesses. No signup, no data storage.",
  alternates: { canonical: "/about" },
};

const stats = [
  { label: "Free Forever",    value: "100%"    },
  { label: "Data Stored",     value: "0 bytes" },
  { label: "Signup Required", value: "None"    },
];

const values = [
  { icon: "🔒", title: "Privacy First",  desc: "Your data never leaves your browser. Nothing is sent to our servers, ever.", bg: "bg-indigo-50" },
  { icon: "⚡", title: "Lightning Fast", desc: "No loading screens, no bloat. Open the page and start invoicing instantly.", bg: "bg-emerald-50" },
  { icon: "♾️", title: "Built to Last",  desc: "No accounts, no subscriptions. PDF Bill Builder is free, forever.", bg: "bg-amber-50" },
];

export default function About() {
  return (
    <PageShell>
      <PageHero
        badge="About Us"
        title="About PDF Bill Builder"
        subtitle="Built for the millions of freelancers and small businesses who just need a simple, fast, and completely free way to get paid."
      />

      {/* Story */}
      <Card className="mb-6">
        <div className="space-y-5 text-[15px] leading-relaxed text-slate-500">
          <p>
            <strong className="font-bold text-slate-900">{SITE.name}</strong> was created with one goal:
            give every freelancer, consultant, and small business owner a dead-simple way to create
            professional documents without paying for bloated software or making yet another account.
          </p>
          <p>
            The idea came from watching real freelancers invoice their clients. Most either wrestled
            with a Word or Excel template that broke every time a line was added, or signed up for
            accounting software costing $15–30 a month just to send two invoices. For someone billing
            a $50 job, that maths never works. A simple invoice should take two minutes and cost nothing.
          </p>
          <p>
            Most invoice tools are also quietly collecting your data — your client list, your rates,
            your revenue — and storing it on their servers. We&apos;re different by design: the generator
            runs entirely in your browser. Your numbers are never uploaded, never analysed, and never
            sold. Unless you choose to sign in and save an invoice to your dashboard, nothing you type
            ever leaves your device.
          </p>
          <p>
            Today {SITE.name} creates invoices, receipts, and quotations with multi-currency support,
            inclusive or exclusive tax, your own logo and brand colour, and instant PDF download — plus
            free calculators for late fees, hourly rates, sales tax, discounts, and profit margins.
            Everything you need to get paid faster, in one clean interface.
          </p>
        </div>
      </Card>

      {/* Founder */}
      <Card className="mb-6">
        <h2 className="mb-3 text-[19px] font-extrabold tracking-tight text-slate-900">Who&apos;s behind this?</h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-slate-500">
          <p>
            {SITE.name} is built and maintained by <strong className="font-bold text-slate-900">{SITE.author}</strong>,
            an independent maker based in Karachi, Pakistan. Abdul works with freelancers and small
            online businesses every day, and built this tool after seeing how many of them still send
            unbranded, hard-to-read invoices — or pay for heavyweight software they barely use.
          </p>
          <p>
            Every template, guide, and calculator on this site is written and reviewed by him, with one
            test: <em>would a real freelancer actually use this to get paid?</em> Spot a mistake or have
            a suggestion? Email{" "}
            <a href="mailto:support@pdfbillbuilder.com" className="font-semibold text-indigo-600 hover:text-indigo-700">
              support@pdfbillbuilder.com
            </a>{" "}
            — he reads every message.
          </p>
        </div>
      </Card>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-sm">
            <p className="mb-1 text-4xl font-black text-indigo-600">{s.value}</p>
            <p className="text-[13px] font-medium text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {values.map(v => (
          <div key={v.title} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${v.bg}`}>{v.icon}</div>
            <h3 className="mb-1.5 text-[15px] font-bold text-slate-900">{v.title}</h3>
            <p className="text-[13px] leading-relaxed text-slate-500">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Ad — after content, before CTA */}
      <div className="mb-10">
        <AdSlot slot={SITE.adSlots.about} />
      </div>

      <div className="text-center">
        <CTAButton href="/">Start Creating Documents</CTAButton>
      </div>
    </PageShell>
  );
}
