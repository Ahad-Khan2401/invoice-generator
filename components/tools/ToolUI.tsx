"use client";
import { ReactNode } from "react";

/* Shared building blocks for calculator tools — consistent look,
   client-side only. */

export function Field({
  label, value, onChange, prefix, suffix, placeholder, type = "number", min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  type?: string;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-slate-600">{label}</span>
      <div className="flex items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
        {prefix && (
          <span className="flex items-center bg-slate-50 px-3 text-[13px] font-semibold text-slate-400">{prefix}</span>
        )}
        <input
          type={type}
          inputMode="decimal"
          min={min}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3.5 py-3 text-[15px] font-medium text-slate-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && (
          <span className="flex items-center bg-slate-50 px-3 text-[13px] font-semibold text-slate-400">{suffix}</span>
        )}
      </div>
    </label>
  );
}

export function Result({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-6">
      {children}
    </div>
  );
}

export function ResultRow({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${big ? "border-t border-indigo-200/60 pt-3 mt-3" : "py-1"}`}>
      <span className={`${big ? "text-[15px] font-bold text-slate-700" : "text-[13.5px] text-slate-500"}`}>{label}</span>
      <span className={`${big ? "text-2xl font-black text-indigo-700" : "text-[15px] font-bold text-slate-800"}`}>{value}</span>
    </div>
  );
}

export function ToolCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_18px_50px_rgba(15,23,42,0.06)]">
      {children}
    </div>
  );
}

/* Parse a string to a non-negative number, treating blanks/garbage as 0. */
export function num(v: string): number {
  const n = parseFloat(v);
  return isFinite(n) && n > 0 ? n : 0;
}
