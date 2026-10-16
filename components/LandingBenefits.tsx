import Link from "next/link";

/* Slim strip under the tool on the profession/country/document landing pages:
   a few plain facts, then links to the other document generators. */
const FACTS = [
  "Built in your browser. Nothing is uploaded unless you sign in to save.",
  "Multi-page PDFs break between rows and number every page, in A4 or US Letter.",
  "Tax added on top or included, labelled VAT, GST, sales tax or your own word.",
  "Eighteen currencies, and Classic, Minimal and Bold templates.",
];

export default function LandingBenefits() {
  return (
    <section className="home-section home-section--rule" aria-label="Key features" style={{ paddingTop: 40, paddingBottom: 40, background: "var(--paper-2)" }}>
      <div className="home-inner">
        <ul className="landing-facts">
          {FACTS.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <p className="landing-more">
          Need a different document? Try the{" "}
          <Link href="/receipt-generator" className="home-link">receipt generator</Link>,{" "}
          <Link href="/quotation-generator" className="home-link">quotation generator</Link> or{" "}
          <Link href="/estimate-generator" className="home-link">estimate generator</Link>, or browse{" "}
          <Link href="/templates" className="home-link">all templates</Link>.
        </p>
      </div>
    </section>
  );
}
