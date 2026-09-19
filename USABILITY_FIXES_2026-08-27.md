# Usability audit → code fixes — homepage (`/`)

Audit date 2026-08-27 · 24 issues · files touched: `app/globals.css`, `components/InvoiceGenerator.tsx`, `components/HomeGuides.tsx`, `components/Footer.tsx`, `components/SeoContent.tsx`, `lib/posts.ts`

**Read this first.** Issues 1–4 are not 4 bugs, they are one bug reported 4 ways: every value on this page is a magic number written inline at the point of use (`fontSize:10.5`, `borderRadius:12`, `color:"#94a3b8"`). Fix the token layer once and issues 1, 2, 3, 4, 5, 6, 7, 9 and 23 all move at the same time. Do that first; the rest are local.

Two things the audit did not flag that are worse than most of what it did flag, both noted inline below:

- `#94a3b8` on white is **2.7:1** contrast. It is used for every section label and hint on the page. WCAG AA needs 4.5:1 for text under 18px. → issues 5/6/7.
- The accent-colour swatch buttons have **no accessible name** (`title` only, no text, no `aria-label`) and no pressed state. A screen-reader user hears "button, button, button". → issue 24.

---

## 0. The token layer (prerequisite for 1–4)

**`app/globals.css`** — extend the `:root` block that already exists:

```css
:root {
  --bg: #f5f7ff;
  --border: #e4e9f2;
  --primary: #4f46e5;

  /* Text — 5 roles, nothing else. Replaces #94a3b8 / #9ca3af / #c4c9d4 /
     #d1d5db / #475569 / #64748b / #6b7280 / #374151 (all near-duplicate greys). */
  --text-1: #0d1117;   /* headings, values            */
  --text-2: #475569;   /* body copy                   */
  --text-3: #64748b;   /* labels, hints — AA on white */
  --text-4: #94a3b8;   /* decorative only, never text */
  --text-inv: #ffffff;

  /* Type scale — 7 steps. Everything on the page must land on one of these. */
  --fs-xs: 12px;   /* labels, chips, hints  */
  --fs-sm: 13px;   /* dense UI, table cells */
  --fs-base: 14px; /* body, buttons         */
  --fs-md: 15px;   /* card titles, prose    */
  --fs-lg: 17px;   /* card headers          */
  --fs-xl: 20px;   /* section sub-heads     */
  --fs-h2: clamp(22px, 3.5vw, 34px);

  /* Radii — 4 + pill + circle. */
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 20px;
  --r-xl: 24px;
  --r-pill: 999px;
}
```

**`components/InvoiceGenerator.tsx`** — mirror it in TS so the inline styles can reference it (the component is one big inline-style tree; a JS object is the least invasive bridge). Add next to the existing `card` / `baseInput` block around line 105:

```ts
/* ─── Design tokens (single source of truth for this component) ── */
const FS   = { xs:12, sm:13, base:14, md:15, lg:17, xl:20 } as const;
const R    = { sm:8, md:12, lg:20, pill:999 } as const;
const TXT  = { t1:"#0d1117", t2:"#475569", t3:"#64748b", t4:"#94a3b8", inv:"#fff" } as const;
```

Then delete every `10`, `10.5`, `11`, `11.5`, `12.5`, `13.5`, `9.5` font size in the file and map it:

| was | becomes |
|---|---|
| 9.5, 10, 10.5, 11, 11.5 | `FS.xs` (12) |
| 12.5, 13, 13.5 | `FS.sm` (13) |
| 14 | `FS.base` |
| 15 | `FS.md` |
| 17 | `FS.lg` |
| 22 (feature icon) | icon `size={22}`, not a font size |

Same for `borderRadius`: `5→R.sm`, `6→R.sm`, `10→R.md`, `12→R.md`, `14→R.md`, `18→R.lg`, `20→R.lg`, `99→R.pill`. Keep `"50%"` only for the two actual circles (colour swatch, add-item bullet).

---

## 1. No consistent type scale (18 sizes) — *Minor, Consistency*

**Root cause.** No scale exists. Sizes were nudged by eye at each call site, which produced eight half-pixel values (`10.5`, `11.5`, `12.5`, `13.5`) that are visually indistinguishable from their neighbours but each register as a distinct size. `9.5px` and `10px` in the preview footer are two more.

**Fix.** Apply §0. The mapping table collapses 18 → 7. Nothing on screen moves more than 1.5px, so no layout regression — but check the two grids with fixed `gridTemplateColumns` (`"24px 1fr 44px 64px 60px 24px"`, line 778/789): 13px in a 44px Qty column is fine, verify a 4-digit quantity still fits.

---

## 2. Too many text colours (28) — *Minor, Consistency*

**Root cause.** Three overlapping grey ramps are in play — Tailwind slate (`#94a3b8`, `#64748b`, `#475569`), Tailwind gray (`#9ca3af`, `#d1d5db`, `#374151`), and two hand-mixed values (`#c4c9d4`, `#c4b5fd`) — plus the runtime accent `color` and its derived `rgba`/`+"99"`/`+"0f"` variants, each of which counts separately.

