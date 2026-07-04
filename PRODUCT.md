# Product

## Register

product

> The core surface is the invoice generator tool (design SERVES the task).
> A large marketing/SEO layer wraps it (38 landing pages, 37 blog posts, /pricing,
> /templates) — that layer leans brand, but the product tool is primary and sets
> the visual system. When working on a landing or blog surface specifically, the
> brand register may override per-task.

## Users

Freelancers, contractors, tradespeople (plumbers, electricians, photographers),
consultants, and small-business owners who need to send a professional invoice,
receipt, or quotation **right now** and don't want to install software, create an
account, or pay a monthly SaaS fee.

- **Context:** often mid-job or end-of-month, in a hurry, frequently on mobile,
  frequently non-native English speakers billing across borders (US, UK, Canada,
  Australia, India, Pakistan). Many are sending their *first ever* invoice and are
  unsure what fields it needs.
- **Job to be done:** "Turn my work details into a clean PDF a client will take
  seriously and pay — in under two minutes, for free."
- **Secondary job (Pro):** repeat billers who want saved history, no watermark,
  and premium templates for a consistent brand.

## Product Purpose

PDF Bill Builder is a free, browser-only generator for invoices, receipts, and
quotations. Fill a form → live preview → download a clean PDF. Nothing leaves the
browser unless the user signs in to save history.

**Why it exists / business model:** two organic income streams, zero ad budget —
(1) Google AdSense on content pages (target ~$1000/mo, aimed at high-CPC US/UK/CA/AU
traffic), and (2) Pro subscription at $9/year (target 20–50 subs/mo). Success = the
free tool is good enough to rank, get shared, and convert a slice of users to Pro.

**Design's job here:** make the tool feel instantly trustworthy (people put real
business + client data in), effortless for a first-timer, and premium enough that
$9/year Pro reads as obviously worth it — without ever looking like a generic
"AI-made SaaS template," which erodes exactly the trust the tool depends on.

## Brand Personality

**Trustworthy · Effortless · Quietly premium.** Voice is plain, warm, and honest —
no jargon, no hype, no fake urgency. It speaks to someone who is good at their trade
but not at paperwork. Confident without shouting: the polish is in the details
(clean PDF output, sane defaults, no dark patterns), not in loud gradients or
marketing bluster.

## Anti-references

- **Generic indigo-on-cream AI SaaS** — the exact template look (tinted near-white
  bg, one indigo accent, identical icon-heading-text card grids, tracked uppercase
  eyebrows over every section). The site currently leans this way; move it away.
- **Aggressive fintech / crypto** — neon gradients, glassmorphism, dark hero with
  glowing orbs. Wrong trust signal for someone's real invoices.
- **Enterprise accounting suites** (QuickBooks/Xero density) — dashboards, nav rails,
  feature overload. The whole point is that this is *not* that.
- **Coupon/ad-farm energy** — cluttered, ad-stuffed, popup-heavy. Ads must stay
  polite and secondary; the tool is the hero, not the ad inventory.

## Design Principles

1. **Trust is the product.** Every choice should make a stranger comfortable typing
   their client's name and their own rates in. Privacy-first, no dark patterns,
   honest copy — and it should *look* as safe as it is.
2. **First invoice in two minutes.** Optimise for the anxious first-timer: sane
   defaults, a live preview that teaches by showing, zero required signup.
3. **Show the value, don't claim it.** The live PDF preview and the template gallery
   sell Pro better than any feature list. Prove quality; don't assert it.
4. **Polite monetisation.** Ads and Pro upsells never block the core action or
   interrupt the flow. Getting the free PDF must always feel free.
5. **Escape the AI-default look.** Craft in typography, spacing rhythm, and one
   confident brand expression — not stock indigo cards and eyebrow kickers. If it
   could be guessed from "free SaaS tool," rework it.

## Accessibility & Inclusion

- **WCAG 2.1 AA** target. Body text ≥4.5:1 (the current muted grays on tinted
  near-white are borderline — verify and darken where needed).
- Large touch targets and a form that flows naturally on mobile (many users are
  phone-only).
- `prefers-reduced-motion` respected for all animation (already partly in place).
- Clear, jargon-free labels and error messages for non-native English speakers and
  first-time invoicers.
- Multi-currency and multi-region tax wording so the tool is inclusive of non-US users.
