"use client";
import { useState } from "react";
import { Field, Result, ResultRow, ToolCard, num } from "./ToolUI";

const CURRENCIES = ["$", "£", "€", "₹", "₨", "A$", "C$"];

export default function ProfitMarginCalculator() {
  const [cur, setCur] = useState("$");
  const [cost, setCost] = useState("70");
  const [price, setPrice] = useState("100");

  const c = num(cost);
  const p = num(price);
  const profit = p - c;
  const margin = p > 0 ? (profit / p) * 100 : 0;
  const markup = c > 0 ? (profit / c) * 100 : 0;

  const fmt = (n: number) =>
    `${cur}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const pct = (n: number) => `${n.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`;

  return (
    <ToolCard>
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
        <Field label="Cost" value={cost} onChange={setCost} prefix={cur} />
        <Field label="Selling price" value={price} onChange={setPrice} prefix={cur} />
      </div>

      <Result>
        <ResultRow label="Profit" value={fmt(profit)} />
        <ResultRow label="Markup" value={pct(markup)} />
        <ResultRow label="Profit margin" value={pct(margin)} big />
      </Result>
      <p className="mt-3 text-center text-[12px] text-slate-400">
        Margin = profit ÷ selling price. Markup = profit ÷ cost. They&apos;re not the same number.
      </p>
    </ToolCard>
  );
}