**Fix.** Apply the `--text-*` roles from §0 and the `TXT` object. Concretely in `InvoiceGenerator.tsx`:

```
#9ca3af → TXT.t3     #c4c9d4 → TXT.t4 (decorative row numbers only)
#94a3b8 → TXT.t3 when it is text; TXT.t4 only for icons/dividers
#475569 → TXT.t2     #374151 → TXT.t2     #d1d5db → TXT.t4
```

Keep the accent-derived alphas (`${color}0f`, `${color}22`) — those are one token expressed at opacity, not separate colours, and they are what makes the theme picker work.

---

## 3. Inconsistent corner radii (13) — *Minor, Consistency*

**Root cause.** Same magic-number problem, plus a Tailwind/inline split: the footer card uses `rounded-3xl` (24px) while every inline card uses `borderRadius:20`, so the page has two different "big card" radii that are 4px apart.

**Fix.** Apply `R` from §0, and change the footer card to match the tool card:

```diff
- <div className="relative rounded-3xl border border-slate-100 bg-white px-6 py-10 shadow-...">
+ <div className="relative rounded-[20px] border border-slate-100 bg-white px-6 py-10 shadow-...">
```

`0`, `R.sm`, `R.md`, `R.lg`, `R.pill`, `50%` = 6 values, at the target.

---

## 4. Many button styles (19) — *Major, Consistency*

**Root cause.** Every button is styled from scratch inline, including nine that differ only in padding or border colour, plus five `onMouseEnter`/`onMouseLeave` handlers that mutate `style` directly (lines 705, 803, 812, 981, 993) — imperative hover is why no two hover states match either.

**Fix.** Five variants, one factory. Add near the token block:

```ts
type BtnVariant = "primary" | "secondary" | "chip" | "card" | "ghost";

function btn(v: BtnVariant, accent: string, active = false): React.CSSProperties {
  const base: React.CSSProperties = {
    display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
    fontFamily:"inherit", fontWeight:700, cursor:"pointer",
    borderRadius:R.md, border:"1.5px solid transparent", transition:"all .2s",
  };
  switch (v) {
    case "primary":   return { ...base, padding:"13px 20px", fontSize:FS.base,
                               background:accent, color:TXT.inv, boxShadow:`0 4px 16px ${accent}45` };
    case "secondary": return { ...base, padding:"13px 20px", fontSize:FS.base,
                               background:"#fff", color:TXT.t3, borderColor:"var(--border)" };
    case "chip":      return { ...base, padding:"5px 8px", minHeight:24, fontSize:FS.xs, fontWeight:600,
                               borderRadius:R.sm, background:"#fff",
                               color: active ? accent : TXT.t3,
                               borderColor: active ? accent : "var(--border)" };
    case "card":      return { ...base, flexDirection:"column", gap:5, padding:"12px 6px", fontSize:FS.sm,
                               background: active ? `${accent}0f` : "#fff",
                               borderColor: active ? accent : "var(--border)" };
    case "ghost":     return { ...base, padding:"6px 8px", fontSize:FS.xs, fontWeight:600,
                               background:"transparent", color:TXT.t3 };
  }
}
```

Then replace the imperative hover handlers with CSS, in `globals.css` (this also gives every button a keyboard focus ring, which none of them currently have — a real a11y gap the audit missed):

```css
.ig-btn-chip:hover      { border-color: currentColor; }
.ig-btn-secondary:hover { background: #f8fafc; border-color: #c9d0db; }
.ig-btn-ghost:hover     { color: var(--text-2); }
button:focus-visible    { outline: 2px solid var(--primary); outline-offset: 2px; }
```

Call sites become `style={btn("card", color, active)} className="ig-btn-card"` and the `onMouseEnter`/`onMouseLeave` props are deleted.

---

## 5. Long all-caps text — *Minor, Typography*
## 6. Body text is very small (11px) — *Minor, Typography*

Same element, same root cause, so one fix. The selector is a **section label** ("FROM (YOU)", "NOTES / PAYMENT TERMS", "ITEMS & SERVICES"), not body copy — the audit mislabelled it, but both complaints are valid: `sectionTitle` (line 117) is 10.5px, `letterSpacing:0.09em`, `textTransform:uppercase`, `color:#94a3b8`. At 10.5px uppercase it is slow to read, and "NOTES / PAYMENT TERMS" is 21 characters of it.

**Root cause.** One shared token is doing duty for both 4-character labels (where all-caps is fine) and 21-character phrases (where it is not).

**Fix.** Drop the transform, raise the size, fix the contrast. The JSX already passes Title Case strings ("From (You)", "Items & Services"), so removing `textTransform` needs no copy edits:

