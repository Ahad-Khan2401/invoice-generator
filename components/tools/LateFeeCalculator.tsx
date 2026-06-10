"use client";
import { useState } from "react";
import { Field, Result, ResultRow, ToolCard, num } from "./ToolUI";

const CURRENCIES = ["$", "£", "€", "₹", "₨", "A$", "C$"];

export default function LateFeeCalculator() {
  const [cur, setCur] = useState("$");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("8");
  const [days, setDays] = useState("30");
  const [period, setPeriod] = useState<"year" | "month">("year");
  const [flat, setFlat] = useState("0");

  const principal = num(amount);
  const annualRate = period === "year" ? num(rate) : num(rate) * 12;
  const interest = principal * (annualRate / 100) * (num(days) / 365);
  const flatFee = num(flat);
  const totalFee = interest + flatFee;
  const totalDue = principal + totalFee;

  const fmt = (n: number) =>
    `${cur}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <ToolCard>
      <div className="grid gap-4 sm:grid-cols-2">
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
        <Field label="Invoice amount" value={amount} onChange={setAmount} prefix={cur} />
        <div>
          <span className="mb-1.5 block text-[13px] font-semibold text-slate-600">Interest rate</span>
          <div className="flex gap-2">
            <div className="flex flex-1 items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
              <input
                type="number" inputMode="decimal" value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full bg-transparent px-3.5 py-3 text-[15px] font-medium text-slate-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="flex items-center bg-slate-50 px-3 text-[13px] font-semibold text-slate-400">%</span>
            </div>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as "year" | "month")}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-[13.5px] font-medium text-slate-900 outline-none focus:border-indigo-400"
            >
              <option value="year">per year</option>
              <option value="month">per month</option>
            </select>
          </div>
        </div>
        <Field label="Days overdue" value={days} onChange={setDays} suffix="days" />
        <Field label="Flat late fee (optional)" value={flat} onChange={setFlat} prefix={cur} />
      </div>

      <Result>
        <ResultRow label="Interest accrued" value={fmt(interest)} />
        {flatFee > 0 && <ResultRow label="Flat late fee" value={fmt(flatFee)} />}
        <ResultRow label="Original amount" value={fmt(principal)} />
        <ResultRow label="Total now due" value={fmt(totalDue)} big />
      </Result>
      <p className="mt-3 text-center text-[12px] text-slate-400">
        Estimate only. Interest = amount × annual rate × (days ÷ 365). Check your local late-payment laws.
      </p>
    </ToolCard>
  );
}
