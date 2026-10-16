"use client";
import { useEffect, useRef, useState } from "react";
import InvoicePreview from "@/components/generator/InvoicePreview";
import { specimen } from "@/lib/specimens";
import type { DocType, TemplateKey } from "@/lib/invoice-doc";

const PAGE_W = 794; // the invoice is laid out at A4 width (96 dpi); we only scale it

/* A real invoice, receipt, quotation or estimate rendered by the same
   component as the generator and the PDF, shown at thumbnail size.
   Purely decorative for assistive tech: the caption beside it carries the meaning. */
export default function Specimen({
  kind, template = "classic", stamp, className = "",
}: {
  kind: DocType;
  template?: TemplateKey;
  /** Optional rubber-stamp text laid over the sheet, e.g. "Paid". */
  stamp?: string;
  className?: string;
}) {
  const { doc, totals } = specimen(kind, template);
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.33);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const apply = () => { const w = el.clientWidth; if (w) setScale(w / PAGE_W); };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className={`specimen ${className}`} aria-hidden="true">
      <div className="specimen__page" style={{ width: PAGE_W, transform: `scale(${scale})` }}>
        <InvoicePreview doc={doc} totals={totals} whiteLabel />
      </div>
      {stamp && <span className="stamp specimen__stamp">{stamp}</span>}
    </div>
  );
}
