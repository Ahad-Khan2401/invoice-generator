# DEPLOYMENT GUIDE — PDF Bill Builder

Hosting: **Vercel** (project connected to `github.com/Ahad-Khan2401/invoice-generator`, production branch
`main`, `www.pdfbillbuilder.com`). Database: **Neon Postgres**. Billing: **Lemon Squeezy**.
Nothing in this release has been deployed. Deploying is the owner's decision.

## 0. What changed that affects deployment

| Area | Change | Action needed |
|---|---|---|
| Database | New tables `subscriptions`, `webhook_events`, `profiles`, `clients`; new columns on `invoices` (`status`, `due_date`, `issue_date`, `is_draft`, `updated_at`). All `IF NOT EXISTS` — no data is touched. | Run the migration (step 3) **after** deploy, or paste the SQL in Neon beforehand. The app works without it (features degrade to "history unavailable"). |
| Env vars | New: `LS_WEBHOOK_SECRET` (required for webhook), optional `LS_BUSINESS_VARIANT_IDS`, `NEXT_PUBLIC_LS_PRO_YEARLY_URL`, `NEXT_PUBLIC_LS_BUSINESS_MONTHLY_URL`. Removed usage: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (can be deleted). | Add `LS_WEBHOOK_SECRET` in Vercel → Settings → Environment Variables (Production + Preview). |
| Webhook | New endpoint `POST /api/webhooks/lemonsqueezy`. | Register it in Lemon Squeezy (step 4). |
| Routes removed | `/api/activate` (dead legacy licence-key flow). | None — it was unreachable from the UI. |
| Dependencies | Removed `html2canvas` (v1), `@supabase/supabase-js`, `ts-node`, `next.config.js` shim. `package-lock.json` updated. | Vercel runs `npm install` — nothing to do. |
| Session tokens | Format unchanged (`hash.expires.code.sig`); code `"2"` added for Business. Existing tokens stay valid. | None. |

## 1. Pre-deploy checklist (local)

```bash
npm ci
npm run check          # lint + typecheck + unit tests
npm run build          # must finish with 131+ static pages
```

All four passed on 2026-10-16 (see `TEST_REPORT.md`).

## 2. Deploy to a preview first

1. Push the branch: `git push -u origin feat/saas-seo-revenue-2026-10`.
2. Open a PR to `main`. Vercel builds a **Preview** deployment automatically; its URL is on the PR.
3. On the preview URL verify:
   - `/` H1 reads "Free PDF Invoice Generator"; download a PDF as a guest (no sign-in).
   - `/pricing` → header "Sign in" opens the modal (this was broken before).
   - `/receipt-generator`, `/quotation-generator`, `/estimate-generator`, `/tools/vat-calculator`,
     `/tools/gst-calculator` return 200.
   - `/sitemap.xml` lists 117 URLs; `/robots.txt` unchanged; `/does-not-exist` → 404.
   - Sign in with Google (preview must be an authorised origin in the Google OAuth client, or test on
     production only).
4. Merge to `main` → production deploy.

## 3. Database migration (idempotent, run after every deploy that touches `lib/db.ts`)

Option A — API (preferred; uses the deployed code):

```bash
curl -X POST https://www.pdfbillbuilder.com/api/db-init -H "x-init-secret: $DB_INIT_SECRET"
```

Expected: `{"ok":true,"applied":14,...}`. Safe to re-run.

Option B — Neon SQL editor: paste the statements from `SCHEMA_STATEMENTS` in `lib/db.ts`
(they are plain `CREATE TABLE IF NOT EXISTS` / `ALTER TABLE … ADD COLUMN IF NOT EXISTS`).

Rollback: none needed — additive only. To fully revert, drop the four new tables; the `invoices`
columns can stay (unused by the old code).

## 4. Lemon Squeezy webhook

1. LS dashboard → Settings → Webhooks → **+**.
2. URL `https://www.pdfbillbuilder.com/api/webhooks/lemonsqueezy`.
3. Signing secret: generate one (`openssl rand -hex 32`), paste it here **and** as `LS_WEBHOOK_SECRET`
   in Vercel. Redeploy so the env var is live.
4. Events: `subscription_created`, `subscription_updated`, `subscription_cancelled`,
   `subscription_resumed`, `subscription_expired`, `subscription_paused`, `subscription_unpaused`,
   `subscription_payment_failed`, `subscription_payment_success`, `subscription_payment_recovered`,
   `order_refunded`.
5. Test: LS → the webhook → "Send test event". Expect HTTP 200 `{"ok":true,"applied":true,…}`; a bad
   secret returns 401. Then in Neon: `select * from subscriptions order by updated_at desc limit 5;`.
6. End-to-end in **test mode**: switch the store to test mode, buy Pro with LS test card
   `4242 4242 4242 4242`, sign in with the same Google e-mail → header shows PRO, ads disappear, Minimal/
   Bold templates unlock. Cancel the test subscription → after `/api/verify` (next page load after 7
   days, or sign out/in) the account returns to Free.

## 5. Post-deploy verification

```bash
curl -s https://www.pdfbillbuilder.com/ | grep -o "<h1[^>]*>[^<]*"
curl -s -o /dev/null -w "%{http_code}\n" https://www.pdfbillbuilder.com/receipt-generator
curl -s https://www.pdfbillbuilder.com/sitemap.xml | grep -c "<loc>"
curl -s -o /dev/null -w "%{http_code}\n" -X POST https://www.pdfbillbuilder.com/api/webhooks/lemonsqueezy -d '{}'   # 401 (503 if secret unset)
curl -s -o /dev/null -w "%{http_code}\n" https://www.pdfbillbuilder.com/api/invoices                                  # 401
```

Then: Search Console → Sitemaps → resubmit `sitemap.xml`; request indexing for the 5 new URLs.
Check GA4 Realtime for `generator_started` / `pdf_downloaded` events after using the live generator.

## 6. Rollback

- **Code**: Vercel → Deployments → previous production deployment → "Promote to Production"
  (instant), or `git revert` the merge commit on `main`. Tag `checkpoint/pre-overhaul-2026-10-16`
  marks the pre-release state.
- **Database**: nothing to roll back (additive). Old code ignores the new tables/columns.
- **Webhook**: disable it in Lemon Squeezy; sign-in still syncs the plan from the LS API.

## 7. Environment variable reference

See `.env.example`. Missing variables never crash the build: without `DATABASE_URL` the dashboard
shows "history unavailable"; without `LS_API_KEY` sign-in falls back to the DB (webhook data) or Free;
without `PRO_JWT_SECRET` sign-in returns a configuration error (500) — it must be set in production.
