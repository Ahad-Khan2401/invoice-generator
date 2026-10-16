"use client";
import { useEffect, useRef } from "react";
import { X, CheckCircle2, Download, Printer, Save, Crown, AlertTriangle } from "lucide-react";
import { PLANS, priceLabel } from "@/lib/plans";

/* ───────────────────────────────────────────────
   User-initiated "Preparing your file" modal.

   POLICY-SAFE by design:
   - Opens ONLY when the user clicks Download / Print (not a pop-up).
   - The actual download/print runs automatically — never gated.
   - Contains NO ads (AdSense policy: no ads in modals/overlays).
   - Fully closable (X / backdrop / Esc).
   - .no-print keeps it out of the printed output.
─────────────────────────────────────────────── */
export default function DownloadAdModal({
  open,
  status,            // "working" | "done" | "error"
  action,            // "download" | "print"
  accent,
  onClose,
  onRetry,
  isLoggedIn = false,
  isPro = false,
  onSignIn,
  onUpgrade,
  savedToDashboard,
}: {
  open: boolean;
  status: "working" | "done" | "error";
  action: "download" | "print";
  accent: string;
  onClose: () => void;
  onRetry: () => void;
  isLoggedIn?: boolean;
  isPro?: boolean;
  onSignIn?: () => void;
  onUpgrade?: () => void;
  savedToDashboard?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const verb     = action === "download" ? "download" : "print";
  const VerbIcon = action === "download" ? Download : Printer;
  const title =
    status === "done"  ? "Your file is ready!" :
    status === "error" ? `We couldn't finish the ${verb}` :
    `Preparing your ${verb}…`;
  const sub =
    status === "done"  ? (action === "download" ? (savedToDashboard ? "Check your downloads folder — a copy is saved in your dashboard." : "Check your downloads folder.") : "The print dialog has opened.") :
    status === "error" ? "Please try again. If it keeps failing, try a smaller logo image." :
    "This only takes a moment.";

  return (
    <div
      className="no-print"
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, background: "rgba(21,26,36,0.55)",
        backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dl-modal-title"
        aria-live="polite"
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 420, background: "#fff",
          borderRadius: 10, overflow: "hidden", outline: "none",
          boxShadow: "0 24px 80px rgba(21,26,36,0.35)",
          animation: "modalIn .22s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #ece6da", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span aria-hidden="true" style={{
              width: 34, height: 34, borderRadius: 6, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: status === "done" ? "#dcfce7" : status === "error" ? "#fee2e2" : `${accent}15`,
              color: status === "done" ? "#16a34a" : status === "error" ? "#dc2626" : accent,
            }}>
              {status === "done" ? <CheckCircle2 size={18} /> : status === "error" ? <AlertTriangle size={18} /> : <VerbIcon size={17} />}
            </span>
            <div>
              <p id="dl-modal-title" style={{ fontSize: 14.5, fontWeight: 800, color: "#151a24" }}>{title}</p>
              <p style={{ fontSize: 12, color: "#5b6272", marginTop: 1 }}>{sub}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close"
            style={{ width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", color: "#5b6272", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* ── Conversion CTA — only after the file is ready ── */}
        {status === "done" && !isPro && !isLoggedIn && onSignIn && (
          <div style={{ padding: "16px 20px 4px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "#f3efe6",
              border: "1px solid #e3ddd0", borderRadius: 8, padding: "13px 14px",
            }}>
              <span aria-hidden="true" style={{ width: 36, height: 36, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#151a24" }}>
                <Save size={18} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#151a24" }}>Save this document</p>
                <p style={{ fontSize: 11.5, color: "#b91c26", marginTop: 1, lineHeight: 1.35 }}>
                  Sign in free to re-open, duplicate and track it on any device.
                </p>
              </div>
              <button type="button" onClick={onSignIn}
                style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", background: "#151a24", border: "none", borderRadius: 6, padding: "8px 14px", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
                Sign in
              </button>
            </div>
          </div>
        )}

        {status === "done" && !isPro && isLoggedIn && onUpgrade && (
          <div style={{ padding: "16px 20px 4px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "#fbf3dc",
              border: "1px solid #fde68a", borderRadius: 8, padding: "13px 14px",
            }}>
              <span aria-hidden="true" style={{ width: 36, height: 36, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#b45309" }}>
                <Crown size={18} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#78350f" }}>Upgrade to Pro</p>
                <p style={{ fontSize: 11.5, color: "#92400e", marginTop: 1, lineHeight: 1.35 }}>
                  Premium templates, white-label PDFs &amp; unlimited history — {priceLabel(PLANS.pro)}.
                </p>
              </div>
              <button type="button" onClick={onUpgrade}
                style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", background: "#b45309", border: "none", borderRadius: 6, padding: "8px 14px", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
                Upgrade
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "16px 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <button type="button" onClick={onRetry} disabled={status === "working"}
            style={{ fontSize: 12.5, fontWeight: 600, color: accent, background: "transparent", border: "none", cursor: status === "working" ? "default" : "pointer", display: "flex", alignItems: "center", gap: 5, opacity: status === "working" ? 0.5 : 1 }}>
            <VerbIcon size={13} aria-hidden="true" /> {status === "error" ? "Try again" : action === "download" ? "Download again" : "Print again"}
          </button>
          <button type="button" onClick={onClose}
            style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: accent, border: "none", borderRadius: 6, padding: "9px 18px", cursor: "pointer" }}>
            Done
          </button>
        </div>
      </div>

      <style>{`@keyframes modalIn { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
