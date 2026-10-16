import Link from "next/link";
import Specimen from "@/components/Specimen";
import { DOC_SPECIMENS } from "@/lib/specimens";
import { PLANS, priceLabel } from "@/lib/plans";
import { TOOLS } from "@/lib/tools";
import { LANDING } from "@/lib/landing";
import { POST_LIST } from "@/lib/posts";

/* Server-rendered homepage sections below the tool. No icon-card grids:
   the four documents are shown as the real thing, the steps are a ruled list,
   the benefits are plain statements, and the Pro pitch shows the premium
   templates themselves. */

const STEPS = [
  { t: "Choose what you are making", d: "Invoice, receipt, quotation or estimate. The labels, the numbering and the default wording follow your choice." },
  { t: "Fill in the details", d: "Your business, the client, the line items, tax and any discount. Your own details are remembered on this device for next time." },
  { t: "Check the live preview", d: "The live preview is the exact document you will download. Change the template, colour, logo position or paper size whenever you like." },
  { t: "Download the PDF", d: "A clean PDF in A4 or US Letter, with page numbers if it runs long. No watermark, and you do not need an account." },
];

const STATEMENTS = [
  { t: "Your numbers stay with you.", d: "The PDF is built in your browser. Nothing you type is uploaded unless you sign in and choose to save a document." },
  { t: "Long invoices break cleanly.", d: "Rows are never cut in half across a page, and every page is numbered." },
  { t: "Tax is shown the way your client expects.", d: "Added on top or already included, labelled VAT, GST, sales tax or your own word." },
  { t: "It works on a phone.", d: "The form reflows for small screens, so you can invoice from a job site and not only from a desk." },
  { t: "Eighteen currencies.", d: "Correct symbols and thousands separators, from US dollars to Pakistani rupees." },
  { t: "Nothing is locked that you need.", d: "Pro adds premium templates and saved history. It never takes away what free does today." },
];

const FEATURED_LANDING = ["freelancer-invoice", "contractor-invoice", "photographer-invoice", "plumber-invoice", "invoice-generator-uk", "invoice-generator-canada"];

export default function HomeSections() {
  const guides = POST_LIST.slice(0, 6);

  return (
    <>
      {/* ── The four documents, as the real thing ── */}
      <section className="home-section" aria-labelledby="doc-types-h">
        <div className="home-inner">
          <div className="home-head">
            <h2 id="doc-types-h" className="home-h2">Four documents, one generator</h2>
            <p className="home-lead">These are real output from the generator, not illustrations. Each one opens with the right fields, labels and numbering.</p>
          </div>
          <ul className="home-specimens">
            {DOC_SPECIMENS.map(({ kind, title, blurb, href }, i) => (
              <li key={kind} className="home-specimen" style={{ ["--lift" as string]: i % 2 ? "28px" : "0px" }}>
                <Link href={href} className="home-specimen__link">
                  <Specimen kind={kind} stamp={kind === "receipt" ? "Paid" : undefined} />
                  <span className="home-specimen__title">{title}</span>
                  <span className="home-specimen__blurb">{blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How it works: a real sequence, so numbered ── */}
      <section className="home-section home-section--rule" aria-labelledby="how-h">
        <div className="home-inner home-split">
          <div className="home-head home-split__head">
            <h2 id="how-h" className="home-h2">From a blank form to a finished PDF in about two minutes</h2>
            <p className="home-lead">No account, no install. If you get stuck, read <Link href="/how-it-works" className="home-link">the walkthrough</Link> or the guide on <Link href="/blog/how-to-make-an-invoice" className="home-link">how to make an invoice</Link>.</p>
          </div>
          <ol className="home-steps">
            {STEPS.map((s, i) => (
              <li key={s.t} className="home-steps__item">
                <span className="home-steps__n" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="home-steps__t">{s.t}</h3>
                  <p className="home-steps__d">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Plain statements ── */}
      <section className="home-section home-section--rule" aria-labelledby="why-h">
        <div className="home-inner">
          <div className="home-head">
            <h2 id="why-h" className="home-h2">Free tools often mean watermarks, caps, or your client list on someone else&apos;s server</h2>
          </div>
          <dl className="home-statements">
            {STATEMENTS.map((s) => (
              <div key={s.t} className="home-statements__row">
                <dt>{s.t}</dt>
                <dd>{s.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Keep going: plain lists of links ── */}
      <section className="home-section home-section--rule" aria-labelledby="more-h">
        <div className="home-inner">
          <div className="home-head">
            <h2 id="more-h" className="home-h2">Templates, calculators and guides</h2>
            <p className="home-lead">Everything around the invoice: pricing the work, charging tax correctly, and getting paid on time.</p>
          </div>
          <div className="home-lists">
            <nav aria-label="Templates by profession and country">
              <h3 className="home-lists__h">Templates</h3>
              <ul>
                {FEATURED_LANDING.filter((s) => LANDING[s]).map((s) => (
                  <li key={s}><Link href={`/${s}`}>{LANDING[s].h1.replace(/^Free /, "")}</Link></li>
                ))}
                <li><Link href="/templates" className="home-lists__all">All templates →</Link></li>
              </ul>
            </nav>
            <nav aria-label="Calculators">
              <h3 className="home-lists__h">Calculators</h3>
              <ul>
                {TOOLS.map((t) => <li key={t.slug}><Link href={`/tools/${t.slug}`}>{t.name}</Link></li>)}
              </ul>
            </nav>
            <nav aria-label="Guides">
              <h3 className="home-lists__h">Guides</h3>
              <ul>
                {guides.map((p) => <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.title}</Link></li>)}
                <li><Link href="/blog" className="home-lists__all">All guides →</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* ── Pro: show the premium templates, do not describe them ── */}
      <section className="home-pro" aria-labelledby="pro-h">
        <div className="home-inner home-pro__inner">
          <div className="home-pro__copy">
            <h2 id="pro-h" className="home-pro__h">Invoice every month? Pro is {priceLabel(PLANS.pro)}.</h2>
            <p className="home-pro__p">
              The free generator stays free. Pro adds the Minimal and Bold templates you can see here, PDFs without the &ldquo;Generated by&rdquo; line,
              unlimited saved history with paid and unpaid tracking, an unlimited client directory, CSV export and an ad-free site. Thirty days, money back.
            </p>
            <div className="home-pro__cta">
              <Link href="/pricing" className="home-pro__btn">Compare plans</Link>
              <Link href="/templates" className="home-pro__link">See every template</Link>
            </div>
          </div>
          <div className="home-pro__sheets" aria-hidden="true">
            <Specimen kind="invoice" template="minimal" className="home-pro__sheet home-pro__sheet--a" />
            <Specimen kind="invoice" template="bold" className="home-pro__sheet home-pro__sheet--b" />
          </div>
        </div>
      </section>
    </>
  );
}
