/* ───────────────────────────────────────────────
   Central site config — single source of truth.
   Replace adsenseClient with your real publisher ID
   once AdSense approves your site.
─────────────────────────────────────────────── */
export const SITE = {
  name: "PDF Bill Builder",
  url: "https://www.pdfbillbuilder.com",
  // ✅ Your real AdSense publisher ID
  adsenseClient: "ca-pub-3004153584501560",

  /* ── Analytics & Search-engine verification ──
     Paste the IDs/tokens once you create the accounts; the code
     auto-activates each only when its value is filled in. */
  googleSiteVerification: "",   // Search Console → HTML tag → content="..."
  bingSiteVerification:   "",   // Bing Webmaster → meta tag → content="..."
  gaId:                   "G-GNSHNWJEE3",   // Google Analytics 4

  /* English markets this site targets (used for hreflang). */
  hreflangLocales: ["en-US", "en-CA", "en-GB", "en-AU", "en-IN", "en-PK"],

  /* ───────────────────────────────────────────────
     AD UNIT SLOT IDs
     Each banner needs its OWN slot ID. Create them in:
       AdSense → Ads → By ad unit → Display ads → (create)
     Then paste the 10-digit "data-ad-slot" number here.
     Until you replace these, ads will load but stay blank.
  ─────────────────────────────────────────────── */
  adSlots: {
    homeTop:     "1111111111",
    homeMid:     "3333333333",
    homeBottom:  "2222222222",
    about:       "4444444444",
    howItWorks:  "5555555555",
    downloadModal:"6666666666",
  },

  /* ── Stripe Premium ──────────────────────────────
     1. Create a Stripe account at stripe.com
     2. Create a Payment Link (Stripe Dashboard → Payment Links)
        Price: $3/month recurring
     3. Paste the link URL below (starts with https://buy.stripe.com/...)
     4. Run: git push origin main → auto-deploys
  ─────────────────────────────────────────────── */
  stripe: {
    proLink:      process.env.NEXT_PUBLIC_STRIPE_PRO_LINK  || "",
    priceMonthly: "$3",
    priceLabel:   "$3 / month",
  },
} as const;
