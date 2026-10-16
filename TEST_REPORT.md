# TEST REPORT — PDF Bill Builder overhaul

Date: 2026-10-16 · Branch `feat/saas-seo-revenue-2026-10` · Node v24.19.0 · Next.js 16.2.6
Environment: local Windows machine, **no `.env`** (no database, Google OAuth, or Lemon Squeezy
credentials). Everything that needs those services was tested for graceful degradation and with
unit tests, not against real services. Nothing was deployed.

## 1. Automated checks

| Check | Command | Baseline (before changes) | After changes |
|---|---|---|---|
| ESLint | `npm run lint` | 15 errors, 6 warnings | **0 errors, 0 warnings** |
| TypeScript | `npm run typecheck` | pass | **pass** |
| Unit tests | `npm test` (node:test, 5 files) | no tests existed | **25 pass, 0 fail** |
| Production build | `npm run build` | pass (126 routes) | **pass (131 routes: +3 landing, +2 tools, +3 API)** — see final run in session log |

Unit test coverage (`tests/`):
- `invoice-math.test.ts` — half-up rounding (1.005 → 1.01), fractional quantities, zero and negative
  lines, exclusive tax + % discount, inclusive tax breakdown leaves total unchanged, fixed discount cap,
  no cent drift between displayed lines and subtotal, 300-line invoice precision, money formatting
  (thousands separators, negative, zero-decimal JPY), numbering increment/padding, date math and
  overdue detection.
- `invoice-doc.test.ts` — hostile/garbage input sanitisation (non-data-URL logos dropped, invalid colours,
  bad dates, nested junk), minimum one item, quotation → invoice and invoice → receipt conversion,
  safe file names.
- `plans.test.ts` — plan fallback, free plan has no paid entitlements, subscription status → access
  (active/on_trial/past_due grant; expired/unpaid deny; cancelled until `ends_at`), live price label.
- `pro-token.test.ts` — round-trip for free/pro/business, rejection of plan escalation, expiry
  tampering, signature bit-flip, expired token.
- `validate.test.ts` — string caps/control-char stripping, numeric clamping, UUID/data-URL validation,
  document normalisation drops unknown keys, body size cap and invalid JSON rejection.

## 2. Browser smoke tests (dev server, Chromium in the app's browser pane)

| # | Journey step | Result |
|---|---|---|
| 1 | Open homepage | H1 "Free PDF Invoice Generator", generator + preview render, no console errors |
| 2 | Start an invoice as a guest (no account) | Form editable immediately; `generator_started` fires on first input (gtag absent locally → no-op) |
| 3 | Enter business + client | Preview updates live; business name persisted in localStorage and **pre-filled after reload** |
| 4 | Add 3 items incl. fractional qty 1.5 × 333.33, a zero-qty line, 3 × 12.50 | Lines $500.00 / $0.00 / $37.50; subtotal $537.50 |
| 5 | 10 % discount + 20 % tax | Discount −$53.75, tax $96.75, **total $580.50** (hand-checked) |
| 6 | Download PDF | Blob intercepted: `%PDF-1.3`, 105 KB, 1 page, modal → "Your file is ready!", `pdf_generated` + `pdf_downloaded` tracked |
| 7 | 42-item invoice | Badge "2 pages"; PDF 2 pages (`/Type /Page` ×2), 1.1 MB at 2× (adaptive scale now lowers to 1.5× for tall docs) |
| 8 | Mobile 375 px | No horizontal overflow; From/Bill-to stacked; items in two-row layout; preview scaled 0.44 with fixed 794 px page width (PDF identical to desktop) |
| 9 | Receipt landing page | Opens with Receipt selected, number `RCT-001`, "Paid" badge, 1,107 words of unique content |
| 10 | VAT calculator | UK 20 % preset: £100 → VAT £20 → gross £120 |
| 11 | Header "Sign in" on `/pricing` (previously did nothing) | Modal opens, `role=dialog`, focus moves inside, Escape closes |
| 12 | 404 page | HTTP 404, `noindex, follow`, 8 curated links |
| 13 | `/api/invoices` unauthenticated | 401 |
| 14 | Webhook without secret configured | 503 (configuration error), never 200 |
| 15 | `/api/db-init` without secret | 500 "DB_INIT_SECRET env var not set" |

Routes probed on the dev server (all 200): `/`, `/pricing`, `/receipt-generator`, `/quotation-generator`,
`/estimate-generator`, `/tools/vat-calculator`, `/tools/gst-calculator`, `/templates`, `/blog`,
`/dashboard` (renders spinner, client-side redirect to `/` when signed out), `/llms.txt`;
`sitemap.xml` → 117 URLs including the 5 new ones; canonical on `/pricing` correct.

## 3. Not tested (requires credentials or accounts)

| Area | Why not | How to test |
|---|---|---|
| Google sign-in → session token | No OAuth client locally | DEPLOYMENT_GUIDE §2 step 3 on preview/production |
| Save / load / delete / mark paid / client directory / profile sync | No `DATABASE_URL` | Sign in on production after migration; create, re-open (`/?load=`), duplicate (`/?dup=`), delete |
| Lemon Squeezy checkout, webhook, plan downgrade | No LS keys / webhook secret | DEPLOYMENT_GUIDE §4 (test mode + "Send test event") |
| Pro-only paths (ad-free, white-label footer, premium templates) | Need a Pro session | After LS test purchase, confirm no `.ad-wrap` renders and the footer line is gone |
| GA4 events arriving | gtag not loaded locally | GA4 Realtime after deploy |
| Print dialog output | Headless pane | Manual: Print → "Save as PDF", confirm only the document prints |
| Cross-browser (Safari/Firefox) PDF rendering | Only Chromium available | Manual spot check; html2canvas-pro supports all evergreen browsers |

## 4. Regressions checked

- Existing 38 landing pages still build and render the generator with their own H1/currency.
- `?load=<id>` re-edit flow preserved (and extended with `?dup=`).
- Session token format backward-compatible; old tokens with code `0`/`1` verify.
- Print stylesheet still isolates `#invoice-print-area`.
- Consent Mode, AdSense loader, IndexNow key, Pinterest verification unchanged.
