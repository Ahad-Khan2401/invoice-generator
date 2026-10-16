"use client";
import { useRef } from "react";
import { Trash2, Plus } from "lucide-react";
import type { Item, Currency } from "@/lib/invoice-doc";
import { formatMoney } from "@/lib/invoice-math";

/* ───────────────────────────────────────────────
   Line items editor.
   - Desktop: one row per item (# · description · qty · rate · amount · ×)
   - Phone (<640px): two rows per item via CSS grid areas so the
     description keeps a usable width.
   - Fractional quantities allowed (hours, metres…).
   - Enter in the last row adds a new item; Backspace on an empty
     description of a non-only row removes it.
─────────────────────────────────────────────── */
interface Props {
  items: Item[];
  lines: number[];
  cur: Currency;
  accent: string;
  onChange: (update: (items: Item[]) => Item[]) => void;
}

let nextId = 1000;

export default function ItemsEditor({ items, lines, cur, accent, onChange }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  const edit = (id: number, f: keyof Item, v: string | number) =>
    onChange((cur) => cur.map((i) => (i.id === id ? { ...i, [f]: v } : i)));
  const remove = (id: number) => onChange((cur) => cur.length === 1 ? [{ id: nextId++, desc: "", qty: 1, rate: 0 }] : cur.filter((i) => i.id !== id));
  const add = () => {
    onChange((cur) => [...cur, { id: nextId++, desc: "", qty: 1, rate: 0 }]);
    // focus the new description after render
    requestAnimationFrame(() => {
      const inputs = rootRef.current?.querySelectorAll<HTMLInputElement>("input[data-col='desc']");
      inputs?.[inputs.length - 1]?.focus();
    });
  };

  const numVal = (v: string) => (v === "" ? 0 : Math.max(-1e9, Math.min(1e12, parseFloat(v) || 0)));

  return (
    <div ref={rootRef} className="ig-items" role="table" aria-label="Line items">
      <div className="ig-itemhead" role="row">
        <span role="columnheader">#</span>
        <span role="columnheader">Description</span>
        <span role="columnheader" style={{ textAlign: "center" }}>Qty</span>
        <span role="columnheader" style={{ textAlign: "right" }}>Rate</span>
        <span role="columnheader" style={{ textAlign: "right" }}>Amount</span>
        <span role="columnheader" className="sr-only">Remove</span>
      </div>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={item.id} className="ig-itemrow" role="row">
            <span className="ig-itemrow__n" aria-hidden="true">{idx + 1}</span>

            <input
              data-col="desc"
              className="ig-cell ig-itemrow__d"
              aria-label={`Item ${idx + 1} description`}
              placeholder={`Item ${idx + 1} — e.g. Logo design, 2 revision rounds`}
              value={item.desc}
              onChange={(e) => edit(item.id, "desc", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && item.desc === "" && items.length > 1 && item.qty === 1 && item.rate === 0) { e.preventDefault(); remove(item.id); }
              }}
            />

            <label className="ig-itemrow__q">
              <span className="ig-cellabel">Qty</span>
              <input
                type="number" inputMode="decimal" step="any"
                className="ig-cell" style={{ textAlign: "center" }}
                aria-label={`Item ${idx + 1} quantity`}
                value={Number.isFinite(item.qty) ? item.qty : 0}
                onChange={(e) => edit(item.id, "qty", numVal(e.target.value))}
                onFocus={(e) => e.currentTarget.select()}
              />
            </label>

            <label className="ig-itemrow__r">
              <span className="ig-cellabel">Rate</span>
              <input
                type="number" inputMode="decimal" step="0.01"
                className="ig-cell" style={{ textAlign: "right" }}
                aria-label={`Item ${idx + 1} rate`}
                value={Number.isFinite(item.rate) ? item.rate : 0}
                onChange={(e) => edit(item.id, "rate", numVal(e.target.value))}
                onFocus={(e) => e.currentTarget.select()}
                onKeyDown={(e) => { if (e.key === "Enter" && isLast) { e.preventDefault(); add(); } }}
              />
            </label>

            <span className="ig-itemrow__a" aria-label={`Item ${idx + 1} amount`}>
              <span className="ig-cellabel">Amount</span>
              <span style={{ fontWeight: 700, color: "#151a24", fontVariantNumeric: "tabular-nums" }}>{formatMoney(lines[idx] ?? 0, cur.s, cur.l)}</span>
            </span>

            <button
              type="button"
              className="ig-itemrow__x"
              onClick={() => remove(item.id)}
              aria-label={`Remove item ${idx + 1}`}
              title="Remove item"
            >
              <Trash2 size={12} aria-hidden="true" />
            </button>
          </div>
        );
      })}

      <div className="ig-itemfoot">
        <button type="button" onClick={add} className="ig-additem" style={{ color: accent }}>
          <span aria-hidden="true" style={{ width: 17, height: 17, borderRadius: "50%", border: `2px solid ${accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={9} strokeWidth={3} />
          </span>
          Add item
        </button>
        <span className="ig-itemfoot__hint">Tip: press Enter in the last rate field to add a row</span>
      </div>
    </div>
  );
}
