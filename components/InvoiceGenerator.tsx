"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Download, Printer, Upload, X, FileText, Receipt, ClipboardList, Calculator,
  Tag, Percent, Copy, FilePlus2, Save, FileJson, FolderOpen, ArrowRightLeft, AlertTriangle, ChevronDown, Crown, Sparkles,
} from "lucide-react";
import DownloadAdModal from "@/components/DownloadAdModal";
import { useAuth } from "@/components/AuthProvider";
import InvoicePreview from "@/components/generator/InvoicePreview";
import ItemsEditor from "@/components/generator/ItemsEditor";
import ClientPicker, { type ClientRow } from "@/components/generator/ClientPicker";
import LayoutPanel from "@/components/generator/LayoutPanel";
import QuickGuide, { type GuideStep } from "@/components/generator/QuickGuide";
import { Inp, TxtArea, Sel, Segmented, Chip, SectionTitle, Divider, Spinner } from "@/components/generator/FormControls";
import { COLORS_FREE, COLORS_PRO, TEMPLATE_META, STATUS_CFG } from "@/components/generator/templates";
import { SAMPLE_FROM, SAMPLE_TO, sampleItems, isSampleFrom } from "@/components/generator/sample";
import {
  readProfile, writeProfile, profileFromDoc, rememberNumber, hasDetails, readSettings, writeSettings, type LocalProfile, type LocalSettings,
} from "@/components/generator/useLocalProfile";
import {
  newDoc, sanitizeDoc, safeFileName, convertToInvoice, receiptFromInvoice, defaultNotes, today, blankParty,
  CURRENCIES, DOC_TYPE_INFO, type InvoiceDoc, type DocType, type Party, type TemplateKey, type PaperSize,
} from "@/lib/invoice-doc";
import { calcTotals, formatMoney, nextInvoiceNumber, defaultNumber, addDays } from "@/lib/invoice-math";
import { DEFAULT_LAYOUT, enforceLayoutPlan, isDefaultLayout, sanitizeLayout, type Layout, type LayoutShow } from "@/lib/layout";
import { renderPdf, downloadBlob } from "@/lib/pdf";
import { track } from "@/lib/analytics";

/* ─── Constants ──────────────────────────────────── */
const DOC_TYPES: { key: DocType; Icon: typeof FileText }[] = [
  { key: "invoice",   Icon: FileText },
  { key: "receipt",   Icon: Receipt },
  { key: "quotation", Icon: ClipboardList },
  { key: "estimate",  Icon: Calculator },
];
const NET_TERMS = [{ label:"Net 7", days:7 }, { label:"Net 15", days:15 }, { label:"Net 30", days:30 }, { label:"Net 60", days:60 }];
/* The document is laid out at a FIXED CSS width (paper width at 96 dpi) and only
   visually scaled to fit the column, so the PDF is identical on a phone and a desktop. */
const PAGE_W: Record<PaperSize, number> = { a4: 794, letter: 816 };
const PAGE_H: Record<PaperSize, number> = { a4: 1123, letter: 1056 };
const PREVIEW_CAP = 1050; // max on-screen preview height before shrinking further
const SAMPLE_ID_BASE = 900000;

type Mode = "quick" | "full";

function isDefaultNumber(no: string) { return /^(INV|RCT|QUO|EST)-0*1$/.test(no); }

