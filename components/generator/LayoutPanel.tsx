"use client";
import type { HeaderPreset, Layout, LayoutShow, LogoPos, LogoShape, LogoSize, SectionOrder } from "@/lib/layout";
import { HEADER_PRESETS } from "@/lib/layout";
import { Upload, X } from "lucide-react";
import { Segmented } from "./FormControls";

/* ───────────────────────────────────────────────
   "Layout & logo" controls. Deliberately NOT a drag-and-drop editor:
   a handful of clear choices, each with a picture, and every change
   shows instantly in the live preview. Works on a phone.
─────────────────────────────────────────────── */

/** Tiny wireframe of each header design (A = your details, B = document details). */
function Thumb({ preset, active, accent }: { preset: HeaderPreset; active: boolean; accent: string }) {
  const a = active ? accent : "#6b717f";
  const b = active ? `${accent}66` : "#cfc8b8";
  const line = (x: number, y: number, w: number, c: string, h = 3) => <rect x={x} y={y} width={w} height={h} rx={1.5} fill={c} />;
  const box = (x: number, y: number) => <rect x={x} y={y} width={9} height={9} rx={2} fill={a} />;
  return (
    <svg viewBox="0 0 72 44" width="100%" height="44" aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="71" height="43" rx="5" fill="#fff" stroke="#e3ddd0" />
      {preset === "classic" && <>{box(6, 6)}{line(6, 18, 24, a)}{line(6, 24, 18, b)}{line(44, 8, 22, b, 5)}{line(50, 18, 16, a)}{line(52, 24, 14, b)}</>}
      {preset === "reversed" && <>{line(6, 8, 22, b, 5)}{line(6, 18, 16, a)}{line(6, 24, 14, b)}{box(57, 6)}{line(42, 18, 24, a)}{line(48, 24, 18, b)}</>}
      {preset === "centered" && <>{box(31, 5)}{line(22, 17, 28, a)}{line(26, 23, 20, b)}{line(20, 30, 32, b, 5)}</>}
      {preset === "stacked" && <>{box(6, 5)}{line(6, 17, 26, a)}{line(6, 23, 20, b)}{line(6, 31, 26, b, 5)}</>}
      {/* table hint */}
      {preset !== "centered" && preset !== "stacked" && <>{line(6, 34, 60, "#e3ddd0", 2)}</>}
    </svg>
  );
}

const SHOW_LABELS: { key: keyof LayoutShow; label: string }[] = [
  { key: "email", label: "E-mail addresses" },
  { key: "phone", label: "Phone numbers" },
  { key: "address", label: "Addresses" },
  { key: "statusBadge", label: "Paid / Unpaid badge" },
  { key: "itemNumbers", label: "Item numbers (#)" },
];

export default function LayoutPanel({
  layout, onChange, onShow, advanced, accent, onLocked, onReset, isDefault, logo, onLogoFile, onLogoRemove,
}: {
  layout: Layout;
  onChange: (p: Partial<Layout>) => void;
  onShow: (k: keyof LayoutShow, v: boolean) => void;
  advanced: boolean;
  accent: string;
  onLocked: (feature: string) => void;
  onReset: () => void;
  isDefault: boolean;
  logo: string | null;
  onLogoFile: (f: File) => void;
  onLogoRemove: () => void;
}) {
  return (
    <div className="ig-layout">
      <p className="ig-layout__intro">Pick a header design, then adjust your logo. The preview updates as you click, and your choices are remembered for next time.</p>

      <span className="ig-label">Your logo</span>
      <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {logo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="Your logo" style={{ height: 40, maxWidth: 110, objectFit: "contain", borderRadius: 6, border: "1.5px solid #e3ddd0", padding: 4, background: "white" }} />
            <button type="button" onClick={onLogoRemove} className="ig-linkbtn" style={{ color: "#dc2626" }}><X size={12} aria-hidden="true" /> Remove logo</button>
          </>
        ) : (
          <label className="ig-upload" style={{ ["--accent" as string]: accent }}>
            <Upload size={12} aria-hidden="true" /> Upload your logo
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) onLogoFile(f); e.target.value = ""; }} />
          </label>
        )}
        <span className="ig-hint" style={{ margin: 0 }}>PNG or JPG, under 2 MB. A wide logo works best at Medium or Large.</span>
      </div>

      <p className="ig-label" id="lay-header">Header design</p>
      <div className="ig-hdrgrid" role="radiogroup" aria-labelledby="lay-header">
        {HEADER_PRESETS.map((p) => {
          const active = layout.header === p.key;
          const locked = p.pro && !advanced;
          return (
            <button key={p.key} type="button" role="radio" aria-checked={active} title={p.hint}
              className="ig-tile ig-hdrtile" style={{ borderColor: active ? accent : undefined, background: active ? `${accent}0f` : undefined }}
              onClick={() => (locked ? onLocked(`layout_${p.key}`) : onChange({ header: p.key }))}>
              {locked && <span className="ig-tile__pro">✦ PRO</span>}
              <Thumb preset={p.key} active={active} accent={accent} />
              <span style={{ fontSize: 12, fontWeight: 700, color: active ? accent : "#2f3542" }}>{p.name}</span>
              <span className="ig-tile__desc">{p.hint}</span>
            </button>
          );
        })}
      </div>

      <div className="ig-laygrid">
        <div>
          <span className="ig-label" id="lay-pos">Logo position</span>
          <Segmented<LogoPos> label="Logo position" accent={accent} value={layout.logoPos} onChange={(v) => onChange({ logoPos: v })}
            options={[{ value: "left", label: "Beside details" }, { value: "center", label: "Top centre" }, { value: "right", label: "Top right" }]} />
        </div>
        <div>
          <span className="ig-label">Logo size</span>
          <Segmented<LogoSize> label="Logo size" accent={accent} value={layout.logoSize} onChange={(v) => onChange({ logoSize: v })}
            options={[{ value: "s", label: "Small" }, { value: "m", label: "Medium" }, { value: "l", label: "Large" }]} />
        </div>
        <div>
          <span className="ig-label">Logo shape</span>
          <Segmented<LogoShape> label="Logo shape" accent={accent} value={layout.logoShape} onChange={(v) => onChange({ logoShape: v })}
            options={[{ value: "original", label: "Original" }, { value: "rounded", label: "Rounded" }, { value: "circle", label: "Circle" }]} />
        </div>
      </div>

      <span className="ig-label" style={{ marginTop: 14 }}>Show on the document</span>
      <div className="ig-showgrid">
        {SHOW_LABELS.map(({ key, label }) => (
          <label key={key} className="ig-check">
            <input type="checkbox" checked={layout.show[key]} onChange={(e) => onShow(key, e.target.checked)} />
            {label}
          </label>
        ))}
      </div>

      <span className="ig-label" style={{ marginTop: 14 }}>Order of the bottom sections</span>
      <Segmented<SectionOrder> label="Order of payment details and notes" accent={accent} value={layout.sectionOrder}
        onChange={(v) => (v === "notes-first" && !advanced ? onLocked("layout_section_order") : onChange({ sectionOrder: v }))}
        options={[{ value: "bank-first", label: "Payment details, then notes" }, { value: "notes-first", label: advanced ? "Notes, then payment details" : "Notes first ✦ Pro" }]} />

      <div style={{ marginTop: 14 }}>
        <button type="button" className="ig-linkbtn" onClick={onReset} disabled={isDefault} style={isDefault ? { opacity: 0.5, cursor: "default" } : undefined}>
          Reset layout to default
        </button>
      </div>
    </div>
  );
}
