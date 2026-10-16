import Link from "next/link";
import Specimen from "@/components/Specimen";

/* The three PDF styles, shown as the real documents the generator produces
   (Classic is free; Minimal and Bold are Pro). Used on /pricing and /templates. */

const STYLES = [
  { key: "classic" as const, name: "Classic", tag: "Free",  pro: false, desc: "A thin colour stripe and tinted table header. The signature look." },
  { key: "minimal" as const, name: "Minimal", tag: "Pro",   pro: true,  desc: "Black on white with no decoration. Lets serious work speak quietly." },
  { key: "bold"    as const, name: "Bold",    tag: "Pro",   pro: true,  desc: "A full-colour header band that makes your brand hard to miss." },
];

export default function TemplateStyleCards({ showCta = false }: { showCta?: boolean }) {
  return (
    <div>
      <ul className="tpl-gallery">
        {STYLES.map(({ key, name, tag, pro, desc }) => (
          <li key={key}>
            <Specimen kind="invoice" template={key} />
            <div className="tpl-gallery__name">
              <h3 className="tpl-gallery__title">{name}</h3>
              <span className={`tpl-gallery__tag${pro ? " tpl-gallery__tag--pro" : ""}`}>{tag}</span>
            </div>
            <p className="tpl-gallery__d">{desc}</p>
          </li>
        ))}
      </ul>
      {showCta && (
        <p className="mt-8 text-[14.5px] text-ink-500">
          Every template works with your logo, colours, tax and currency.{" "}
          <Link href="/" className="font-semibold text-ink underline underline-offset-4 decoration-[var(--red)]">Try the generator free</Link>
          {" "}or{" "}
          <Link href="/pricing" className="font-semibold text-ink underline underline-offset-4 decoration-[var(--red)]">see Pro pricing</Link>.
        </p>
      )}
    </div>
  );
}