function focusField(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => el.focus({ preventScroll: true }), 350);
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function InvoiceGenerator({
  heading,
  subheading,
  defaultCurrency,
  defaultDocType = "invoice",
}: {
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  defaultCurrency?: string;
  defaultDocType?: DocType;
} = {}) {
  const { user, isLoggedIn, isPro, isLoaded, limits, openModal } = useAuth();

  /* ── Document state ── */
  const [doc, setDoc] = useState<InvoiceDoc>(() => newDoc({
    docType: defaultDocType,
    cur: CURRENCIES.find((c) => c.s === defaultCurrency) ?? CURRENCIES[0],
  }));
  const [savedId, setSavedId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [settings, setSettings] = useState<LocalSettings>({ saveToDashboard: true });
  const [mode, setMode] = useState<Mode>("quick");
  const [guideOn, setGuideOn] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [confirmExample, setConfirmExample] = useState(false);
  const [busy, setBusy] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [pages, setPages] = useState(1);
  const [adModal, setAdModal] = useState<{ open: boolean; status: "working" | "done" | "error"; action: "download" | "print"; saved?: boolean }>({
    open: false, status: "working", action: "download",
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const colRef     = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const importRef  = useRef<HTMLInputElement>(null);
  const profileRef = useRef<LocalProfile | null>(null);
  const preExample = useRef<{ from: Party; to: Party; items: InvoiceDoc["items"]; due: string } | null>(null);
  const doneSteps  = useRef<Set<string>>(new Set());

  const patch = useCallback((p: Partial<InvoiceDoc>) => setDoc((d) => ({ ...d, ...p })), []);
  const setMeta = useCallback((p: Partial<InvoiceDoc["meta"]>) => setDoc((d) => ({ ...d, meta: { ...d.meta, ...p } })), []);
  const setFrom = useCallback((p: Partial<Party>) => setDoc((d) => ({ ...d, from: { ...d.from, ...p } })), []);
  const setTo   = useCallback((p: Partial<Party>) => setDoc((d) => ({ ...d, to: { ...d.to, ...p } })), []);

  const started = () => { if (!startedRef.current) { startedRef.current = true; track("generator_started", { doc_type: doc.docType }); } };
  const flash = (m: string) => { setToast(m); window.setTimeout(() => setToast(""), 2600); };

  const isQuick = mode === "quick";
  const exampleActive = isSampleFrom(doc.from);

  function saveSettings(p: Partial<LocalSettings>) {
    setSettings((s) => { const next = { ...s, ...p }; writeSettings(next); return next; });
  }
  function changeMode(m: Mode) {
    if (m === mode) return;
    setMode(m);
    saveSettings({ mode: m });
    track("mode_changed", { mode: m });
  }

  /* ── Initial load: local profile + URL actions (?load / ?dup) ── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loadId = params.get("load");
    const dupId  = params.get("dup");
    const stored = readProfile();
    profileRef.current = stored;
    const st = readSettings();
    const returning = !!stored && hasDetails(stored.from);

    queueMicrotask(() => {
      setSettings(st);
      // Newcomers start in Quick mode; people who already saved their details, or are
      // re-opening a saved document, start with every option. An explicit choice wins.
      setMode(st.mode ?? (returning || loadId || dupId ? "full" : "quick"));
      setGuideOn(!st.guideDismissed && !returning && !loadId && !dupId);
      if (stored && !loadId && !dupId) {
        setDoc((d) => {
          const lastNo = stored.lastNos?.[d.docType];
          return {
            ...d,
            from: hasDetails(stored.from) ? stored.from : d.from,
            brandLogo: stored.brandLogo ?? d.brandLogo,
            cur: (defaultCurrency ? d.cur : CURRENCIES.find((c) => c.l === stored.cur.l)) ?? d.cur,
            color: stored.color || d.color,
            taxLabel: stored.taxLabel || d.taxLabel,
            tax: stored.tax ?? d.tax,
            paper: stored.paper ?? d.paper,
            layout: stored.layout ?? d.layout,
            meta: {
              ...d.meta,
              bankDetails: stored.bankDetails || d.meta.bankDetails,
              notes: stored.notes || d.meta.notes,
              no: lastNo ? nextInvoiceNumber(lastNo) : d.meta.no,
            },
          };
        });
        setProfileSaved(hasDetails(stored.from));
      }
      setReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── ?load=<id> / ?dup=<id> (dashboard re-edit / duplicate) ── */
  useEffect(() => {
    if (!isLoaded || !user?.token) return;
    const params = new URLSearchParams(window.location.search);
    const loadId = params.get("load");
    const dupId  = params.get("dup");
    const id = loadId ?? dupId;
    if (!id) return;
    window.history.replaceState({}, "", window.location.pathname);

    fetch(`/api/invoices?id=${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        const d = res?.invoice?.data;
        if (!d) { flash("Couldn't load that document"); return; }
        let loaded = sanitizeDoc(d);
        // Pro-only templates fall back to Classic if the user is no longer on a paid plan
        const m = TEMPLATE_META.find((t) => t.key === loaded.template);
        if (m?.pro && !limits.premiumTemplates) loaded = { ...loaded, template: "classic" };
        if (dupId) {
          loaded = { ...loaded, meta: { ...loaded.meta, no: nextInvoiceNumber(loaded.meta.no), date: today(), due: "" }, status: loaded.docType === "receipt" ? "paid" : "unpaid" };
          setSavedId(null);
          flash("Duplicated — review and download");
        } else {
          setSavedId(id);
        }
        setDoc(loaded);
      })
      .catch(() => flash("Couldn't load that document"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user?.token]);

  /* ── Persist "remember my business" locally (never the example data) ── */
  useEffect(() => {
    if (!ready || isSampleFrom(doc.from)) return;
    const t = window.setTimeout(() => {
      if (!hasDetails(doc.from)) {
        // keep settings-only profile (numbers etc.) but drop sender details
        const prev = profileRef.current;
        const next = prev ? { ...profileFromDoc(doc, prev), from: { name: "", email: "", phone: "", address: "" }, brandLogo: null } : null;
        profileRef.current = next; writeProfile(next); setProfileSaved(false); return;
      }
      const next = profileFromDoc(doc, profileRef.current);
      profileRef.current = next; writeProfile(next); setProfileSaved(true);
    }, 400);
    return () => window.clearTimeout(t);
  }, [ready, doc]);

  /* ── Signed-in: sync business profile + clients from the server ── */
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [clientsLimit, setClientsLimit] = useState<number | null>(null);
  const [savingClient, setSavingClient] = useState(false);
  const syncedTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user?.token || syncedTokenRef.current === user.token) return;
    syncedTokenRef.current = user.token;
    const auth = { Authorization: `Bearer ${user.token}` };
    fetch("/api/clients", { headers: auth }).then((r) => r.ok ? r.json() : null).then((j) => {
      if (j?.clients) { setClients(j.clients); setClientsLimit(j.limit ?? null); }
    }).catch(() => {});
    fetch("/api/profile", { headers: auth }).then((r) => r.ok ? r.json() : null).then((j) => {
      const p = j?.profiles?.[0]?.data;
      if (!p) return;
      // Server profile fills in only when this device has no business details yet.
      setDoc((d) => hasDetails(d.from) ? d : {
        ...d,
        from: { ...d.from, ...(p.from ?? {}) },
        brandLogo: d.brandLogo ?? p.brandLogo ?? null,
        cur: CURRENCIES.find((c) => c.l === p.cur?.l) ?? d.cur,
        color: p.color ?? d.color,
        taxLabel: p.taxLabel || d.taxLabel,
        tax: typeof p.tax === "number" ? p.tax : d.tax,
        layout: p.layout ? sanitizeLayout(p.layout) : d.layout,
        meta: { ...d.meta, bankDetails: p.bankDetails || d.meta.bankDetails, notes: p.notes || d.meta.notes },
      });
    }).catch(() => {});
  }, [isLoaded, user?.token]);

  // Debounced push of the business profile to the server (signed-in only)
  useEffect(() => {
    if (!ready || !user?.token || !hasDetails(doc.from) || isSampleFrom(doc.from)) return;
    const t = window.setTimeout(() => {
      fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ name: doc.from.name || "My business", data: {
          from: doc.from, brandLogo: doc.brandLogo && doc.brandLogo.length < 400_000 ? doc.brandLogo : null,
          color: doc.color, cur: doc.cur, bankDetails: doc.meta.bankDetails, notes: doc.meta.notes, taxLabel: doc.taxLabel, tax: doc.tax,
          layout: doc.layout,
        } }),
      }).catch(() => {});
    }, 2500);
    return () => window.clearTimeout(t);
  }, [ready, user?.token, doc.from, doc.brandLogo, doc.color, doc.cur, doc.meta.bankDetails, doc.meta.notes, doc.taxLabel, doc.tax, doc.layout]);

  /* ── Derived ── */
  const totals = useMemo(() => calcTotals(doc.items, { discount: doc.discount, discType: doc.discType, taxRate: doc.tax, taxType: doc.taxType }), [doc.items, doc.discount, doc.discType, doc.tax, doc.taxType]);
  const info = DOC_TYPE_INFO[doc.docType];
  const color = doc.color;
  const isQuote = doc.docType === "quotation" || doc.docType === "estimate";
  const showStatus = doc.docType === "invoice";
  const whiteLabel = isLoaded && limits.whiteLabel;
  const advancedLayouts = limits.advancedLayouts;
  const money = (n: number) => formatMoney(n, doc.cur.s, doc.cur.l);

  /* Pro-only layout options fall back to free ones once the plan is known and
     does not include them (e.g. after a downgrade). The stored choice is kept. */
  const layoutView = useMemo(() => (isLoaded ? enforceLayoutPlan(doc.layout, advancedLayouts) : doc.layout), [isLoaded, doc.layout, advancedLayouts]);
  const viewDoc = useMemo<InvoiceDoc>(() => ({ ...doc, layout: layoutView }), [doc, layoutView]);

  const warnings = useMemo(() => {
    const w: string[] = [];
    if (!doc.from.name.trim()) w.push("Add your business or personal name so the client knows who is billing them.");
    if (!doc.to.name.trim()) w.push(`Add the client's name under “${doc.docType === "receipt" ? "Received from" : "Bill to"}”.`);
    if (!doc.items.some((i) => i.desc.trim())) w.push("Describe at least one line item.");
    if (totals.total <= 0) w.push("The total is zero — check quantities and rates.");
    if (doc.meta.due && doc.meta.date && doc.meta.due < doc.meta.date) w.push(`The ${isQuote ? "valid-until" : "due"} date is before the issue date.`);
    if (doc.discType === "fixed" && doc.discount > totals.subtotal && totals.subtotal > 0) w.push("The fixed discount is larger than the subtotal, so it has been capped.");
    if (doc.items.some((i) => i.qty < 0 || i.rate < 0)) w.push("An item has a negative quantity or rate — double-check it is intentional (e.g. a credit).");
    if (exampleActive) w.push("This is example data — replace it with your own details before you send it.");
    return w;
  }, [doc, totals, isQuote, exampleActive]);

  /* ── Auto-scale preview to fit one page; estimate page count ── */
  const autoScale = useCallback(() => {
    const el = previewRef.current, wrap = wrapRef.current, col = colRef.current;
    if (!el || !wrap || !col) return;
    const pageW = PAGE_W[doc.paper];
    el.style.transform = "none"; el.style.width = `${pageW}px`; wrap.style.height = "auto";
    requestAnimationFrame(() => {
      const natural = el.scrollHeight;
      setPages(Math.max(1, Math.ceil((natural - 2) / PAGE_H[doc.paper])));
      const colW = col.clientWidth || pageW;
      // Fit the fixed-width page into the column, and shrink further so a long
      // document still shows in full on screen (the PDF is never shrunk).
      const s = Math.min(1, colW / pageW, PREVIEW_CAP / natural);
      el.style.transform = `scale(${s})`; el.style.transformOrigin = "top left";
      wrap.style.height = `${Math.ceil(natural * s)}px`; wrap.style.overflow = "hidden";
    });
  }, [doc.paper]);
  useEffect(() => { autoScale(); }, [viewDoc, whiteLabel, autoScale]);
  useEffect(() => {
    let lastW = 0;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0]?.contentRect.width ?? 0);
      if (w && w !== lastW) { lastW = w; autoScale(); }
    });
    if (colRef.current) ro.observe(colRef.current);
    return () => ro.disconnect();
  }, [autoScale]);

  /* ── Save to dashboard ── */
  async function saveToServer(isDraft: boolean): Promise<boolean> {
    if (!user?.token) return false;
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({
          id: savedId ?? undefined,
          invoice_no: doc.meta.no, doc_type: doc.docType, client_name: doc.to.name,
          total: totals.total, currency: doc.cur.l, is_draft: isDraft, data: doc,
        }),
      });
      const j = await res.json();
      if (j?.saved && j.id) { setSavedId(j.id); return true; }
      return false;
    } catch { return false; }
  }

  /* ── PDF download ── */
  async function downloadPDF() {
    const el = previewRef.current, wrap = wrapRef.current;
    if (!el) return;
    setBusy(true);
    const saved = { tx: el.style.transform, txo: el.style.transformOrigin, w: el.style.width, wh: wrap?.style.height ?? "", wov: wrap?.style.overflow ?? "" };
    el.style.transform = "none"; el.style.transformOrigin = "top left"; el.style.width = `${PAGE_W[doc.paper]}px`;
    if (wrap) { wrap.style.height = "auto"; wrap.style.overflow = "visible"; }
    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

    let ok = false, didSave = false;
    try {
      const blob = await renderPdf(el, {
        paper: doc.paper,
        fileName: safeFileName(doc.meta.no, doc.docType, "pdf"),
        title: `${info.label} ${doc.meta.no}`.trim(),
        subject: doc.to.name ? `${info.label} for ${doc.to.name}` : info.label,
      });
      track("pdf_generated", { doc_type: doc.docType, template: doc.template, paper: doc.paper, items: doc.items.length, pages, mode });
      downloadBlob(blob, safeFileName(doc.meta.no, doc.docType, "pdf"));
      track("pdf_downloaded", { doc_type: doc.docType, signed_in: isLoggedIn });
      ok = true;
      setDownloaded(true);
      rememberNumber(doc.docType, doc.meta.no);
      if (user?.token && settings.saveToDashboard) didSave = await saveToServer(false);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      el.style.transform = saved.tx; el.style.transformOrigin = saved.txo; el.style.width = saved.w;
      if (wrap) { wrap.style.height = saved.wh; wrap.style.overflow = saved.wov; }
      setBusy(false);
      setAdModal((m) => m.open ? { ...m, status: ok ? "done" : "error", saved: didSave } : m);
    }
  }

  function startDownload() {
    setAdModal({ open: true, status: "working", action: "download" });
    void downloadPDF();
  }
  function startPrint() {
    track("print_started", { doc_type: doc.docType });
    setAdModal({ open: true, status: "working", action: "print" });
    window.setTimeout(() => { window.print(); setAdModal((m) => m.open ? { ...m, status: "done" } : m); }, 400);
  }

  /* ── Document actions ── */
  function changeDocType(t: DocType) {
    started();
    track("document_type_selected", { doc_type: t });
    setDoc((d) => ({
      ...d,
      docType: t,
      status: t === "receipt" ? "paid" : d.status,
      meta: {
        ...d.meta,
        no: isDefaultNumber(d.meta.no) ? defaultNumber(t) : d.meta.no,
        notes: d.meta.notes === defaultNotes(d.docType) ? defaultNotes(t) : d.meta.notes,
        due: t === "receipt" ? "" : d.meta.due,
      },
    }));
  }
  function chooseTemplate(t: TemplateKey, locked: boolean) {
    if (locked) { openModal("upgrade", `template_${t}`); return; }
    track("template_selected", { template: t });
    patch({ template: t });
  }
  function startNew() {
    const no = nextInvoiceNumber(doc.meta.no);
    setDoc((d) => newDoc({ docType: d.docType, from: d.from, brandLogo: d.brandLogo, cur: d.cur, color: d.color, template: d.template, paper: d.paper, tax: d.tax, taxLabel: d.taxLabel, taxType: d.taxType, layout: d.layout,
      meta: { ...newDoc({ docType: d.docType }).meta, no, bankDetails: d.meta.bankDetails, notes: d.meta.notes, signNote: d.meta.signNote } }));
    setSavedId(null); setMoreOpen(false);
    flash(`New ${info.label.toLowerCase()} ${no}`);
  }
  function duplicate() {
    setDoc((d) => ({ ...d, meta: { ...d.meta, no: nextInvoiceNumber(d.meta.no), date: today(), due: "" }, status: d.docType === "receipt" ? "paid" : "unpaid" }));
    setSavedId(null); setMoreOpen(false);
    flash("Duplicated with the next number");
  }
  function exportJson() {
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: "application/json" });
    downloadBlob(blob, safeFileName(doc.meta.no, doc.docType, "json"));
    track("document_exported", { doc_type: doc.docType });
    setMoreOpen(false);
  }
  function importJson(file: File) {
    const r = new FileReader();
    r.onload = (e) => {
      try {
        const parsed = JSON.parse(String(e.target?.result ?? "{}"));
        setDoc(sanitizeDoc(parsed, doc)); setSavedId(null);
        track("document_imported", {});
        flash("Document restored from file");
      } catch { flash("That file isn't a valid PDF Bill Builder export"); }
    };
    r.readAsText(file);
    setMoreOpen(false);
  }
  async function saveDraft() {
    if (!isLoggedIn) { openModal("choose", "save_draft"); return; }
    setMoreOpen(false);
    const ok = await saveToServer(true);
    track("draft_saved", { ok });
    flash(ok ? "Draft saved to your dashboard" : "Couldn't save — history may be unavailable");
  }
  function convert() {
    if (isQuote) { setDoc(convertToInvoice(doc)); flash("Converted to an invoice"); }
    else if (doc.docType === "invoice") { setDoc(receiptFromInvoice({ ...doc, status: "paid" })); flash("Receipt created from this invoice"); }
    setSavedId(null); setMoreOpen(false);
  }

  const readFile = (file: File, cb: (url: string) => void) => {
    if (!file.type.startsWith("image/")) { flash("Please choose an image file"); return; }
    if (file.size > 2_000_000) { flash("Image is too large — please use one under 2 MB"); return; }
    const r = new FileReader();
    r.onload = (e) => cb(e.target?.result as string);
    r.readAsDataURL(file);
  };

  async function saveClient(): Promise<"saved" | "limit" | "error"> {
    if (!user?.token) return "error";
    setSavingClient(true);
    try {
      const res = await fetch("/api/clients", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` }, body: JSON.stringify(doc.to) });
      const j = await res.json();
      if (j?.saved) {
        setClients((cs) => {
          const rest = cs.filter((c) => c.id !== j.id && c.name.toLowerCase() !== doc.to.name.trim().toLowerCase());
          return [...rest, { id: j.id, ...doc.to }].sort((a, b) => a.name.localeCompare(b.name));
        });
        return "saved";
      }
      return j?.reason === "limit" ? "limit" : "error";
    } catch { return "error"; } finally { setSavingClient(false); }
  }

  /* ── Example data ── */
  function fillExample() {
    started();
    preExample.current = { from: doc.from, to: doc.to, items: doc.items, due: doc.meta.due };
    setDoc((d) => ({
      ...d,
      from: SAMPLE_FROM,
      to: SAMPLE_TO,
      items: sampleItems(SAMPLE_ID_BASE),
      meta: { ...d.meta, due: d.docType === "receipt" ? "" : addDays(d.meta.date, 30) },
    }));
    setConfirmExample(false);
    track("example_filled", { doc_type: doc.docType, mode });
  }
  function clearExample() {
    const p = preExample.current;
    setDoc((d) => ({
      ...d,
      from: p?.from && !isSampleFrom(p.from) ? p.from : blankParty(),
      to: p?.to && p.to.name !== SAMPLE_TO.name ? p.to : blankParty(),
      items: p?.items?.length && !p.items.some((i) => i.id >= SAMPLE_ID_BASE) ? p.items : [{ id: 1, desc: "", qty: 1, rate: 0 }],
      meta: { ...d.meta, due: p?.due ?? "" },
    }));
    preExample.current = null;
  }
  function requestExample() {
    const hasOwnContent = (hasDetails(doc.from) && !exampleActive) || !!doc.to.name.trim() || doc.items.some((i) => i.desc.trim());
    if (hasOwnContent && !exampleActive) setConfirmExample(true);
    else fillExample();
  }

  /* ── Layout controls ── */
  const setLayout = (p: Partial<Layout>) => {
    setDoc((d) => ({ ...d, layout: { ...d.layout, ...p } }));
    track("layout_changed", { option: Object.keys(p).join(",") });
  };
  const setShow = (k: keyof LayoutShow, v: boolean) => {
    setDoc((d) => ({ ...d, layout: { ...d.layout, show: { ...d.layout.show, [k]: v } } }));
    track("layout_changed", { option: "show", item: k, on: v });
  };

  /* ── First-time guide (3 steps, ticked off as the person really does them) ── */
  const hasRealItems = doc.items.some((i) => i.desc.trim() && i.qty * i.rate > 0);
  const guideSteps: GuideStep[] = [
    {
      id: "details", title: "Add your name and your client's name",
      text: "So the document says who it is from and who it is for.",
      done: !exampleActive && !!doc.from.name.trim() && !!doc.to.name.trim(),
      actionLabel: "Go to field",
      onAction: () => focusField(doc.from.name.trim() ? '[data-field="to-name"]' : '[data-field="from-name"]'),
    },
    {
      id: "items", title: "Describe what you're charging for",
      text: "One line per thing: a description, how many, and the price. We add up the total.",
      done: !exampleActive && hasRealItems,
      actionLabel: "Go to items",
      onAction: () => focusField('input[data-col="desc"]'),
    },
    {
      id: "download", title: "Download your PDF",
      text: "Check the live preview on the right, then download. Free, with no watermark.",
      done: downloaded,
      actionLabel: "Go to download",
      onAction: () => focusField('[data-field="download"]'),
    },
  ];
  const guideAllDone = guideSteps.every((s) => s.done);
  const guideVisible = ready && guideOn;

  useEffect(() => {
    if (!guideVisible) return;
    for (const s of guideSteps) {
      if (s.done && !doneSteps.current.has(s.id)) {
        doneSteps.current.add(s.id);
        track("guide_step_done", { step: s.id });
      }
    }
    if (guideAllDone && !doneSteps.current.has("__all")) { doneSteps.current.add("__all"); track("guide_completed", {}); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guideVisible, guideAllDone, exampleActive, doc.from.name, doc.to.name, hasRealItems, downloaded]);

  function closeGuide(skipped: boolean) {
    setGuideOn(false);
    saveSettings({ guideDismissed: true });
    if (skipped) track("guide_skipped", { done: guideSteps.filter((s) => s.done).length });
  }

  const st = STATUS_CFG[doc.docType === "receipt" ? "paid" : doc.status];

  /* ══════ RENDER ══════ */
  return (
    <div className="ig-root">

      {/* ── Hero ── */}
      <div className="ig-hero">
        <div className="ig-hero__inner">
          <span className="stamp stamp--hero">Free · no signup · no watermark</span>
          <h1 className="ig-hero__h1">
            {heading ?? <>Free PDF Invoice Generator</>}
          </h1>
          <p className="ig-hero__sub">
            {subheading ?? (
              <>Create professional invoices, bills, receipts and quotations in your browser. Fill in the form, watch the live preview update, and download a clean PDF — no account needed.</>
            )}
          </p>
          <ul className="ig-hero__trust" aria-label="Key benefits">
            {["Private: your data stays in your browser", "Live preview, A4 or US Letter PDF", "Any currency, tax added on top or included"].map((t) => (
              <li key={t}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b91c26" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Two-column tool ── */}
      <div className="ig-toolwrap">
        <div className="ig-grid grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 items-start">

          {/* ══════════════ FORM CARD ══════════════ */}
          <section className="ig-form ig-card" aria-label="Document details form" onInput={started}>

            <div className="ig-formhead">
              <div>
                <h2 className="ig-formhead__title">{info.label} details</h2>
                <p className="ig-formhead__sub">Changes appear in the preview instantly</p>
              </div>
              <div className="ig-colors" role="radiogroup" aria-label="Brand colour">
                {COLORS_FREE.map((c) => (
                  <button key={c.hex} type="button" role="radio" title={c.name} aria-label={c.name} aria-checked={color === c.hex}
                    onClick={() => patch({ color: c.hex })} className="ig-colorbtn" style={{ background: c.hex, boxShadow: color === c.hex ? `0 0 0 2.5px #fff,0 0 0 4.5px ${c.hex}` : "none", transform: color === c.hex ? "scale(1.15)" : "none" }} />
                ))}
                {limits.premiumColours
                  ? COLORS_PRO.map((c) => (
                    <button key={c.hex} type="button" role="radio" title={c.name} aria-label={c.name} aria-checked={color === c.hex}
                      onClick={() => patch({ color: c.hex })} className="ig-colorbtn" style={{ background: c.hex, boxShadow: color === c.hex ? `0 0 0 2.5px #fff,0 0 0 4.5px ${c.hex}` : "none", transform: color === c.hex ? "scale(1.15)" : "none" }} />
                  ))
                  : (
                    <button type="button" title="Unlock 12 premium colours with Pro" onClick={() => openModal("upgrade", "pro_colours")} className="ig-probadge">✦ 12 more</button>
                  )}
              </div>
            </div>

            <div className="ig-formbody">

              {/* ── First-time guide ── */}
              {guideVisible && (
                <QuickGuide steps={guideSteps} accent={color} exampleActive={exampleActive}
                  onSkip={() => closeGuide(true)} onClose={() => closeGuide(false)} onExample={requestExample} />
              )}

              {/* ── Quick / All options switch + example data ── */}
              <div className="ig-modebar">
                <Segmented<Mode> label="How much detail" accent={color} value={mode} onChange={changeMode}
                  options={[{ value: "quick", label: "Quick" }, { value: "full", label: "All options" }]} />
                {exampleActive ? (
                  <button type="button" className="ig-linkbtn" onClick={clearExample}>Clear the example</button>
                ) : (
                  <button type="button" className="ig-linkbtn" onClick={requestExample}><Sparkles size={12} aria-hidden="true" /> Fill with an example</button>
                )}
                <p className="ig-modebar__text" style={{ flexBasis: "100%" }}>
                  {isQuick
                    ? "Quick mode shows only the essentials. Your logo, tax, dates and notes are one click away."
                    : "Every option is showing: template, layout, tax, discount, dates, payment details and more."}
                </p>
              </div>

              {confirmExample && (
                <div role="alertdialog" aria-label="Replace what you typed with the example?" className="ig-note" style={{ background: "#fffbeb", border: "1.5px solid #fde68a", color: "#78350f", marginBottom: 16 }}>
                  <strong>Replace what you&apos;ve typed with the example?</strong>{" "}
                  Your name, client and items will be swapped for sample data. You can clear it afterwards.
                  <span style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button type="button" className="ig-chip" onClick={fillExample}>Yes, use the example</button>
                    <button type="button" className="ig-chip" onClick={() => setConfirmExample(false)}>Keep my details</button>
                  </span>
                </div>
              )}

              {/* ── Document type ── */}
              <div className="ig-block">
                <SectionTitle accent={color}>Document type</SectionTitle>
                <div className="ig-typegrid" role="radiogroup" aria-label="Document type">
                  {DOC_TYPES.map(({ key, Icon }) => {
                    const active = doc.docType === key; const i = DOC_TYPE_INFO[key];
                    return (
                      <button key={key} type="button" role="radio" aria-checked={active} onClick={() => changeDocType(key)} className="ig-tile"
                        style={{ borderColor: active ? i.color : undefined, background: active ? `${i.color}0f` : undefined }}>
                        <Icon size={16} aria-hidden="true" style={{ color: active ? i.color : "#5b6272" }} />
                        <span style={{ color: active ? i.color : "#2f3542", fontWeight: 700, fontSize: 12.5 }}>{i.label}</span>
                        <span className="ig-tile__desc">{i.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {!isQuick && (
                <>
                  {/* ── Template style ── */}
                  <div className="ig-block">
                    <SectionTitle accent={color}>Template style</SectionTitle>
                    <div className="ig-tplgrid" role="radiogroup" aria-label="PDF template">
                      {TEMPLATE_META.map((t) => {
                        const active = doc.template === t.key; const locked = t.pro && !limits.premiumTemplates;
                        return (
                          <button key={t.key} type="button" role="radio" aria-checked={active} className="ig-tile"
                            title={locked ? `${t.name} — Pro template` : t.name} onClick={() => chooseTemplate(t.key, locked)}
                            style={{ borderColor: active ? color : undefined, background: active ? `${color}0f` : undefined }}>
                            {locked && <span className="ig-tile__pro">✦ PRO</span>}
                            <span style={{ fontSize: 12.5, fontWeight: 700, color: active ? color : locked ? "#5b6272" : "#2f3542" }}>{t.name}</span>
                            <span className="ig-tile__desc">{t.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Layout & logo ── */}
                  <details className="ig-more">
                    <summary>
                      <span>Layout &amp; logo <span style={{ fontWeight: 500, color: "#5b6272", fontSize: 12 }}>— header design, logo size and position, what to show</span></span>
                    </summary>
                    <div className="ig-more__body">
                      <LayoutPanel
                        layout={layoutView} advanced={advancedLayouts} accent={color}
                        onChange={setLayout} onShow={setShow}
                        onLocked={(f) => openModal("upgrade", f)}
                        onReset={() => { setDoc((d) => ({ ...d, layout: DEFAULT_LAYOUT })); track("layout_changed", { option: "reset" }); }}
                        isDefault={isDefaultLayout(layoutView)}
                        logo={doc.brandLogo}
                        onLogoFile={(f) => readFile(f, (u) => patch({ brandLogo: u }))}
                        onLogoRemove={() => patch({ brandLogo: null })}
                      />
                    </div>
                  </details>

                  {/* ── Payment status (invoice only) ── */}
                  {showStatus && (
                    <div className="ig-block">
                      <SectionTitle accent={color}>Payment status</SectionTitle>
                      <div className="ig-grid2" role="radiogroup" aria-label="Payment status">
                        {(["unpaid", "paid"] as const).map((s) => {
                          const cfg = STATUS_CFG[s]; const active = doc.status === s;
                          return (
                            <button key={s} type="button" role="radio" aria-checked={active} onClick={() => patch({ status: s })} className="ig-tile ig-tile--row"
                              style={{ borderColor: active ? cfg.border : undefined, background: active ? cfg.bg : undefined }}>
                              <span aria-hidden="true" style={{ fontSize: 15 }}>{s === "paid" ? "✅" : "⏳"}</span>
                              <span style={{ fontSize: 13, fontWeight: 700, color: active ? cfg.color : "#5b6272" }}>{cfg.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <Divider />

                  {/* ── Number · Currency · PO ── */}
                  <div className="ig-grid2" style={{ margin: "20px 0 16px" }}>
                    <Inp label={`${info.label} number`} value={doc.meta.no} placeholder={defaultNumber(doc.docType)} accent={color}
                      onChange={(v) => setMeta({ no: v })} hint="Every document needs its own number. It goes up by one next time." />
                    <Sel label="Currency" value={doc.cur.l} accent={color} hint="Used for every amount on the document."
                      onChange={(v) => patch({ cur: CURRENCIES.find((c) => c.l === v) ?? doc.cur })}>
                      {CURRENCIES.map((c) => <option key={c.l} value={c.l}>{c.l} — {c.s}</option>)}
                    </Sel>
                  </div>

                  {/* ── Dates ── */}
                  <div className="ig-grid2" style={{ marginBottom: 16 }}>
                    <Inp type="date" label={doc.docType === "receipt" ? "Payment date" : "Issue date"} value={doc.meta.date} accent={color} onChange={(v) => setMeta({ date: v })} />
                    {doc.docType !== "receipt" && (
                      <div>
                        <Inp type="date" label={isQuote ? "Valid until" : "Due date"} value={doc.meta.due} accent={color} onChange={(v) => setMeta({ due: v })}
                          hint={isQuote ? "How long this offer stays open." : "When you expect to be paid. Use a quick option below."}
                          error={doc.meta.due && doc.meta.date && doc.meta.due < doc.meta.date ? "Before the issue date" : undefined} />
                        <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }} aria-label="Quick payment terms">
                          {NET_TERMS.map((t) => (
                            <Chip key={t.label} accent={color} onClick={() => setMeta({ due: addDays(doc.meta.date, t.days) })} active={!!doc.meta.date && doc.meta.due === addDays(doc.meta.date, t.days)} title={`Due ${t.days} days after the issue date`}>
                              {isQuote ? `${t.days} days` : t.label}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {doc.docType === "invoice" && (
                    <div style={{ marginBottom: 16 }}>
                      <Inp label="PO / reference number" value={doc.meta.poNumber} placeholder="Optional — e.g. PO-4471" accent={color} onChange={(v) => setMeta({ poNumber: v })} />
                    </div>
                  )}

                  <Divider />
                </>
              )}

              {/* ── From + Bill To ── */}
              {isQuick ? (
                <div className="ig-block" style={{ marginTop: 4 }}>
                  <SectionTitle accent={color}>Who is it from, and who is it for?</SectionTitle>
                  <div className="ig-stack">
                    <Inp label="Your name or business" dataField="from-name" value={doc.from.name} placeholder="e.g. Alex Morgan Design" accent={color} autoComplete="organization"
                      hint="Shown at the top of the document." onChange={(v) => setFrom({ name: v })} />
                    <Inp label={doc.docType === "receipt" ? "Received from" : isQuote ? "Prepared for (client name)" : "Bill to (client name)"} dataField="to-name" value={doc.to.name} placeholder="e.g. Sunrise Café" accent={color}
                      hint="The person or company you are billing." onChange={(v) => setTo({ name: v })} />
                    <Sel label="Currency" value={doc.cur.l} accent={color} hint="Used for every amount on the document."
                      onChange={(v) => patch({ cur: CURRENCIES.find((c) => c.l === v) ?? doc.cur })}>
                      {CURRENCIES.map((c) => <option key={c.l} value={c.l}>{c.l} — {c.s}</option>)}
                    </Sel>
                  </div>
                  {profileSaved && !exampleActive && (
                    <p className="ig-saved" style={{ marginTop: 10 }}>
                      <span style={{ color: "#15803d", fontWeight: 800 }}>✓</span>
                      Your details are remembered on this device, so next time this is already filled in.
                    </p>
                  )}
                </div>
              ) : (
                <div className="ig-twocol" style={{ margin: "20px 0 22px" }}>
                  <div>
                    <SectionTitle accent={color}>From (you)</SectionTitle>
                    <div style={{ marginBottom: 10 }}>
                      {doc.brandLogo ? (
                        <div style={{ position: "relative", display: "inline-block" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={doc.brandLogo} alt="Your logo" style={{ height: 44, maxWidth: 110, objectFit: "contain", borderRadius: 6, border: "1.5px solid #e3ddd0", padding: 4, background: "white" }} />
                          <button type="button" onClick={() => patch({ brandLogo: null })} aria-label="Remove logo" className="ig-removebadge"><X size={10} aria-hidden="true" /></button>
                        </div>
                      ) : (
                        <label className="ig-upload" style={{ ["--accent" as string]: color }}>
                          <Upload size={12} aria-hidden="true" /> Upload logo
                          <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) readFile(f, (u) => patch({ brandLogo: u })); e.target.value = ""; }} />
                        </label>
                      )}
                    </div>
                    <div className="ig-stack">
                      <Inp label="Your name or business" srOnly dataField="from-name" value={doc.from.name} placeholder="Your name or business" accent={color} autoComplete="organization" onChange={(v) => setFrom({ name: v })} />
                      <Inp type="email" label="Your email" srOnly value={doc.from.email} placeholder="Email" accent={color} autoComplete="email" onChange={(v) => setFrom({ email: v })} />
                      <Inp type="tel" label="Your phone" srOnly value={doc.from.phone} placeholder="Phone" accent={color} autoComplete="tel" onChange={(v) => setFrom({ phone: v })} />
                      <TxtArea label="Your address" srOnly value={doc.from.address} placeholder="Address" accent={color} onChange={(v) => setFrom({ address: v })} />
                      {profileSaved && !exampleActive && (
                        <p className="ig-saved">
                          <span style={{ color: "#15803d", fontWeight: 800 }}>✓</span>
                          {isLoggedIn ? "Saved to your account — your next document starts pre-filled." : "Saved on this device — your next document starts pre-filled."}
                          <button type="button" onClick={() => { patch({ from: { name: "", email: "", phone: "", address: "" }, brandLogo: null }); }} className="ig-linkbtn">Clear</button>
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <SectionTitle accent={color}>{doc.docType === "receipt" ? "Received from" : isQuote ? "Prepared for" : "Bill to"}</SectionTitle>
                    {isLoggedIn && (
                      <div style={{ marginBottom: 10 }}>
                        <ClientPicker clients={clients} current={doc.to} accent={color} limit={clientsLimit} saving={savingClient}
                          locked={false} onUpgrade={() => openModal("upgrade", "clients_limit")}
                          onPick={(c) => setTo({ name: c.name, email: c.email, phone: c.phone, address: c.address })} onSave={saveClient} />
                      </div>
                    )}
                    <div className="ig-stack">
                      <Inp label="Client name" srOnly dataField="to-name" value={doc.to.name} placeholder="Client name" accent={color} onChange={(v) => setTo({ name: v })} />
                      <Inp type="email" label="Client email" srOnly value={doc.to.email} placeholder="Client email" accent={color} onChange={(v) => setTo({ email: v })} />
                      <Inp type="tel" label="Client phone" srOnly value={doc.to.phone} placeholder="Client phone" accent={color} onChange={(v) => setTo({ phone: v })} />
                      <TxtArea label="Client address" srOnly value={doc.to.address} placeholder="Client address" accent={color} onChange={(v) => setTo({ address: v })} />
                    </div>
                  </div>
                </div>
              )}

              {isQuick && (
                <button type="button" className="ig-moreopts" onClick={() => changeMode("full")}>
                  <span>Need a logo, tax, discount, due date or notes?<small>Show all options — everything you have typed is kept.</small></span>
                  <span aria-hidden="true">Show all options →</span>
                </button>
              )}

              <Divider />

              {/* ── Items ── */}
              <div className="ig-block" style={{ marginTop: 20 }}>
                <SectionTitle accent={color}>Items &amp; services</SectionTitle>
                <p className="ig-hint" style={{ margin: "-4px 0 10px" }}>
                  One line for each thing you&apos;re charging for. Quantity can be hours, days or pieces — we calculate every total for you.
                </p>
                <ItemsEditor items={doc.items} lines={totals.lines} cur={doc.cur} accent={color} onChange={(update) => setDoc((d) => ({ ...d, items: update(d.items) }))} />

                {!isQuick && (
                  <>
                    {/* Discount */}
                    <div className="ig-subcard" style={{ marginTop: 12 }}>
                      <div className="ig-subcard__row">
                        <span className="ig-subcard__label"><Tag size={13} aria-hidden="true" /> Discount <span style={{ fontWeight: 500, color: "#5b6272" }}>(optional)</span></span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Segmented label="Discount type" size="sm" accent={color} value={doc.discType} onChange={(v) => patch({ discType: v })}
                            options={[{ value: "%", label: "%" }, { value: "fixed", label: doc.cur.s }]} />
                          <input type="number" inputMode="decimal" min="0" step="any" aria-label="Discount value" value={doc.discount || ""} placeholder="0"
                            onChange={(e) => patch({ discount: Math.max(0, parseFloat(e.target.value) || 0) })} className="ig-input ig-input--mini" />
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: "#dc2626", fontVariantNumeric: "tabular-nums", minWidth: 60, textAlign: "right" }}>
                            {totals.discount > 0 ? `−${money(totals.discount)}` : "—"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tax */}
                    <div className="ig-subcard" style={{ marginTop: 10 }}>
                      <div className="ig-subcard__row" style={{ marginBottom: 10 }}>
                        <span className="ig-subcard__label"><Percent size={13} aria-hidden="true" /> Tax</span>
                        <Segmented label="Tax type" size="sm" accent={color} value={doc.taxType} onChange={(v) => patch({ taxType: v })}
                          options={[{ value: "exclusive", label: "Added on top" }, { value: "inclusive", label: "Included in prices" }]} />
                      </div>
                      <div className="ig-subcard__row">
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <Sel label="Tax label" srOnly value={["Tax", "VAT", "GST", "HST", "Sales tax", "IVA", "TVA", "MwSt."].includes(doc.taxLabel) ? doc.taxLabel : "Tax"} accent={color} onChange={(v) => patch({ taxLabel: v })}>
                            {["Tax", "VAT", "GST", "HST", "Sales tax", "IVA", "TVA", "MwSt."].map((l) => <option key={l} value={l}>{l}</option>)}
                          </Sel>
                          <input type="number" inputMode="decimal" min="0" max="100" step="any" aria-label="Tax rate percent" placeholder="0" value={doc.tax || ""}
                            onChange={(e) => patch({ tax: Math.max(0, Math.min(1000, parseFloat(e.target.value) || 0)) })} className="ig-input ig-input--mini" />
                          <span style={{ fontSize: 12.5, color: "#5b6272" }}>%</span>
                        </div>
                        <span style={{ fontWeight: 600, color: "#2f3542", fontVariantNumeric: "tabular-nums", fontSize: 13 }}>
                          {doc.taxType === "exclusive" ? money(totals.tax) : doc.tax > 0 ? `incl. ${money(totals.taxIncluded)}` : "—"}
                        </span>
                      </div>
                      <p className="ig-hint" style={{ marginTop: 8 }}>Leave at 0 if you don&apos;t charge tax. Choose &ldquo;Included in prices&rdquo; if your prices already contain it.</p>
                      {doc.taxType === "inclusive" && (
                        <p className="ig-note ig-note--ok">✓ Prices already include {doc.taxLabel || "tax"}; the PDF shows the included amount for the client&apos;s records.</p>
                      )}
                    </div>
                  </>
                )}

                {isQuick && (doc.tax > 0 || doc.discount > 0) && (
                  <p className="ig-note" style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e3a8a", marginTop: 10 }}>
                    {doc.tax > 0 && <>{doc.taxLabel || "Tax"} of {doc.tax}% is being applied from your saved settings. </>}
                    {doc.discount > 0 && <>A discount is applied. </>}
                    <button type="button" className="ig-linkbtn" onClick={() => changeMode("full")}>Change in All options</button>
                  </p>
                )}

                {/* Totals */}
                <div className="ig-totalbox" aria-live="polite">
                  {(totals.discount > 0 || (doc.taxType === "exclusive" && doc.tax > 0)) && (
                    <div className="ig-totalrow"><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>
                  )}
                  {totals.discount > 0 && (
                    <div className="ig-totalrow" style={{ color: "#dc2626" }}><span>Discount {doc.discType === "%" ? `(${doc.discount}%)` : ""}</span><span>−{money(totals.discount)}</span></div>
                  )}
                  {doc.taxType === "exclusive" && doc.tax > 0 && (
                    <div className="ig-totalrow ig-totalrow--rule"><span>{doc.taxLabel || "Tax"} ({doc.tax}%)</span><span>{money(totals.tax)}</span></div>
                  )}
                  <div className="ig-totalrow ig-totalrow--grand">
                    <span>Total</span>
                    <span style={{ color }}>{money(totals.total)}</span>
                  </div>
                </div>
              </div>

              {!isQuick && (
                <>
                  <Divider />

                  {/* ── Payment details ── */}
                  <div className="ig-block" style={{ marginTop: 20 }}>
                    <TxtArea label="Bank / payment details" hint="Optional — tells your client how to pay you. Shown in a box on the document." value={doc.meta.bankDetails} rows={3} accent={color}
                      placeholder={"Bank: Example Bank\nAccount name: Your Name\nAccount no: 1234-5678 · Sort/Routing: 00-00-00\nor PayPal / UPI / IBAN"} onChange={(v) => setMeta({ bankDetails: v })} />
                  </div>

                  {/* ── Notes ── */}
                  <div className="ig-block">
                    <TxtArea label={isQuote ? "Terms & conditions" : "Notes / payment terms"} rows={3} value={doc.meta.notes} accent={color}
                      hint={isQuote ? "Conditions of the offer: validity, deposit, what is not included." : "Anything the client should know: when to pay, late fees, thank-you."}
                      placeholder={isQuote ? "e.g. Valid for 30 days. 50% deposit to begin." : "e.g. Payment due within 30 days. Late payments incur 2% per month."} onChange={(v) => setMeta({ notes: v })} />
                  </div>

                  {/* ── Watermark + footer note ── */}
                  <div className="ig-grid2" style={{ marginBottom: 6 }}>
                    <div>
                      <span className="ig-label">Watermark image <span style={{ fontWeight: 400, color: "#6b717f" }}>(optional)</span></span>
                      {doc.wmLogo ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={doc.wmLogo} alt="Watermark preview" style={{ height: 38, maxWidth: 100, objectFit: "contain", borderRadius: 6, border: "1.5px solid #e3ddd0", padding: 4, background: "white" }} />
                          <button type="button" onClick={() => patch({ wmLogo: null })} className="ig-linkbtn" style={{ color: "#dc2626" }}><X size={12} aria-hidden="true" /> Remove</button>
                        </div>
                      ) : (
                        <label className="ig-upload ig-upload--block" style={{ ["--accent" as string]: color }}>
                          <Upload size={14} aria-hidden="true" /> Upload watermark
                          <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) readFile(f, (u) => patch({ wmLogo: u })); e.target.value = ""; }} />
                        </label>
                      )}
                    </div>
                    <TxtArea label="Footer note" hint="Clear to hide" rows={2} value={doc.meta.signNote} accent={color}
                      placeholder="This is a computer-generated document and does not require a signature." onChange={(v) => setMeta({ signNote: v })} />
                  </div>
                </>
              )}

            </div>{/* end form body */}

            {/* ── Validation ── */}
            {warnings.length > 0 && (
              <details className="ig-warn" open={warnings.length <= 2}>
                <summary><AlertTriangle size={14} aria-hidden="true" /> {warnings.length} thing{warnings.length > 1 ? "s" : ""} to check before you send</summary>
                <ul aria-live="polite">{warnings.map((w) => <li key={w}>{w}</li>)}</ul>
              </details>
            )}

            {/* ── Actions ── */}
            <div className="ig-formfoot">
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" data-field="download" onClick={startDownload} disabled={busy} className="ig-btn ig-btn--primary" style={{ background: busy ? "#6b717f" : color, boxShadow: busy ? "none" : `0 4px 16px ${color}45`, flex: 1 }}>
                  {busy ? <><Spinner /> Generating…</> : <><Download size={15} aria-hidden="true" /> Download PDF</>}
                </button>
                <button type="button" onClick={startPrint} className="ig-btn ig-btn--outline" title="Print or save as PDF via your browser">
                  <Printer size={15} aria-hidden="true" /> <span className="ig-hide-xs">Print</span>
                </button>
                <div style={{ position: "relative" }}>
                  <button type="button" onClick={() => setMoreOpen((o) => !o)} aria-expanded={moreOpen} aria-haspopup="menu" className="ig-btn ig-btn--outline" title="More actions">
                    <span className="ig-hide-xs">More</span> <ChevronDown size={14} aria-hidden="true" />
                  </button>
                  {moreOpen && (
                    <div role="menu" className="ig-menu">
                      <button type="button" role="menuitem" onClick={startNew}><FilePlus2 size={14} aria-hidden="true" /> New {info.label.toLowerCase()} <kbd>{nextInvoiceNumber(doc.meta.no)}</kbd></button>
                      <button type="button" role="menuitem" onClick={duplicate}><Copy size={14} aria-hidden="true" /> Duplicate</button>
                      <button type="button" role="menuitem" onClick={saveDraft}><Save size={14} aria-hidden="true" /> {isLoggedIn ? "Save draft to dashboard" : "Save draft (sign in)"}</button>
                      {(isQuote || doc.docType === "invoice") && (
                        <button type="button" role="menuitem" onClick={convert}><ArrowRightLeft size={14} aria-hidden="true" /> {isQuote ? "Convert to invoice" : "Create receipt from this invoice"}</button>
                      )}
                      <div className="ig-menu__sep" />
                      <button type="button" role="menuitem" onClick={exportJson}><FileJson size={14} aria-hidden="true" /> Export as file (.json)</button>
                      <button type="button" role="menuitem" onClick={() => importRef.current?.click()}><FolderOpen size={14} aria-hidden="true" /> Restore from file…</button>
                      <input ref={importRef} type="file" accept="application/json,.json" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) importJson(f); e.target.value = ""; }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="ig-formfoot__meta">
                {isLoggedIn ? (
                  <label className="ig-check">
                    <input type="checkbox" checked={settings.saveToDashboard} onChange={(e) => saveSettings({ saveToDashboard: e.target.checked })} />
                    Save a copy to my dashboard when I download
                  </label>
                ) : (
                  <button type="button" onClick={() => openModal("choose", "footer_signin")} className="ig-linkbtn" style={{ color: "#151a24" }}>
                    Sign in free to save, duplicate and track your documents
                  </button>
                )}
                {!isPro && (
                  <button type="button" onClick={() => openModal("upgrade", "footer_upgrade")} className="ig-linkbtn" style={{ color: "#96141d" }}>
                    <Crown size={12} aria-hidden="true" /> Pro: premium templates &amp; white-label PDFs
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ══════════════ PREVIEW PANEL ══════════════ */}
          <div ref={colRef} className="ig-preview lg:sticky lg:top-[80px]">
            <div className="ig-previewbar no-print">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="ig-livedot" aria-hidden="true"><span /><span /></span>
                <span className="ig-previewbar__title">Live preview</span>
                <span className="ig-badge" style={{ color: "#3a4150", background: "#f3efe6", borderColor: "#e3ddd0" }}>{pages > 1 ? `${pages} pages` : "1 page"}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                <span className="ig-badge" style={{ color: info.color, background: `${info.color}10`, borderColor: `${info.color}30` }}>{info.label}</span>
                {(showStatus || doc.docType === "receipt") && <span className="ig-badge" style={{ color: st.color, background: st.bg, borderColor: st.border }}>{st.label}</span>}
                <Segmented label="Paper size" size="sm" accent={color} value={doc.paper} onChange={(v) => patch({ paper: v })}
                  options={[{ value: "a4", label: "A4" }, { value: "letter", label: "Letter" }]} />
              </div>
            </div>

            <div ref={wrapRef} className="ig-cardwrap ig-card">
              <div id="invoice-print-area">
                <InvoicePreview ref={previewRef} doc={viewDoc} totals={totals} whiteLabel={whiteLabel} />
              </div>
            </div>

            <p className="ig-previewnote no-print">
              {pages > 1 ? `Long document — the PDF breaks cleanly between items across ${pages} pages and numbers each page.` : "Your PDF will match this preview exactly."}
              {!whiteLabel && " Free PDFs carry a small “Generated by” line in the footer."}
            </p>
          </div>
        </div>
      </div>

      {toast && <div role="status" className="ig-toast no-print">{toast}</div>}

      <DownloadAdModal
        open={adModal.open}
        status={adModal.status}
        action={adModal.action}
        accent={color}
        savedToDashboard={adModal.saved}
        onClose={() => setAdModal((m) => ({ ...m, open: false }))}
        onRetry={() => (adModal.action === "download" ? startDownload() : startPrint())}
        isLoggedIn={isLoggedIn}
        isPro={isPro}
        onSignIn={() => { setAdModal((m) => ({ ...m, open: false })); openModal("choose", "post_download"); }}
        onUpgrade={() => { setAdModal((m) => ({ ...m, open: false })); openModal("upgrade", "post_download"); }}
      />
    </div>
  );
}
