"use client";
import { useState } from "react";
import { Field, Result, ResultRow, ToolCard, num } from "./ToolUI";

const CURRENCIES = ["£", "€", "$", "AED", "R", "₹", "₨", "A$", "C$"];

/* Common VAT rates. `id` is the <select> value; `rate` is a percentage. */
const PRESETS: { id: string; label: string; rate: number }[] = [
  { id: "uk-20", label: "United Kingdom — standard 20%", rate: 20 },
  { id: "uk-5", label: "United Kingdom — reduced 5%", rate: 5 },
  { id: "uk-0", label: "United Kingdom — zero rate 0%", rate: 0 },
  { id: "ie-23", label: "Ireland — 23%", rate: 23 },
  { id: "de-19", label: "Germany — 19%", rate: 19 },
  { id: "fr-20", label: "France — 20%", rate: 20 },
  { id: "nl-21", label: "Netherlands — 21%", rate: 21 },
  { id: "es-21", label: "Spain — 21%", rate: 21 },
  { id: "it-22", label: "Italy — 22%", rate: 22 },
  { id: "ae-5", label: "United Arab Emirates — 5%", rate: 5 },
  { id: "za-15", label: "South Africa — 15%", rate: 15 },
];
const CUSTOM = "custom";

const selectCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[15px] font-medium text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

export default function VatCalculator() {
  const [cur, setCur] = useState("£");
  const [amount, setAmount] = useState("100");
  const [preset, setPreset] = useState(PRESETS[0].id);
  const [custom, setCustom] = useState("20");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const chosen = PRESETS.find((p) => p.id === preset);
  const ratePct = chosen ? chosen.rate : num(custom);
  const r = ratePct / 100;
  const input = num(amount);

  let net: number, tax: number, gross: number;
  if (mode === "add") {
    net = input;
    tax = input * r;
    gross = input + tax;
  } else {
    gross = input;
    net = input / (1 + r);
    tax = gross - net;
  }

  const money = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt = (n: number) => `${cur}${/^[A-Za-z]+$/.test(cur) ? " " : ""}${money(n)}`;
  const pct = ratePct.toLocaleString(undefined, { maximumFractionDigits: 2 });
  const divisor = (1 + r).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });

  return (
    <ToolCard>
      <div
        role="group"
        aria-label="Calculation mode"
        className="mb-5 flex rounded-xl border border-slate-200 bg-slate-50 p-1"
      >
        <button
          type="button"
          aria-pressed={mode === "add"}
          onClick={() => setMode("add")}
          className={`flex-1 rounded-lg py-2 text-[13.5px] font-semibold transition-colors ${mode === "add" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
        >
          Add VAT
        </button>
        <button
          type="button"
          aria-pressed={mode === "remove"}
          onClick={() => setMode("remove")}
          className={`flex-1 rounded-lg py-2 text-[13.5px] font-semibold transition-colors ${mode === "remove" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
        >
          Remove VAT
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-slate-600">Currency</span>
          <select value={cur} onChange={(e) => setCur(e.target.value)} className={selectCls}>
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <Field
          label={mode === "add" ? "Net amount (excl. VAT)" : "Gross amount (incl. VAT)"}
          value={amount}
          onChange={setAmount}
          prefix={cur}
        />
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-slate-600">VAT rate preset</span>
          <select value={preset} onChange={(e) => setPreset(e.target.value)} className={selectCls}>
            {PRESETS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
            <option value={CUSTOM}>Custom rate…</option>
          </select>
        </label>
        {preset === CUSTOM ? (
          <Field label="Custom VAT rate" value={custom} onChange={setCustom} suffix="%" min={0} />
        ) : (
          <div className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-slate-600">Rate applied</span>
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3.5 py-3 text-[15px] font-medium text-slate-500">
              {pct}%
            </div>
          </div>
        )}
      </div>

      <Result>
        {mode === "remove" && (
          <ResultRow label="Reverse calculation" value={`${fmt(gross)} ÷ ${divisor}`} />
        )}
        <ResultRow label="Net (excl. VAT)" value={fmt(net)} />
        <ResultRow label={`VAT (${pct}%)`} value={fmt(tax)} />
        <ResultRow label="Gross (incl. VAT)" value={fmt(gross)} big />
      </Result>
      <p className="mt-3 text-center text-[12px] text-slate-400">
        {mode === "add"
          ? `Add VAT: net × ${pct}% = VAT; net + VAT = gross.`
          : `Remove VAT: gross ÷ (1 + ${pct}%) = net; gross − net = VAT.`}
      </p>
    </ToolCard>
  );
}
