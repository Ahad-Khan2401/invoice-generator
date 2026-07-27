/* ───────────────────────────────────────────────
   Central site config — single source of truth.
   Replace adsenseClient with your real publisher ID
   once AdSense approves your site.
─────────────────────────────────────────────── */
export const SITE = {
  name: "PDF Bill Builder",
  url: "https://www.pdfbillbuilder.com",
  author: "Abdul Ahad",   // founder — shown as the author of guides + in schema
  // ✅ Your real AdSense publisher ID
  adsenseClient: "ca-pub-3004153584501560",

  /* ── Analytics & Search-engine verification ──
     Paste the IDs/tokens once you create the accounts; the code
     auto-activates each only when its value is filled in. */
  googleSiteVerification: "",   // Search Console → HTML tag → content="..."
  bingSiteVerification:   "",   // Bing Webmaster → meta tag → content="..."
  gaId:                   "G-TLB5627NQ9",   // Google Analytics 4 (dedicated PDF Bill Builder property)

  /* ───────────────────────────────────────────────
     AD UNIT SLOT IDs
     Each banner needs its OWN slot ID. Create them in:
       AdSense → Ads → By ad unit → Display ads → (create)
     Then paste the 10-digit "data-ad-slot" number here.
     Until you replace these, ads will load but stay blank.
  ─────────────────────────────────────────────── */
  adSlots: {
    homeTop:      "2945686556",
    homeMid:      "9594855382",
    homeBottom:   "1097948499",
    about:        "6968692049",
    howItWorks:   "5411078115",
  },

  /* ── Pro (monthly subscription, via Lemon Squeezy) ──────────
     PRICING CHANGED 2026-07-27: $9/year -> $6/month.
     Why: $9/year = $0.75/mo per customer, so $100/mo needed 133 active
     subscribers. At $6/mo it needs 17. Same traffic, ~8x the revenue.

     ⚠️ OWNER ACTION REQUIRED: create a $6/month subscription variant in
     Lemon Squeezy (store 397470) and paste its checkout URL into `proLink`
     below. Until then the button still points at the old $9/year product.
  ─────────────────────────────────────────────── */
  stripe: {
    proLink:      "https://pdfbillbuilder.lemonsqueezy.com/checkout/buy/94cf5dec-ef98-4595-8e88-8ff23712bead",
    priceAmount:  "$6",           // headline number
    pricePeriod:  "month",        // billing period, singular
    priceMonthly: "$6",
    priceLabel:   "$6 / month",   // used in buttons + modals everywhere
    priceNote:    "cancel anytime",
  },
} as const;


