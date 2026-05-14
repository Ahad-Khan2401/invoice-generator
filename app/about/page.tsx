import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About InvoiceQuick — Free Invoice Generator",
  description:
    "InvoiceQuick is a free, privacy-first invoice generator built for freelancers, consultants, and small businesses. No signup. No data storage. Just fast invoices.",
};

const stats = [
  { label: "Free Forever",    value: "100%"    },
  { label: "Data Stored",     value: "0 bytes" },
  { label: "Signup Required", value: "None"    },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

        {/* Hero */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            About Us
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            About InvoiceQuick
          </h1>
          <p className="text-slate-500 text-[16px] max-w-xl mx-auto leading-relaxed">
            Built for the millions of freelancers who just need a simple, fast, and completely free invoice.
          </p>
        </div>

        {/* Story card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-10 mb-10">
          <div className="space-y-5 text-slate-500 leading-relaxed">
            <p className="text-[15px]">
              <strong className="text-slate-900 font-bold">InvoiceQuick</strong> was created with one goal
              in mind: give every freelancer, consultant, and small business owner a dead-simple way to
              create professional invoices without paying for bloated software or creating yet another
              online account.
            </p>
            <p className="text-[15px]">
              Most invoice tools are too complicated, too expensive, or they store your sensitive
              client data on their servers. InvoiceQuick is different. Everything happens
              entirely in your browser. No data is ever sent to any server. Your information stays yours.
            </p>
            <p className="text-[15px]">
              We support multiple currencies, line-item invoicing, tax calculation, and instant PDF
              download. Everything you need to get paid faster, wrapped in a clean interface.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 text-center hover:shadow-md transition-all">
              <p className="text-4xl font-black text-indigo-600 mb-1">{s.value}</p>
              <p className="text-[13px] text-slate-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-[15px] font-bold text-slate-900 mb-1.5">Privacy First</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              Your data never leaves your browser. Nothing is sent to our servers, ever.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h3 className="text-[15px] font-bold text-slate-900 mb-1.5">Lightning Fast</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              No loading screens, no bloated UI. Just open the page and start invoicing.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
            </div>
            <h3 className="text-[15px] font-bold text-slate-900 mb-1.5">Built to Last</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              No accounts, no subscriptions. InvoiceQuick will always be free, forever.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
          >
            Start Creating Invoices
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
