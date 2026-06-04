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

  /* ── Pro (One-time, via Lemon Squeezy) ──────────
     $9 one-time = "Pro Forever"
     Update proLink when you change the LS product price.
  ─────────────────────────────────────────────── */
  stripe: {
    proLink:      "https://pdfbillbuilder.lemonsqueezy.com/checkout/buy/3fad7411-41b1-4e5c-b81d-bec39c54da92",
    priceMonthly: "$9",
    priceLabel:   "$9 one-time",
  },
} as const;
