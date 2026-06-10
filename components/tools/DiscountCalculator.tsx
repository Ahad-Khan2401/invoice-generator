"use client";
import { useState } from "react";
import { Field, Result, ResultRow, ToolCard, num } from "./ToolUI";

const CURRENCIES = ["$", "£", "€", "₹", "₨", "A$", "C$"];

export default function DiscountCalculator() {
  const [cur, setCur] = useState("$");
  const [price, setPrice] = useState("100");
  const [discount, setDiscount] = useState("15");

  const p = num(price);
  const d = num(discount);
  const saved = p * (d / 100);
  const final = p - saved;

  const fmt = (n: number) =>
    `${cur}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
        <Field label="Original price" value={price} onChange={setPrice} prefix={cur} />
        <Field label="Discount" value={discount} onChange={setDiscount} suffix="%" />
      </div>

      <Result>
        <ResultRow label="You save" value={fmt(saved)} />
        <ResultRow label="Original price" value={fmt(p)} />
        <ResultRow label="Final price" value={fmt(final)} big />
      </Result>
    </ToolCard>
  );
}
