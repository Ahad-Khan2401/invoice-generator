"use client";
import { useState } from "react";
import { Field, Result, ResultRow, ToolCard, num } from "./ToolUI";

const CURRENCIES = ["A$", "NZ$", "S$", "C$", "₹", "$", "£", "€"];

/* Common GST rates. `id` is the <select> value; `rate` is a percentage. */
const PRESETS: { id: string; label: string; rate: number }[] = [
  { id: "au-10", label: "Australia — 10%", rate: 10 },
  { id: "nz-15", label: "New Zealand — 15%", rate: 15 },
  { id: "sg-9", label: "Singapore — 9%", rate: 9 },
  { id: "ca-5", label: "Canada — federal GST 5%", rate: 5 },
  { id: "in-5", label: "India — 5%", rate: 5 },
  { id: "in-12", label: "India — 12%", rate: 12 },
  { id: "in-18", label: "India — 18%", rate: 18 },
  { id: "in-28", label: "India — 28%", rate: 28 },
];
const CUSTOM = "custom";

const selectCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[15px] font-medium text-slate-900 outline-none focus:border-ink-400 focus:ring-2 focus:ring-ink-100";

export default function GstCalculator() {
  const [cur, setCur] = useState("A$");
  const [amount, setAmount] = useState("100");
  const [preset, setPreset] = useState(PRESETS[0].id);
  const [custom, setCustom] = useState("10");
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
          className={`flex-1 rounded-lg py-2 text-[13.5px] font-semibold transition-colors ${mode === "add" ? "bg-white text-accent-600 shadow-sm" : "text-slate-500"}`}
        >
          Add GST
        </button>
        <button
          type="button"
          aria-pressed={mode === "remove"}
          onClick={() => setMode("remove")}
          className={`flex-1 rounded-lg py-2 text-[13.5px] font-semibold transition-colors ${mode === "remove" ? "bg-white text-accent-600 shadow-sm" : "text-slate-500"}`}
        >
          Remove GST
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
          label={mode === "add" ? "Amount before GST" : "Amount including GST"}
          value={amount}
          onChange={setAmount}
          prefix={cur}
        />
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-slate-600">GST rate preset</span>
          <select value={preset} onChange={(e) => setPreset(e.target.value)} className={selectCls}>
            {PRESETS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
            <option value={CUSTOM}>Custom rate…</option>
          </select>
        </label>
        {preset === CUSTOM ? (
          <Field label="Custom GST rate" value={custom} onChange={setCustom} suffix="%" min={0} />
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
        <ResultRow label="Before GST (net)" value={fmt(net)} />
        <ResultRow label={`GST (${pct}%)`} value={fmt(tax)} />
        <ResultRow label="Including GST (gross)" value={fmt(gross)} big />
      </Result>
      <p className="mt-3 text-center text-[12px] text-slate-400">
        {mode === "add"
          ? `Add GST: net × ${pct}% = GST; net + GST = total.`
          : `Remove GST: total ÷ (1 + ${pct}%) = net; total − net = GST.`}
      </p>
    </ToolCard>
  );
}
