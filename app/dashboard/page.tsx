"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/ProModal";
import { FileText, Receipt, ClipboardList, Download, Crown, Plus, Clock } from "lucide-react";

interface Invoice {
  id:          string;
  invoice_no:  string;
  doc_type:    string;
  client_name: string;
  total:       number;
  currency:    string;
  created_at:  string;
}

const DOC_ICONS: Record<string, React.ReactNode> = {
  invoice:   <FileText   size={15} />,
  receipt:   <Receipt    size={15} />,
  quotation: <ClipboardList size={15} />,
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { day:"numeric", month:"short", year:"numeric" });

export default function Dashboard() {
  const { user, isLoggedIn, isPro, isLoaded } = useAuth();
  const router = useRouter();

  const [invoices,  setInvoices]  = useState<Invoice[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [dbReady,   setDbReady]   = useState(false);

  // Redirect to home if not logged in
  useEffect(() => {
    if (isLoaded && !isLoggedIn) router.push("/");
  }, [isLoaded, isLoggedIn, router]);

  const loadInvoices = useCallback(async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const res  = await fetch("/api/invoices", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      setInvoices(data.invoices ?? []);
      setDbReady(data.dbReady ?? false);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    if (isLoggedIn) loadInvoices();
  }, [isLoggedIn, loadInvoices]);

  if (!isLoaded || !isLoggedIn) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">

      {/* ── Header ── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{user?.name}</span>
            {isPro && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-600">
                <Crown size={10} /> PRO
              </span>
            )}
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={15} /> New Invoice
        </Link>
      </div>

      {/* ── Pro upgrade banner (free users) ── */}
      {!isPro && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4">
          <div>
            <p className="text-sm font-bold text-indigo-900">Upgrade to Pro</p>
            <p className="text-xs text-indigo-600 mt-0.5">
              Unlimited history · No ads · No watermark · 12 premium colours
            </p>
          </div>
          <Link
            href="/?pro=upgrade"
            className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
          >
            Get Pro →
          </Link>
        </div>
      )}

      {/* ── Invoice history ── */}
      <div className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-bold text-slate-900">Invoice History</h2>
          {isPro ? (
            <span className="text-xs text-slate-400">Unlimited</span>
          ) : invoices.length >= 4 ? (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
              {invoices.length} of 5 free saves — oldest gets replaced next.{" "}
              <Link href="/?pro=upgrade" className="underline">Go unlimited</Link>
            </span>
          ) : (
            <span className="text-xs text-slate-400">{`Last ${invoices.length} of 5 max`}</span>
          )}
        </div>

        {/* Not configured yet */}
        {!dbReady && !loading && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Clock size={24} className="text-slate-400" />
            </div>
            <p className="font-semibold text-slate-700 mb-1">History is temporarily unavailable</p>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              We couldn&apos;t reach the invoice history service. Please refresh in a
              moment — invoices you create now are not affected.
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          </div>
        )}

        {/* Empty state */}
        {dbReady && !loading && invoices.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <FileText size={24} className="text-slate-400" />
            </div>
            <p className="font-semibold text-slate-700 mb-1">No invoices yet</p>
            <p className="text-sm text-slate-400 mb-6">Create your first invoice and it will appear here automatically.</p>
            <Link href="/" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
              Create Invoice
            </Link>
          </div>
        )}

        {/* Invoice list */}
        {dbReady && !loading && invoices.length > 0 && (
          <div className="divide-y divide-slate-100">
            {invoices.map(inv => (
              <div key={inv.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                {/* Icon */}
                <div style={{ width:36, height:36, borderRadius:10, background:"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748b", flexShrink:0 }}>
                  {DOC_ICONS[inv.doc_type] ?? <FileText size={15} />}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-bold text-slate-800 truncate">
                      {inv.invoice_no || "—"}
                    </span>
                    <span className="hidden shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium capitalize text-slate-500 sm:inline">
                      {inv.doc_type}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-400 truncate mt-0.5">
                    {inv.client_name || "No client"} · {fmt(inv.created_at)}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-right shrink-0">
                  <p className="text-[14px] font-bold text-slate-800">
                    {inv.currency === "USD" ? "$" : inv.currency}{Number(inv.total).toFixed(2)}
                  </p>
                </div>

                {/* Re-download */}
                <Link
                  href={`/?load=${inv.id}`}
                  className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                  title="Re-open this invoice"
                >
                  <Download size={13} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Pro features preview (free users) ── */}
      {!isPro && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon:"📋", title:"Unlimited History", desc:"Pro only" },
            { icon:"🚫", title:"No Ads",            desc:"Pro only" },
            { icon:"🏷️", title:"No Watermark",      desc:"Pro only" },
            { icon:"🎨", title:"12 Colors",          desc:"Pro only" },
          ].map(f => (
            <div key={f.title} className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center opacity-60">
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="text-[12px] font-bold text-slate-600">{f.title}</p>
              <p className="text-[11px] text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
