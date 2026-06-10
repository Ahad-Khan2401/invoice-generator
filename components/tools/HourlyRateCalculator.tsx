"use client";
import { useState } from "react";
import { Field, Result, ResultRow, ToolCard, num } from "./ToolUI";

const CURRENCIES = ["$", "£", "€", "₹", "₨", "A$", "C$"];

export default function HourlyRateCalculator() {
  const [cur, setCur] = useState("$");
  const [income, setIncome] = useState("60000");
  const [weeks, setWeeks] = useState("46");
  const [hours, setHours] = useState("30");
  const [expenses, setExpenses] = useState("6000");

  const billableHours = num(weeks) * num(hours);
  const target = num(income) + num(expenses);
  const rate = billableHours > 0 ? target / billableHours : 0;
  const dayRate = rate * 8;

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
        <Field label="Target take-home income (per year)" value={income} onChange={setIncome} prefix={cur} />
        <Field label="Working weeks per year" value={weeks} onChange={setWeeks} suffix="weeks" />
        <Field label="Billable hours per week" value={hours} onChange={setHours} suffix="hrs" />
        <Field label="Yearly business expenses" value={expenses} onChange={setExpenses} prefix={cur} />
      </div>

      <Result>
        <ResultRow label="Billable hours / year" value={billableHours.toLocaleString()} />
        <ResultRow label="Total to earn (income + expenses)" value={fmt(target)} />
        <ResultRow label="Suggested day rate (8 hrs)" value={fmt(dayRate)} />
        <ResultRow label="Your hourly rate" value={fmt(rate)} big />
      </Result>
      <p className="mt-3 text-center text-[12px] text-slate-400">
        Tip: account for holidays, sick days, and admin time — that&apos;s why billable hours are lower than your total hours.
      </p>
    </ToolCard>
  );
}