```diff
 const sectionTitle:React.CSSProperties = {
-  fontSize:10.5, fontWeight:800, letterSpacing:"0.09em",
-  textTransform:"uppercase", color:"#94a3b8",
+  fontSize:FS.xs, fontWeight:800, letterSpacing:"0.01em",
+  color:TXT.t3,
   display:"flex", alignItems:"center", gap:8, marginBottom:12,
 };
```

Same treatment for `labelStyle` (line 122, 11px uppercase `#94a3b8` — used on "Currency", "Due Date", etc.):

```diff
 const labelStyle:React.CSSProperties = {
-  display:"block", fontSize:11, fontWeight:700,
-  letterSpacing:"0.07em", textTransform:"uppercase",
-  color:"#94a3b8", marginBottom:6,
+  display:"block", fontSize:FS.xs, fontWeight:700,
+  letterSpacing:"0.01em", color:TXT.t3, marginBottom:6,
 };
```

`#94a3b8` → `#64748b` takes these labels from **2.7:1 to 4.6:1** on white. That is the AA threshold; it is the most valuable line in this document.

---

## 7. Body text is very small (10px) — hint text — *Minor, Typography*

`<span>(auto — editable / clear to hide)</span>` at line 954: 10px, `#c4c9d4` (**1.7:1** — effectively invisible).

**Root cause.** A form hint was styled as decoration and parked inside the label `<p>`, so it inherits nothing useful and is not programmatically tied to the field it describes.

**Fix.** Make it a real hint: readable size, AA colour, shorter copy, and wired to the textarea.

```diff
   <div style={{ marginBottom:4 }}>
-    <p style={sectionTitle}>
-      <Accent c={color}/>Footer Note
-      <span style={{ fontSize:10,fontWeight:400,color:"#c4c9d4",textTransform:"none",letterSpacing:0 }}>(auto — editable / clear to hide)</span>
-    </p>
-    <TxtArea rows={2} value={meta.signNote} accent={color} fi={focusIn} fo={focusOut}
+    <p style={sectionTitle} id="footer-note-label">
+      <Accent c={color}/>Footer Note
+    </p>
+    <p id="footer-note-hint" style={{ fontSize:FS.xs, color:TXT.t3, margin:"-6px 0 8px", lineHeight:1.4 }}>
+      Pre-filled — edit it, or clear the box to leave it off the PDF.
+    </p>
+    <TxtArea rows={2} value={meta.signNote} accent={color} fi={focusIn} fo={focusOut}
+      aria-labelledby="footer-note-label" aria-describedby="footer-note-hint"
       placeholder="This is a computer-generated document and does not require a signature."
       onChange={v=>setMeta(p=>({...p,signNote:v}))}/>
   </div>
```

`TxtArea` needs to forward the two ARIA props — add `"aria-labelledby"?: string; "aria-describedby"?: string` to its props type and spread them onto the `<textarea>`. Worth doing generally: **none** of the inputs on this form have a programmatic label right now, they rely on `placeholder` only. Placeholder-as-label disappears on typing and is not a reliable accessible name.

---

## 8. Body text is very small (10px) — preview footnote — *Minor, Typography*

`#invoice-print-area > div > div:nth-of-type(2) > p` — the "computer-generated document" note, line 1165.

**Root cause.** This one is different from 5/6/7 and the audit's rule does not cleanly apply: `#invoice-print-area` is an A4 document facsimile that is rendered to PDF from the same DOM. 10px here is *document* typography, and raising it changes the generated PDF, not just the screen.

**Fix.** Minimal, keeps the PDF sane — nudge to 11px and fix the contrast (`#9ca3af` is 2.6:1):

```diff
-  <p style={{ textAlign:"center",fontSize:10,color:"#9ca3af",fontStyle:"italic",marginTop:24,lineHeight:1.5 }}>
+  <p style={{ textAlign:"center",fontSize:11,color:"#6b7280",fontStyle:"italic",marginTop:24,lineHeight:1.5 }}>
```

Do the same for the two 9.5px `Generated by pdfbillbuilder.com` spans (line 1173–1174) → 10px. If small preview text is a recurring complaint, the right answer is a preview zoom control, not inflating the document — file that separately rather than distorting the PDF.

---

## 9. Body text is very small (12px) — eyebrow — *Minor, Typography*

Line 1201: `fontSize:11.5` eyebrow above the "More powerful than any free tool" h2.

**Root cause.** Half-pixel magic number; rounds to 12px in the audit, sits below it in the code.

**Fix.**

```diff
- <p style={{ fontSize:11.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#4f46e5",marginBottom:12 }}>Why PDF Bill Builder</p>
+ <p style={{ fontSize:FS.xs,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--primary)",marginBottom:12 }}>Why PDF Bill Builder</p>
```

All-caps is acceptable here — 19 characters as a genuine eyebrow label, and `#4f46e5` on white is 6.6:1. Only the size needed fixing.

---

## 10. Heading level skipped (H2 → H4) — *Minor, Layout*

