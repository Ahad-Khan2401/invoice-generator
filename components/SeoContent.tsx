import Link from "next/link";
import { FAQS } from "@/lib/faq";
import AdSlot from "@/components/AdSlot";

/* ───────────────────────────────────────────────
   Semantic, keyword-rich content block + FAQ.
   - Server component (zero JS) → fast + fully indexable.
   - <details>/<summary> = native accordion, no JavaScript.
   - Visible FAQ text matches lib/faq.ts (and the FAQPage schema).
   `profession` lightly customises the copy on landing pages.
   The deep-dive sections render on the HOMEPAGE ONLY — landing pages
   already carry their own unique content (lib/landing-content.ts),
   so keeping the shared block short there avoids duplicate content.
─────────────────────────────────────────────── */
export default function SeoContent({ profession, midAdSlot }: { profession?: string; midAdSlot?: string }) {
  const who = profession ?? "freelancers, contractors, and small businesses";
  const isHome = !profession;

  return (
    <section
      style={{ background: "white", borderTop: "1px solid #f0f3fa", padding: "64px 24px 80px" }}
      aria-label="About this free invoice generator"
    >
      <article style={{ maxWidth: 820, margin: "0 auto" }} className="seo-prose">

        <h2>Free PDF Invoice Generator — Create Invoices Online in Seconds</h2>
        <p>
          PDF Bill Builder is a <strong>100% free invoice generator and bill maker</strong> that lets you create and
          download professional <strong>PDF invoices and bills</strong> in seconds — no signup, no watermark,
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
          {isHome && (
            <> New to invoicing? Our step-by-step guide on{" "}
            <Link href="/blog/how-to-make-an-invoice">how to make an invoice</Link> walks through
            every field, and the <Link href="/blog/invoice-vs-receipt-vs-quotation">invoice vs receipt
            vs quotation</Link> guide explains which document to send at each stage.</>
          )}
        </p>

        {isHome && (
          <>
            <h2>Why PDF Bill Builder Instead of Word, Excel, or Accounting Software?</h2>
            <p>
              Most people start invoicing in <strong>Word or Excel</strong> — and quickly hit the same
              problems. The layout shifts every time you add a line item, totals have to be checked by
              hand, currency and tax formatting is manual, and the result is saved as an editable file
              your client can accidentally (or deliberately) change. Exporting a clean, locked PDF takes
              extra steps every single time.
            </p>
            <p>
              At the other extreme, <strong>accounting suites</strong> like QuickBooks, FreshBooks, or Xero are
              excellent for bookkeeping — but they cost $15–30 per month, require an account, store your
              client data in the cloud, and bury a simple task under dashboards and setup wizards. If all
              you need this week is one professional invoice, that is a lot of cost and friction.
            </p>
            <p>
              PDF Bill Builder sits exactly in the middle: the <strong>polish of paid software with the
              simplicity of a template</strong>. Totals, tax, and currency are calculated for you; the layout
              auto-fits to a single A4 page no matter how many items you add; and the download is a clean,
              uneditable PDF with your logo and brand colour. There is nothing to install, no trial that
              expires, and no invoice limit.
            </p>

            <h2>Your Data Stays in Your Browser — Real Privacy, Not a Promise</h2>
            <p>
              Invoices contain some of your most sensitive business information: who your clients are,
              what you charge them, and how much you earn. Most online invoice tools quietly keep all of
              that on their servers. PDF Bill Builder takes a different approach — the entire generator,
              including the PDF creation itself, runs <strong>locally in your browser</strong>. Your client names,
              rates, and totals are never transmitted, logged, or analysed. Close the tab and the data is
              gone. Only if you choose to sign in and save an invoice to your dashboard is that single
              document stored — and that is always your decision, never the default.
            </p>

            <h2>More Free Tools for Getting Paid</h2>
            <p>
              Invoicing is only half the job — pricing the work and chasing payment is the other half.
              Alongside the generator, we maintain a set of <Link href="/tools">free calculators</Link>{" "}
              built for the same audience:
            </p>
            <ul>
              <li><Link href="/tools/late-fee-calculator">Late fee calculator</Link> — work out what to add when an invoice goes overdue.</li>
              <li><Link href="/tools/freelance-hourly-rate-calculator">Freelance hourly rate calculator</Link> — turn your target income into an hourly rate.</li>
              <li><Link href="/tools/sales-tax-calculator">Sales tax / VAT / GST calculator</Link> — add or extract tax from any amount.</li>
              <li><Link href="/tools/discount-calculator">Discount calculator</Link> — price a discount without destroying your margin.</li>
              <li><Link href="/tools/profit-margin-calculator">Profit margin calculator</Link> — check what you actually keep on every job.</li>
            </ul>
            <p>
              And if you bill in a specific country or trade, there is a dedicated template page tuned to
              your situation — from the <Link href="/invoice-generator-usa">USA</Link>,{" "}
              <Link href="/invoice-generator-uk">UK</Link>, <Link href="/invoice-generator-canada">Canada</Link>,{" "}
              <Link href="/invoice-generator-australia">Australia</Link>, <Link href="/invoice-generator-india">India</Link>,
              and <Link href="/invoice-generator-pakistan">Pakistan</Link>, to professions like{" "}
              <Link href="/freelancer-invoice">freelancing</Link>, <Link href="/contractor-invoice">contracting</Link>,{" "}
              <Link href="/photographer-invoice">photography</Link>, and <Link href="/cleaning-services-invoice">cleaning services</Link>.
            </p>
          </>
        )}

        <h2>Invoices, Receipts &amp; Quotations — One Free Tool</h2>
        <p>
          Most free tools only make invoices. PDF Bill Builder also creates <strong>payment receipts</strong>{" "}
          and <strong>price quotations</strong>, so you can manage the full client cycle — quote the
          job, invoice the work, and confirm the payment — with a single, consistent design. Switch
          document type with one click and your details carry over instantly.
        </p>

        <h2>Free Bill Generator &amp; Bill Maker — Make a Bill Online</h2>
        <p>
          PDF Bill Builder also works as a free <strong>bill generator</strong> and <strong>bill maker</strong>.
          Whether you call it a bill or an invoice, the steps are the same — add your line items, apply tax,
          and download a clean PDF <strong>bill format</strong> in seconds. It&apos;s perfect for shops, service
          providers, landlords, and anyone who needs to <strong>create a bill online</strong> for free without
          installing any software.
        </p>

        {/* In-article ad — surrounded by content on both sides (policy-safe, high viewability) */}
        {midAdSlot && (
          <div style={{ margin: "8px 0" }}>
            <AdSlot slot={midAdSlot} />
          </div>
        )}

        <h2>Why Choose PDF Bill Builder?</h2>
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
