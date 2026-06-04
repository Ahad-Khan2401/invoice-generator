"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Trash2, Download, Printer, Plus, Upload, X,
  FileText, Receipt, ClipboardList, Tag, Percent,
} from "lucide-react";
import DownloadAdModal from "@/components/DownloadAdModal";
import ProModal, { useAuth } from "@/components/ProModal";
import { SITE } from "@/lib/config";

/* ─── Types ──────────────────────────────────────── */
interface Item  { id: number; desc: string; qty: number; rate: number }
interface Party { name: string; email: string; phone: string; address: string }
type DocType    = "invoice" | "receipt" | "quotation";
type PayStatus  = "paid"    | "unpaid";
type TaxType    = "exclusive" | "inclusive";
type DiscType   = "%" | "fixed";

/* ─── Constants ──────────────────────────────────── */
const COLORS_FREE = [
  { hex:"#4f46e5",name:"Indigo"  }, { hex:"#0ea5e9",name:"Sky"    },
  { hex:"#10b981",name:"Emerald" }, { hex:"#f59e0b",name:"Amber"  },
  { hex:"#ef4444",name:"Red"     }, { hex:"#8b5cf6",name:"Violet" },
];
const COLORS_PRO = [
  { hex:"#0f172a",name:"Slate"   }, { hex:"#7f1d1d",name:"Crimson"},
  { hex:"#14532d",name:"Forest"  }, { hex:"#1e3a5f",name:"Navy"   },
  { hex:"#713f12",name:"Brown"   }, { hex:"#4a044e",name:"Purple" },
  { hex:"#134e4a",name:"Teal"    }, { hex:"#1c1917",name:"Carbon" },
  { hex:"#831843",name:"Rose"    }, { hex:"#1e1b4b",name:"Ink"    },
  { hex:"#052e16",name:"Pine"    }, { hex:"#450a0a",name:"Maroon" },
];

const CURRENCIES = [
  {s:"$",l:"USD"},{s:"€",l:"EUR"},{s:"£",l:"GBP"},
  {s:"₹",l:"INR"},{s:"₨",l:"PKR"},{s:"CA$",l:"CAD"},{s:"A$",l:"AUD"},
];

const DOC_TYPES = [
  { key:"invoice"   as DocType, label:"Invoice",   Icon:FileText,      color:"#4f46e5", desc:"Bill for services"     },
  { key:"receipt"   as DocType, label:"Receipt",   Icon:Receipt,       color:"#10b981", desc:"Proof of payment"      },
  { key:"quotation" as DocType, label:"Quotation", Icon:ClipboardList, color:"#f59e0b", desc:"Price estimate"        },
];

const NET_TERMS = [
  { label:"Net 15",days:15 }, { label:"Net 30",days:30 },
  { label:"Net 45",days:45 }, { label:"Net 60",days:60 },
];

/* ─── Helpers ────────────────────────────────────── */
const f2    = (n:number) => n.toFixed(2);
const today = () => new Date().toISOString().split("T")[0];
const blank = ():Party => ({ name:"",email:"",phone:"",address:"" });
const addDays = (dateStr:string, days:number) => {
  const d = new Date(dateStr || Date.now());
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};
let nextId = 2;

