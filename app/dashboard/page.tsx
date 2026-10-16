"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { FileText, Receipt, ClipboardList, Calculator, Crown, Plus, Clock, Trash2, Copy, Pencil, CheckCircle2, Mail, Download, Search, RotateCcw } from "lucide-react";
import { formatMoney, isOverdue } from "@/lib/invoice-math";
import { CURRENCIES } from "@/lib/invoice-doc";
import { track } from "@/lib/analytics";
import { PLANS } from "@/lib/plans";

interface Row {
  id:          string;
  invoice_no:  string;
  doc_type:    string;
  client_name: string;
  total:       number | string;
  currency:    string;
  status:      string | null;
  due_date:    string | null;
  issue_date:  string | null;
  is_draft:    boolean | null;
  created_at:  string;
  updated_at:  string | null;
}

const ICONS: Record<string, React.ReactNode> = {
  invoice:   <FileText size={15} aria-hidden="true" />,
  receipt:   <Receipt size={15} aria-hidden="true" />,
  quotation: <ClipboardList size={15} aria-hidden="true" />,
  estimate:  <Calculator size={15} aria-hidden="true" />,
};

const fmt = (d: string | null) => d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
const sym = (code: string) => CURRENCIES.find((c) => c.l === code)?.s ?? code + " ";

type Filter = "all" | "unpaid" | "overdue" | "paid" | "draft";

function rowState(r: Row): "draft" | "paid" | "overdue" | "unpaid" | "none" {
  if (r.is_draft) return "draft";
  if (r.doc_type === "quotation" || r.doc_type === "estimate") return "none";
  if (r.doc_type === "receipt" || r.status === "paid") return "paid";
  if (isOverdue(r.due_date?.slice(0, 10), r.status)) return "overdue";
  return "unpaid";
}

const STATE_STYLE: Record<string, { label: string; cls: string }> = {
  draft:   { label: "Draft",   cls: "bg-slate-100 text-slate-600" },
  paid:    { label: "Paid",    cls: "bg-emerald-50 text-emerald-700" },
  overdue: { label: "Overdue", cls: "bg-red-50 text-red-700" },
  unpaid:  { label: "Unpaid",  cls: "bg-amber-50 text-amber-700" },
};

function reminderText(r: Row, senderName: string): string {
  const amount = formatMoney(Number(r.total), sym(r.currency), r.currency);
  const overdue = rowState(r) === "overdue";
  return [
    `Subject: ${overdue ? "Overdue invoice" : "Payment reminder"} — ${r.invoice_no} (${amount})`,
    ``,
    `Hi ${r.client_name || "there"},`,
    ``,
    overdue
      ? `I hope you're well. Our invoice ${r.invoice_no} for ${amount} was due on ${fmt(r.due_date)} and I haven't received payment yet. Could you let me know when I can expect it?`
      : `Just a friendly reminder that invoice ${r.invoice_no} for ${amount} is due on ${fmt(r.due_date)}. Please let me know if you have any questions about it.`,
    ``,
    `If you've already paid, please ignore this message — and thank you!`,
    ``,
    `Best regards,`,
    senderName || "",
  ].join("\n");
}

