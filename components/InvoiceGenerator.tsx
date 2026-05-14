"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, Download, Printer, Plus, Zap, Palette, Upload } from "lucide-react";

interface Item  { id: number; desc: string; qty: number; rate: number; }
interface Party { name: string; email: string; phone: string; address: string; }

const ACCENT_COLORS = [
  { hex: "#4f46e5", name: "Indigo"  },
  { hex: "#0ea5e9", name: "Sky"     },
  { hex: "#10b981", name: "Emerald" },
  { hex: "#f59e0b", name: "Amber"   },
  { hex: "#ef4444", name: "Rose"    },
  { hex: "#8b5cf6", name: "Violet"  },
];

const CURRENCIES = [
  { s: "$",   l: "USD — US Dollar"         },
  { s: "€",   l: "EUR — Euro"              },
  { s: "£",   l: "GBP — British Pound"     },
  { s: "₹",   l: "INR — Indian Rupee"      },
  { s: "₨",   l: "PKR — Pakistani Rupee"   },
  { s: "CA$", l: "CAD — Canadian Dollar"   },
  { s: "A$",  l: "AUD — Australian Dollar" },
];

const blank   = (): Party => ({ name: "", email: "", phone: "", address: "" });
const f2      = (n: number) => n.toFixed(2);
const dateStr = () => new Date().toISOString().split("T")[0];

const inp = [
  "w-full rounded-xl border border-slate-200 bg-white",
  "px-3.5 py-2.5 text-[13px] text-slate-800",
  "placeholder:text-slate-400 outline-none",
  "focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100",
  "transition-all duration-150",
].join(" ");

