import Link from "next/link";
import { Lock, Layers, Percent, Globe2 } from "lucide-react";

/* Compact benefits strip for the 41 landing pages (replaces the old
   in-generator features grid). Server component, zero JS. */
const ITEMS = [
  { Icon: Lock,    t: "Private by design",       d: "Generated in your browser — nothing is uploaded unless you sign in to save." },
  { Icon: Layers,  t: "Multi-page PDFs",          d: "Long item lists break cleanly between rows, with page numbers. A4 or US Letter." },
  { Icon: Percent, t: "Tax inclusive or on top",  d: "Label it VAT, GST, sales tax or your own term; totals are rounded correctly." },
  { Icon: Globe2,  t: "18 currencies, 3 styles",  d: "Correct symbols and separators, plus Classic, Minimal and Bold templates." },
];

export default function LandingBenefits() {
  return (
    <section className="home-section home-section--alt" aria-label="Key features" style={{ padding: "48px 24px" }}>
      <div className="home-inner">
        <div className="home-grid" style={{ marginTop: 0 }}>
          {ITEMS.map(({ Icon, t, d }) => (
            <div key={t} className="home-card">
              <Icon size={20} className="text-indigo-600" aria-hidden="true" />
              <h3 style={{ fontSize: 15 }}>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 18, fontSize: 13.5, color: "#475569", textAlign: "center" }}>
          Need a different document? Try the <Link href="/receipt-generator" className="font-semibold text-indigo-700 underline">receipt generator</Link>,{" "}
          <Link href="/quotation-generator" className="font-semibold text-indigo-700 underline">quotation generator</Link> or{" "}
          <Link href="/estimate-generator" className="font-semibold text-indigo-700 underline">estimate generator</Link>, or browse <Link href="/templates" className="font-semibold text-indigo-700 underline">all templates</Link>.
        </p>
      </div>
    </section>
  );
}
