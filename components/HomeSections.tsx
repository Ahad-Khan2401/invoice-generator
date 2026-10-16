import Link from "next/link";
import { FileText, Receipt, ClipboardList, Calculator, Lock, Layers, Percent, Globe2, Smartphone, FileCheck2 } from "lucide-react";
import { PLANS, priceLabel } from "@/lib/plans";

/* Server-rendered homepage sections below the tool:
   document types → how it works → benefits → tools/templates/guides → polite Pro path. */

const DOC_TYPES = [
  { Icon: FileText,      title: "Invoice",   href: "/",                    text: "Bill clients for goods or services with line items, tax, discounts and payment terms." },
  { Icon: Receipt,       title: "Receipt",   href: "/receipt-generator",   text: "Confirm a payment you've received, with the amount, date and method." },
  { Icon: ClipboardList, title: "Quotation", href: "/quotation-generator", text: "Send a formal price proposal with a validity date, then convert it to an invoice in one click." },
  { Icon: Calculator,    title: "Estimate",  href: "/estimate-generator",  text: "Give a client an approximate cost before the work is scoped in detail." },
];

const STEPS = [
  { t: "Pick the document type", d: "Invoice, receipt, quotation or estimate — the form and numbering adapt automatically." },
  { t: "Fill in the details", d: "Your business, the client, line items, tax and discount. Your own details are remembered on this device for next time." },
  { t: "Check the live preview", d: "The preview is the exact document you'll download. Switch templates, colours or paper size any time." },
  { t: "Download the PDF", d: "A clean, print-ready PDF — A4 or US Letter, multi-page with page numbers, no watermark." },
];

const BENEFITS = [
  { Icon: Lock,       t: "Private by design",     d: "The PDF is generated in your browser. Nothing you type is uploaded unless you sign in and choose to save it." },
  { Icon: Layers,     t: "Multi-page, clean breaks", d: "Long item lists flow across pages without a row being cut in half, with page numbers added." },
  { Icon: Percent,    t: "Tax done right",         d: "Add tax on top or treat prices as tax-inclusive; the PDF labels it as VAT, GST, sales tax or your own term." },
  { Icon: Globe2,     t: "18 currencies",          d: "USD, EUR, GBP, INR, PKR, CAD, AUD and more, with correct symbols and thousands separators." },
  { Icon: Smartphone, t: "Works on your phone",    d: "The form reflows for small screens so you can invoice from a job site, not just a desk." },
  { Icon: FileCheck2, t: "Save, duplicate, track", d: "Sign in free to keep your last documents, duplicate them with the next number, and mark them paid." },
];

export default function HomeSections() {
  return (
    <>
      <section className="home-section home-section--alt" aria-labelledby="doc-types-h">
        <div className="home-inner">
          <h2 id="doc-types-h" className="home-h2">One generator, four documents</h2>
          <p className="home-lead">Each document type opens with the right fields, labels and numbering. Switch between them without re-typing anything.</p>
          <div className="home-grid">
            {DOC_TYPES.map(({ Icon, title, href, text }) => (
              <Link key={title} href={href} className="home-card home-card--link">
                <Icon size={22} className="text-indigo-600" aria-hidden="true" />
                <h3>{title} generator</h3>
                <p>{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="how-h">
        <div className="home-inner">
          <h2 id="how-h" className="home-h2">How it works</h2>
          <p className="home-lead">From blank form to finished PDF in about two minutes, with no account.</p>
          <ol className="home-grid" style={{ listStyle: "none", padding: 0 }}>
            {STEPS.map((s, i) => (
              <li key={s.t} className="home-card">
                <div className="home-step">
                  <span className="home-step__n" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 20, fontSize: 14, color: "#475569" }}>
            Prefer a walkthrough? Read <Link href="/how-it-works" className="font-semibold text-indigo-700 underline">how it works</Link> or the guide on <Link href="/blog/how-to-make-an-invoice" className="font-semibold text-indigo-700 underline">how to make an invoice</Link>.
          </p>
        </div>
      </section>

      <section className="home-section home-section--alt" aria-labelledby="why-h">
        <div className="home-inner">
          <h2 id="why-h" className="home-h2">Why people use PDF Bill Builder</h2>
          <p className="home-lead">Free tools usually mean watermarks, caps, or your client list on someone else&apos;s server. This one doesn&apos;t.</p>
          <div className="home-grid">
            {BENEFITS.map(({ Icon, t, d }) => (
              <div key={t} className="home-card">
                <Icon size={22} className="text-indigo-600" aria-hidden="true" />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="more-h">
        <div className="home-inner">
          <h2 id="more-h" className="home-h2">Templates, calculators and guides</h2>
          <p className="home-lead">Everything around the invoice: pricing your work, charging tax correctly, and getting paid on time.</p>
          <div className="home-grid">
            <Link href="/templates" className="home-card home-card--link">
              <h3>Invoice templates by profession &amp; country</h3>
              <p>Freelancer, contractor, photographer, cleaning, plumber and more — plus US, UK, Canada, Australia, India and Pakistan versions that open with the right currency and tax wording.</p>
            </Link>
            <Link href="/tools" className="home-card home-card--link">
              <h3>Free calculators</h3>
              <p>VAT and GST calculators with country presets, sales tax, late payment fees, freelance hourly rate, discount and profit margin.</p>
            </Link>
            <Link href="/blog" className="home-card home-card--link">
              <h3>Invoicing guides</h3>
              <p>Invoice numbering, payment terms, invoice vs receipt vs quotation, country tax-invoice requirements, reminder e-mail templates and more.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section home-section--alt" aria-labelledby="pro-h">
        <div className="home-inner" style={{ textAlign: "center", maxWidth: 720 }}>
          <h2 id="pro-h" className="home-h2">Invoice every month? Pro is {priceLabel(PLANS.pro)}.</h2>
          <p className="home-lead" style={{ margin: "0 auto" }}>
            The free generator stays free. Pro adds premium templates, white-label PDFs without the &ldquo;Generated by&rdquo; line, unlimited saved history with paid/unpaid tracking, an unlimited client directory, CSV export and an ad-free site. 30-day money-back guarantee.
          </p>
          <div style={{ marginTop: 22, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/pricing" className="inline-flex items-center rounded-2xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700">Compare plans</Link>
            <Link href="/templates" className="inline-flex items-center rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 hover:border-indigo-300">See the PDF styles</Link>
          </div>
        </div>
      </section>
    </>
  );
}
