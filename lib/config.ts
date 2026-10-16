/* ───────────────────────────────────────────────
   Central site config — single source of truth for identity,
   analytics/ads IDs and verification tokens.
   Plans, prices and entitlements live in lib/plans.ts.
─────────────────────────────────────────────── */
export const SITE = {
  name: "PDF Bill Builder",
  url: "https://www.pdfbillbuilder.com",
  author: "Abdul Ahad",   // founder — shown as the author of guides + in schema
  supportEmail: "support@pdfbillbuilder.com",
  // ✅ Real AdSense publisher ID
  adsenseClient: "ca-pub-3004153584501560",

  /* ── Analytics & Search-engine verification ──
     Paste the IDs/tokens once you create the accounts; the code
     auto-activates each only when its value is filled in. */
  googleSiteVerification: "",   // Search Console → HTML tag → content="..."
  bingSiteVerification:   "",   // Bing Webmaster → meta tag → content="..."
  pinterestSiteVerification: "1d969e338812e56b4982997a160ed05e", // Pinterest Settings → Claim → Add HTML tag (added 2026-07-30)
  gaId:                   "G-TLB5627NQ9",   // Google Analytics 4 (dedicated PDF Bill Builder property)

  /* ───────────────────────────────────────────────
     AD UNIT SLOT IDs
     Each banner needs its OWN slot ID. Create them in:
       AdSense → Ads → By ad unit → Display ads → (create)
     Then paste the 10-digit "data-ad-slot" number here.
  ─────────────────────────────────────────────── */
  adSlots: {
    homeTop:      "2945686556",
    homeMid:      "9594855382",
    homeBottom:   "1097948499",
    about:        "6968692049",
    howItWorks:   "5411078115",
  },
} as const;