**Root cause.** `Footer.tsx` uses `<h4>` for the four column labels because 12px bold felt like an h4 visually. The last heading before the footer is `<h2 id="faq">Frequently Asked Questions</h2>` in `SeoContent.tsx`, so the outline jumps H2 → H4.

**Fix.** `h4` → `h3` in all four columns (lines 59, 71, 87, 103). The class list already sets the visual size, so nothing changes on screen:

```diff
- <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Product</h4>
+ <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Product</h3>
```

Also add `text-slate-500` instead of `text-slate-400` while you are in there — `slate-400` on white is the same 2.7:1 failure as issue 5.

---

## 11. One feature card is high-contrast purple — *Minor, Hierarchy*

**Root cause.** `InvoiceGenerator.tsx` line 1209 sets `accent:true` on "3 Doc Types", and lines 1215–1218 branch on it for background, border, shadow and two text colours. The emphasis is arbitrary — "3 Doc Types" is not the most important claim on the page ("Zero Storage" is the actual differentiator), so the highlight reads as a rendering bug rather than intent.

**Fix.** Remove the branch entirely — uniform cards, and 8 fewer conditional style values (helps issues 2 and 4 too):

```diff
- {e:"⚡",t:"3 Doc Types",     d:"Invoice, Receipt & Quotation from one place.",  accent:true },
+ {e:"⚡",t:"3 Doc Types",     d:"Invoice, Receipt & Quotation from one place.",  accent:false},
```

```diff
- <div key={f.t} style={{ padding:"24px 22px",borderRadius:18,background:f.accent?"linear-gradient(135deg,#4f46e5,#7c3aed)":"#f8faff",border:f.accent?"none":"1.5px solid #edf0fa",boxShadow:f.accent?"0 8px 32px rgba(79,70,229,0.3)":"none" }}>
-   <div style={{ fontSize:22,marginBottom:14 }}>{f.e}</div>
-   <p style={{ fontSize:15,fontWeight:800,color:f.accent?"white":"#0d1117",marginBottom:8,letterSpacing:"-0.02em" }}>{f.t}</p>
-   <p style={{ fontSize:13,lineHeight:1.65,color:f.accent?"rgba(255,255,255,0.75)":"#64748b" }}>{f.d}</p>
+ <div key={f.t} style={{ padding:"24px 22px",borderRadius:R.lg,background:"#f8faff",border:"1.5px solid #edf0fa" }}>
+   <f.Icon size={22} strokeWidth={1.75} color="var(--primary)" style={{ marginBottom:14 }} aria-hidden="true"/>
+   <p style={{ fontSize:FS.md,fontWeight:800,color:TXT.t1,marginBottom:8,letterSpacing:"-0.02em" }}>{f.t}</p>
+   <p style={{ fontSize:FS.sm,lineHeight:1.65,color:TXT.t3 }}>{f.d}</p>
```

(`f.Icon` comes from issue 14 — do the two together, they are the same six lines.) The `accent` key can then be deleted from all six objects. Bonus: `rgba(255,255,255,0.75)` on that gradient was 3.4:1, another AA failure that disappears with the card.

---

## 12. Form fields too tightly spaced (~8px) — *Minor, Spacing*

**Root cause.** Two separate problems in the same block (lines 719–768):

1. `gap:9` between inputs in both columns — genuinely tight for 40px-tall fields.
2. **`marginTop:58` on the BILL TO field stack (line 761).** This is a hardcoded shim to push the client fields down past the "Upload Brand Logo" control that lives inside the FROM column. It only aligns at one font size and one viewport, and it is the reason the two columns look misaligned as soon as anything reflows.

**Fix.** Lift the logo uploader out of the two-column grid so both columns start at the same baseline, then the shim is unnecessary:

```diff
+ {/* Brand logo — above the grid so FROM / BILL TO share a baseline */}
+ <div style={{ margin:"20px 0 14px" }}>
+   <p style={sectionTitle}><Accent c={color}/>Your Logo</p>
+   {/* ...existing brandLogo ternary block, moved verbatim from lines 724–740... */}
+ </div>

  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,margin:"20px 0 22px" }}>
    <div>
      <p style={sectionTitle}><Accent c={color}/>From (You)</p>
-     <div style={{ marginBottom:10 }}>{/* logo uploader */}</div>
-     <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
+     <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      ...
    <div>
      <p style={sectionTitle}><Accent c={color}/>{docType==="receipt"?"Received From":"Bill To"}</p>
-     <div style={{ display:"flex",flexDirection:"column",gap:9,marginTop:58 }}>
+     <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
```

`gap:9 → 12` on both stacks; `marginTop:58` deleted. Net vertical change is roughly zero (three extra gaps of 3px against 58px removed), and the columns now stay aligned at every width.

---

## 13. 4-over-2 grid leaves a void — *Minor, Spacing*

