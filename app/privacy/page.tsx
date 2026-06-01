import type { Metadata } from "next";
import { PageShell, PageHero, Card, BackToTool } from "@/components/ui";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles your data. Your documents are generated entirely in your browser — we never upload or store your financial information.`,
  alternates: { canonical: "/privacy" },
};

const UPDATED = "June 1, 2026";

export default function Privacy() {
  return (
    <PageShell width="3xl">
      <PageHero badge="Legal" title="Privacy Policy" subtitle={`Last updated: ${UPDATED}`} />

      <Card className="space-y-7">
        <Section title="The short version">
          <p>
            {SITE.name} is built privacy-first. Your invoices, receipts, and quotations are created
            <strong className="text-slate-700"> entirely inside your browser</strong>. We never upload,
            transmit, or store the financial details you type into the tool. When you close the tab,
            that data is gone unless your own browser chose to remember it on your device.
          </p>
        </Section>

        <Section title="1. Information we do NOT collect">
          <p>
            We do not collect, see, or store any content you enter into the generator — including your
            business details, client details, line items, amounts, logos, or notes. None of it reaches
            our servers, because the tool runs locally in your browser.
          </p>
        </Section>

        <Section title="2. Information stored on your device">
          <p>
            To make repeat invoicing faster, the tool may save some of your inputs (such as your business
            name or last-used settings) in your browser&apos;s local storage. This stays on your own device,
            is never sent to us, and you can clear it any time by clearing your browser data.
          </p>
        </Section>

        <Section title="3. Cookies & advertising">
          <p>
            This site is supported by advertising. We use <strong className="text-slate-700">Google AdSense</strong> to
            display ads. Third-party vendors, including Google, use cookies to serve ads based on your prior
            visits to this and other websites.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Google&apos;s use of advertising cookies lets it and its partners serve ads based on your visits.</li>
            <li>Opt out of personalised advertising at <a className="text-indigo-600 hover:underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
            <li>Opt out of third-party vendor cookies at <a className="text-indigo-600 hover:underline" href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
          </ul>
          <p className="mt-3">
            More info:{" "}
            <a className="text-indigo-600 hover:underline" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              How Google uses information from sites that use its services
            </a>.
          </p>
        </Section>

        <Section title="4. Analytics">
          <p>
            We may use privacy-respecting, aggregate analytics to understand overall traffic. This never
            includes the contents of your documents.
          </p>
        </Section>

        <Section title="5. Children's privacy">
          <p>
            This service is intended for business use by adults and is not directed at children under 13.
            We do not knowingly collect personal information from children.
          </p>
        </Section>

        <Section title="6. Your choices">
          <p>
            You can disable cookies in your browser, opt out of personalised ads using the links above, and
            clear locally stored data any time. Because we don&apos;t hold your data, there is nothing for us
            to delete on our side.
          </p>
        </Section>

        <Section title="7. Changes to this policy">
          <p>We may update this policy from time to time. The &quot;Last updated&quot; date above reflects the current version.</p>
        </Section>

        <Section title="8. Contact">
          <p>
            Questions? Email{" "}
            <a className="text-indigo-600 hover:underline" href="mailto:support@pdfinvoicebuilder.com">support@pdfinvoicebuilder.com</a>.
          </p>
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
