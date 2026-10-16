# IMPLEMENTATION PLAN — PDF Bill Builder overhaul

Working branch: `feat/saas-seo-revenue-2026-10`. Rollback: `git checkout main` or tag `checkpoint/pre-overhaul-2026-10-16`.
Nothing is deployed automatically; see `DEPLOYMENT_GUIDE.md`.

## Stage 0 — Baseline (done)
- Read every route/component/lib, probe live site, record findings in `PROJECT_AUDIT.md`.
- Branch + checkpoint tag, `npm install`, run lint / typecheck / build before touching code.

## Stage 1 — Foundations (P0)
| Task | Files | Status |
|---|---|---|
| Shared auth context + global Pro modal host | `components/AuthProvider.tsx`, `app/layout.tsx`, `Header.tsx`, `InvoiceGenerator.tsx`, `dashboard/page.tsx`, `ProModal.tsx` | ✅ |
| Configurable plans & entitlements | `lib/plans.ts`, `lib/entitlements.ts` | ✅ |
| Lemon Squeezy webhook + subscriptions table | `app/api/webhooks/lemonsqueezy/route.ts`, `lib/db.ts` (schema), `app/api/db-init/route.ts` | ✅ |
| Server-side plan resolution on every API | `app/api/verify`, `app/api/auth/google`, `app/api/invoices` | ✅ |
| Input validation, size caps, rate limiting | `lib/validate.ts`, `lib/rate-limit.ts`, API routes | ✅ |
| Ads hidden for Pro; copy consistency | `AdSlot.tsx`, pricing/modal/dashboard/about/how-it-works copy | ✅ |
| Privacy policy accuracy + delete endpoint | `app/privacy/page.tsx`, `DELETE /api/invoices` | ✅ |

## Stage 2 — Generator & PDF (P0/P1)
| Task | Files | Status |
|---|---|---|
| Money math module + tests | `lib/invoice-math.ts`, `tests/invoice-math.test.ts` | ✅ |
| PDF: JPEG, A4/Letter, smart page breaks, page numbers, metadata | `lib/pdf.ts`, `InvoiceGenerator.tsx` | ✅ |
| Responsive form (phones), labelled inputs, validation panel | `InvoiceGenerator.tsx`, `globals.css` | ✅ |
| Auto-increment numbering, New/Duplicate/Save draft, JSON export/import | `InvoiceGenerator.tsx`, `lib/invoice-doc.ts` | ✅ |
| Convert quotation → invoice, receipt from paid invoice | `InvoiceGenerator.tsx` | ✅ |
| Default doc type per landing page | `InvoiceGenerator` prop `defaultDocType`, `lib/landing.ts` | ✅ |

## Stage 3 — Homepage & pages (P1)
| Task | Status |
|---|---|
| Hero H1 "Free PDF Invoice Generator", doc-type + how-it-works sections, preview callout, FAQ links | ✅ |
| Pricing page driven by `lib/plans.ts` (Free / Pro / optional Business + yearly) | ✅ |
| Dashboard: statuses, mark paid, delete, duplicate, reminder draft, CSV export, search | ✅ |
| New landing pages: receipt-generator, quotation-generator, estimate-generator | ✅ |
| New calculators: VAT calculator, GST calculator (with country presets + unique content) | ✅ |

## Stage 4 — SEO, analytics, AdSense readiness
| Task | Status |
|---|---|
| Stable sitemap dates, trimmed 404, breadcrumbs, metadata review | ✅ |
| `lib/analytics.ts` + funnel events (no PII) | ✅ |
| `SEO_PLAN.md` with keyword hypotheses, page map, validation steps | ✅ |
| AdSense policy review documented; Pro ad-free honoured | ✅ |

## Stage 5 — Quality gates & docs
| Task | Status |
|---|---|
| `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` | ✅ (see TEST_REPORT.md) |
| Browser smoke test of main journey (guest invoice → PDF) | ✅ (see TEST_REPORT.md) |
| `FEATURES_AND_PRICING.md`, `TEST_REPORT.md`, `DEPLOYMENT_GUIDE.md`, `.env.example` | ✅ |

## Deferred (documented, not started)
- Recurring invoice scheduling & email reminders (needs email provider + cron).
- AI-assisted invoice drafting (needs API key, budget, rate limits) — design in `FEATURES_AND_PRICING.md`.
- Team access / multi-user Business features beyond config scaffolding.
- Online payment links (Stripe/PayPal) on invoices.