export default function InvoiceGenerator() {
  const idRef = useRef(2);
  const mk = () => ({ id: idRef.current++, desc: "", qty: 1, rate: 0 });

  const [from,    setFrom]    = useState<Party>(blank());
  const [to,      setTo]      = useState<Party>(blank());
  const [meta,    setMeta]    = useState({
    no: "INV-001", date: dateStr(), due: "",
    notes: "Payment due within 30 days.\nThank you for your business!",
    status: "unpaid" as "paid" | "unpaid",
  });
  const [items,   setItems]   = useState<Item[]>([{ id: 1, desc: "", qty: 1, rate: 0 }]);
  const [tax,     setTax]     = useState(0);
  const [cur,     setCur]     = useState(CURRENCIES[0]);
  const [color,   setColor]   = useState(ACCENT_COLORS[0].hex);
  const [busy,    setBusy]    = useState(false);
  const [clients, setClients] = useState<string[]>([]);
  const [hist,    setHist]    = useState<string[]>([]);
  const previewEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClients(JSON.parse(localStorage.getItem("iq_c") || "[]"));
    setHist(JSON.parse(localStorage.getItem("iq_i") || "[]"));
  }, []);

  const saveClient = useCallback((n: string) => {
    if (!n.trim()) return;
    const u = [...new Set([n, ...clients])].slice(0, 10);
    setClients(u); localStorage.setItem("iq_c", JSON.stringify(u));
  }, [clients]);

  const saveHist = useCallback((d: string) => {
    if (!d.trim()) return;
    const u = [...new Set([d, ...hist])].slice(0, 15);
    setHist(u); localStorage.setItem("iq_i", JSON.stringify(u));
  }, [hist]);

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const taxAmt   = subtotal * tax / 100;
  const total    = subtotal + taxAmt;

  async function downloadPDF() {
    setBusy(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"), import("html2canvas"),
      ]);
      const c = await html2canvas(previewEl.current!, { scale: 2.5, useCORS: true, backgroundColor: "#fff" });
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const w   = pdf.internal.pageSize.getWidth();
      pdf.addImage(c.toDataURL("image/png"), "PNG", 0, 0, w, c.height * w / c.width);
      pdf.save(`${meta.no || "invoice"}.pdf`);
      saveClient(to.name);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">

      {/* Hero */}
      <div className="text-center pt-10 pb-6 px-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Free Invoice Generator
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Create Professional Invoices
        </h1>
        <p className="mt-2 text-slate-500 text-[15px] max-w-md mx-auto">
          Fill in your details, add line items, and download a clean PDF in seconds. No signup needed.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col xl:flex-row gap-6 items-start justify-center">

          {/* ── LEFT: FORM CARD ── */}
          <div className="w-full xl:w-[500px] flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">

              {/* Card header */}
              <div className="px-7 pt-6 pb-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-widest text-slate-400">New Document</p>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Invoice Details</h2>
                </div>
                <div className="flex items-center gap-2">
                  {ACCENT_COLORS.map(ac => (
                    <button
                      key={ac.hex}
                      title={ac.name}
                      onClick={() => setColor(ac.hex)}
                      className="w-5 h-5 rounded-full transition-all hover:scale-110 focus:outline-none"
                      style={{
                        backgroundColor: ac.hex,
                        boxShadow: color === ac.hex ? `0 0 0 2px white, 0 0 0 3.5px ${ac.hex}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Scrollable form body */}
              <div className="px-7 py-6 space-y-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 260px)" }}>

                <SectionLabel label="Invoice Info" />
                <div className="grid grid-cols-2 gap-4">
                  <FieldWrap label="Invoice #">
                    <input className={inp} value={meta.no} placeholder="INV-001"
                      onChange={e => setMeta(p => ({ ...p, no: e.target.value }))} />
                  </FieldWrap>
                  <FieldWrap label="Currency">
                    <select className={inp + " cursor-pointer"}
                      value={cur.s} onChange={e => setCur(CURRENCIES.find(c => c.s === e.target.value)!)}>
                      {CURRENCIES.map(c => (
                        <option key={c.s} value={c.s}>{c.s} — {c.l.split(" — ")[0]}</option>
                      ))}
                    </select>
                  </FieldWrap>
                  <FieldWrap label="Issue Date">
                    <input type="date" className={inp} value={meta.date}
                      onChange={e => setMeta(p => ({ ...p, date: e.target.value }))} />
                  </FieldWrap>
                  <FieldWrap label="Due Date">
                    <input type="date" className={inp} value={meta.due}
                      onChange={e => setMeta(p => ({ ...p, due: e.target.value }))} />
                  </FieldWrap>
                </div>

                <hr className="border-dashed border-slate-200" />

                {/* From + Bill To side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <SectionLabel label="From (You)" color={color} />
                    <input className={inp} placeholder="Your Name" value={from.name}
                      onChange={e => setFrom(p => ({ ...p, name: e.target.value }))} />
                    <input className={inp} placeholder="Email" type="email" value={from.email}
                      onChange={e => setFrom(p => ({ ...p, email: e.target.value }))} />
                    <input className={inp} placeholder="Phone" type="tel" value={from.phone}
                      onChange={e => setFrom(p => ({ ...p, phone: e.target.value }))} />
                    <textarea className={inp + " resize-none"} placeholder="Address" rows={2}
                      value={from.address} onChange={e => setFrom(p => ({ ...p, address: e.target.value }))} />
                  </div>
                  <div className="space-y-3">
                    <SectionLabel label="Bill To" color={color} />
                    <div>
                      <input className={inp} placeholder="Client Name" value={to.name} list="cl-names"
                        onChange={e => setTo(p => ({ ...p, name: e.target.value }))} />
                      <datalist id="cl-names">{clients.map(c => <option key={c} value={c} />)}</datalist>
                    </div>
                    <input className={inp} placeholder="Client Email" type="email" value={to.email}
                      onChange={e => setTo(p => ({ ...p, email: e.target.value }))} />
                    <input className={inp} placeholder="Client Phone" type="tel" value={to.phone}
                      onChange={e => setTo(p => ({ ...p, phone: e.target.value }))} />
                    <textarea className={inp + " resize-none"} placeholder="Address" rows={2}
                      value={to.address} onChange={e => setTo(p => ({ ...p, address: e.target.value }))} />
                  </div>
                </div>

                <hr className="border-dashed border-slate-200" />

                <SectionLabel label="Items & Services" />
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="grid text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-200"
                    style={{ gridTemplateColumns: "1fr 52px 76px 76px 28px", padding: "10px 14px" }}>
                    <span>Description</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Rate</span>
                    <span className="text-right">Amount</span>
                    <span />
                  </div>
                  <AnimatePresence>
                    {items.map((item, idx) => (
                      <motion.div key={item.id}
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                        className="grid border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                        style={{ gridTemplateColumns: "1fr 52px 76px 76px 28px", padding: "9px 14px", alignItems: "center" }}>
                        <div>
                          <input className="w-full bg-transparent text-[13px] text-slate-700 placeholder:text-slate-300 outline-none"
                            placeholder={`Item ${idx + 1}`} value={item.desc} list={`h-${item.id}`}
                            onChange={e => {
                              setItems(p => p.map(i => i.id === item.id ? { ...i, desc: e.target.value } : i));
                              saveHist(e.target.value);
                            }} />
                          <datalist id={`h-${item.id}`}>{hist.map(s => <option key={s} value={s} />)}</datalist>
                        </div>
                        <input type="number" min="0"
                          className="w-full bg-transparent text-[13px] text-slate-700 outline-none text-center"
                          value={item.qty}
                          onChange={e => setItems(p => p.map(i => i.id === item.id ? { ...i, qty: +e.target.value || 0 } : i))} />
                        <input type="number" min="0" step="0.01"
                          className="w-full bg-transparent text-[13px] text-slate-700 outline-none text-right"
                          value={item.rate}
                          onChange={e => setItems(p => p.map(i => i.id === item.id ? { ...i, rate: +e.target.value || 0 } : i))} />
                        <span className="text-[13px] font-semibold text-slate-800 text-right tabular-nums">
                          {cur.s}{f2(item.qty * item.rate)}
                        </span>
                        <button onClick={() => setItems(p => p.filter(i => i.id !== item.id))}
                          className={`flex items-center justify-center w-5 h-5 rounded text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all ${items.length === 1 ? "invisible" : ""}`}>
                          <Trash2 size={11} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <button onClick={() => setItems(p => [...p, mk()])}
                  className="flex items-center gap-2 text-[13px] font-semibold transition-all hover:opacity-70"
                  style={{ color }}>
                  <Plus size={15} />
                  Add Item
                </button>

                {/* Totals */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="px-5 py-4 space-y-3 bg-slate-50/70">
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-slate-500 font-medium">Subtotal</span>
                      <span className="font-semibold text-slate-800 tabular-nums">{cur.s}{f2(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-slate-500 font-medium flex items-center gap-2">
                        Tax (%)
                        <input type="number" min="0" max="100"
                          className="w-14 text-center rounded-lg border border-slate-200 bg-white px-2 py-1 text-[12px] outline-none focus:border-indigo-400 transition-all"
                          value={tax || ""} placeholder="0" onChange={e => setTax(+e.target.value || 0)} />
                      </span>
                      <span className="font-semibold text-slate-800 tabular-nums">{cur.s}{f2(taxAmt)}</span>
                    </div>
                  </div>
                  <div className="px-5 py-4 flex justify-between items-center bg-white border-t border-slate-200">
                    <span className="text-[15px] font-bold text-slate-900">Total Due</span>
                    <span className="text-2xl font-extrabold tabular-nums" style={{ color }}>{cur.s}{f2(total)}</span>
                  </div>
                </div>

                <hr className="border-dashed border-slate-200" />

                <SectionLabel label="Notes / Payment Terms" />
                <textarea rows={3} className={inp + " resize-none"}
                  placeholder="e.g. Payment due within 30 days..."
                  value={meta.notes}
                  onChange={e => setMeta(p => ({ ...p, notes: e.target.value }))} />

              </div>

              {/* Action buttons */}
              <div className="px-7 py-5 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={downloadPDF} disabled={busy}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[13.5px] font-bold text-white disabled:opacity-60 transition-all"
                  style={{ backgroundColor: color, boxShadow: `0 6px 20px ${color}40` }}>
                  {busy ? <Spinner /> : <Download size={15} />}
                  {busy ? "Generating..." : "Download PDF"}
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-[13.5px] font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all">
                  <Printer size={15} />
                  Print
                </motion.button>
              </div>

            </div>
          </div>

          {/* ── RIGHT: LIVE PREVIEW CARD ── */}
          <div className="w-full xl:flex-1 xl:min-w-0 xl:sticky xl:top-24 no-print">

            {/* Status bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10.5px] font-bold uppercase tracking-widest text-slate-400">Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
                  {meta.no || "—"}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full ${
                  meta.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {meta.status}
                </span>
              </div>
            </div>

            {/* Invoice paper */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div ref={previewEl} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

                <div className="h-1.5" style={{ backgroundColor: color }} />

                <div className="p-10">

                  {/* Invoice header */}
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-3"
                        style={{ backgroundColor: color }}>
                        {(from.name || "I")[0].toUpperCase()}
                      </div>
                      <p className="text-[15px] font-bold text-slate-900">{from.name || "Your Business Name"}</p>
                      <p className="text-[12.5px] text-slate-500 mt-0.5">{from.email || "your@email.com"}</p>
                      {from.phone   && <p className="text-[12px] text-slate-400 mt-0.5">{from.phone}</p>}
                      {from.address && <p className="text-[12px] text-slate-400 mt-0.5 whitespace-pre-line">{from.address}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-[44px] font-black leading-none tracking-widest select-none"
                        style={{ color: `${color}1a` }}>INVOICE</p>
                      <p className="text-[15px] font-bold text-slate-900 mt-1">#{meta.no || "—"}</p>
                      <p className="text-[12px] text-slate-500 mt-1">
                        Issued: <span className="font-semibold text-slate-700">{meta.date || "—"}</span>
                      </p>
                      {meta.due && (
                        <p className="text-[12px] text-slate-500">
                          Due: <span className="font-semibold text-slate-700">{meta.due}</span>
                        </p>
                      )}
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          backgroundColor: meta.status === "paid" ? "#d1fae5" : "#fef3c7",
                          color: meta.status === "paid" ? "#065f46" : "#92400e",
                        }}>
                        {meta.status}
                      </span>
                    </div>
                  </div>

                  {/* Bill To */}
                  <div className="mb-8 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[9.5px] font-bold uppercase tracking-widest text-slate-400 mb-2">Bill To</p>
                    <p className="text-[16px] font-bold text-slate-900">{to.name || "Client Name"}</p>
                    <p className="text-[12.5px] text-slate-500 mt-0.5">{to.email || "client@email.com"}</p>
                    {to.phone   && <p className="text-[12px] text-slate-400 mt-0.5">{to.phone}</p>}
                    {to.address && <p className="text-[12px] text-slate-400 mt-0.5 whitespace-pre-line">{to.address}</p>}
                  </div>

                  {/* Items table */}
                  <table className="w-full mb-6">
                    <thead>
                      <tr style={{ backgroundColor: `${color}12`, borderBottom: `2px solid ${color}22` }}>
                        {["Description", "Qty", "Rate", "Amount"].map((h, i) => (
                          <th key={h} style={{ color, textAlign: i === 0 ? "left" : i === 1 ? "center" : "right", padding: "10px 8px" }}
                            className="text-[10px] font-bold uppercase tracking-widest">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((it, idx) => (
                        <tr key={it.id} className="border-b border-slate-100">
                          <td className="py-3 px-2 text-[13px] text-slate-700 font-medium">{it.desc || `Item ${idx + 1}`}</td>
                          <td className="py-3 px-2 text-[13px] text-slate-500 text-center tabular-nums">{it.qty}</td>
                          <td className="py-3 px-2 text-[13px] text-slate-500 text-right tabular-nums">{cur.s}{f2(it.rate)}</td>
                          <td className="py-3 px-2 text-[13px] font-bold text-right tabular-nums text-slate-900">{cur.s}{f2(it.qty * it.rate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Totals */}
                  <div className="flex justify-end mb-8">
                    <div className="w-56 space-y-2.5">
                      <div className="flex justify-between text-[12.5px]">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="font-semibold text-slate-700 tabular-nums">{cur.s}{f2(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[12.5px]">
                        <span className="text-slate-500">Tax ({tax}%)</span>
                        <span className="font-semibold text-slate-700 tabular-nums">{cur.s}{f2(taxAmt)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t-2 border-slate-200">
                        <span className="text-[14px] font-bold text-slate-900">Total</span>
                        <span className="text-[22px] font-extrabold tabular-nums" style={{ color }}>{cur.s}{f2(total)}</span>
                      </div>
                    </div>
                  </div>

                  {meta.notes && (
                    <div className="pt-5 border-t border-slate-100">
                      <p className="text-[9.5px] font-bold uppercase tracking-widest text-slate-400 mb-2">Notes</p>
                      <p className="text-[12.5px] text-slate-500 leading-relaxed whitespace-pre-line">{meta.notes}</p>
                    </div>
                  )}

                  <div className="flex justify-between mt-8 pt-4 border-t border-slate-100">
                    <p className="text-[10.5px] text-slate-300">Generated by invoicequick.com</p>
                    <p className="text-[10.5px] text-slate-300">Thank you</p>
                  </div>

                </div>
              </div>
            </div>

            {/* Feature badges */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl px-3 py-3 flex items-center gap-2 border border-slate-200 shadow-sm">
                <Zap size={14} className="text-slate-400 flex-shrink-0" />
                <span className="text-[11.5px] font-semibold text-slate-600">Instant PDF</span>
              </div>
              <div className="bg-white rounded-2xl px-3 py-3 flex items-center gap-2 border border-slate-200 shadow-sm">
                <Palette size={14} className="text-slate-400 flex-shrink-0" />
                <span className="text-[11.5px] font-semibold text-slate-600">Brand Colors</span>
              </div>
              <div className="bg-white rounded-2xl px-3 py-3 flex items-center gap-2 border border-slate-200 shadow-sm">
                <Upload size={14} className="text-slate-400 flex-shrink-0" />
                <span className="text-[11.5px] font-semibold text-slate-600">Logo Upload</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Features section */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Powerful features for busy professionals
            </h2>
            <p className="mt-2 text-slate-500 text-[15px]">Everything you need. Nothing you don't.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="rounded-3xl border border-slate-100 shadow-sm p-8 hover:shadow-md hover:-translate-y-0.5 transition-all bg-white">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-2">Zero Storage</h3>
              <p className="text-[13.5px] text-slate-500 leading-relaxed">
                We don't store your data. Everything is processed in your browser, ensuring maximum privacy for your financials.
              </p>
            </div>

            <div className="rounded-3xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-0.5 transition-all" style={{ backgroundColor: "#4f46e5" }}>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="text-[16px] font-bold text-white mb-2">Smart Memory</h3>
              <p className="text-[13.5px] text-white/70 leading-relaxed">
                InvoiceQuick remembers your business details and items locally, so you can generate next month's invoice in seconds.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 shadow-sm p-8 hover:shadow-md hover:-translate-y-0.5 transition-all bg-white">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-2">100% Free</h3>
              <p className="text-[13.5px] text-slate-500 leading-relaxed">
                No hidden fees, no subscriptions. Create unlimited professional invoices without ever entering a credit card.
              </p>
            </div>

          </div>
        </div>
      </div>

      </div>


  );
}


function SectionLabel({ label, color }: { label: string; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color || "#cbd5e1" }} />
      <span className="text-[10.5px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
}

function FieldWrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10.5px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
