"use client";
import { useId } from "react";

/* ───────────────────────────────────────────────
   Small, accessible form primitives for the generator.
   Every input gets a real <label> (visible or sr-only).
─────────────────────────────────────────────── */

export const sectionTitle: React.CSSProperties = {
  fontSize: 11.5, fontWeight: 800, letterSpacing: "0.07em",
  textTransform: "uppercase", color: "#64748b",
  display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
};

export function Accent({ c }: { c: string }) {
  return <span aria-hidden="true" style={{ width: 3, height: 14, borderRadius: 2, background: c, display: "inline-block", flexShrink: 0 }} />;
}

export function SectionTitle({ accent, children, hint }: { accent: string; children: React.ReactNode; hint?: string }) {
  return (
    <p style={sectionTitle}>
      <Accent c={accent} />{children}
      {hint && <span style={{ fontSize: 10, fontWeight: 400, color: "#94a3b8", textTransform: "none", letterSpacing: 0 }}>{hint}</span>}
    </p>
  );
}

export const Divider = () => <hr style={{ border: "none", borderTop: "1.5px solid #f0f3fa", margin: "4px 0" }} />;

interface BaseProps {
  label: string;
  /** Hide the label visually (still announced). */
  srOnly?: boolean;
  accent: string;
  placeholder?: string;
  hint?: string;
  error?: string;
}

export function Inp({
  label, srOnly, value, onChange, placeholder, type = "text", accent, inputMode, autoComplete, list, hint, error, min, step, onKeyDown, dataField,
}: BaseProps & {
  value: string; onChange: (v: string) => void; type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; autoComplete?: string; list?: string;
  min?: number | string; step?: number | string; dataField?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  const id = useId();
  return (
    <div className="ig-field" style={{ ["--accent" as string]: accent }}>
      <label htmlFor={id} className={srOnly ? "sr-only" : "ig-label"}>{label}</label>
      <input
        id={id} data-field={dataField} type={type} value={value} placeholder={placeholder} inputMode={inputMode}
        autoComplete={autoComplete} list={list} min={min} step={step}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? `${id}-h` : undefined}
        onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown}
        className={`ig-input${error ? " ig-input--error" : ""}`}
      />
      {(hint || error) && <p id={`${id}-h`} className={error ? "ig-hint ig-hint--error" : "ig-hint"}>{error ?? hint}</p>}
    </div>
  );
}

export function TxtArea({
  label, srOnly, value, onChange, placeholder, accent, rows = 2, hint,
}: BaseProps & { value: string; onChange: (v: string) => void; rows?: number }) {
  const id = useId();
  return (
    <div className="ig-field" style={{ ["--accent" as string]: accent }}>
      <label htmlFor={id} className={srOnly ? "sr-only" : "ig-label"}>{label}</label>
      <textarea id={id} rows={rows} value={value} placeholder={placeholder}
        aria-describedby={hint ? `${id}-h` : undefined}
        onChange={(e) => onChange(e.target.value)} className="ig-input ig-textarea" />
      {hint && <p id={`${id}-h`} className="ig-hint">{hint}</p>}
    </div>
  );
}

export function Sel({
  label, srOnly, value, onChange, accent, children, hint,
}: { label: string; srOnly?: boolean; value: string; onChange: (v: string) => void; accent: string; children: React.ReactNode; hint?: string }) {
  const id = useId();
  return (
    <div className="ig-field" style={{ ["--accent" as string]: accent }}>
      <label htmlFor={id} className={srOnly ? "sr-only" : "ig-label"}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="ig-input ig-select" aria-describedby={hint ? `${id}-h` : undefined}>
        {children}
      </select>
      {hint && <p id={`${id}-h`} className="ig-hint">{hint}</p>}
    </div>
  );
}

/** Segmented toggle (two or more options) with proper radio semantics. */
export function Segmented<T extends string>({
  label, value, options, onChange, accent, size = "md",
}: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; accent: string; size?: "sm" | "md" }) {
  return (
    <div role="radiogroup" aria-label={label} className={`ig-seg ig-seg--${size}`}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button key={o.value} type="button" role="radio" aria-checked={active} onClick={() => onChange(o.value)}
            className="ig-seg__btn" style={active ? { background: accent, color: "white" } : undefined}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Small pill button, e.g. "Net 30". */
export function Chip({ onClick, children, accent, active, title }: { onClick: () => void; children: React.ReactNode; accent: string; active?: boolean; title?: string }) {
  return (
    <button type="button" onClick={onClick} title={title} aria-pressed={active}
      className="ig-chip" style={active ? { borderColor: accent, color: accent, background: `${accent}0f` } : undefined}>
      {children}
    </button>
  );
}

export function Spinner() {
  return (
    <svg aria-hidden="true" style={{ animation: "spin 1s linear infinite", width: 16, height: 16 }} fill="none" viewBox="0 0 24 24">
      <circle style={{ opacity: .25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path style={{ opacity: .8 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
