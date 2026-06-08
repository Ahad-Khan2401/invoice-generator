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
    homeTop:      "2945686556",
    homeMid:      "9594855382",
    homeBottom:   "1097948499",
    about:        "6968692049",
    howItWorks:   "5411078115",
    downloadModal:"7755160104",
  },

  /* ── Pro (One-time, via Lemon Squeezy) ──────────
     $9 one-time = "Pro Forever"
     Update proLink when you change the LS product price.
  ─────────────────────────────────────────────── */
  stripe: {
    proLink:      "https://pdfbillbuilder.lemonsqueezy.com/checkout/buy/94cf5dec-ef98-4595-8e88-8ff23712bead",
    priceMonthly: "$9",
    priceLabel:   "$9 / year",
  },
} as const;