/* ─── Shared styles ──────────────────────────────── */
const card:React.CSSProperties = {
  background:"#ffffff", borderRadius:20,
  border:"1px solid #e4e9f2",
  boxShadow:"0 2px 8px rgba(0,0,0,0.04),0 8px 32px rgba(15,23,42,0.07)",
};
const baseInput:React.CSSProperties = {
  width:"100%", padding:"10px 14px", fontSize:13.5,
  border:"1.5px solid #e4e9f2", borderRadius:10,
  background:"#fcfcfe", color:"#0d1117",
  outline:"none", transition:"all .2s", fontFamily:"inherit",
};
const sectionTitle:React.CSSProperties = {
  fontSize:10.5, fontWeight:800, letterSpacing:"0.09em",
  textTransform:"uppercase", color:"#94a3b8",
  display:"flex", alignItems:"center", gap:8, marginBottom:12,
};
const labelStyle:React.CSSProperties = {
  display:"block", fontSize:11, fontWeight:700,
  letterSpacing:"0.07em", textTransform:"uppercase",
  color:"#94a3b8", marginBottom:6,
};

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function InvoiceGenerator({
  heading,
  subheading,
  defaultCurrency,
}: {
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  defaultCurrency?: string;
} = {}) {

  /* ── State ── */
  const [from,       setFrom]       = useState<Party>(blank());
  const [to,         setTo]         = useState<Party>(blank());
  const [docType,    setDocType]    = useState<DocType>("invoice");
  const [status,     setStatus]     = useState<PayStatus>("unpaid");
  const [taxType,    setTaxType]    = useState<TaxType>("exclusive");
  const [discType,   setDiscType]   = useState<DiscType>("%");
  const [discount,   setDiscount]   = useState(0);
  const [meta,       setMeta]       = useState({
    no:"INV-001", date:today(), due:"",
    notes:"Payment due within 30 days. Thank you for your business!",
    bankDetails:"",
    signNote:"This is a computer-generated document and does not require a signature.",
  });
  const [items,      setItems]      = useState<Item[]>([{id:1,desc:"",qty:1,rate:0}]);
  const [tax,        setTax]        = useState(0);
  const [cur,        setCur]        = useState(
    CURRENCIES.find((c) => c.s === defaultCurrency) ?? CURRENCIES[0]
  );
  const [color,      setColor]      = useState(COLORS_FREE[0].hex);
  const [brandLogo,  setBrandLogo]  = useState<string|null>(null);
  const [wmLogo,     setWmLogo]     = useState<string|null>(null);
  const [busy,       setBusy]       = useState(false);
  // Ad modal shown on Download / Print (user-initiated, never gates the action)
  const [adModal, setAdModal] = useState<{ open: boolean; status: "working" | "done"; action: "download" | "print" }>({
    open: false, status: "working", action: "download",
  });
  const [proModalOpen,   setProModalOpen]   = useState(false);
  const [paymentTrigger, setPaymentTrigger] = useState(false);
  const { user, isLoggedIn, isPro, isLoaded, justPaid, signIn } = useAuth();

  // Auto-open modal after payment redirect or "pdfbb:openSignIn" event
  useEffect(() => {
    if (justPaid) { setPaymentTrigger(true); setProModalOpen(true); }
  }, [justPaid]);

  useEffect(() => {
    const handler = () => setProModalOpen(true);
    window.addEventListener("pdfbb:openSignIn", handler);
    return () => window.removeEventListener("pdfbb:openSignIn", handler);
  }, []);

  const previewRef = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);

  /* ── Calculations ── */
  const subtotal    = items.reduce((s,i) => s + i.qty*i.rate, 0);
  const discAmt     = discType==="%"
    ? subtotal * discount / 100
    : Math.min(discount, subtotal);
  const afterDisc   = subtotal - discAmt;
  const taxAmt      = taxType==="exclusive" ? afterDisc * tax / 100 : 0;
  const total       = afterDisc + taxAmt;
  const docCfg      = DOC_TYPES.find(d=>d.key===docType)!;
  const showStatus  = docType !== "quotation";

  /* ── Item helpers ── */
  const addItem    = () => setItems(p=>[...p,{id:nextId++,desc:"",qty:1,rate:0}]);
  const removeItem = (id:number) => setItems(p=>p.filter(i=>i.id!==id));
  const editItem   = (id:number, f:keyof Item, v:string|number) =>
    setItems(p=>p.map(i=>i.id===id ? {...i,[f]:v} : i));

  const readFile = (file:File, cb:(url:string)=>void) => {
    const r = new FileReader();
    r.onload = e => cb(e.target?.result as string);
    r.readAsDataURL(file);
  };

  /* ── Auto-scale preview to fit A4 ── */
  const autoScale = useCallback(() => {
    const el = previewRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    // Reset first to measure natural height
    el.style.transform = "none";
    el.style.width = "100%";
    wrap.style.height = "auto";

    requestAnimationFrame(() => {
      const natural = el.scrollHeight;
      const A4_PX   = 1050; // A4 at typical screen DPI
      if (natural > A4_PX) {
        const s = A4_PX / natural;
        el.style.transform      = `scale(${s})`;
        el.style.transformOrigin= "top left";
        el.style.width          = `${(100/s).toFixed(2)}%`;
        wrap.style.height       = `${A4_PX}px`;
        wrap.style.overflow     = "hidden";
      }
    });
  }, []);

  useEffect(() => { autoScale(); },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, from, to, meta, tax, taxType, discount, discType, cur, color, wmLogo, brandLogo, docType, status]);

  /* ── PDF download ── */
  async function downloadPDF() {
    const el   = previewRef.current;
    const wrap = wrapRef.current;
    if (!el) return;
    setBusy(true);

    // Save ALL scale-related styles (el + wrapper)
    const savedTx   = el.style.transform;
    const savedTxO  = el.style.transformOrigin;
    const savedW    = el.style.width;
    const savedWH   = wrap ? wrap.style.height   : "";
    const savedWOv  = wrap ? wrap.style.overflow  : "";

    // Expand to natural size so html2canvas captures the full document
    el.style.transform       = "none";
    el.style.transformOrigin = "top left";
    el.style.width           = "100%";
    if (wrap) {
      wrap.style.height   = "auto";
      wrap.style.overflow = "visible";
    }

    // Two animation frames: first lets React flush, second lets browser reflow
    await new Promise<void>(res =>
      requestAnimationFrame(() => requestAnimationFrame(() => res()))
    );

    let downloadOk = false;
    try {
      // html2canvas-pro: drop-in replacement that supports Tailwind v4
      // lab()/oklch() color functions (html2canvas v1 hangs on them)
      const [{default:jsPDF},{default:html2canvas}] = await Promise.all([
        import("jspdf"), import("html2canvas-pro"),
      ]);
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const pdf = new jsPDF({ unit:"mm", format:"a4" });
      const pw  = pdf.internal.pageSize.getWidth();
      const ph  = pdf.internal.pageSize.getHeight();
      const ih  = (canvas.height * pw) / canvas.width;

      if (ih <= ph) {
        // Single page
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pw, ih);
      } else {
        // Multi-page split
        const pageCanvas = document.createElement("canvas");
        const pxPerMm    = canvas.width / pw;
        const pageHpx    = ph * pxPerMm;
        let   y          = 0;
        while (y < canvas.height) {
          const sliceH = Math.min(pageHpx, canvas.height - y);
          pageCanvas.width  = canvas.width;
          pageCanvas.height = sliceH;
          const ctx = pageCanvas.getContext("2d")!;
          ctx.drawImage(canvas, 0, y, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
          if (y > 0) pdf.addPage();
          pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", 0, 0, pw, sliceH / pxPerMm);
          y += pageHpx;
        }
      }

      // Reliable cross-browser download via Blob URL
      const blob = pdf.output("blob");
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `${meta.no || docType}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      downloadOk = true;

      // Auto-save to dashboard (signed-in users only — fire-and-forget)
      if (user?.token) {
        fetch("/api/invoices", {
          method:  "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
          body: JSON.stringify({
            invoice_no:  meta.no,
            doc_type:    docType,
            client_name: to.name,
            total,
            currency: cur.l,
            data: { from, to, meta, items, tax, taxType, discount, discType, docType, status, cur, color },
          }),
        }).catch(() => {}); // silent — dashboard is a convenience, not critical
      }
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      // Restore preview transform/layout styles
      el.style.transform       = savedTx;
      el.style.transformOrigin = savedTxO;
      el.style.width           = savedW;
      if (wrap) {
        wrap.style.height   = savedWH;
        wrap.style.overflow = savedWOv;
      }
      setBusy(false);
      // Only mark modal "done" if download actually succeeded
      if (downloadOk) {
        setAdModal(m => m.open ? { ...m, status: "done" } : m);
      } else {
        setAdModal({ open: false, status: "working", action: "download" });
      }
    }
  }

  /* ── User-initiated actions: open the ad modal, then run the action.
        The download/print ALWAYS proceeds — it is never gated by the ad. ── */
  function startDownload() {
    // Pro users skip the ad modal entirely
    if (isPro) { downloadPDF(); return; }
    setAdModal({ open: true, status: "working", action: "download" });
    downloadPDF();
  }
  function startPrint() {
    if (isPro) { setTimeout(() => window.print(), 50); return; }
    setAdModal({ open: true, status: "working", action: "print" });
    setTimeout(() => {
      window.print();
      setAdModal(m => m.open ? { ...m, status: "done" } : m);
    }, 400);
  }

  /* ── Status config ── */
  const stCfg = {
    paid:   { label:"✓ Paid",  color:"#16a34a", bg:"#dcfce7", border:"#bbf7d0" },
    unpaid: { label:"Unpaid",  color:"#b45309", bg:"#fef3c7", border:"#fde68a" },
  };

  /* ─── Inline input focus helpers ─── */
  const focusIn  = (e:React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    e.currentTarget.style.borderColor  = color;
    e.currentTarget.style.boxShadow    = `0 0 0 3px ${color}18`;
    e.currentTarget.style.background   = "white";
  };
  const focusOut = (e:React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    e.currentTarget.style.borderColor  = "#e4e9f2";
    e.currentTarget.style.boxShadow    = "none";
    e.currentTarget.style.background   = "#fcfcfe";
  };

  /* ══════ RENDER ══════ */
  return (
    <div className="ig-root" style={{ minHeight:"100vh", background:"linear-gradient(160deg,#f0f4ff 0%,#f8faff 60%,#faf5ff 100%)" }}>

      {/* ── Hero ── */}
      <div className="ig-hero" style={{ textAlign:"center", padding:"48px 24px 32px" }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8, padding:"5px 16px",
          borderRadius:99, marginBottom:16, background:"rgba(79,70,229,0.07)",
          border:"1px solid rgba(79,70,229,0.16)",
        }}>
          <span style={{ width:6,height:6,borderRadius:"50%",background:"#4f46e5",display:"inline-block" }}/>
          <span style={{ fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#4f46e5" }}>
            Free Professional Document Generator
          </span>
        </div>
        <h1 style={{ fontSize:"clamp(30px,4.5vw,50px)",fontWeight:900,letterSpacing:"-0.04em",color:"#0d1117",lineHeight:1.15,marginBottom:12 }}>
          {heading ?? (
            <>
              Create{" "}
              <span style={{ background:"linear-gradient(135deg,#4f46e5,#7c3aed)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
                Professional
              </span>{" "}
              Documents
            </>
          )}
        </h1>
        <p style={{ fontSize:15,color:"#64748b",maxWidth:460,margin:"0 auto 20px",lineHeight:1.65 }}>
          {subheading ?? (
            <>
              Invoices, Receipts, Quotations — download a perfect PDF in seconds.{" "}
              <strong style={{ color:"#4f46e5",fontWeight:600 }}>No signup needed.</strong>
            </>
          )}
        </p>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:20,flexWrap:"wrap" }}>
          {["🔒 100% Private","⚡ Instant PDF","🖨️ Clean Print","📄 Multi-page PDF"].map(t=>(
            <span key={t} style={{ fontSize:12.5,color:"#94a3b8",fontWeight:500 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Two-column ── */}
      <div className="ig-toolwrap" style={{ maxWidth:1200,margin:"0 auto" }}>
        <div className="ig-grid grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 items-start">

          {/* ══════════════ FORM CARD ══════════════ */}
          <div className="ig-form" style={card}>

            {/* Header */}
            <div className="ig-formhead" style={{ borderBottom:"1px solid #f0f3fa",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <div>
                <p style={{ fontSize:17,fontWeight:800,color:"#0d1117",letterSpacing:"-0.02em" }}>Document Details</p>
                <p style={{ fontSize:12,color:"#9ca3af",marginTop:2 }}>Fill in the details below</p>
              </div>
              <div style={{ display:"flex",gap:7,flexWrap:"wrap",alignItems:"center" }}>
                {COLORS_FREE.map(c=>(
                  <button key={c.hex} title={c.name} onClick={()=>setColor(c.hex)} style={{
                    width:21,height:21,borderRadius:"50%",background:c.hex,border:"none",cursor:"pointer",
                    boxShadow: color===c.hex ? `0 0 0 2.5px #fff,0 0 0 4.5px ${c.hex}` : "none",
                    transform: color===c.hex ? "scale(1.2)" : "scale(1)", transition:"all .2s",
                  }}/>
                ))}
                {isPro
                  ? COLORS_PRO.map(c=>(
                    <button key={c.hex} title={c.name} onClick={()=>setColor(c.hex)} style={{
                      width:21,height:21,borderRadius:"50%",background:c.hex,border:"none",cursor:"pointer",
                      boxShadow: color===c.hex ? `0 0 0 2.5px #fff,0 0 0 4.5px ${c.hex}` : "none",
                      transform: color===c.hex ? "scale(1.2)" : "scale(1)", transition:"all .2s",
                    }}/>
                  ))
                  : (
                    <button title="Unlock 12 Pro colours" onClick={()=>setProModalOpen(true)} style={{
                      fontSize:9,fontWeight:800,padding:"3px 7px",borderRadius:6,border:"1.5px dashed #c4b5fd",
                      background:"#f5f3ff",color:"#7c3aed",cursor:"pointer",letterSpacing:"0.06em",
                    }}>✦ PRO</button>
                  )
                }
              </div>
            </div>

            {/* Scrollable body */}
            <div className="ig-formbody">

              {/* ── Document Type ── */}
              <div style={{ marginBottom:22 }}>
                <p style={sectionTitle}><Accent c={color}/>Document Type</p>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
                  {DOC_TYPES.map(dt=>{
                    const active = docType===dt.key;
                    return (
                      <button key={dt.key} onClick={()=>setDocType(dt.key)} style={{
                        padding:"12px 6px",borderRadius:12,border:"1.5px solid",
                        borderColor: active ? dt.color : "#e4e9f2",
                        background:  active ? `${dt.color}0f` : "white",
                        cursor:"pointer",transition:"all .2s",
                        display:"flex",flexDirection:"column",alignItems:"center",gap:5,
                      }}>
                        <dt.Icon size={16} style={{ color: active?dt.color:"#94a3b8",transition:"color .2s" }}/>
                        <span style={{ fontSize:12.5,fontWeight:700,color:active?dt.color:"#64748b" }}>{dt.label}</span>
                        <span style={{ fontSize:10,color:active?dt.color+"99":"#94a3b8",textAlign:"center",lineHeight:1.3 }}>{dt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Payment Status (invoice & receipt only) ── */}
              {showStatus && (
                <div style={{ marginBottom:22 }}>
                  <p style={sectionTitle}><Accent c={color}/>Payment Status</p>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                    {(["unpaid","paid"] as PayStatus[]).map(s=>{
                      const cfg = stCfg[s]; const active = status===s;
                      return (
                        <button key={s} onClick={()=>setStatus(s)} style={{
                          padding:"11px 10px",borderRadius:12,border:"1.5px solid",
                          borderColor: active ? cfg.border : "#e4e9f2",
                          background:  active ? cfg.bg     : "white",
                          cursor:"pointer",transition:"all .2s",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                        }}>
                          <span style={{ fontSize:15 }}>{s==="paid"?"✅":"⏳"}</span>
                          <span style={{ fontSize:13,fontWeight:700,color:active?cfg.color:"#94a3b8" }}>{cfg.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <Divider/>

              {/* ── Doc # + Currency ── */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,margin:"20px 0" }}>
                <Fld label={`${docCfg.label} #`}>
                  <Inp value={meta.no} placeholder="INV-001" accent={color} fi={focusIn} fo={focusOut}
                    onChange={v=>setMeta(p=>({...p,no:v}))}/>
                </Fld>
                <Fld label="Currency">
                  <select value={cur.s} onChange={e=>setCur(CURRENCIES.find(c=>c.s===e.target.value)!)}
                    style={{ ...baseInput,cursor:"pointer" }} onFocus={focusIn} onBlur={focusOut}>
                    {CURRENCIES.map(c=><option key={c.s} value={c.s}>{c.s} — {c.l}</option>)}
                  </select>
                </Fld>
              </div>

              {/* ── Dates + Net Terms ── */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20 }}>
                <Fld label="Date">
                  <Inp type="date" value={meta.date} accent={color} fi={focusIn} fo={focusOut}
                    onChange={v=>setMeta(p=>({...p,date:v}))}/>
                </Fld>
                {docType!=="receipt" && (
                  <Fld label="Due Date">
                    <div style={{ position:"relative" }}>
                      <Inp type="date" value={meta.due} accent={color} fi={focusIn} fo={focusOut}
                        onChange={v=>setMeta(p=>({...p,due:v}))}/>
                      <div style={{ display:"flex",gap:4,marginTop:6,flexWrap:"wrap" }}>
                        {NET_TERMS.map(t=>(
                          <button key={t.label} onClick={()=>setMeta(p=>({...p,due:addDays(p.date,t.days)}))}
                            style={{
                              fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:6,
                              border:"1px solid #e4e9f2",background:"white",color:"#64748b",
                              cursor:"pointer",transition:"all .15s",
                            }}
                            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=color;(e.currentTarget as HTMLElement).style.color=color;}}
                            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="#e4e9f2";(e.currentTarget as HTMLElement).style.color="#64748b";}}>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Fld>
                )}
              </div>

              <Divider/>

              {/* ── From + Bill To ── */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,margin:"20px 0 22px" }}>
                {/* FROM */}
                <div>
                  <p style={sectionTitle}><Accent c={color}/>From (You)</p>
                  {/* Brand Logo Upload */}
                  <div style={{ marginBottom:10 }}>
                    {brandLogo ? (
                      <div style={{ position:"relative",display:"inline-block" }}>
                        <img src={brandLogo} alt="Brand" style={{ height:44,maxWidth:110,objectFit:"contain",borderRadius:8,border:"1.5px solid #e4e9f2",padding:4,background:"white" }}/>
                        <button onClick={()=>setBrandLogo(null)} style={{ position:"absolute",top:-6,right:-6,width:18,height:18,borderRadius:"50%",background:"#ef4444",border:"2px solid white",color:"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:0 }}>
                          <X size={10}/>
                        </button>
                      </div>
                    ) : (
                      <label style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 12px",border:"1.5px dashed #e4e9f2",borderRadius:10,cursor:"pointer",fontSize:11.5,color:"#94a3b8",fontWeight:500,transition:"all .2s" }}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=color;(e.currentTarget as HTMLElement).style.color=color;(e.currentTarget as HTMLElement).style.background=`${color}07`;}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="#e4e9f2";(e.currentTarget as HTMLElement).style.color="#94a3b8";(e.currentTarget as HTMLElement).style.background="transparent";}}>
                        <Upload size={12}/> Upload Brand Logo
                        <input type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{const f=e.target.files?.[0];if(f)readFile(f,setBrandLogo);}}/>
                      </label>
                    )}
                  </div>
                  <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
                    <Inp value={from.name}    placeholder="Your Name"    accent={color} fi={focusIn} fo={focusOut} onChange={v=>setFrom(p=>({...p,name:v}))}/>
                    <Inp type="email" value={from.email}  placeholder="Email"         accent={color} fi={focusIn} fo={focusOut} onChange={v=>setFrom(p=>({...p,email:v}))}/>
                    <Inp value={from.phone}   placeholder="Phone"         accent={color} fi={focusIn} fo={focusOut} onChange={v=>setFrom(p=>({...p,phone:v}))}/>
                    <TxtArea value={from.address} placeholder="Address"  accent={color} fi={focusIn} fo={focusOut} onChange={v=>setFrom(p=>({...p,address:v}))}/>
                  </div>
                </div>
                {/* BILL TO */}
                <div>
                  <p style={sectionTitle}><Accent c={color}/>{docType==="receipt"?"Received From":"Bill To"}</p>
                  <div style={{ display:"flex",flexDirection:"column",gap:9,marginTop:58 }}>
                    <Inp value={to.name}    placeholder="Client Name"   accent={color} fi={focusIn} fo={focusOut} onChange={v=>setTo(p=>({...p,name:v}))}/>
                    <Inp type="email" value={to.email}  placeholder="Client Email"  accent={color} fi={focusIn} fo={focusOut} onChange={v=>setTo(p=>({...p,email:v}))}/>
                    <Inp value={to.phone}   placeholder="Client Phone"  accent={color} fi={focusIn} fo={focusOut} onChange={v=>setTo(p=>({...p,phone:v}))}/>
                    <TxtArea value={to.address} placeholder="Address"   accent={color} fi={focusIn} fo={focusOut} onChange={v=>setTo(p=>({...p,address:v}))}/>
                  </div>
                </div>
              </div>

              <Divider/>

              {/* ── Items ── */}
              <div style={{ margin:"20px 0" }}>
                <p style={sectionTitle}><Accent c={color}/>Items & Services</p>

                <div style={{ border:"1.5px solid #f0f3fa",borderRadius:12,overflow:"hidden" }}>
                  {/* Head — with S.No */}
                  <div style={{ display:"grid",gridTemplateColumns:"24px 1fr 44px 64px 60px 24px",padding:"9px 12px",background:"#f8fafc",borderBottom:"1.5px solid #f0f3fa" }}>
                    {["#","Description","Qty","Rate","Amount",""].map((h,i)=>(
                      <span key={i} style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#9ca3af",textAlign:(i===2?"center":i>=3?"right":"left") as "center"|"right"|"left" }}>
                        {h}
                      </span>
                    ))}
                  </div>
                  {/* Rows */}
                  <>
                    {items.map((item,idx)=>(
                      <div key={item.id} className="ig-itemrow"
                        style={{ display:"grid",gridTemplateColumns:"24px 1fr 44px 64px 60px 24px",alignItems:"center",padding:"9px 12px",borderBottom:"1px solid #f8fafc",background:"white" }}>
                        {/* S.No */}
                        <span style={{ fontSize:11,fontWeight:700,color:"#c4c9d4",textAlign:"center" }}>{idx+1}</span>
                        <input style={{ background:"transparent",border:"none",outline:"none",fontSize:13,color:"#374151",width:"100%",fontFamily:"inherit" }}
                          placeholder={`Item ${idx+1}`} value={item.desc} onChange={e=>editItem(item.id,"desc",e.target.value)}/>
                        <input type="number" min="0" style={{ background:"transparent",border:"none",outline:"none",fontSize:13,color:"#374151",textAlign:"center",width:"100%",fontFamily:"inherit" }}
                          value={item.qty} onChange={e=>editItem(item.id,"qty",+e.target.value||0)}/>
                        <input type="number" min="0" step="0.01" style={{ background:"transparent",border:"none",outline:"none",fontSize:13,color:"#374151",textAlign:"right",width:"100%",fontFamily:"inherit" }}
                          value={item.rate} onChange={e=>editItem(item.id,"rate",+e.target.value||0)}/>
                        <span style={{ fontSize:13,fontWeight:700,color:"#0d1117",textAlign:"right",fontVariantNumeric:"tabular-nums" }}>
                          {cur.s}{f2(item.qty*item.rate)}
                        </span>
                        <button onClick={()=>removeItem(item.id)}
                          style={{ display:"flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:6,border:"none",background:"transparent",color:"#d1d5db",cursor:"pointer",visibility:items.length===1?"hidden":"visible",transition:"all .15s" }}
                          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#fef2f2";(e.currentTarget as HTMLElement).style.color="#ef4444";}}
                          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.color="#d1d5db";}}>
                          <Trash2 size={11}/>
                        </button>
                      </div>
                    ))}
                  </>
                  <div style={{ padding:"9px 12px",borderTop:"1px solid #f8fafc" }}>
                    <button onClick={addItem} style={{ display:"flex",alignItems:"center",gap:6,fontSize:13,fontWeight:600,color,background:"transparent",border:"none",cursor:"pointer" }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.opacity="0.7"}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.opacity="1"}>
                      <span style={{ width:17,height:17,borderRadius:"50%",border:`2px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <Plus size={9} strokeWidth={3}/>
                      </span>
                      Add Item
                    </button>
                  </div>
                </div>

                {/* ── Discount ── */}
                <div style={{ marginTop:12,padding:"12px 14px",background:"#f8fafc",borderRadius:10,border:"1.5px solid #f0f3fa" }}>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:10 }}>
                    <span style={{ fontSize:12.5,color:"#64748b",display:"flex",alignItems:"center",gap:8 }}>
                      <Tag size={13} style={{ color:"#94a3b8" }}/> Discount
                      {/* % / Fixed toggle */}
                      <span style={{ display:"flex",borderRadius:6,overflow:"hidden",border:"1px solid #e4e9f2" }}>
                        {(["%","fixed"] as DiscType[]).map(t=>(
                          <button key={t} onClick={()=>setDiscType(t)} style={{
                            fontSize:10.5,fontWeight:700,padding:"3px 8px",border:"none",cursor:"pointer",transition:"all .15s",
                            background: discType===t ? color : "white",
                            color:      discType===t ? "white" : "#94a3b8",
                          }}>{t==="%" ? "%" : "Fixed"}</button>
                        ))}
                      </span>
                      <input type="number" min="0" value={discount||""} placeholder="0"
                        onChange={e=>setDiscount(+e.target.value||0)}
                        style={{ width:60,padding:"4px 8px",textAlign:"center",fontSize:12,border:"1.5px solid #e4e9f2",borderRadius:8,fontFamily:"inherit",background:"white",outline:"none",color:"#374151" }}/>
                    </span>
                    <span style={{ fontSize:12.5,fontWeight:600,color:"#ef4444",fontVariantNumeric:"tabular-nums" }}>
                      {discAmt>0 ? `−${cur.s}${f2(discAmt)}` : "—"}
                    </span>
                  </div>
                </div>

                {/* ── Tax ── */}
                <div style={{ marginTop:10,padding:"12px 14px",background:"#f8fafc",borderRadius:10,border:"1.5px solid #f0f3fa" }}>
                  {/* Tax type toggle */}
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
                    <span style={{ fontSize:12,fontWeight:700,color:"#64748b",display:"flex",alignItems:"center",gap:8 }}>
                      <Percent size={13} style={{ color:"#94a3b8" }}/> Tax Type
                    </span>
                    <div style={{ display:"flex",borderRadius:8,overflow:"hidden",border:"1.5px solid #e4e9f2" }}>
                      {([
                        { k:"exclusive" as TaxType, label:"Exclusive" },
                        { k:"inclusive" as TaxType, label:"Inclusive" },
                      ]).map(t=>(
                        <button key={t.k} onClick={()=>setTaxType(t.k)} style={{
                          fontSize:11,fontWeight:700,padding:"5px 12px",border:"none",cursor:"pointer",transition:"all .15s",
                          background: taxType===t.k ? color : "white",
                          color:      taxType===t.k ? "white" : "#94a3b8",
                        }}>{t.label}</button>
                      ))}
                    </div>
                  </div>
                  {taxType==="exclusive" ? (
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13,color:"#64748b" }}>
                      <span style={{ display:"flex",alignItems:"center",gap:10 }}>
                        Tax Rate (%)
                        <input type="number" min="0" max="100" placeholder="0" value={tax||""}
                          onChange={e=>setTax(+e.target.value||0)}
                          style={{ width:52,padding:"4px 8px",textAlign:"center",fontSize:12,border:"1.5px solid #e4e9f2",borderRadius:8,fontFamily:"inherit",background:"white",outline:"none",color:"#374151" }}/>
                      </span>
                      <span style={{ fontWeight:600,color:"#374151",fontVariantNumeric:"tabular-nums" }}>{cur.s}{f2(taxAmt)}</span>
                    </div>
                  ) : (
                    <div style={{ display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#10b981",fontWeight:600,padding:"6px 10px",background:"#f0fdf4",borderRadius:8,border:"1px solid #bbf7d0" }}>
                      ✓ All taxes are included in the prices above
                    </div>
                  )}
                </div>

                {/* ── Total box ── */}
                <div style={{ marginTop:10,padding:"14px 16px",background:"white",borderRadius:12,border:"1.5px solid #f0f3fa",boxShadow:"0 2px 8px rgba(0,0,0,0.03)" }}>
                  {discount>0 && (
                    <div style={{ display:"flex",justifyContent:"space-between",fontSize:12.5,color:"#94a3b8",marginBottom:8 }}>
                      <span>Subtotal</span>
                      <span style={{ fontWeight:600,color:"#475569",fontVariantNumeric:"tabular-nums" }}>{cur.s}{f2(subtotal)}</span>
                    </div>
                  )}
                  {discount>0 && (
                    <div style={{ display:"flex",justifyContent:"space-between",fontSize:12.5,color:"#ef4444",marginBottom:8 }}>
                      <span>Discount {discType==="%"?`(${discount}%)`:`(Fixed)`}</span>
                      <span style={{ fontWeight:600,fontVariantNumeric:"tabular-nums" }}>−{cur.s}{f2(discAmt)}</span>
                    </div>
                  )}
                  {taxType==="exclusive" && tax>0 && (
                    <div style={{ display:"flex",justifyContent:"space-between",fontSize:12.5,color:"#94a3b8",paddingBottom:10,borderBottom:"1px solid #f0f3fa",marginBottom:10 }}>
                      <span>Tax ({tax}%)</span>
                      <span style={{ fontWeight:600,color:"#475569",fontVariantNumeric:"tabular-nums" }}>{cur.s}{f2(taxAmt)}</span>
                    </div>
                  )}
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <span style={{ fontSize:15,fontWeight:800,color:"#0d1117" }}>Total</span>
                    <span style={{ fontSize:26,fontWeight:900,color,fontVariantNumeric:"tabular-nums",letterSpacing:"-0.03em" }}>
                      {cur.s}{f2(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Divider/>

              {/* ── Bank / Payment Details ── */}
              <div style={{ margin:"20px 0" }}>
                <p style={sectionTitle}><Accent c={color}/>Bank / Payment Details <span style={{ fontSize:10,fontWeight:400,color:"#c4c9d4",textTransform:"none",letterSpacing:0 }}>(optional)</span></p>
                <TxtArea value={meta.bankDetails} placeholder={"Bank: XYZ Bank\nAccount #: 1234-5678\nRouting: 0000"} accent={color} fi={focusIn} fo={focusOut} rows={3}
                  onChange={v=>setMeta(p=>({...p,bankDetails:v}))}/>
              </div>

              {/* ── Watermark ── */}
              <div style={{ marginBottom:20 }}>
                <p style={sectionTitle}><Accent c={color}/>Watermark Logo <span style={{ fontSize:10,fontWeight:400,color:"#c4c9d4",textTransform:"none",letterSpacing:0 }}>(optional)</span></p>
                {wmLogo ? (
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <img src={wmLogo} alt="" style={{ height:38,maxWidth:100,objectFit:"contain",borderRadius:8,border:"1.5px solid #e4e9f2",padding:4,background:"white" }}/>
                    <button onClick={()=>setWmLogo(null)} style={{ display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#ef4444",background:"transparent",border:"none",cursor:"pointer" }}>
                      <X size={12}/> Remove
                    </button>
                  </div>
                ) : (
                  <label style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"11px",borderRadius:12,cursor:"pointer",border:"2px dashed #e4e9f2",fontSize:13,color:"#94a3b8",fontWeight:500,transition:"all .2s" }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=color;(e.currentTarget as HTMLElement).style.color=color;(e.currentTarget as HTMLElement).style.background=`${color}07`;}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="#e4e9f2";(e.currentTarget as HTMLElement).style.color="#94a3b8";(e.currentTarget as HTMLElement).style.background="transparent";}}>
                    <Upload size={14}/> Upload Watermark
                    <input type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{const f=e.target.files?.[0];if(f)readFile(f,setWmLogo);}}/>
                  </label>
                )}
              </div>

              {/* ── Notes ── */}
              <div style={{ marginBottom:18 }}>
                <p style={sectionTitle}><Accent c={color}/>{docType==="quotation"?"Terms & Conditions":"Notes / Payment Terms"}</p>
                <TxtArea rows={3} value={meta.notes} accent={color} fi={focusIn} fo={focusOut}
                  placeholder={docType==="quotation"?"e.g. Quote valid for 30 days...":"e.g. Payment due within 30 days..."}
                  onChange={v=>setMeta(p=>({...p,notes:v}))}/>
              </div>

              {/* ── Footer note (auto, editable) ── */}
              <div style={{ marginBottom:4 }}>
                <p style={sectionTitle}>
                  <Accent c={color}/>Footer Note
                  <span style={{ fontSize:10,fontWeight:400,color:"#c4c9d4",textTransform:"none",letterSpacing:0 }}>(auto — editable / clear to hide)</span>
                </p>
                <TxtArea rows={2} value={meta.signNote} accent={color} fi={focusIn} fo={focusOut}
                  placeholder="This is a computer-generated document and does not require a signature."
                  onChange={v=>setMeta(p=>({...p,signNote:v}))}/>
              </div>

            </div>{/* end form body */}

            {/* ── Action buttons ── */}
            <div className="ig-formfoot" style={{ borderTop:"1px solid #f0f3fa",display:"flex",flexDirection:"column",gap:10,background:"#fafbff",borderRadius:"0 0 20px 20px" }}>
              <div style={{ display:"flex",gap:12 }}>
                <button onClick={startDownload} disabled={busy} style={{
                  flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  padding:"13px 20px",borderRadius:12,border:"none",
                  background: busy ? "#94a3b8" : color, color:"white",
                  fontSize:14,fontWeight:700,cursor:busy?"not-allowed":"pointer",
                  boxShadow: busy?"none":`0 4px 16px ${color}45`,
                  transition:"all .2s",opacity:busy?0.75:1,
                }}>
                  {busy ? <><Spinner/> Generating...</> : <><Download size={15}/> Download PDF</>}
                </button>
                <button onClick={startPrint} style={{
                  display:"flex",alignItems:"center",justifyContent:"center",gap:7,
                  padding:"13px 20px",borderRadius:12,border:"1.5px solid #e4e9f2",
                  background:"white",color:"#64748b",fontSize:14,fontWeight:600,cursor:"pointer",transition:"all .2s",
                }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#f8fafc";(e.currentTarget as HTMLElement).style.borderColor="#c9d0db";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="white";(e.currentTarget as HTMLElement).style.borderColor="#e4e9f2";}}>
                  <Printer size={15}/> Print
                </button>
              </div>
              {!isPro && (
                <button onClick={()=>setProModalOpen(true)} style={{
                  display:"flex",alignItems:"center",justifyContent:"center",gap:7,
                  padding:"10px 16px",borderRadius:12,
                  border:"1.5px solid #c4b5fd",background:"#f5f3ff",
                  color:"#7c3aed",fontSize:12.5,fontWeight:700,cursor:"pointer",transition:"all .2s",
                }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#ede9fe";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#f5f3ff";}}>
                  {isLoggedIn
                    ? `✦ Upgrade to Pro — Remove watermark & ads · ${SITE.stripe.priceLabel}`
                    : "✦ Sign In — Save invoices to dashboard (free)"}
                </button>
              )}
            </div>

          </div>{/* end form card */}

          {/* ══════════════ PREVIEW PANEL ══════════════ */}
          <div className="ig-preview lg:sticky lg:top-[80px]">

            {/* Status bar */}
            <div className="ig-previewbar no-print" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,padding:"0 4px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <LiveDot/>
                <span style={{ fontSize:10.5,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#94a3b8" }}>Live Preview</span>
              </div>
              <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                <Bdg label={meta.no||"—"}       color="#64748b" bg="#f1f5f9"           border="#e2e8f0"/>
                <Bdg label={docCfg.label}        color={docCfg.color} bg={`${docCfg.color}10`} border={`${docCfg.color}30`}/>
                {showStatus && <Bdg label={stCfg[status].label} color={stCfg[status].color} bg={stCfg[status].bg} border={stCfg[status].border}/>}
              </div>
            </div>

            {/* Paper wrapper — auto-scale to A4 */}
            <div ref={wrapRef} className="ig-cardwrap" style={{ ...card,overflow:"hidden",boxShadow:"0 4px 16px rgba(0,0,0,0.06),0 24px 64px rgba(15,23,42,0.09)" }}>

              {/* ── id for print CSS ── */}
              <div id="invoice-print-area">
                <div ref={previewRef} style={{ fontFamily:"'Inter',system-ui,sans-serif",background:"white",position:"relative" }}>

                  {/* Accent stripe */}
                  <div style={{ height:5,background:`linear-gradient(90deg,${color},${color}bb)` }}/>

                  {/* Watermark */}
                  {wmLogo && (
                    <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:0,overflow:"hidden" }}>
                      <img src={wmLogo} alt="" style={{ maxHeight:200,maxWidth:300,objectFit:"contain",opacity:0.06 }}/>
                    </div>
                  )}

                  <div style={{ padding:"36px 44px",position:"relative",zIndex:1 }}>

                    {/* ── Invoice header ── */}
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32 }}>
                      {/* From + brand logo */}
                      <div>
                        {brandLogo ? (
                          <img src={brandLogo} alt="logo" style={{ height:50,maxWidth:140,objectFit:"contain",marginBottom:12,display:"block" }}/>
                        ) : (
                          <div style={{ width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${color},${color}bb)`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:800,fontSize:20,marginBottom:12,boxShadow:`0 4px 12px ${color}35` }}>
                            {(from.name||"I")[0].toUpperCase()}
                          </div>
                        )}
                        <p style={{ fontSize:14,fontWeight:800,color:"#0d1117",letterSpacing:"-0.02em" }}>{from.name||"Your Business Name"}</p>
                        <p style={{ fontSize:11.5,color:"#64748b",marginTop:3 }}>{from.email||"your@email.com"}</p>
                        {from.phone   && <p style={{ fontSize:11,color:"#94a3b8",marginTop:2 }}>{from.phone}</p>}
                        {from.address && <p style={{ fontSize:11,color:"#94a3b8",marginTop:2,whiteSpace:"pre-line" }}>{from.address}</p>}
                      </div>
                      {/* Meta */}
                      <div style={{ textAlign:"right" }}>
                        <p style={{ fontSize:28,fontWeight:900,color:"#e8edf5",letterSpacing:"-0.03em",lineHeight:1 }}>
                          {docCfg.label.toUpperCase()}
                        </p>
                        <p style={{ fontSize:14,fontWeight:800,color:"#0d1117",marginTop:8 }}>#{meta.no||"—"}</p>
                        <p style={{ fontSize:11.5,color:"#94a3b8",marginTop:5 }}>
                          {docType==="receipt"?"Date:":"Issued:"}{" "}
                          <span style={{ color:"#475569",fontWeight:600 }}>{meta.date||"—"}</span>
                        </p>
                        {meta.due && docType!=="receipt" && (
                          <p style={{ fontSize:11.5,color:"#94a3b8",marginTop:3 }}>
                            Due: <span style={{ color:"#475569",fontWeight:600 }}>{meta.due}</span>
                          </p>
                        )}
                        {showStatus && (
                          <span style={{ display:"inline-block",marginTop:10,padding:"4px 14px",borderRadius:99,fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.07em",background:stCfg[status].bg,color:stCfg[status].color,border:`1.5px solid ${stCfg[status].border}` }}>
                            {stCfg[status].label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ── Bill To ── */}
                    <div style={{ marginBottom:24,padding:"14px 16px",borderRadius:12,background:"#f8fafc",border:"1px solid #f0f3fa" }}>
                      <p style={{ fontSize:9.5,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.12em",color:"#94a3b8",marginBottom:7 }}>
                        {docType==="receipt"?"Received From":"Bill To"}
                      </p>
                      <p style={{ fontSize:16,fontWeight:800,color:"#0d1117",letterSpacing:"-0.02em" }}>{to.name||"Client Name"}</p>
                      <p style={{ fontSize:11.5,color:"#64748b",marginTop:3 }}>{to.email||"client@email.com"}</p>
                      {to.phone   && <p style={{ fontSize:11,color:"#94a3b8",marginTop:2 }}>{to.phone}</p>}
                      {to.address && <p style={{ fontSize:11,color:"#94a3b8",marginTop:2,whiteSpace:"pre-line" }}>{to.address}</p>}
                    </div>

                    {/* ── Items table with S.No ── */}
                    <table style={{ width:"100%",borderCollapse:"collapse",marginBottom:20 }}>
                      <thead>
                        <tr style={{ background:`${color}0d` }}>
                          {["#","Description","Qty","Rate","Amount"].map((h,i)=>(
                            <th key={h} style={{
                              padding:"9px 8px",fontSize:9.5,fontWeight:800,textTransform:"uppercase",
                              letterSpacing:"0.08em",color,
                              textAlign:(i===0||i===1?"left":i===2?"center":"right") as "left"|"center"|"right",
                              borderBottom:`2px solid ${color}22`,
                              width: i===0?"30px":undefined,
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((it,idx)=>(
                          <tr key={it.id} style={{ borderBottom:"1px solid #f0f3fa" }}>
                            <td style={{ padding:"10px 8px",fontSize:11,color:"#c4c9d4",fontWeight:700,textAlign:"center" }}>{idx+1}</td>
                            <td style={{ padding:"10px 8px",fontSize:12.5,color:"#374151",fontWeight:500 }}>{it.desc||`Item ${idx+1}`}</td>
                            <td style={{ padding:"10px 8px",fontSize:12.5,color:"#64748b",textAlign:"center" }}>{it.qty}</td>
                            <td style={{ padding:"10px 8px",fontSize:12.5,color:"#64748b",textAlign:"right",fontVariantNumeric:"tabular-nums" }}>{cur.s}{f2(it.rate)}</td>
                            <td style={{ padding:"10px 8px",fontSize:12.5,fontWeight:700,color:"#0d1117",textAlign:"right",fontVariantNumeric:"tabular-nums" }}>{cur.s}{f2(it.qty*it.rate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* ── Totals ── */}
                    <div style={{ display:"flex",justifyContent:"flex-end",marginBottom:24 }}>
                      <div style={{ width:220 }}>
                        <TotRow label="Subtotal" val={`${cur.s}${f2(subtotal)}`}/>
                        {discAmt>0 && <TotRow label={`Discount${discType==="%"?` (${discount}%)`:""}`} val={`−${cur.s}${f2(discAmt)}`} red/>}
                        {taxType==="exclusive" && tax>0 && <TotRow label={`Tax (${tax}%)`} val={`${cur.s}${f2(taxAmt)}`}/>}
                        {taxType==="inclusive" && tax>0 && (
                          <div style={{ fontSize:10.5,color:"#94a3b8",textAlign:"right",marginBottom:8,fontStyle:"italic" }}>
                            (Tax {tax}% included)
                          </div>
                        )}
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:`2px solid ${color}22`,marginTop:4 }}>
                          <span style={{ fontSize:14,fontWeight:800,color:"#0d1117" }}>Total</span>
                          <span style={{ fontSize:22,fontWeight:900,color,fontVariantNumeric:"tabular-nums",letterSpacing:"-0.03em" }}>{cur.s}{f2(total)}</span>
                        </div>
                        {/* Tax label */}
                        <div style={{ textAlign:"right",marginTop:5 }}>
                          {taxType==="inclusive"
                            ? <span style={{ fontSize:9.5,color:"#10b981",fontWeight:700,fontStyle:"italic" }}>✓ All taxes are included</span>
                            : tax>0
                            ? <span style={{ fontSize:9.5,color:"#94a3b8",fontStyle:"italic" }}>Taxes are exclusive of total</span>
                            : null
                          }
                        </div>
                      </div>
                    </div>

                    {/* ── Bank details ── */}
                    {meta.bankDetails && (
                      <div style={{ marginBottom:18,padding:"12px 14px",borderRadius:10,background:"#f8fafc",border:"1px solid #f0f3fa" }}>
                        <p style={{ fontSize:9.5,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.12em",color:"#94a3b8",marginBottom:6 }}>Payment Details</p>
                        <p style={{ fontSize:11.5,color:"#475569",lineHeight:1.7,whiteSpace:"pre-line" }}>{meta.bankDetails}</p>
                      </div>
                    )}

                    {/* ── Notes ── */}
                    {meta.notes && (
                      <div style={{ paddingTop:16,borderTop:"1.5px solid #f0f3fa" }}>
                        <p style={{ fontSize:9.5,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.12em",color:"#94a3b8",marginBottom:7 }}>
                          {docType==="quotation"?"Terms & Conditions":"Notes"}
                        </p>
                        <p style={{ fontSize:12,color:"#64748b",lineHeight:1.7,fontStyle:"italic",whiteSpace:"pre-line" }}>{meta.notes}</p>
                      </div>
                    )}

                    {/* ── Computer-generated note ── */}
                    {meta.signNote && (
                      <p style={{ textAlign:"center",fontSize:10,color:"#9ca3af",fontStyle:"italic",marginTop:24,lineHeight:1.5 }}>
                        {meta.signNote}
                      </p>
                    )}

                    {/* ── Footer (hidden for Pro users) ── */}
                    {!isPro && (
                      <div style={{ display:"flex",justifyContent:"space-between",marginTop:meta.signNote?12:24,paddingTop:12,borderTop:"1px solid #f8fafc" }}>
                        <span style={{ fontSize:9.5,color:"#c4c9d4" }}>Generated by pdfbillbuilder.com</span>
                        <span style={{ fontSize:9.5,color:"#c4c9d4" }}>Thank you for your business</span>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>

            {/* Feature pills */}
            <div className="ig-pills no-print" style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:14 }}>
              {[{e:"📄",t:"Invoice"},{e:"🧾",t:"Receipt"},{e:"📋",t:"Quotation"}].map(b=>(
                <div key={b.t} style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"white",borderRadius:12,border:"1.5px solid #f0f3fa",boxShadow:"0 1px 4px rgba(0,0,0,0.03)" }}>
                  <span style={{ fontSize:14 }}>{b.e}</span>
                  <span style={{ fontSize:12,fontWeight:600,color:"#64748b" }}>{b.t}</span>
                </div>
              ))}
            </div>

          </div>{/* end preview */}
        </div>
      </div>

      {/* ── Features ── */}
      <div className="ig-features" style={{ background:"white",borderTop:"1px solid #f0f3fa",padding:"72px 24px" }}>
        <div style={{ maxWidth:1000,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <p style={{ fontSize:11.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#4f46e5",marginBottom:12 }}>Why PDF Bill Builder</p>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,34px)",fontWeight:900,letterSpacing:"-0.03em",color:"#0d1117" }}>
              More powerful than any free tool out there
            </h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20 }}>
            {[
              {e:"🔒",t:"Zero Storage",    d:"Your data never leaves your browser. Pure privacy.",          accent:false},
              {e:"⚡",t:"3 Doc Types",     d:"Invoice, Receipt & Quotation from one place.",                accent:true },
              {e:"🏷️",t:"Tax Inclusive",   d:"Toggle between tax-inclusive or exclusive billing.",          accent:false},
              {e:"📊",t:"Auto A4 Fit",     d:"More items? Content auto-scales to fit one page.",            accent:false},
              {e:"🏦",t:"Bank Details",    d:"Add payment info directly on your document.",                 accent:false},
              {e:"✅",t:"Always Free",     d:"Unlimited documents. Zero cost. No credit card.",             accent:false},
            ].map(f=>(
              <div key={f.t} style={{ padding:"24px 22px",borderRadius:18,background:f.accent?"linear-gradient(135deg,#4f46e5,#7c3aed)":"#f8faff",border:f.accent?"none":"1.5px solid #edf0fa",boxShadow:f.accent?"0 8px 32px rgba(79,70,229,0.3)":"none" }}>
                <div style={{ fontSize:22,marginBottom:14 }}>{f.e}</div>
                <p style={{ fontSize:15,fontWeight:800,color:f.accent?"white":"#0d1117",marginBottom:8,letterSpacing:"-0.02em" }}>{f.t}</p>
                <p style={{ fontSize:13,lineHeight:1.65,color:f.accent?"rgba(255,255,255,0.75)":"#64748b" }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes ping{75%,100%{transform:scale(2);opacity:0}}`}</style>

      <ProModal
        open={proModalOpen}
        justPaid={paymentTrigger}
        isLoggedIn={isLoggedIn}
        isPro={isPro}
        onClose={() => { setProModalOpen(false); setPaymentTrigger(false); }}
        onSignIn={signIn}
      />

      {/* Ad shown after Download / Print (user-initiated, non-gating) */}
      <DownloadAdModal
        open={adModal.open}
        status={adModal.status}
        action={adModal.action}
        slot={SITE.adSlots.downloadModal}
        accent={color}
        onClose={() => setAdModal(m => ({ ...m, open: false }))}
        onRetry={() => (adModal.action === "download" ? startDownload() : startPrint())}
      />
    </div>
  );
}

/* ─── Micro components ──────────────────────── */
const Accent = ({c}:{c:string}) => <span style={{width:3,height:14,borderRadius:2,background:c,display:"inline-block",flexShrink:0}}/>;
const Divider = () => <hr style={{border:"none",borderTop:"1.5px solid #f0f3fa",margin:"4px 0"}}/>;

function Fld({label,children}:{label:string;children:React.ReactNode}) {
  return <div><label style={labelStyle}>{label}</label>{children}</div>;
}

function Inp({value,onChange,placeholder,type="text",accent,fi,fo}:{
  value:string; onChange:(v:string)=>void; placeholder?:string; type?:string;
  accent:string; fi:React.FocusEventHandler<HTMLInputElement>; fo:React.FocusEventHandler<HTMLInputElement>;
}) {
  return (
    <input type={type} value={value} placeholder={placeholder}
      onChange={e=>onChange(e.target.value)} style={baseInput}
      onFocus={fi} onBlur={fo}/>
  );
}

function TxtArea({value,onChange,placeholder,accent,fi,fo,rows=2}:{
  value:string; onChange:(v:string)=>void; placeholder?:string; rows?:number;
  accent:string; fi:React.FocusEventHandler<HTMLTextAreaElement>; fo:React.FocusEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <textarea rows={rows} value={value} placeholder={placeholder}
      onChange={e=>onChange(e.target.value)}
      style={{...baseInput,resize:"none",lineHeight:1.55}}
      onFocus={fi} onBlur={fo}/>
  );
}

function TotRow({label,val,red}:{label:string;val:string;red?:boolean}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:red?"#ef4444":"#94a3b8",marginBottom:7}}>
      <span>{label}</span>
      <span style={{fontWeight:600,color:red?"#ef4444":"#475569",fontVariantNumeric:"tabular-nums"}}>{val}</span>
    </div>
  );
}

function Bdg({label,color,bg,border}:{label:string;color:string;bg:string;border:string}) {
  return <span style={{fontSize:10.5,fontWeight:700,padding:"3px 10px",borderRadius:99,color,background:bg,border:`1px solid ${border}`}}>{label}</span>;
}

function LiveDot() {
  return (
    <span style={{position:"relative",width:9,height:9,display:"inline-block"}}>
      <span style={{position:"absolute",inset:0,borderRadius:"50%",background:"#10b981",animation:"ping 1s cubic-bezier(0,0,.2,1) infinite",opacity:0.6}}/>
      <span style={{position:"relative",width:9,height:9,borderRadius:"50%",background:"#10b981",display:"block"}}/>
    </span>
  );
}

function Spinner() {
  return (
    <svg style={{animation:"spin 1s linear infinite",width:16,height:16}} fill="none" viewBox="0 0 24 24">
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle style={{opacity:.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path style={{opacity:.8}} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
  );
}
