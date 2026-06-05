import type { Metadata } from "next";
import { Mail, MessageSquare, Clock, Globe } from "lucide-react";
import { SITE } from "@/lib/config";
import { PageShell, PageHero } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us — PDF Bill Builder",
  description: "Get in touch with the PDF Bill Builder team. We're here to help with any questions about our free invoice generator, billing issues, or feature requests.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell width="3xl">
      <PageHero
        badge="Contact"
        title="Get in touch"
        subtitle="Have a question, issue, or suggestion? We'd love to hear from you. We typically respond within 24 hours."
      />

      <div className="grid gap-6 sm:grid-cols-2 mb-10">
        {/* Email card */}
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
            <Mail size={22} className="text-indigo-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Email Us</h2>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            For support, billing questions, or general enquiries — email is the fastest way to reach us.
          </p>
          <a
            href="mailto:support@pdfbillbuilder.com"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-colors"
          >
            <Mail size={14} />
            support@pdfbillbuilder.com
          </a>
        </div>

        {/* Response time card */}
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
            <Clock size={22} className="text-emerald-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Response Time</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            We aim to respond to all emails within <strong className="text-slate-700">24 hours</strong> on business days.
            For urgent issues, please include "URGENT" in your subject line.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
            Support available Mon – Fri
          </div>
        </div>
      </div>

      {/* FAQ shortcut */}
      <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100">
            <MessageSquare size={22} className="text-indigo-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Looking for quick answers?</h2>
            <p className="text-sm text-slate-500">
              Most questions about creating invoices, downloading PDFs, taxes, and Pro features are answered in our guides.
            </p>
          </div>
          <a
            href="/how-it-works"
            className="shrink-0 rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            View guides →
          </a>
        </div>
      </div>

      {/* About the product */}
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <Globe size={22} className="text-slate-600" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">About PDF Bill Builder</h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-3">
          PDF Bill Builder is a free, browser-based invoice generator built for freelancers and small businesses worldwide.
          We serve users in the USA, Canada, UK, Australia, India, Pakistan, and beyond.
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-3">
          Our tool lets you create professional invoices, receipts, and quotations in seconds — no account needed, no data
          stored on our servers, 100% private.
        </p>
        <p className="text-sm text-slate-500 leading-relaxed">
          For business enquiries, partnerships, or press: <a href="mailto:support@pdfbillbuilder.com" className="text-indigo-600 font-medium hover:underline">support@pdfbillbuilder.com</a>
        </p>
      </div>

      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Contact", url: `${SITE.url}/contact` },
      ])} />

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact PDF Bill Builder",
        "url": `${SITE.url}/contact`,
        "description": "Contact the PDF Bill Builder support team for help with invoices, billing, or feature requests.",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support@pdfbillbuilder.com",
          "contactType": "customer support",
          "availableLanguage": ["English"],
          "areaServed": ["US", "GB", "CA", "AU", "IN", "PK"],
        },
      }} />
    </PageShell>
  );
}
