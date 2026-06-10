# PROJECT_CONTEXT.md — PDF Bill Builder

> **For a new Claude session:** read this file first. It captures the full state of the
> project so you can continue without re-explaining. Last updated: **2026-06-03**.

---

## 1. What this project is

- **Product:** **PDF Bill Builder** — a free, browser-only generator for **invoices, bills,
  receipts, and quotations**. Fill a form → live preview → download a clean **PDF** (or print).
  No signup, no data leaves the browser.
- **Domain (LIVE):** **https://www.pdfbillbuilder.com** (also apex `pdfbillbuilder.com`).
- **Goal:** maximise organic traffic (target ~20–30k visitors/day, realistically 12–24 months)
  → earn from **Google AdSense**. Markets: USA, Canada, UK/Ireland, Australia/NZ, India, Pakistan.
- **Monetisation:** Google AdSense (display ads) + ad modal on Download/Print.

### History of names (DO NOT reintroduce old names/logos)
- Was once **InvoiceQuick** → then **PDF Invoice Builder** (pdfinvoicebuilder.com) → **now PDF Bill Builder**
  (pdfbillbuilder.com). The "invoice" domain was refunded by Hostinger, so we rebranded to "Bill".
- **Brand name = PDF Bill Builder**, but **content still targets BOTH "invoice" and "bill" keywords**
  (invoice has higher search volume; bill avoids the domain issue).
- ⚠️ There must be **zero** references to "PDF Invoice Builder", "InvoiceQuick", or "pdfinvoicebuilder.com"
  anywhere, and **no old logo** (old `public/logo.png` was deleted).

---

## 2. Tech stack & repo

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** · **Tailwind CSS v4**
- PDF: `jspdf` + `html2canvas` (dynamically imported only on Download — keeps bundle small)
- Icons: `lucide-react`. (framer-motion was **removed** for performance — animations are CSS.)
- **Local path:** `C:\Users\ACPKHI\invoice-generator`
- **GitHub:** `https://github.com/Ahad-Khan2401/invoice-generator` (branch `main`, author Ahad-Khan2401 / kahad316@gmail.com)
- **Hosting:** **Vercel** (account `kkahad316-5926`). **Auto-deploy is ON** → every `git push` to `main`
  builds & deploys to production automatically (~30–40s). No manual `vercel --prod` needed.
- **DNS:** managed by **Vercel** (nameservers). Add DNS records via `vercel dns add ...`.

---

## 3. Key files (architecture)

| File | What it controls |
|---|---|
| `lib/config.ts` | **Single source of truth**: brand name, URL, AdSense pub id, GA id, GSC/Bing tokens, **ad slot IDs**, hreflang locales |
| `lib/landing.ts` | All long-tail **landing pages** (`LANDING` map). Add an entry → new page at `/<slug>` (rendered by `app/[profession]/page.tsx`) |
| `lib/posts.ts` | All **blog posts** (`POSTS` map). Add an entry → new post at `/blog/<slug>` |
| `lib/faq.ts` | Home FAQ items (also feeds FAQ schema) |
| `lib/schema.ts` | JSON-LD: SoftwareApplication, FAQ, HowTo, Breadcrumb, Organization, WebSite, Article, Blog |
| `components/InvoiceGenerator.tsx` | The main tool (form + live preview + PDF/print + ad modal). Props: `heading`, `subheading`, `defaultCurrency` |
| `components/Header.tsx` | Floating glassy header + mobile drawer (Tailwind) |
| `components/Footer.tsx` | Taped-design footer (Tailwind) |
| `components/Logo.tsx` | Inline-SVG brand logo: red "PDF" · navy "Bill" · blue "Builder" |
| `components/ui.tsx` | Shared page primitives: `PageShell`, `PageHero`, `Card`, `CTAButton`, `BackToTool` |
| `components/SeoContent.tsx` | Keyword-rich SEO body + FAQ (home + landing) |
| `components/AdSlot.tsx` | Responsive AdSense `<ins>` slot (clipped so an ad can never break layout) |
| `components/DownloadAdModal.tsx` | Policy-safe ad modal shown on Download/Print |
| `components/Analytics.tsx` | GA4 loader (activates only when `gaId` is set) |
| `app/layout.tsx` | Metadata, favicon/OG (`/icon.png`, `/og.png`), AdSense script, GA, global Org/WebSite schema |
| `app/page.tsx` | Home (tool + SEO + ads + schema) |
| `app/[profession]/page.tsx` | Renders every landing page from `lib/landing.ts` |
| `app/blog/page.tsx` + `app/blog/[slug]/page.tsx` | Blog index + posts |
| `app/about`, `app/how-it-works`, `app/privacy`, `app/terms`, `app/not-found.tsx` | Static pages |
| `app/sitemap.ts`, `app/robots.ts` | Auto-generated sitemap (40 URLs) + robots (allows AI crawlers) |
| `public/icon.png` | Favicon / apple icon (new branding) |
| `public/og.png` | Social/OG share image 1200×630 (new branding) |
| `public/logo-cmp.png` | Wide logo for AdSense consent message (new branding) |
| `public/ads.txt` | `google.com, pub-3004153584501560, DIRECT, f08c47fec0942fa0` |