**Root cause.** Feature grid, line 1206: `repeat(auto-fit,minmax(220px,1fr))` inside `maxWidth:1000`. 1000 ÷ 220 = 4.5, so `auto-fit` packs 4 columns and the 6 cards land 4 + 2, leaving two empty cells against centred headings.

**Fix.** Raise the min track so 4 columns can never fit (4 × 280 + 3 × 20 gap = 1180 > 1000), forcing a stable 3 × 2:

```diff
- <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20 }}>
+ <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20 }}>
```

3 × 2 at desktop, 2 × 3 at tablet, 1 × 6 at mobile — 6 cards divide evenly into all three, so no configuration leaves a hole. No media query needed.

---

## 14. Icons lack a unified style — *Minor, Imagery*

**Root cause.** The six "icons" are **emoji** (`🔒 ⚡ 🏷️ 📊 🏦 ✅`, lines 1208–1213). Emoji are rendered from the OS font — Apple Color Emoji, Segoe UI Emoji, Noto — so their weight, palette and even metaphor are outside your control, and they differ per visitor. `✅` in particular renders as a filled green UI checkbox on Windows, which is why it reads as a control rather than an illustration.

**Fix.** Use `lucide-react`, already a dependency and already imported in this file — one stroke weight, one colour, one size:

```diff
  import {
    Trash2, Download, Printer, Plus, Upload, X,
    FileText, Receipt, ClipboardList, Tag, Percent,
+   ShieldCheck, Files, Maximize2, Landmark, BadgeCheck,
  } from "lucide-react";
```

```diff
- {e:"🔒",t:"Zero Storage",   d:"...", accent:false},
- {e:"⚡",t:"3 Doc Types",    d:"...", accent:true },
- {e:"🏷️",t:"Tax Inclusive",  d:"...", accent:false},
- {e:"📊",t:"Auto A4 Fit",    d:"...", accent:false},
- {e:"🏦",t:"Bank Details",   d:"...", accent:false},
- {e:"✅",t:"Always Free",    d:"...", accent:false},
+ {Icon:ShieldCheck, t:"Zero Storage",  d:"..."},
+ {Icon:Files,       t:"3 Doc Types",   d:"..."},
+ {Icon:Percent,     t:"Tax Inclusive", d:"..."},
+ {Icon:Maximize2,   t:"Auto A4 Fit",   d:"..."},
+ {Icon:Landmark,    t:"Bank Details",  d:"..."},
+ {Icon:BadgeCheck,  t:"Always Free",   d:"..."},
```

Render as shown in issue 11 (`<f.Icon size={22} strokeWidth={1.75} color="var(--primary)" aria-hidden="true"/>`). `aria-hidden` matters — the card title already carries the meaning, so an announced icon would be duplicate noise.

The three "Invoice / Receipt / Quotation" pills at line 1185 have the same emoji problem and the same fix (`FileText`, `Receipt`, `ClipboardList` are already imported).

---

## 15. "Read guide" links not bottom-aligned — *Minor, Spacing*

**Root cause.** `HomeGuides.tsx` line 34: the card `<Link>` is `display:"block"`. Grid stretches the card to the row height, but a block card lets its children sit at natural height, so the link follows whatever length the excerpt happened to be.

**Fix.** Make the card a column flexbox and push the link down. The audit's own suggestion is correct:

```diff
  <Link key={p.slug} href={`/blog/${p.slug}`}
    style={{
-     display: "block",
+     display: "flex", flexDirection: "column", height: "100%",
      background: "white", border: "1px solid #e9edf5", borderRadius: 14,
      padding: "18px 20px", textDecoration: "none",
      boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
    }}>
```

```diff
-  <span style={{ display:"block", fontSize:"0.85rem", color:"#4f46e5", fontWeight:600, marginTop:10 }}>
+  <span style={{ display:"block", fontSize:"var(--fs-sm)", color:"var(--primary)", fontWeight:600, marginTop:"auto", paddingTop:12 }}>
     Read guide &rarr;
   </span>
```

`height:100%` on a stretched grid item resolves against the row, so `margin-top:auto` pins the link to the card floor. Excerpt `<span>`s stay `display:block` — they are the flex children that absorb the slack.

---

## 16. Guide cards are visually undifferentiated — *Suggestion, Density*

**Root cause.** `HomeGuides.tsx` renders `title` / `excerpt` / "Read guide" and nothing else, so nine cards are nine identical grey rectangles. `lib/posts.ts` has `readMins` and `keywords` but no category, so there is nothing to render even if the card wanted to.

**Fix, part 1 (zero schema change, do this now).** Surface `readMins`, which already exists on every post:

```diff
+ <span style={{ display:"block", fontSize:"var(--fs-xs)", color:"var(--text-3)", fontWeight:600, marginBottom:6 }}>
+   {p.readMins} min read
+ </span>
  <span style={{ display:"block", fontSize:"1rem", fontWeight:700, color:"#1e293b", lineHeight:1.35 }}>
    {p.title}
  </span>
```

