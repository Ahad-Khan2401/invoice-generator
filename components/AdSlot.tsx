"use client";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/config";

declare global {
  interface Window { adsbygoogle: unknown[] }
}

/* ───────────────────────────────────────────────
   Responsive AdSense slot.
   - Reserves min-height to avoid layout shift (good CLS / Core Web Vitals).
   - Labelled "Advertisement" (required by AdSense policy).
   - .no-print hides it from printed/PDF output.
   - Never place inside the interactive tool — only between content blocks.
─────────────────────────────────────────────── */
export default function AdSlot({
  slot,
  format = "auto",
  label = true,
}: {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  label?: boolean;
}) {
  const pushed = useRef(false);

  useEffect(() => {
    // Don't try to render ads until a real client ID is set.
    if (!SITE.adsenseClient.includes("ca-pub-XXXX") && !pushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch { /* ignore */ }
    }
  }, []);

  // While the placeholder ID is in place, show a neutral box so you can
  // see exactly where ads will appear (remove once your real ID is live).
  const isPlaceholder = SITE.adsenseClient.includes("ca-pub-XXXX");

  return (
    <div className="ad-wrap no-print" role="complementary" aria-label="Advertisement">
      {label && <span className="ad-label">Advertisement</span>}
      {isPlaceholder ? (
        <div className="ad-placeholder">Ad slot {slot} — set your AdSense ID in lib/config.ts</div>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={SITE.adsenseClient}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
