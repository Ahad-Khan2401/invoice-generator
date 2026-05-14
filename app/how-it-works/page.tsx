import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Create a Free Invoice Online — InvoiceQuick",
  description:
    "Learn how to create and download a free professional PDF invoice in 3 simple steps using InvoiceQuick. No account needed.",
};

const steps = [
  {
    num: "01", title: "Enter Your Details",
    desc: "Fill in your business name, address, and contact info. Then add your client details in the Bill To section.",
    accent: "#4f46e5",
  },
  {
    num: "02", title: "Add Items & Services",
    desc: "List all work done. Add a description, quantity, and rate for each item. Subtotal and total update automatically.",
    accent: "#7c3aed",
  },
  {
    num: "03", title: "Download Your PDF",
    desc: "Click Download PDF and get a clean, professional invoice instantly. Print it or email it directly to your client.",
    accent: "#059669",
  },
];

const faqs = [
  { q: "Is InvoiceQuick really free?",         a: "Yes, 100% free. No hidden fees, no subscription, no credit card required. Ever." },
  { q: "Do I need to create an account?",       a: "No. Just open the page and start creating your invoice. Zero signup required." },
  { q: "Is my data saved anywhere?",            a: "No. All data is processed entirely in your browser. Nothing is sent to our servers." },
  { q: "Can I use this for my small business?", a: "Absolutely. InvoiceQuick is built for freelancers, consultants, and small business owners." },
  { q: "Which currencies are supported?",       a: "USD, EUR, GBP, INR, PKR, CAD, AUD and more being added regularly." },
  { q: "Can I add tax to my invoice?",          a: "Yes. Enter your tax percentage and it will be automatically calculated on the invoice." },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

        {/* Hero */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Guide
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How to Create a Free Invoice
          </h1>
          <p className="text-slate-500 text-[16px] max-w-md mx-auto leading-relaxed">
            Generate a professional PDF invoice in under 2 minutes. Completely free, no account needed.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {steps.map((s, i) => (
            <div key={s.num} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden">
              <span className="absolute top-4 right-5 text-[52px] font-black text-slate-50 select-none leading-none">
                {s.num}
              </span>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm" style={{ backgroundColor: s.accent }}>
                <span className="text-white font-black text-lg">{i + 1}</span>
              </div>
              <h2 className="text-[16px] font-bold text-slate-900 mb-2">{s.title}</h2>
              <p className="text-[13.5px] text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-[14px]">Everything you need to know about InvoiceQuick.</p>
          </div>
          <div className="space-y-3">
            {faqs.map(f => (
              <div key={f.q} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:border-indigo-100 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-500 text-[10px] font-black">Q</span>
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-bold text-slate-900 mb-1.5">{f.q}</h3>
                    <p className="text-[13.5px] text-slate-500 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
          >
            Create Your Invoice Now
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