**Fix, part 2 (one optional field).** In `lib/posts.ts`:

```ts
export type PostCategory = "Basics" | "Getting paid" | "Tax & compliance" | "Freelance" | "Comparisons";

export interface Post {
  title: string;
  category?: PostCategory;   // ← optional, so all 59 posts keep compiling
  ...
}
```

Then in the card, above the title:

```tsx
{p.category && (
  <span style={{
    display:"inline-block", fontSize:"var(--fs-xs)", fontWeight:700,
    color:"var(--primary)", background:"#eef2ff",
    padding:"2px 8px", borderRadius:"var(--r-pill)", marginBottom:8,
  }}>{p.category}</span>
)}
```

Backfill `category` on the nine posts in `POST_LIST.slice(0, 9)` only — the rest inherit the `undefined` branch and render exactly as today. Colour-coding per category is tempting; skip it. Colour alone is not an accessible signifier, and the text label already does the job.

---

## 17. Uneven vertical rhythm in footer columns — *Minor, Spacing*

**Root cause.** `Footer.tsx` uses `gap-2.5` (10px) between links plus inherited `line-height:1.6` from `body`. Gap spaces *boxes*, so a one-line item occupies ~22px and a two-line item ~45px. "Freelance Hourly Rate Calculator" and "Small Business Invoice" wrap in a 4-column grid; "Blog" never does. The gap is uniform, the rhythm is not.

**Fix.** Two changes, both needed:

1. Stop most of the wrapping by shortening labels — the column heading already supplies the context, so "Calculator" and "Invoice" are redundant in every row:

```diff
  const FOOTER_TOOLS = [
-   { slug: "late-fee-calculator",              label: "Late Fee Calculator" },
-   { slug: "freelance-hourly-rate-calculator", label: "Hourly Rate Calculator" },
-   { slug: "sales-tax-calculator",             label: "Sales Tax Calculator" },
-   { slug: "discount-calculator",              label: "Discount Calculator" },
-   { slug: "profit-margin-calculator",         label: "Profit Margin Calculator" },
+   { slug: "late-fee-calculator",              label: "Late fees" },
+   { slug: "freelance-hourly-rate-calculator", label: "Hourly rate" },
+   { slug: "sales-tax-calculator",             label: "Sales tax" },
+   { slug: "discount-calculator",              label: "Discount" },
+   { slug: "profit-margin-calculator",         label: "Profit margin" },
  ];
```

2. Make the remaining wrap degrade gracefully — swap box gap for a per-item line box:

```diff
- <div className="flex flex-col gap-2.5 text-[14px]">
+ <div className="flex flex-col text-[14px] leading-6 [&>*]:py-1">
```

Every item is now a multiple of the 24px line box, so a two-line label consumes exactly two beats instead of an arbitrary 45px. Apply to all four columns.

---

## 18. Redundant Privacy / Terms in sub-footer — *Suggestion, Density*

**Root cause.** The bottom bar predates the four-column Legal block; both survived.

**Fix.** Delete the duplicates, keep copyright and the email:

```diff
  <div className="mt-4 flex flex-col items-start justify-between gap-3 px-4 text-[13px] text-slate-400 sm:flex-row sm:items-center">
    <p>© {year} PDF Bill Builder. All rights reserved.</p>
    <div className="flex items-center gap-5">
-     <Link href="/privacy" className="hover:text-slate-700">Privacy</Link>
-     <Link href="/terms" className="hover:text-slate-700">Terms</Link>
      <a href="mailto:support@pdfbillbuilder.com" className="hover:text-slate-700">support@pdfbillbuilder.com</a>
    </div>
  </div>
```

No SEO cost — `/privacy` and `/terms` are still linked once each from the Legal column, which is what crawlers count.

---

## 19. Envelope icon centred against two lines — *Minor, Spacing*

**Root cause.** `Footer.tsx` line 108: `items-center` on the anchor. When "Email support" wraps in a narrow column, the icon centres against the two-line block and drifts below the first baseline, breaking the left rail the other links establish.

**Fix.** Top-align the icon and nudge it onto the first baseline:

```diff
- <a className="inline-flex items-center gap-1.5 font-medium text-slate-500 transition-colors hover:text-indigo-600" href="mailto:support@pdfbillbuilder.com">
-   <Mail className="size-3.5 shrink-0" /> Email support
+ <a className="inline-flex items-start gap-1.5 font-medium text-slate-500 transition-colors hover:text-indigo-600" href="mailto:support@pdfbillbuilder.com">
+   <Mail className="mt-[5px] size-3.5 shrink-0" aria-hidden="true" /> Email support
  </a>
```

`mt-[5px]` centres a 14px icon in the 24px line box from issue 17. `aria-hidden` because the link text already says "Email support".

---

## 20. Sub-footer not aligned to the footer grid — *Minor, Spacing*

