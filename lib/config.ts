/* ───────────────────────────────────────────────
   Central site config — single source of truth.
   Replace adsenseClient with your real publisher ID
   once AdSense approves your site.
─────────────────────────────────────────────── */
export const SITE = {
  name: "PDF Invoice Builder",
  url: "https://www.pdfinvoicebuilder.com",
  // ✅ Your real AdSense publisher ID
  adsenseClient: "ca-pub-3004153584501560",
  // Google Search Console verification token (optional, replace later)
  googleSiteVerification: "",

  /* ───────────────────────────────────────────────
     AD UNIT SLOT IDs
     Each banner needs its OWN slot ID. Create them in:
       AdSense → Ads → By ad unit → Display ads → (create)
     Then paste the 10-digit "data-ad-slot" number here.
     Until you replace these, ads will load but stay blank.
  ─────────────────────────────────────────────── */
  adSlots: {
    homeTop:     "1111111111", // home: between tool and article
    homeMid:     "3333333333", // home: inside the article (in-content)
    homeBottom:  "2222222222", // home: after the article
    about:       "4444444444", // About page
    howItWorks:  "5555555555", // How-it-works page
    downloadModal:"6666666666", // shown in the "Preparing your PDF" modal on Download/Print
  },
} as const;
