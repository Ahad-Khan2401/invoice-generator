# PROJECT AUDIT — PDF Bill Builder

Audit date: 2026-10-16 · Branch: `feat/saas-seo-revenue-2026-10` · Checkpoint tag: `checkpoint/pre-overhaul-2026-10-16` (= `main` @ f02f8a2)

## 1. Stack inventory (verified from source)

| Area | Finding |
|---|---|
| Framework | Next.js 16.2 (App Router, React 19.2, TypeScript 5, Tailwind v4). `next.config.ts` plus a legacy `next.config.js` shim that boots ts-node (redundant on Next 16). |
| Package manager | npm (`package-lock.json`). Scripts: `dev`, `build`, `start`, `lint`. **No test runner, no typecheck script.** |
| Hosting | Vercel (`vercel.json`, response headers `Server: Vercel`, `X-Nextjs-Prerender: 1`). Apex `pdfbillbuilder.com` 308 → `www`. |
| Routes | `/` generator · 38 `[profession]` landing pages · 59 `/blog/[slug]` posts · 5 `/tools/[tool]` calculators · `/templates` `/pricing` `/how-it-works` `/about` `/contact` `/privacy` `/terms` `/dashboard` · `/llms.txt` `/robots.txt` `/sitemap.xml` (112 URLs live). |
| API | `POST /api/auth/google` (Google token → HMAC session), `POST /api/verify`, `GET/POST /api/invoices`, `GET /api/db-init?secret=`, `POST /api/activate` (legacy Lemon Squeezy licence key — **dead code**, produces a 3-part token that `lib/pro-token.verifyToken` rejects). |
| Database | Neon Postgres via `@neondatabase/serverless`. Single table `invoices(email_hash, invoice_no, doc_type, client_name, total, currency, data JSONB)`. Users are keyed only by a SHA-256 email hash (no raw email stored). `@supabase/supabase-js` + `lib/supabase-server.ts` are **unused**. |
| Auth | Google OAuth (implicit flow, `@react-oauth/google`). Server issues `emailHash.expires.isPro.hmac` token (30 d free / 37 d Pro) stored in `localStorage`. No cookies, no CSRF surface. |
| Payments | Lemon Squeezy hosted checkout (overlay) for "PDF Bill Builder Pro" at **$5.99/month** (store 397470). Pro is detected by calling the LS subscriptions API filtered by email at sign-in time. **No webhook, no local subscription record.** |
| PDF engine | `html2canvas-pro` rasterises the live preview DOM → `jspdf` embeds PNG, A4 only, naive pixel slicing for multi-page. `html2canvas` v1 is still in `package.json` but unused. |
| Analytics | GA4 `G-TLB5627NQ9` via gtag with Consent Mode v2 (EEA/UK/CH default-denied). Only one custom event exists (`begin_checkout`). |
| Ads | AdSense `ca-pub-3004153584501560`, `ads.txt` live, 5 slot IDs, Consent message via AdSense CMP (per code comments). Ad slots: home mid/bottom, landing mid/bottom, blog mid, tools, about, how-it-works. |
| SEO infra | Metadata API titles/descriptions per page, canonicals on all indexable pages, `robots.ts`, `sitemap.ts`, JSON-LD (Organization, WebSite, SoftwareApplication, HowTo, FAQPage, BreadcrumbList, BlogPosting, Blog, ContactPage), IndexNow key, Pinterest verification, `llms.txt`. |
| Env vars (names only) | `PRO_JWT_SECRET`, `DATABASE_URL`, `LS_API_KEY`, `LS_STORE_ID`, `GOOGLE_CLIENT_ID`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `DB_INIT_SECRET`, (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` unused). **None are present locally** — DB, auth and billing cannot be exercised end-to-end from this machine. |

Live site vs. source: the live homepage title, H1 ("Invoices, done in two minutes."), robots.txt, sitemap and ads.txt match `main`. No undeployed drift was detected.

## 2. Prioritised findings

Severity: **P0** = broken/ misleading/ security · **P1** = conversion/SEO/UX impact · **P2** = polish/tech-debt.
Status column is updated as work lands.

| # | Sev | Area | Finding (evidence) | Fix | Status |
|---|---|---|---|---|---|
| 1 | P0 | Auth/UX | `Header` "Sign In" / "Get Started" dispatch a `pdfbb:openSignIn` event that only `InvoiceGenerator` listens to → **buttons do nothing on /pricing, /blog, /tools, /templates, /about, /contact**. Each component also calls `useAuth()` separately (independent `useState`), so signing in via the modal does not update the header until reload. | Global `AuthProvider` context + a single app-level `ProModal` host; header, generator and dashboard consume the shared state. | ✅ Done |
| 2 | P0 | Billing | Pro entitlement is only checked once at sign-in (LS API by email) and then trusted for up to 37 days via the token flag. `/api/verify` only re-validates the HMAC, so a cancelled/refunded subscriber keeps Pro until token expiry. No webhook → no cancellation, failed-payment or refund handling. | Add signed Lemon Squeezy webhook (`/api/webhooks/lemonsqueezy`, HMAC-SHA256 `X-Signature`, idempotent) writing a `subscriptions` table keyed by `email_hash`; `lib/entitlements.ts` resolves the plan server-side on every API call (DB → LS API fallback → token flag). `/api/verify` re-issues a token with the current plan. | ✅ Done (needs `LS_WEBHOOK_SECRET` + webhook URL configured in LS) |
| 3 | P0 | Pricing claims | Pro promises "Always ad-free" (pricing table, modal, dashboard) but `AdSlot` renders ads regardless of plan. | `AdSlot` reads plan from `AuthProvider` and renders nothing for Pro. | ✅ Done |
| 4 | P0 | Privacy policy accuracy | Policy says "You can delete saved invoices from your dashboard at any time" — no delete exists. Says saving happens "only for invoices you explicitly save" — code auto-saves every download for signed-in users. | `DELETE /api/invoices?id=`, dashboard delete + "save to dashboard" toggle; policy wording corrected. | ✅ Done |
| 5 | P0 | Copy consistency | Hero: "no watermark". Pro modal free tier: "Download PDF (with watermark)". Dashboard: "No Watermark — Pro only". /how-it-works FAQ: "no subscription, no credit card — ever", "Nothing is sent to our servers". /about stat: "Data stored: 0 bytes". All contradict Pro + dashboard. | Standardise: free PDFs have no watermark; they carry a small "Generated by" footer line which Pro removes ("white-label"). Rewrite contradictory FAQs/stats. | ✅ Done |
| 6 | P1 | Homepage | H1 is "Invoices, done in two minutes." Brief requires "Free PDF Invoice Generator". Hero lacks document-type overview, how-it-works, preview callout. | New H1 + supporting copy, keep landing-page H1 overrides; add how-it-works and doc-type sections. | ✅ Done |
| 7 | P1 | PDF engine | Raster PDF (large files, not text-selectable), PNG at scale 2 (~1–3 MB), A4 only, multi-page split slices rows mid-line, no page numbers, "Auto A4 fit" copy is false (PDF is not scaled). `f2 = toFixed(2)` on floats → 1.005 → "1.00"; totals computed from unrounded lines can be a cent off the sum of displayed lines. No thousands separators. | New `lib/invoice-math.ts` (rounded money math, Intl formatting, inclusive-tax breakdown shown without changing totals). PDF: JPEG compression, A4/US Letter, smart page breaks at row boundaries, page numbers, PDF metadata. | ✅ Done |
| 8 | P1 | Generator UX | No validation; items grid is 44 px for qty (unusable on mobile); From/Bill-To forced two columns on phones with a `marginTop:58` alignment hack; qty step 1 blocks fractional hours; no duplicate/clear; invoice number never increments; no draft save without download; no export/restore. | Responsive CSS grid, `step="any"`, non-blocking validation panel, auto-increment numbering, "New / Duplicate / Save draft / Export JSON / Import JSON", convert quotation → invoice, receipt from paid invoice. | ✅ Done |
| 9 | P1 | Accessibility | Form inputs rely on placeholders only (no `aria-label`), item inputs unlabelled, doc-type/template buttons lack `aria-pressed`, ProModal lacks `role="dialog"`, no focus management, Esc not handled. | Labels/aria on all controls, dialog semantics + Esc + initial focus, visible focus rings. | ✅ Done |
| 10 | P1 | SEO | `sitemap.ts` stamps `lastModified: now` on every page (false freshness). 404 page links all 38 landing slugs (link spam). No dedicated receipt/quotation/estimate generator pages although these are core keywords. `keywords` meta is dead weight. | Stable lastModified; trimmed 404; new `/receipt-generator`, `/quotation-generator`, `/estimate-generator` landing pages with unique content and the generator pre-set to that doc type; visible breadcrumbs on tools/templates. | ✅ Done |
| 11 | P1 | Analytics | Only `begin_checkout`. None of the funnel events in the brief exist. | `lib/analytics.ts` `track()` (no PII, no amounts) + events: generator_started, document_type_selected, pdf_generated, pdf_downloaded, signup_started/completed, pricing_viewed, checkout_started, premium_feature_clicked, subscription_activated. | ✅ Done |
| 12 | P1 | Security | `POST /api/invoices` accepts an unbounded JSON `data` blob (logos as data-URLs can be MBs) with no field validation. No rate limiting on `/api/auth/google` (calls Google + LS APIs). `/api/db-init` takes the secret in the query string (ends up in logs). Google access-token path never checks the token audience. | Body size cap + field validation/sanitisation, per-IP token bucket on auth/webhook/db-init, header-based secret for db-init, audience check via `tokeninfo` when `GOOGLE_CLIENT_ID` is set. | ✅ Done |
| 13 | P1 | Dashboard | List only. No delete, no duplicate, no status (paid/unpaid/overdue), no CSV export, no search. | Status badges from saved data (`status`, `due_date` columns added non-destructively), mark paid, delete, duplicate, payment-reminder copy, CSV export (Pro), search. | ✅ Done |
| 14 | P1 | Monetisation model | Plan limits hard-coded (`FREE_LIMIT = 5` in the route). No yearly price, no Business tier, pricing hard-wired in `SITE.stripe` (misnamed — provider is Lemon Squeezy). | `lib/plans.ts`: configurable plans/limits/entitlements, optional yearly + Business variants driven by config/env. Pricing page reads from it. Real LS price ($5.99/mo) preserved. | ✅ Done |
| 15 | P2 | Deps / build | Unused `html2canvas` v1, `@supabase/supabase-js`, `ts-node`, `next.config.js` shim. No `typecheck`/`test` scripts. | Remove dead deps/shim, add `typecheck`, `test` (node:test + type stripping on Node 24), `check`. | ✅ Done |
| 16 | P2 | Footer | Year hard-coded `2026`. | `new Date().getFullYear()`. | ✅ Done |
| 17 | P2 | AdSense | `homeTop` slot unused. In-article placements OK, clearly labelled, outside tool. Pro users saw ads (see #3). | Keep placements; document policy posture in SEO_PLAN/FEATURES docs. | ✅ Done |
| 18 | P2 | Contact page | Uses `<a href>` for internal link. | `Link`. | ✅ Done |
| 19 | P2 | Legacy route | `/api/activate` unreachable from UI and incompatible token format. | Removed (documented). | ✅ Done |

## 2b. Follow-up (usability): newcomers found the full form hard to approach

Addressed in the Quick mode / layout PR: Quick mode as default for first-time users, example data, a first-run checklist, field hints, and a pictured Layout & logo panel. See `FEATURES_AND_PRICING.md` and `TEST_REPORT.md` §2b.

## 3. Things verified as working (preserved)

- Guest generation with live preview, logo upload, 3 doc types, inclusive/exclusive tax, % / fixed discount, print view.
- Google sign-in → HMAC session; saved-invoice history (last 5 free) with `?load=` re-edit.
- "Remember my business" localStorage profile.
- 38 unique landing pages, 59 blog posts, 5 calculators, templates gallery, llms.txt, IndexNow, robots/sitemap, Consent Mode.
- Security headers (`nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, HSTS from Vercel).

## 4. Blockers (cannot be completed from this environment)

| Blocker | Impact | Needed |
|---|---|---|
| No `.env` locally (no DB, LS, Google keys) | Auth, dashboard, billing and webhook paths are unit/structure-tested only, not run against real services. | Owner runs the SQL in `DEPLOYMENT_GUIDE.md`, sets `LS_WEBHOOK_SECRET`, registers the webhook URL in Lemon Squeezy, then tests with LS test mode. |
| No Search Console / GA / AdSense access | Keyword data, indexing status, RPM cannot be read. SEO plan uses hypotheses only. | Grant access or export reports. |
| No email provider | Recurring-invoice emails and reminder sending not implementable; reminder *drafts* are implemented (copy-to-clipboard). | Choose provider (Resend/Postmark) later. |
| No AI API key / budget decision | AI invoice drafting (P2) not implemented; design documented. | Decide model/budget; add server route with rate limits. |
