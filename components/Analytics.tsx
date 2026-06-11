import Script from "next/script";
import { SITE } from "@/lib/config";

/* EEA + UK + Switzerland — regions where consent is required before
   analytics/ad cookies may be set (GDPR / Google EU consent policy). */
const CONSENT_REGIONS = [
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE",
  "IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE",
  "IS","LI","NO","GB","CH",
];

/* Google Analytics 4 — only injected once a real "G-XXXX" id is set
   in lib/config.ts. Uses afterInteractive so it never blocks paint.

   Consent Mode v2: storage defaults to DENIED in the EEA/UK until the
   user accepts via the consent message (Google's certified CMP, enabled
   in AdSense → Privacy & messaging). Elsewhere it defaults to granted. */
export default function Analytics() {
  const id: string = SITE.gaId;
  if (!id.startsWith("G-")) return null;

  const regions = JSON.stringify(CONSENT_REGIONS);

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,region:${regions}});
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
