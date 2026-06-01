import { FAQS } from "@/lib/faq";
import AdSlot from "@/components/AdSlot";

/* ───────────────────────────────────────────────
   Semantic, keyword-rich content block + FAQ.
   - Server component (zero JS) → fast + fully indexable.
   - <details>/<summary> = native accordion, no JavaScript.
   - Visible FAQ text matches lib/faq.ts (and the FAQPage schema).
   `profession` lightly customises the copy on landing pages.
─────────────────────────────────────────────── */
export default function SeoContent({ profession, midAdSlot }: { profession?: string; midAdSlot?: string }) {
  const who = profession ?? "freelancers, contractors, and small businesses";

  return (
    <section
      style={{ background: "white", borderTop: "1px solid #f0f3fa", padding: "64px 24px 80px" }}
      aria-label="About this free invoice generator"
    >
      <article style={{ maxWidth: 820, margin: "0 auto" }} className="seo-prose">

        <h2>Free PDF Invoice Generator — Create Invoices Online in Seconds</h2>
        <p>
          PDF Invoice Builder is a <strong>100% free invoice generator</strong> that lets you create and
          download professional <strong>PDF invoices</strong> in seconds — no signup, no watermark,
          and no hidden fees. Whether you are sending your first invoice or billing repeat clients,
          our free invoice maker turns your details into a clean, print-ready PDF that helps you get
          paid faster. Everything runs inside your browser, so your financial data is never uploaded
          or stored — your client information stays completely private.
        </p>

        <h2>Invoice Template for Freelancers, Contractors &amp; Small Businesses</h2>
        <p>
          A great <strong>invoice template</strong> should be simple, professional, and flexible.
          Our free template is built for {who} and almost every profession:
        </p>
        <ul>
          <li><strong>Freelancers</strong> — designers, writers, developers, and photographers billing by project or hour.</li>
          <li><strong>Contractors</strong> — builders, electricians, and tradespeople itemising labour and materials.</li>
          <li><strong>Consultants &amp; agencies</strong> — branded invoices with your own logo and colours.</li>
          <li><strong>Small businesses &amp; online sellers</strong> — invoices, receipts, and quotations in one place.</li>
        </ul>
        <p>
          Add your brand logo, pick an accent colour, choose your currency, and apply tax — inclusive
          or exclusive — to match exactly how you bill.
        </p>

        <h3>How to Make an Invoice in 4 Easy Steps</h3>
        <ol>
          <li>Choose your document type — <strong>Invoice, Receipt, or Quotation</strong>.</li>
          <li>Add your business and client details, plus your logo.</li>
          <li>List your items with quantity and rate — totals calculate automatically.</li>
          <li>Click <strong>Download PDF</strong> or <strong>Print</strong>. Your invoice is ready to send.</li>
        </ol>
        <p>
          No accounting software, no fiddly Word or Excel templates, and no learning curve — just a
          fast, reliable way to <strong>make an invoice online</strong>.
        </p>

        <h2>Invoices, Receipts &amp; Quotations — One Free Tool</h2>
        <p>
          Most free tools only make invoices. PDF Invoice Builder also creates <strong>payment receipts</strong>{" "}
          and <strong>price quotations</strong>, so you can manage the full client cycle — quote the
          job, invoice the work, and confirm the payment — with a single, consistent design. Switch
          document type with one click and your details carry over instantly.
        </p>

        {/* In-article ad — surrounded by content on both sides (policy-safe, high viewability) */}
        {midAdSlot && (
          <div style={{ margin: "8px 0" }}>
            <AdSlot slot={midAdSlot} />
          </div>
        )}

        <h2>Why Choose PDF Invoice Builder?</h2>
        <ul>
          <li>Always free, with unlimited invoices and no account.</li>
          <li>Auto-fits to a single A4 page, even with many line items.</li>
          <li>Tax-inclusive or tax-exclusive billing, clearly labelled.</li>
          <li>Multi-currency support for international clients.</li>
          <li>Private by design — nothing ever leaves your browser.</li>
        </ul>

        <h2 id="faq">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <details key={i} className="faq-item" {...(i === 0 ? { open: true } : {})}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </article>
    </section>
  );
}
