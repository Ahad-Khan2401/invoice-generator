# SEO PLAN — PDF Bill Builder

Last updated: 2026-10-16. No Search Console / GA access was available during this work, so every
keyword below is a **hypothesis** to validate against Search Console (Performance → Queries) once the
release is live. Nothing here promises rankings or traffic.

## 1. What is already in place (verified in code and live)

- Next.js Metadata API on every indexable page: unique `<title>` + description, canonical URL,
  Open Graph / Twitter cards. Root `robots: index, follow`; `/dashboard` and `/404` are `noindex`.
- `robots.txt` (disallow `/dashboard`, `/api/`; sitemap reference), `sitemap.xml` (117 URLs after this
  release), IndexNow key file, Pinterest verification, `llms.txt` for answer engines.
- Structured data: Organization, WebSite, SoftwareApplication (home + landing pages), HowTo (home),
  FAQPage (built from the same visible FAQ data), BreadcrumbList, BlogPosting, Blog, ContactPage,
  WebApplication (calculators). No ratings/reviews are claimed anywhere.
- 41 landing pages (profession / country / document type), 59 guides, 7 calculators — each with unique
  body copy and FAQs (AdSense "thin content" rejection was already fixed in an earlier release).

## 2. Changes made in this release

| Change | Why |
|---|---|
| Homepage H1 → **"Free PDF Invoice Generator"**; title/description aligned | Matches the primary head term; the old H1 ("Invoices, done in two minutes") carried no keyword. |
| New landing pages `/receipt-generator`, `/quotation-generator`, `/estimate-generator` (generator opens pre-set to that document type, 1,300+ words each, unique FAQs, FAQPage + Software schema) | Core-tool keywords from the brief had no dedicated page. |
| New calculators `/tools/vat-calculator`, `/tools/gst-calculator` with country presets and 1,000+ words each | "VAT calculator" / "GST calculator" are distinct intents from "sales tax calculator". |
| Sitemap `lastModified` now uses real dates (release date / post `updated`), not build time | Fake freshness on 100+ URLs is a negative signal. |
| 404 page trimmed from 38 landing links to 8 useful links, `noindex, follow` | Removes link-spam footprint, keeps crawl paths. |
| Homepage sections: document types, how it works, benefits, resources (server-rendered, internal links to templates/tools/guides) | Adds crawlable topical copy and distributes internal link equity. |
| Landing pages: benefits strip cross-links the three document-type generators + `/templates` | Interlinks the new pages from 38 existing ones. |
| Footer: links to receipt/quotation/estimate generators and VAT/GST calculators | Site-wide internal links to the new money pages. |
| Removed `keywords` meta from root layout | Dead weight; no engine uses it. |
| Copy consistency (no "0 bytes stored", "no subscription ever") | Contradictory claims hurt trust signals and AdSense review. |

## 3. Keyword map (hypotheses → page)

| Intent cluster | Target page | Validate with |
|---|---|---|
| free invoice generator, pdf invoice generator, invoice maker | `/` | GSC queries for `/`; CTR of title |
| free bill generator, online bill maker, bill format | `/bill-generator`, `/online-bill-maker`, `/bill-format` (existing) | GSC |
| receipt generator, free receipt maker, payment receipt template | `/receipt-generator` (new) | GSC impressions after indexing |
| quotation generator, quote maker, quotation format | `/quotation-generator` (new) | GSC |
| estimate generator, estimate maker, free estimate template | `/estimate-generator` (new) | GSC |
| freelancer / contractor / photographer / cleaning / web developer / consultant / handyman invoice | existing `/[profession]` pages | GSC per page |
| US / UK VAT / Canada / Australia / Pakistan invoice | existing country pages + guides | GSC |
| vat calculator, add/remove vat | `/tools/vat-calculator` (new) | GSC |
| gst calculator, gst inclusive/exclusive | `/tools/gst-calculator` (new) | GSC |
| hourly rate / profit margin / late fee calculators | existing tools | GSC |
| invoice numbering, invoice vs receipt, how to make an invoice, payment terms | existing guides | GSC |

## 4. Monthly SEO routine (owner, ~1 hour)

1. **Search Console → Pages**: confirm the 5 new URLs are "Indexed"; use "Request indexing" for any
   that are not after 2 weeks. Submit `sitemap.xml` again after this deploy.
2. **Queries report**: export the top 500 queries; tag each to a page from the map above. Pages with
   impressions but CTR < 2 % get a title/description rewrite (one change at a time, 4-week wait).
3. **Position 5–20 queries**: these are the winnable ones. Expand the matching page's FAQ with the exact
   question wording (only where the answer is genuinely useful).
4. **Core Web Vitals** (GSC → Experience): the generator is a client component; keep the homepage LCP
   element the H1 (server-rendered). Ads are `lazyOnload` and reserve 100px to protect CLS.
5. **Cannibalisation check**: if two URLs rank for the same query, consolidate with a 301 in
   `next.config.ts` (existing example: `/blog/uk-vat-invoice-requirements`).

## 5. Content backlog (write only when GSC shows demand)

- `/invoice-generator-ireland`, `/invoice-generator-new-zealand`, `/invoice-generator-south-africa`
  (guides already exist; landing pages only if those guides earn impressions).
- Guides: "estimate vs invoice", "receipt vs invoice for cash payments", "how to number quotations".
- Calculator: "markup calculator" only if `profit-margin-calculator` shows markup queries.

## 6. Validation checklist after deploy

```bash
curl -s https://www.pdfbillbuilder.com/sitemap.xml | grep -c "<loc>"        # expect 117
curl -sI https://www.pdfbillbuilder.com/receipt-generator | head -1         # 200
curl -s https://www.pdfbillbuilder.com/ | grep -o "<h1[^>]*>[^<]*"          # Free PDF Invoice Generator
curl -s https://www.pdfbillbuilder.com/does-not-exist -o /dev/null -w "%{http_code}\n"  # 404
```

Then: Rich Results Test on `/`, `/receipt-generator`, `/tools/vat-calculator`, one blog post.