export default function Dashboard() {
  const { user, isLoggedIn, isPro, isLoaded, limits, plan, openModal } = useAuth();
  const router = useRouter();

  const [rows, setRows]       = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false);
  const [total, setTotal]     = useState(0);
  const [q, setQ]             = useState("");
  const [filter, setFilter]   = useState<Filter>("all");
  const [toast, setToast]     = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const flash = (m: string) => { setToast(m); window.setTimeout(() => setToast(""), 2600); };

  useEffect(() => {
    if (isLoaded && !isLoggedIn) router.push("/");
  }, [isLoaded, isLoggedIn, router]);

  const auth = useCallback(() => ({ Authorization: `Bearer ${user?.token ?? ""}` }), [user?.token]);

  const load = useCallback(async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const res  = await fetch(`/api/invoices${q ? `?q=${encodeURIComponent(q)}` : ""}`, { headers: auth() });
      const data = await res.json();
      setRows(data.invoices ?? []);
      setDbReady(data.dbReady ?? false);
      setTotal(data.total ?? (data.invoices?.length ?? 0));
    } catch {
      setDbReady(false);
    } finally {
      setLoading(false);
    }
  }, [user?.token, q, auth]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const t = window.setTimeout(() => { void load(); }, q ? 300 : 0);
    return () => window.clearTimeout(t);
  }, [isLoggedIn, load, q]);

  const visible = useMemo(() => rows.filter((r) => {
    const s = rowState(r);
    if (filter === "all") return true;
    if (filter === "draft") return s === "draft";
    if (filter === "paid") return s === "paid";
    if (filter === "overdue") return s === "overdue";
    if (filter === "unpaid") return s === "unpaid" || s === "overdue";
    return true;
  }), [rows, filter]);

  const summary = useMemo(() => {
    const byCur: Record<string, { unpaid: number; overdue: number; paid: number }> = {};
    for (const r of rows) {
      const s = rowState(r); if (s === "none" || s === "draft") continue;
      const b = (byCur[r.currency] ??= { unpaid: 0, overdue: 0, paid: 0 });
      b[s] += Number(r.total) || 0;
      if (s === "overdue") b.unpaid += Number(r.total) || 0;
    }
    return byCur;
  }, [rows]);

  async function markPaid(r: Row, paid: boolean) {
    const res = await fetch("/api/invoices", { method: "PATCH", headers: { "Content-Type": "application/json", ...auth() }, body: JSON.stringify({ id: r.id, status: paid ? "paid" : "unpaid" }) });
    if (res.ok) { setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, status: paid ? "paid" : "unpaid" } : x)); flash(paid ? "Marked as paid" : "Marked as unpaid"); }
    else flash("Couldn't update — try again");
  }
  async function remove(id: string) {
    setConfirmId(null);
    const res = await fetch(`/api/invoices?id=${encodeURIComponent(id)}`, { method: "DELETE", headers: auth() });
    if (res.ok) { setRows((rs) => rs.filter((x) => x.id !== id)); setTotal((t) => Math.max(0, t - 1)); flash("Deleted"); }
    else flash("Couldn't delete — try again");
  }
  async function copyReminder(r: Row) {
    try { await navigator.clipboard.writeText(reminderText(r, user?.name ?? "")); flash("Reminder e-mail copied to clipboard"); track("reminder_copied", { overdue: rowState(r) === "overdue" }); }
    catch { flash("Copy failed — your browser blocked clipboard access"); }
  }
  function exportCsv() {
    if (!limits.csvExport) { openModal("upgrade", "csv_export"); return; }
    const head = ["Number", "Type", "Client", "Total", "Currency", "Status", "Issue date", "Due date", "Created"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [head.join(","), ...rows.map((r) => [r.invoice_no, r.doc_type, r.client_name, Number(r.total).toFixed(2), r.currency, r.is_draft ? "draft" : rowState(r), r.issue_date?.slice(0, 10) ?? "", r.due_date?.slice(0, 10) ?? "", r.created_at.slice(0, 10)].map(esc).join(","))];
    const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `pdfbillbuilder-history-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    track("csv_exported", { rows: rows.length });
  }

  if (!isLoaded || !isLoggedIn) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center" aria-busy="true">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const limitNum = Number.isFinite(limits.savedDocuments) ? limits.savedDocuments : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{user?.name}</span>
            {isPro && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
                <Crown size={10} aria-hidden="true" /> {plan === "business" ? "BUSINESS" : "PRO"}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors" title={limits.csvExport ? "Download your history as CSV" : "CSV export is a Pro feature"}>
            <Download size={15} aria-hidden="true" /> Export CSV {!limits.csvExport && <span className="text-[10px] font-bold text-violet-700">✦ PRO</span>}
          </button>
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-700 transition-colors">
            <Plus size={15} aria-hidden="true" /> New document
          </Link>
        </div>
      </div>

      {/* Summary */}
      {dbReady && Object.keys(summary).length > 0 && (
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Object.entries(summary).map(([cur, s]) => (
            <div key={cur} className="contents">
              <Stat label={`Outstanding (${cur})`} value={formatMoney(s.unpaid, sym(cur), cur)} tone="amber" />
              <Stat label={`Overdue (${cur})`} value={formatMoney(s.overdue, sym(cur), cur)} tone="red" />
              <Stat label={`Paid (${cur})`} value={formatMoney(s.paid, sym(cur), cur)} tone="green" />
            </div>
          ))}
        </div>
      )}

      {/* Upgrade banner */}
      {!isPro && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-indigo-900">Upgrade to Pro</p>
            <p className="text-xs text-indigo-700 mt-0.5">
              Unlimited history · Premium templates · White-label PDFs · CSV export · Ad-free — {PLANS.pro.priceMonthly}/month
            </p>
          </div>
          <button type="button" onClick={() => openModal("upgrade", "dashboard_banner")} className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors">
            Get Pro →
          </button>
        </div>
      )}

      {/* History */}
      <div className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-slate-900">Documents</h2>
            {limitNum !== null ? (
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${total >= limitNum ? "bg-amber-50 text-amber-700" : "text-slate-500"}`}>
                {total} of {limitNum} free saves{total >= limitNum && " — oldest is replaced next"}
              </span>
            ) : <span className="text-xs text-slate-500">{total} saved</span>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative">
              <span className="sr-only">Search by number or client</span>
              <Search size={14} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search number or client" className="w-56 rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-3 text-[13px] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
            </label>
            <div role="radiogroup" aria-label="Filter" className="flex rounded-xl border border-slate-200 bg-slate-50 p-0.5 text-[12px] font-semibold">
              {(["all", "unpaid", "overdue", "paid", "draft"] as Filter[]).map((f) => (
                <button key={f} type="button" role="radio" aria-checked={filter === f} onClick={() => setFilter(f)}
                  className={`rounded-lg px-2.5 py-1.5 capitalize ${filter === f ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500"}`}>{f}</button>
              ))}
            </div>
          </div>
        </div>

        {!dbReady && !loading && (
          <Empty icon={<Clock size={24} className="text-slate-400" aria-hidden="true" />} title="History is temporarily unavailable"
            text="We couldn't reach the document history service. Please refresh in a moment — documents you create now are not affected." />
        )}
        {loading && (
          <div className="flex items-center justify-center py-16" aria-busy="true">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          </div>
        )}
        {dbReady && !loading && visible.length === 0 && (
          <Empty icon={<FileText size={24} className="text-slate-400" aria-hidden="true" />} title={rows.length ? "Nothing matches this filter" : "No documents yet"}
            text={rows.length ? "Try another filter or clear the search." : "Download a document while signed in and it will appear here automatically."}
            cta={!rows.length ? <Link href="/" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">Create a document</Link> : undefined} />
        )}

        {dbReady && !loading && visible.length > 0 && (
          <ul className="divide-y divide-slate-100">
            {visible.map((r) => {
              const s = rowState(r); const style = STATE_STYLE[s];
              const canPay = r.doc_type === "invoice" && !r.is_draft;
              return (
                <li key={r.id} className="flex flex-wrap items-center gap-3 px-5 py-4 hover:bg-slate-50/60 transition-colors sm:flex-nowrap">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-slate-100 text-slate-500">
                    {ICONS[r.doc_type] ?? <FileText size={15} aria-hidden="true" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13.5px] font-bold text-slate-800 truncate">{r.invoice_no || "—"}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium capitalize text-slate-500">{r.doc_type}</span>
                      {style && <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${style.cls}`}>{style.label}</span>}
                    </div>
                    <p className="text-[12.5px] text-slate-500 truncate mt-0.5">
                      {r.client_name || "No client"} · {fmt(r.issue_date ?? r.created_at)}{r.due_date && s !== "paid" && r.doc_type === "invoice" ? ` · due ${fmt(r.due_date)}` : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0 pr-1">
                    <p className="text-[14px] font-bold text-slate-800 tabular-nums">{formatMoney(Number(r.total), sym(r.currency), r.currency)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {canPay && (s === "paid"
                      ? <IconBtn title="Mark as unpaid" onClick={() => markPaid(r, false)}><RotateCcw size={13} aria-hidden="true" /></IconBtn>
                      : <IconBtn title="Mark as paid" onClick={() => markPaid(r, true)} tone="green"><CheckCircle2 size={13} aria-hidden="true" /></IconBtn>)}
                    {canPay && s !== "paid" && (
                      <IconBtn title="Copy payment reminder e-mail" onClick={() => copyReminder(r)}><Mail size={13} aria-hidden="true" /></IconBtn>
                    )}
                    <Link href={`/?load=${r.id}`} title="Open and edit" aria-label={`Open ${r.invoice_no}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-indigo-300 hover:text-indigo-600"><Pencil size={13} aria-hidden="true" /></Link>
                    <Link href={`/?dup=${r.id}`} title="Duplicate with next number" aria-label={`Duplicate ${r.invoice_no}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-indigo-300 hover:text-indigo-600"><Copy size={13} aria-hidden="true" /></Link>
                    {confirmId === r.id ? (
                      <span className="flex items-center gap-1 text-[12px]">
                        <button type="button" onClick={() => remove(r.id)} className="rounded-lg bg-red-600 px-2.5 py-1.5 font-bold text-white">Delete</button>
                        <button type="button" onClick={() => setConfirmId(null)} className="rounded-lg border border-slate-200 px-2 py-1.5 font-semibold text-slate-600">Cancel</button>
                      </span>
                    ) : (
                      <IconBtn title="Delete" onClick={() => setConfirmId(r.id)} tone="red"><Trash2 size={13} aria-hidden="true" /></IconBtn>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="mt-4 text-[12px] text-slate-500">
        Saved documents are stored under a hashed account id so we never keep your e-mail address alongside them. Delete any document here at any time, or e-mail support to delete your whole account.
      </p>

      {toast && <div role="status" className="ig-toast">{toast}</div>}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "amber" | "red" | "green" }) {
  const cls = tone === "amber" ? "border-amber-100 bg-amber-50/60 text-amber-900" : tone === "red" ? "border-red-100 bg-red-50/60 text-red-900" : "border-emerald-100 bg-emerald-50/60 text-emerald-900";
  return (
    <div className={`rounded-2xl border px-4 py-3 ${cls}`}>
      <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-0.5 text-lg font-black tabular-nums">{value}</p>
    </div>
  );
}

function IconBtn({ children, title, onClick, tone }: { children: React.ReactNode; title: string; onClick: () => void; tone?: "green" | "red" }) {
  const hover = tone === "green" ? "hover:border-emerald-300 hover:text-emerald-700" : tone === "red" ? "hover:border-red-300 hover:text-red-600" : "hover:border-indigo-300 hover:text-indigo-600";
  return (
    <button type="button" title={title} aria-label={title} onClick={onClick} className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors ${hover}`}>
      {children}
    </button>
  );
}

function Empty({ icon, title, text, cta }: { icon: React.ReactNode; title: string; text: string; cta?: React.ReactNode }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">{icon}</div>
      <p className="font-semibold text-slate-700 mb-1">{title}</p>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">{text}</p>
      {cta}
    </div>
  );
}