**Root cause.** Two different horizontal insets. The card is `px-6` (24px) with an inner `md:px-4` (16px) → content starts at **40px** from the footer edge at md+. The bottom bar is `px-4` → **16px**. 24px of misalignment.

**Fix.** Match the effective inset, and remember the card also has a 1px border:

```diff
- <div className="mt-4 flex flex-col items-start justify-between gap-3 px-4 text-[13px] text-slate-400 sm:flex-row sm:items-center">
+ <div className="mt-4 flex flex-col items-start justify-between gap-3 px-6 text-[13px] text-slate-400 sm:flex-row sm:items-center md:px-10">
```

Below `md` the card's inner `md:px-4` is inactive, so `px-6` matches there too. Both rows now share one rail at every breakpoint.

---

## 21. Secondary "Sign In" CTA competes with "Download PDF" — *Major, Consistency*

**Root cause.** Lines 986–998. The nudge is a full-width filled button with a border, a purple background, 12.5px bold text and 10px/16px padding — 90% of the primary's footprint, sitting directly beneath it in the same flex column. Two filled buttons stacked = no primary. The label is also doing too much: "✦ Sign In — Save invoices to dashboard (free)" is a headline, not a button.

**Fix.** Demote to a text link. Same slot, same behaviour, a quarter of the visual weight:

```diff
  {!isPro && (
-   <button onClick={()=>setProModalOpen(true)} style={{
-     display:"flex",alignItems:"center",justifyContent:"center",gap:7,
-     padding:"10px 16px",borderRadius:12,
-     border:"1.5px solid #c4b5fd",background:"#f5f3ff",
-     color:"#7c3aed",fontSize:12.5,fontWeight:700,cursor:"pointer",transition:"all .2s",
-   }}
-     onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#ede9fe";}}
-     onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#f5f3ff";}}>
-     {isLoggedIn
-       ? `✦ Upgrade to Pro — Premium templates & no watermark · ${SITE.stripe.priceLabel}`
-       : "✦ Sign In — Save invoices to dashboard (free)"}
-   </button>
+   <button onClick={()=>setProModalOpen(true)}
+     className="ig-btn-ghost"
+     style={{ ...btn("ghost", color), alignSelf:"center", color:"#7c3aed", textDecoration:"underline", textDecorationColor:"#ddd6fe", textUnderlineOffset:3 }}>
+     {isLoggedIn
+       ? `Upgrade to Pro — ${SITE.stripe.priceLabel}`
+       : "Sign in to save invoices — free"}
+   </button>
  )}
```

Copy is trimmed to one benefit each and the `✦` is dropped; the Pro detail belongs in the modal that opens on click, not on the button. Download PDF is now the only filled button in the footer.

While here: `startDownload`'s button is `disabled` during `busy` but the label change ("Generating...") is not announced. Add `aria-live="polite"` to the button's inner span so screen-reader users learn the PDF is building.

---

## 22. Long dense SEO block buries the FAQ and footer — *Minor, Density*

**Root cause.** `SeoContent.tsx` renders ten `<h2>` sections in sequence on the homepage. Six of them (lines 72–160) are keyword-coverage prose that repeats what the tool and the feature grid already say, adding roughly two full screens of scroll between the generator and the FAQ.

**Fix.** Collapse the deep-dive block behind the same native `<details>` pattern the FAQ already uses — consistent with existing markup, zero JS, and content inside `<details>` is still crawled and indexed:

```tsx
{isHome && (
  <details className="seo-more">
    <summary>More about PDF Bill Builder — invoices, bills, privacy &amp; free tools</summary>
    {/* the existing h2/p blocks from lines 72–128, unchanged */}
  </details>
)}
```

```css
/* globals.css — reuse the FAQ accordion vocabulary */
.seo-more { margin: 28px 0; border-top: 1.5px solid #eef1f8; padding-top: 18px; }
.seo-more > summary {
  cursor: pointer; list-style: none;
  font-size: var(--fs-md); font-weight: 700; color: var(--primary);
  padding: 10px 0;
}
.seo-more > summary::marker,
.seo-more > summary::-webkit-details-marker { display: none; }
.seo-more > summary::after { content: " ↓"; }
.seo-more[open] > summary::after { content: " ↑"; }
```

Demote the nested headings from `h2` to `h3` inside the block so the outline still descends correctly under the section's own heading (see issue 10 — same class of problem).

Honest caveat: this is a presentation fix. If those six sections are not earning impressions in Search Console, collapsing them is a cosmetic improvement to a page that would be better off with the sections deleted. Check Search Console before deciding which.

---

## 23. "Net 60" wraps to a second line — *Minor, Spacing*

**Root cause.** Line 697: `display:flex, gap:4, flexWrap:"wrap"` with intrinsically-sized chips. Four chips at 10px + `3px 8px` padding + 3 × 4px gaps come to a few pixels more than the 211px column, so the flex container wraps the last one. Chips are also only ~20px tall, below the WCAG 2.5.8 24px minimum target size.

