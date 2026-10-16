"use client";
import { useState, useEffect, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { X, Zap, Check, AlertCircle, Crown } from "lucide-react";
import { SITE } from "@/lib/config";
import { PLANS, priceLabel, priceValue } from "@/lib/plans";
import type { AuthUser } from "@/lib/auth-storage";
import { track, trackCheckout } from "@/lib/analytics";

/* ══════════════════════════════════════════════════
   GOOGLE SIGN-IN BUTTON
══════════════════════════════════════════════════ */
function GoogleBtn({ label, onToken, disabled, autoFocus }: {
  label: string; onToken: (t: string) => void; disabled?: boolean; autoFocus?: boolean;
}) {
  const login = useGoogleLogin({
    flow:      "implicit",
    onSuccess: (r) => onToken(`access:${r.access_token}`),
    onError:   () => {},
  });

  return (
    <button
      type="button"
      autoFocus={autoFocus}
      onClick={() => { if (!disabled) { track("signup_started", { method: "google" }); login(); } }}
      disabled={disabled}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        width: "100%", padding: "13px 20px", borderRadius: 8,
        border: "1.5px solid #e3ddd0",
        background: disabled ? "#f6f2e9" : "white",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 14, fontWeight: 600, color: "#2f3542",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "all .15s",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      {label}
    </button>
  );
}

/* ══════════════════════════════════════════════════
   MAIN MODAL
══════════════════════════════════════════════════ */
type View = "choose" | "signin" | "upgrade" | "loading" | "success-free" | "success-pro";

interface Props {
  open:         boolean;
  onClose:      () => void;
  onSignIn:     (u: AuthUser) => void;
  isLoggedIn:   boolean;
  isPro:        boolean;
  justPaid?:    boolean;
  initialView?: "choose" | "signin" | "upgrade";
}

const PRO = PLANS.pro;
const FREE_FEATURES = [
  "Save your last 5 documents to a dashboard",
  "Sync your business profile across devices",
  "Client directory (up to 5 clients)",
];

function checkoutUrl(period: "month" | "year"): string {
  const base = period === "year" && PRO.checkoutYearly ? PRO.checkoutYearly : PRO.checkoutMonthly!;
  const redirect = encodeURIComponent(`${SITE.url}/?pro=success`);
  return `${base}?embed=1&desc=0&media=0&discount=0&checkout[redirect_url]=${redirect}`;
}

function CheckoutBtn({ source, big, period, label }: { source: string; big?: boolean; period: "month" | "year"; label: string }) {
  return (
    <a
      className="lemonsqueezy-button" href={checkoutUrl(period)}
      onClick={() => trackCheckout(source, "Pro", priceValue(PRO))}
      style={{
        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        width:"100%", padding: big ? "14px 20px" : "12px 20px", borderRadius: big ? 14 : 12,
        background:"#151a24",
        color:"white", fontSize: big ? 15 : 14, fontWeight:700,
        textDecoration:"none", boxShadow:"0 4px 14px rgba(21,26,36,0.3)",
      }}
    >
      <Zap size={15} aria-hidden="true" /> {big ? "Upgrade to Pro" : "Get Pro"} — {label}
    </a>
  );
}

function initialFor(p: Props): View {
  if (p.justPaid) return "signin";
  if (p.initialView) return p.initialView;
  if (!p.isLoggedIn) return "choose";
  if (!p.isPro) return "upgrade";
  return "success-pro";
}

export default function ProModal(props: Props) {
  const { open, onClose, onSignIn, isLoggedIn, isPro, justPaid } = props;
  const [view,  setView]  = useState<View>(() => initialFor(props));
  const [error, setError] = useState("");
  const [period, setPeriod] = useState<"month" | "year">("month");
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc closes; lock body scroll while open; return focus on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prev?.focus?.();
    };
  }, [open, onClose]);

  // Re-init Lemon Squeezy so its overlay attaches to the Pro buttons when they render.
  useEffect(() => {
    if (open) (window as unknown as { createLemonSqueezy?: () => void }).createLemonSqueezy?.();
  }, [open, view]);

  async function handleToken(idToken: string) {
    setView("loading");
    setError("");
    try {
      const res  = await fetch("/api/auth/google", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ idToken }),
      });
      const data: {
        loggedIn?: boolean; isPro?: boolean; plan?: "free" | "pro" | "business"; token?: string;
        emailHash?: string; expires?: number; name?: string; error?: string;
      } = await res.json();

      if (data.loggedIn && data.token && data.emailHash && data.expires) {
        const user: AuthUser = {
          name:         data.name ?? "User",
          emailHash:    data.emailHash,
          token:        data.token,
          expires:      data.expires,
          isPro:        data.isPro ?? false,
          plan:         data.plan ?? (data.isPro ? "pro" : "free"),
          lastVerified: Date.now(),
        };
        onSignIn(user);
        setView(data.isPro ? "success-pro" : "success-free");
      } else {
        setError(data.error ?? "Sign-in failed. Please try again.");
        setView(justPaid ? "signin" : "choose");
      }
    } catch {
      setError("Network error. Please check your connection.");
      setView(justPaid ? "signin" : "choose");
    }
  }

  if (!open) return null;
  const busy = view === "loading";
  const label = priceLabel(PRO, period);

  const heading =
    view === "success-pro"  ? (isPro && !justPaid ? "You're on Pro" : "Pro Activated! 🎉") :
    view === "success-free" ? "Welcome! 👋"       :
    view === "loading"      ? "Signing in…"        :
    view === "upgrade"      ? `Upgrade to Pro · ${label}` :
    justPaid                ? "Payment Successful! 🎉" :
                              "Sign in / Upgrade";

  const PeriodToggle = PRO.checkoutYearly ? (
    <div role="group" aria-label="Billing period" style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:12 }}>
      {(["month","year"] as const).map(p => (
        <button key={p} type="button" onClick={() => setPeriod(p)} aria-pressed={period===p}
          style={{ fontSize:12, fontWeight:700, padding:"5px 12px", borderRadius:10, border:"1.5px solid", cursor:"pointer",
            borderColor: period===p ? "#b91c26" : "#e3ddd0", background: period===p ? "#fdf0ef" : "white", color: period===p ? "#b91c26" : "#5b6272" }}>
          {p === "month" ? "Monthly" : `Yearly · ${PRO.priceYearly}`}
        </button>
      ))}
    </div>
  ) : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 no-print"
      style={{ background: "rgba(21,26,36,0.6)", backdropFilter: "blur(6px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
        className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden outline-none max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ background: "#151a24", padding: "24px 28px 20px" }}>
          <button type="button" onClick={onClose} aria-label="Close" style={{ position:"absolute", top:16, right:16, background:"none", border:"none", cursor:"pointer", padding:4 }}>
            <X size={20} color="rgba(255,255,255,0.8)" aria-hidden="true" />
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
            <Zap size={15} color="#fde68a" aria-hidden="true" />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.75)" }}>
              PDF Bill Builder
            </span>
          </div>
          <h2 id="pro-modal-title" style={{ fontSize:22, fontWeight:900, color:"white", letterSpacing:"-0.03em", lineHeight:1.25, margin:0 }}>
            {heading}
          </h2>
          {view === "choose" && !justPaid && (
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.75)", marginTop:6 }}>
              Free account for everyone · Pro for people who invoice every month
            </p>
          )}
          {justPaid && view === "signin" && (
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.85)", marginTop:6 }}>
              Sign in with the Google account you used to pay.
            </p>
          )}
        </div>

        {/* Body */}
        <div style={{ padding:"22px 28px 26px" }}>

          {/* ── CHOOSE ── */}
          {view === "choose" && (
            <>
              <div style={{ border:"1.5px solid #e3ddd0", borderRadius:8, padding:"14px 16px", marginBottom:12 }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#2f3542", marginBottom:8 }}>Free account</p>
                <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:7 }}>
                  {FREE_FEATURES.map(f => (
                    <li key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#5b6272" }}>
                      <Check size={12} color="#10b981" strokeWidth={3} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop:12 }}>
                  <GoogleBtn label="Continue with Google — Free" onToken={handleToken} disabled={busy} autoFocus />
                </div>
              </div>

              <div style={{ border:"1.5px solid #f1a9a4", borderRadius:8, padding:"14px 16px", background:"#fdf0ef" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:"#b91c26", margin:0 }}>
                    <Crown size={13} style={{ display:"inline", marginRight:5 }} aria-hidden="true" />
                    Pro account
                  </p>
                  <span style={{ fontSize:12, fontWeight:700, color:"#b91c26", background:"#fbe0de", borderRadius:10, padding:"2px 8px" }}>
                    {label}
                  </span>
                </div>
                <ul style={{ listStyle:"none", margin:"0 0 12px", padding:0, display:"flex", flexDirection:"column", gap:7 }}>
                  {PRO.highlights.slice(1, 5).map(f => (
                    <li key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#2f3542" }}>
                      <Check size={12} color="#b91c26" strokeWidth={3} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                {PeriodToggle}
                <CheckoutBtn source="choose_modal" period={period} label={label} />
                <p style={{ textAlign:"center" as const, fontSize:11, color:"#b91c26", margin:"8px 0 0", fontWeight:600 }}>
                  Cancel anytime · 30-day money-back guarantee
                </p>
              </div>
              <p style={{ textAlign:"center" as const, fontSize:11.5, color:"#5b6272", marginTop:10 }}>
                Already subscribed?{" "}
                <button type="button" onClick={() => { setView("signin"); setError(""); }} style={{ background:"none", border:"none", color:"#b91c26", fontSize:11.5, fontWeight:600, cursor:"pointer" }}>
                  Sign in with Google →
                </button>
              </p>
            </>
          )}

          {/* ── UPGRADE (logged in, not pro) ── */}
          {view === "upgrade" && (
            <>
              <ul style={{ listStyle:"none", margin:"0 0 18px", padding:0, display:"flex", flexDirection:"column", gap:10 }}>
                {PRO.highlights.slice(1).map(f => (
                  <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                    <span style={{ width:20, height:20, borderRadius:"50%", background:"#fbe0de", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                      <Check size={11} color="#b91c26" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span style={{ fontSize:13.5, color:"#2f3542", fontWeight:500 }}>{f}</span>
                  </li>
                ))}
              </ul>
              {PeriodToggle}
              <CheckoutBtn source="upgrade_modal" period={period} label={label} big />
              <p style={{ textAlign:"center" as const, fontSize:11, color:"#b91c26", margin:"8px 0 0", fontWeight:600 }}>
                Cancel anytime · 30-day money-back guarantee · Payments by Lemon Squeezy
              </p>
              {!isLoggedIn && (
                <p style={{ textAlign:"center" as const, fontSize:11.5, color:"#5b6272", marginTop:10 }}>
                  Already paid?{" "}
                  <button type="button" onClick={() => { setView("signin"); setError(""); }} style={{ background:"none", border:"none", color:"#b91c26", fontSize:11.5, fontWeight:600, cursor:"pointer" }}>
                    Sign in again →
                  </button>
                </p>
              )}
            </>
          )}

          {/* ── SIGN IN ── */}
          {(view === "signin" || view === "loading") && (
            <>
              {justPaid && (
                <div style={{ padding:"11px 14px", borderRadius:6, background:"#f0fdf4", border:"1.5px solid #bbf7d0", marginBottom:16 }}>
                  <p style={{ fontSize:13, color:"#15803d", fontWeight:600, margin:0 }}>
                    ✅ Payment received. Sign in to activate Pro on this device.
                  </p>
                </div>
              )}
              {error && (
                <div role="alert" style={{ padding:"10px 14px", borderRadius:6, background:"#fef2f2", border:"1.5px solid #fecaca", marginBottom:14 }}>
                  <div style={{ display:"flex", gap:8 }}>
                    <AlertCircle size={15} color="#dc2626" style={{ flexShrink:0, marginTop:1 }} aria-hidden="true" />
                    <p style={{ fontSize:13, color:"#b91c1c", margin:0 }}>{error}</p>
                  </div>
                  <p style={{ fontSize:11.5, color:"#b91c1c", margin:"6px 0 0 23px" }}>
                    Paid but can&apos;t sign in? Email{" "}
                    <a href={`mailto:${SITE.supportEmail}`} style={{ color:"#b91c1c", fontWeight:700 }}>{SITE.supportEmail}</a>{" "}
                    with your receipt — we&apos;ll activate Pro for you.
                  </p>
                </div>
              )}
              <p style={{ fontSize:13.5, color:"#3a4150", lineHeight:1.65, marginBottom:18 }}>
                {justPaid ? "Use the same Google account e-mail you entered at checkout." : "Sign in with Google to access your saved documents."}
              </p>
              <GoogleBtn label={busy ? "Signing in…" : "Continue with Google"} onToken={handleToken} disabled={busy} autoFocus />
              {busy && (
                <div aria-live="polite" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:14, color:"#5b6272", fontSize:13 }}>
                  <svg style={{ animation:"spin .8s linear infinite", width:16, height:16 }} fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle style={{ opacity:.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path style={{ opacity:.8 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Checking your plan…
                </div>
              )}
              {!busy && !justPaid && (
                <button type="button" onClick={() => { setView("choose"); setError(""); }} style={{ display:"block", width:"100%", marginTop:10, padding:10, background:"none", border:"none", color:"#5b6272", fontSize:13, cursor:"pointer", textAlign:"center" as const }}>
                  ← Back
                </button>
              )}
            </>
          )}

          {/* ── SUCCESS FREE ── */}
          {view === "success-free" && (
            <div style={{ textAlign:"center" as const }}>
              <div style={{ fontSize:48, marginBottom:12 }} aria-hidden="true">👋</div>
              <p style={{ fontSize:16, fontWeight:800, color:"#151a24", marginBottom:8 }}>You&apos;re signed in!</p>
              <p style={{ fontSize:13.5, color:"#5b6272", lineHeight:1.7, marginBottom:8 }}>
                Documents you download are now saved to your dashboard (last {PLANS.free.limits.savedDocuments} on the free plan).
              </p>
              <div style={{ padding:"10px 14px", borderRadius:6, background:"#fdf0ef", border:"1.5px solid #f1a9a4", marginBottom:20 }}>
                <p style={{ fontSize:13, color:"#b91c26", fontWeight:600, margin:0 }}>
                  <Crown size={13} style={{ display:"inline", marginRight:4 }} aria-hidden="true" />
                  Pro adds unlimited history, premium templates, white-label PDFs &amp; no ads — {label}
                </p>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button type="button" onClick={onClose} style={{ flex:1, padding:"11px", borderRadius:8, border:"1.5px solid #e3ddd0", background:"white", color:"#2f3542", fontSize:14, fontWeight:600, cursor:"pointer" }}>
                  Continue
                </button>
                <button type="button" onClick={() => setView("upgrade")} style={{ flex:1, padding:"11px", borderRadius:8, border:"none", background:"#151a24", color:"white", fontSize:14, fontWeight:600, cursor:"pointer" }}>
                  See Pro →
                </button>
              </div>
            </div>
          )}

          {/* ── SUCCESS PRO ── */}
          {view === "success-pro" && (
            <div style={{ textAlign:"center" as const }}>
              <div style={{ fontSize:52, marginBottom:14 }} aria-hidden="true">🎉</div>
              <p style={{ fontSize:16, fontWeight:800, color:"#151a24", marginBottom:8 }}>Pro is active</p>
              <p style={{ fontSize:13.5, color:"#5b6272", lineHeight:1.7, marginBottom:22 }}>
                Premium templates · White-label PDFs · 12 premium colours · Unlimited history · Ad-free
              </p>
              <button type="button" onClick={onClose} style={{ padding:"12px 36px", borderRadius:8, border:"none", background:"#151a24", color:"white", fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(21,26,36,0.3)" }}>
                Start using Pro ✓
              </button>
            </div>
          )}

        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}
