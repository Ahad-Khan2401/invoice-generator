import type { Metadata } from "next";
import { PageShell, PageHero, CTAButton } from "@/components/ui";
import AdSlot from "@/components/AdSlot";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "How to Create a Free Invoice Online",
  description:
    "Learn how to create and download a free professional PDF invoice, receipt, or quotation in 3 simple steps with PDF Bill Builder. No account needed.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  { num: "1", title: "Enter Your Details",     desc: "Add your business and client details, upload your logo, and pick a brand colour. Choose invoice, receipt, or quotation.", accent: "from-indigo-600 to-indigo-500" },
  { num: "2", title: "Add Items & Services",   desc: "List your work with quantity and rate. Subtotal, tax, and total calculate automatically as you type.", accent: "from-violet-600 to-violet-500" },
  { num: "3", title: "Download Your PDF",      desc: "Click Download PDF for a clean, print-ready document — or print it directly. Ready to send in seconds.", accent: "from-emerald-600 to-emerald-500" },
];

const faqs = [
  { q: "Is PDF Bill Builder really free?",   a: "Yes. Creating and downloading invoices, receipts, quotations and estimates is free with no limits, no watermark and no card. An optional Pro plan adds premium templates and unlimited saved history, but you never need it to download a PDF." },
  { q: "Do I need to create an account?",        a: "No. Just open the page and start creating. Zero signup required." },
  { q: "Is my data saved anywhere?",             a: "As a guest, no. Everything is processed in your browser and nothing is uploaded. If you sign in (free), documents you download can be saved to your dashboard so you can re-open, duplicate and track them — and you can delete them whenever you like." },
  { q: "Can I use this for my small business?",  a: "Absolutely — it's built for freelancers, consultants, and small business owners." },
  { q: "Which currencies are supported?",        a: "18 currencies: USD, EUR, GBP, INR, PKR, CAD, AUD, NZD, SGD, AED, ZAR, CHF, SEK, JPY, NGN, KES, MYR and PHP — with the correct symbol and thousands separators on the PDF." },
  { q: "Can I add tax to my invoice?",           a: "Yes. Enter your tax percentage and choose whether it is added on top of your prices or already included in them. You can label it VAT, GST, HST, sales tax or your own term." },
  { q: "Can I make a long invoice with many items?", a: "Yes. The PDF flows across as many pages as needed, breaks cleanly between line items, and numbers every page. You can choose A4 or US Letter." },
];

export default function HowItWorks() {
  return (
    <PageShell>
      <PageHero
        badge="Guide"
        title="How to Create a Free Invoice"
        subtitle="Generate a professional PDF invoice, receipt, quotation or estimate in under 2 minutes — completely free, no account needed."
      />

      {/* Steps */}
      <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map(s => (
          <div key={s.num} className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <span className="absolute right-5 top-3 select-none text-[56px] font-black leading-none text-slate-50">{s.num}</span>
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-lg font-black text-white shadow-sm`}>
              {s.num}
            </div>
            <h2 className="mb-2 text-[16px] font-bold text-slate-900">{s.title}</h2>
            <p className="text-[13.5px] leading-relaxed text-slate-500">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Ad — between steps and FAQ */}
      <div className="mb-14">
        <AdSlot slot={SITE.adSlots.howItWorks} />
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900">Frequently Asked Questions</h2>
          <p className="text-[14px] text-slate-500">Everything you need to know about PDF Bill Builder.</p>
        </div>
        <div className="space-y-3">
          {faqs.map(f => (
            <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-black text-indigo-600">Q</span>
                <div>
                  <h3 className="mb-1.5 text-[14.5px] font-bold text-slate-900">{f.q}</h3>
                  <p className="text-[13.5px] leading-relaxed text-slate-500">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <CTAButton href="/">Create Your Invoice Now</CTAButton>
      </div>
    </PageShell>
  );
}
