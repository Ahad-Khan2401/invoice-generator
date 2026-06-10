"use client";
import { useEffect } from "react";
import { X, CheckCircle2, Download, Printer, Save, Crown } from "lucide-react";
import AdSlot from "@/components/AdSlot";

/* ───────────────────────────────────────────────
   User-initiated "Preparing your file" modal.

   POLICY-SAFE by design:
   - Opens ONLY when the user clicks Download / Print (not a pop-up).
   - The actual download/print runs automatically — it is NEVER gated
     behind viewing or clicking the ad.
   - Clearly labelled "Advertisement", fully closable (X / backdrop / Esc).
   - .no-print keeps it out of the printed output.
─────────────────────────────────────────────── */
export default function DownloadAdModal({
  open,
  status,            // "working" | "done"
  action,            // "download" | "print"
  slot,
  accent,
  onClose,
  onRetry,
  isLoggedIn = false,
  isPro = false,
  onSignIn,
  onUpgrade,
}: {
  open: boolean;
  status: "working" | "done";
  action: "download" | "print";
  slot: string;
  accent: string;
  onClose: () => void;
  onRetry: () => void;
  isLoggedIn?: boolean;
  isPro?: boolean;
  onSignIn?: () => void;
  onUpgrade?: () => void;
}) {
  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const verb     = action === "download" ? "download" : "print";
  const VerbIcon = action === "download" ? Download : Printer;

  return (
    <div
      className="no-print"
      role="dialog"
      aria-modal="true"
      aria-label="Preparing your file"
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, background: "rgba(13,17,23,0.55)",
        backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 420, background: "#fff",
          borderRadius: 20, overflow: "hidden",
          boxShadow: "0 24px 80px rgba(13,17,23,0.35)",
          animation: "modalIn .22s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #f0f3fa", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 34, height: 34, borderRadius: 10, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: status === "done" ? "#dcfce7" : `${accent}15`,
              color: status === "done" ? "#16a34a" : accent,
            }}>
              {status === "done" ? <CheckCircle2 size={18} /> : <VerbIcon size={17} />}
            </span>
            <div>
              <p style={{ fontSize: 14.5, fontWeight: 800, color: "#0d1117" }}>
                {status === "done" ? "Your file is ready!" : `Preparing your ${verb}…`}
              </p>
              <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                {status === "done"
                  ? (action === "download" ? "Check your downloads folder." : "The print dialog has opened.")
                  : "This only takes a moment."}
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close"
            style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", color: "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <X size={18} />
          </button>
        </div>

        {/* Ad */}
        <div style={{ padding: "16px 20px" }}>
          <AdSlot slot={slot} />
        </div>

        {/* ── Conversion CTA — only after the file is ready ── */}
        {status === "done" && !isPro && !isLoggedIn && onSignIn && (
          <div style={{ padding: "0 20px 4px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "linear-gradient(135deg,#eef2ff,#faf5ff)",
              border: "1px solid #e0e7ff", borderRadius: 14, padding: "13px 14px",
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#fff", color: "#6366f1",
              }}>
                <Save size={18} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#1e1b4b" }}>Save this invoice</p>
                <p style={{ fontSize: 11.5, color: "#6366f1", marginTop: 1, lineHeight: 1.35 }}>
                  Sign in free to access &amp; re-edit it on any device.
                </p>
              </div>
              <button onClick={onSignIn}
                style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", background: "#4f46e5", border: "none", borderRadius: 9, padding: "8px 14px", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
                Sign in
              </button>
            </div>
          </div>
        )}

        {status === "done" && !isPro && isLoggedIn && onUpgrade && (
          <div style={{ padding: "0 20px 4px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "linear-gradient(135deg,#fef3c7,#fde68a55)",
              border: "1px solid #fde68a", borderRadius: 14, padding: "13px 14px",
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#fff", color: "#d97706",
              }}>
                <Crown size={18} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#78350f" }}>Go ad-free with Pro</p>
                <p style={{ fontSize: 11.5, color: "#b45309", marginTop: 1, lineHeight: 1.35 }}>
                  No ads, unlimited history &amp; premium templates — $9/year.
                </p>
              </div>
              <button onClick={onUpgrade}
                style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", background: "#d97706", border: "none", borderRadius: 9, padding: "8px 14px", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
                Upgrade
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "0 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <button onClick={onRetry}
            style={{ fontSize: 12.5, fontWeight: 600, color: accent, background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            <VerbIcon size={13} /> {action === "download" ? "Download again" : "Print again"}
          </button>
          <button onClick={onClose}
            style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: accent, border: "none", borderRadius: 10, padding: "9px 18px", cursor: "pointer" }}>
            Done
          </button>
        </div>
      </div>

      <style>{`@keyframes modalIn { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
