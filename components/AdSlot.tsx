"use client";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/config";
import { useAuth } from "@/components/AuthProvider";

declare global {
  interface Window { adsbygoogle: unknown[] }
}

/* ───────────────────────────────────────────────
   Responsive AdSense slot.
   - Reserves min-height to avoid layout shift (good CLS / Core Web Vitals).
   - Labelled "Advertisement" (required by AdSense policy).
   - .no-print hides it from printed/PDF output.
   - Never placed inside the interactive tool — only between content blocks.
   - Paid plans are ad-free: renders nothing once the plan is known.
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
  const { isLoaded, limits } = useAuth();
  const adFree = isLoaded && limits.adFree;
  const pushed = useRef(false);

  useEffect(() => {
    if (adFree || pushed.current) return;
    if (!isLoaded) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch { /* ignore */ }
  }, [adFree, isLoaded]);

  if (adFree) return null;

  return (
    <div className="ad-wrap no-print" role="complementary" aria-label="Advertisement">
      {label && <span className="ad-label">Advertisement</span>}
      {isLoaded && (
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