**Fix.** Stop sizing them intrinsically — a 4-track grid divides the available width exactly, whatever the column measures:

```diff
- <div style={{ display:"flex",gap:4,marginTop:6,flexWrap:"wrap" }}>
+ <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4,marginTop:6 }}>
    {NET_TERMS.map(t=>(
      <button key={t.label} onClick={()=>setMeta(p=>({...p,due:addDays(p.date,t.days)}))}
-       style={{
-         fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:6,
-         border:"1px solid #e4e9f2",background:"white",color:"#64748b",
-         cursor:"pointer",transition:"all .15s",
-       }}
-       onMouseEnter={...} onMouseLeave={...}>
+       className="ig-btn-chip"
+       style={{ ...btn("chip", color), padding:"5px 4px" }}
+       aria-label={`Set due date to ${t.days} days after the invoice date`}>
        {t.label}
      </button>
    ))}
  </div>
```

Four equal chips, one line at any column width, 24px minimum height from the `chip` variant, and the hover handlers move to CSS (issue 4). The `aria-label` matters — "Net 30" is jargon that means nothing read aloud out of context.

---

## 24. Colour swatches have no label — *Suggestion, Affordance*

**Root cause.** Lines 562–584: six (or eighteen, for Pro) 21px circular `<button>`s with no text, no `aria-label`, and a `title` attribute only. Three separate failures:

- **Sighted users** get no cue that these change the document accent — the audit's point.
- **Screen-reader users** get no accessible name at all. `title` is an unreliable fallback and is not exposed by several AT/browser combinations.
- **Keyboard users** get no state — selection is communicated purely by `box-shadow` and `transform:scale`, and there is no focus ring (`border:"none"`, global `outline:none`).

**Fix.** Label the group visibly, name each button, and expose the selected state:

```diff
- <div style={{ display:"flex",gap:7,flexWrap:"wrap",alignItems:"center" }}>
+ <div style={{ display:"flex",gap:10,alignItems:"center" }}>
+   <span id="accent-label" style={{ fontSize:FS.xs,fontWeight:700,color:TXT.t3,whiteSpace:"nowrap" }}>
+     Accent
+   </span>
+   <div role="group" aria-labelledby="accent-label"
+        style={{ display:"flex",gap:7,flexWrap:"wrap",alignItems:"center" }}>
      {COLORS_FREE.map(c=>(
-       <button key={c.hex} title={c.name} onClick={()=>setColor(c.hex)} style={{
-         width:21,height:21,borderRadius:"50%",background:c.hex,border:"none",cursor:"pointer",
+       <button key={c.hex} type="button"
+         aria-label={`${c.name} accent colour`}
+         aria-pressed={color===c.hex}
+         onClick={()=>setColor(c.hex)} style={{
+         width:24,height:24,borderRadius:"50%",background:c.hex,border:"none",cursor:"pointer",
          boxShadow: color===c.hex ? `0 0 0 2.5px #fff,0 0 0 4.5px ${c.hex}` : "none",
-         transform: color===c.hex ? "scale(1.2)" : "scale(1)", transition:"all .2s",
+         transform: color===c.hex ? "scale(1.15)" : "scale(1)", transition:"all .2s",
        }}/>
      ))}
+   </div>
  </div>
```

Same three attributes on the `COLORS_PRO` map (line 570). Also give the `✦ PRO` unlock button a real name — `aria-label="Unlock 12 Pro accent colours"` — since `✦ PRO` announces as "PRO" alone.

21 → 24px hits the WCAG 2.5.8 minimum target size, and the global `button:focus-visible` ring from issue 4 gives keyboard users a visible selection path. If the header row gets tight at 640px with "Accent" added, drop the word on mobile with a `hidden sm:inline` equivalent and keep `aria-labelledby` pointing at it — a visually hidden label still names the group.

---

## Suggested order of work

| Step | Issues closed | Why first |
|---|---|---|
| 1. Token layer (§0) + labels | 1, 2, 3, 5, 6, 7, 9 | Also fixes three WCAG contrast failures |
| 2. Button factory + CSS hover/focus | 4, 21, 23 | Removes 5 imperative hover handlers, adds focus rings |
| 3. Feature grid: uniform cards + lucide icons + 280px track | 11, 13, 14 | Same six lines of JSX |
| 4. Form layout: logo above grid, gap 12 | 12 | Deletes the `marginTop:58` shim |
| 5. Footer pass | 10, 17, 18, 19, 20 | One file, five small diffs |
| 6. Cards + SEO density | 15, 16, 22 | Behaviour changes — check Search Console first for 22 |
| 7. Accent swatch a11y | 24 | Highest a11y value per line changed |

**Verify after each step:** `npm run build` (catches the `lib/posts.ts` type change and the lucide imports), then Lighthouse Accessibility on `/` — steps 1, 2 and 7 should each move the score, and the contrast audit should go clean after step 1.
