"use client";
import { useState } from "react";
import { Field, Result, ResultRow, ToolCard, num } from "./ToolUI";

const CURRENCIES = ["$", "£", "€", "₹", "₨", "A$", "C$"];

export default function SalesTaxCalculator() {
  const [cur, setCur] = useState("$");
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("20");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const r = num(rate) / 100;
  const input = num(amount);

  let net: number, tax: number, gross: number;
  if (mode === "add") {
    net = input;
    tax = input * r;
    gross = input + tax;
  } else {
    gross = input;
    net = r > -1 ? input / (1 + r) : input;
    tax = gross - net;
  }

  const fmt = (n: number) =>
    `${cur}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <ToolCard>
      <div className="mb-5 flex rounded-xl border border-slate-200 bg-slate-50 p-1">
        <button
          onClick={() => setMode("add")}
          className={`flex-1 rounded-lg py-2 text-[13.5px] font-semibold transition-colors ${mode === "add" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
        >
          Add tax
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`flex-1 rounded-lg py-2 text-[13.5px] font-semibold transition-colors ${mode === "remove" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
        >
          Remove tax
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-slate-600">Currency</span>
          <select
            value={cur}
            onChange={(e) => setCur(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[15px] font-medium text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <Field label={mode === "add" ? "Net amount (before tax)" : "Gross amount (incl. tax)"} value={amount} onChange={setAmount} prefix={cur} />
        <Field label="Tax rate" value={rate} onChange={setRate} suffix="%" />
      </div>

      <Result>
        <ResultRow label="Net (before tax)" value={fmt(net)} />
        <ResultRow label={`Tax (${num(rate)}%)`} value={fmt(tax)} />
        <ResultRow label="Gross (incl. tax)" value={fmt(gross)} big />
      </Result>
      <p className="mt-3 text-center text-[12px] text-slate-400">
        Works for VAT, GST, and sales tax. &ldquo;Remove tax&rdquo; reverses tax out of a tax-inclusive total.
      </p>
    </ToolCard>
  );
}