### ⚠️ Critical gotcha (don't reintroduce)
- **Tailwind cascade:** base styles MUST stay inside `@layer base` in `app/globals.css`.
  An earlier unlayered `* { margin:0; padding:0 }` reset was overriding ALL Tailwind utilities
  (`mx-auto`, padding, etc.) and broke centering site-wide. Keep base styles layered.
- The home **tool** uses inline styles heavily (intentional); the **pages** use Tailwind.

---

## 4. Accounts & IDs (all the user's, all set up)

| Service | Status / ID |
|---|---|
| **Google account** | kkahad316@gmail.com (the correct one; an older `kahad316@gmail.com` is a different/wrong one) |
| **AdSense** | publisher `ca-pub-3004153584501560` — site verified (ads.txt method), **review REQUESTED** (awaiting Google approval), GDPR CMP **published** (3-choice) |
| **Google Analytics 4** | `G-TLB5627NQ9` — dedicated PDF Bill Builder property, **live & tracking** (old `G-GNSHNWJEE3` was shared with ShifaNest — now separated) |
| **Google Search Console** | Domain property `pdfbillbuilder.com` **verified** (DNS TXT), **sitemap submitted** |
| **Bing Webmaster** | **imported from GSC** (done) |
| **Vercel** | account `kkahad316-5926`, project `invoice-generator`, auto-deploy from GitHub |

> In `lib/config.ts`, `googleSiteVerification` and `bingSiteVerification` are still empty
> (we used DNS / GSC-import instead, so meta tokens weren't needed). `gaId` and `adsenseClient` are set.

---

## 5. What is DONE ✅

- Full professional redesign: floating header, taped footer, centered cards, **100% responsive**, fast.
- Tool: Invoice / Receipt / Quotation toggle, Paid/Unpaid, brand-logo upload, watermark, currencies,
  tax, S.No column, auto-fit to one A4 page, editable "computer-generated" footer note.
- **Print fixed** (only the document prints, one page — no blank pages).
- New **PDF Bill Builder** branding everywhere; old name/logo fully removed.
- SEO/AEO: 40-URL sitemap, robots (AI crawlers allowed), 8 schema types, hreflang (6 markets),
  per-page metadata/canonical/OG.
- **15 landing pages** (profession + country: USA/Canada/UK/Australia/India/Pakistan + use-cases + bill keywords).
- **16 blog posts** under `/blog`.
- AdSense: ads.txt, loader script, **6 AdSlot placements** (home ×3, about, how-it-works, download modal),
  policy-safe download/print ad modal, GDPR consent message published.
- GSC + GA4 + Bing all connected. Domain live with auto-deploy.

---

## 6. What is PENDING ⏳ / NEXT STEPS

1. **AdSense approval** — Google's side, takes days–2 weeks. **Nothing to do but wait.**
2. **After approval:** create **6 Display ad units** in AdSense → copy each 10-digit **slot ID** →
   paste into `lib/config.ts` → `adSlots` (replacing the placeholder `1111111111` etc.) → push.
   Current placeholders: `homeTop, homeMid, homeBottom, about, howItWorks, downloadModal`.
3. **Content engine (main traffic lever):** keep adding blog posts + landing pages in batches.
   This is the biggest ongoing job. (User wants Claude to do the writing.)
4. **Backlinks (off-page, user does the submitting):** Claude prepares copy (Product Hunt kit,
   directory blurbs, Reddit/Quora answer drafts); user pastes/submits (Claude can't create
   accounts / log in / solve CAPTCHAs / post under the user's identity).
5. **Traffic timeline (honest):** months 1–3 ≈ near-zero (indexing); 3–6 a trickle; 6–12 growth;
   12–24 the 20–30k/day goal is realistic IF content + backlinks continue. No overnight path.

---

## 7. How to do common tasks

- **Add a blog post:** add one entry to `POSTS` in `lib/posts.ts` (follow existing shape:
  `title, description, date, updated, readMins, keywords, excerpt, body[], faq[]`). Push → auto-live.
- **Add a landing page:** add one entry to `LANDING` in `lib/landing.ts` (`h1, sub, title, desc,
  profession, currencySymbol?, keywords[]`). Page appears at `/<slug>`, auto in sitemap.
- **Change brand/domain:** edit `lib/config.ts` (`name`, `url`). Most things cascade from there.
- **Deploy:** just `git push origin main` (Vercel auto-builds). Verify: `vercel ls invoice-generator`.
- **Add a DNS record:** `vercel dns add pdfbillbuilder.com "@" TXT "value"` (account kkahad316-5926).
- **Build locally to test:** `npm run build` (should generate ~45 static pages, no errors).

### Browser-automation notes (Claude in Chrome)
- `analytics.google.com` and `bing.com` are **blocked** for the browser tool (permission denied).
  AdSense (`adsense.google.com`) **is** allowed.
- The user has **two** connected Chromes; the correct Google account (kkahad316) was on the
  browser with deviceId `b4c985de-4c2a-4bf0-9f97-18f3bd1d469b`. Always confirm the account first.
- Cannot: create accounts, enter passwords, solve CAPTCHAs, post under the user's identity.

---

## 8. The goal restated

The user is non-technical and mainly wants **traffic → AdSense earnings**. The realistic plan:
**(1) Claude keeps producing quality SEO/AEO content** (blog + landing), **(2) user does light
backlink/promotion** with Claude-prepared copy, **(3) time** for Google/AI engines to index & rank.
Everything technical is already built and live — the remaining work is **content + backlinks + patience**.
