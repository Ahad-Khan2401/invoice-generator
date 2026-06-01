import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Card, BackToTool } from "@/components/ui";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms for using ${SITE.name}, a free online invoice, receipt, and quotation generator.`,
  alternates: { canonical: "/terms" },
};

const UPDATED = "June 1, 2026";

export default function Terms() {
  return (
    <PageShell width="3xl">
      <PageHero badge="Legal" title="Terms of Service" subtitle={`Last updated: ${UPDATED}`} />

      <Card className="space-y-7">
        <Section title="1. Acceptance of terms">
          <p>By accessing or using {SITE.name} (the &quot;Service&quot;), you agree to these Terms of Service. If you do not agree, please do not use the Service.</p>
        </Section>

        <Section title="2. What the Service does">
          <p>{SITE.name} is a free, browser-based tool to create invoices, receipts, and quotations and download them as PDF files. No account is required, and your document data is processed entirely in your browser.</p>
        </Section>

        <Section title="3. Free service, provided “as is”">
          <p>The Service is provided free of charge on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind. We do not guarantee it will be uninterrupted, error-free, or that generated documents meet every legal or tax requirement in your jurisdiction.</p>
        </Section>

        <Section title="4. Your responsibility">
          <p>You are solely responsible for the accuracy of the information you enter and for ensuring your documents comply with the laws and tax rules that apply to you. {SITE.name} does not provide legal, accounting, or tax advice.</p>
        </Section>

        <Section title="5. Acceptable use">
          <p>You agree not to use the Service to:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Create fraudulent, misleading, or unlawful documents.</li>
            <li>Infringe the intellectual property or rights of others.</li>
            <li>Attempt to disrupt, attack, or reverse-engineer the Service.</li>
          </ul>
        </Section>

        <Section title="6. Intellectual property">
          <p>The {SITE.name} name, design, and software are owned by us. The documents <em>you</em> create belong to <em>you</em> — we claim no ownership over your content.</p>
        </Section>

        <Section title="7. Advertising">
          <p>The Service is supported by third-party advertising (Google AdSense). Your use is also subject to our <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>.</p>
        </Section>

        <Section title="8. Limitation of liability">
          <p>To the maximum extent permitted by law, {SITE.name} and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the Service — including losses related to documents created with the tool.</p>
        </Section>

        <Section title="9. Changes to these terms">
          <p>We may update these Terms from time to time. Continued use after changes are posted constitutes acceptance of the updated Terms.</p>
        </Section>

        <Section title="10. Contact">
          <p>Questions? Email <a className="text-indigo-600 hover:underline" href="mailto:support@pdfinvoicebuilder.com">support@pdfinvoicebuilder.com</a>.</p>
        </Section>
      </Card>

      <BackToTool />
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-[17px] font-bold text-slate-900">{title}</h2>
      <div className="space-y-2 text-[14px] leading-relaxed text-slate-500">{children}</div>
    </section>
  );
}
