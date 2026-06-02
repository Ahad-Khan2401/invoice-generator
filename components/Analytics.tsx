import Script from "next/script";
import { SITE } from "@/lib/config";

/* Google Analytics 4 — only injected once a real "G-XXXX" id is set
   in lib/config.ts. Uses afterInteractive so it never blocks paint
   (keeps the site fast on slow connections). */
export default function Analytics() {
  const id: string = SITE.gaId;
  if (!id.startsWith("G-")) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
