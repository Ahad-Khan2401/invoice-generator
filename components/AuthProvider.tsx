"use client";
/**
 * AuthProvider — ONE shared auth/plan state for the whole app.
 *
 * Previously every component called its own `useAuth()` with independent
 * `useState`, so signing in via the modal did not update the header, and the
 * header's "Sign in" button only worked on pages that rendered the generator.
 * Now: a single context + a single globally-mounted <ProModal/>.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { readAuth, saveAuth, clearAuth, needsVerify, type AuthUser } from "@/lib/auth-storage";
import { planFor, type PlanKey, type PlanLimits } from "@/lib/plans";
import { track } from "@/lib/analytics";

const ProModal = dynamic(() => import("@/components/ProModal"), { ssr: false });

export type ModalView = "choose" | "signin" | "upgrade";

export interface AuthContextValue {
  user: AuthUser | null;
  isLoaded: boolean;
  isLoggedIn: boolean;
  plan: PlanKey;
  isPro: boolean;          // any paid plan
  limits: PlanLimits;
  justPaid: boolean;
  signIn: (u: AuthUser) => void;
  signOut: () => void;
  /** Re-check the plan with the server now (e.g. after returning from checkout). */
  refreshPlan: () => Promise<void>;
  openModal: (view?: ModalView, source?: string) => void;
  closeModal: () => void;
  modalOpen: boolean;
}

const Ctx = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<AuthUser | null>(null);
  const [isLoaded, setLoaded] = useState(false);
  const [justPaid, setJustPaid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState<ModalView | undefined>(undefined);
  const verifying = useRef(false);

  const verifyWithServer = useCallback(async (stored: AuthUser, force = false) => {
    if (verifying.current) return;
    if (!force && !needsVerify(stored)) return;
    verifying.current = true;
    try {
      const res  = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: stored.token }),
      });
      if (res.status === 429) return;
      const json: { valid: boolean; isPro?: boolean; plan?: PlanKey; token?: string; expires?: number } = await res.json();
      if (!json.valid) { clearAuth(); setUser(null); return; }
      const updated: AuthUser = {
        ...stored,
        isPro: json.isPro ?? stored.isPro,
        plan:  json.plan ?? (json.isPro ? "pro" : "free"),
        token: json.token ?? stored.token,
        expires: json.expires ?? stored.expires,
        lastVerified: Date.now(),
      };
      saveAuth(updated);
      setUser(updated);
    } catch {
      /* network error — keep session (benefit of the doubt) */
    } finally {
      verifying.current = false;
    }
  }, []);

  // Initial load from localStorage + ?pro=success handling (runs once on mount)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paid = params.get("pro") === "success";
    if (paid) {
      window.history.replaceState({}, "", window.location.pathname);
      track("subscription_activated", { source: "checkout_redirect" });
    }
    const stored = readAuth();
    // Batch the initial state into one update via a microtask to satisfy
    // the react-hooks/set-state-in-effect rule's intent (no cascading renders).
    queueMicrotask(() => {
      setUser(stored);
      setJustPaid(paid);
      setLoaded(true);
      if (paid) { setModalView("signin"); setModalOpen(true); }
      if (stored) void verifyWithServer(stored, paid);
    });
  }, [verifyWithServer]);

  // Cross-tab sync: another tab signed in/out
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "pdfbb_auth_v1") setUser(readAuth());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Legacy event used by older components
  useEffect(() => {
    const handler = () => { setModalView(undefined); setModalOpen(true); };
    window.addEventListener("pdfbb:openSignIn", handler);
    return () => window.removeEventListener("pdfbb:openSignIn", handler);
  }, []);

  const signIn = useCallback((u: AuthUser) => {
    const withPlan: AuthUser = { ...u, plan: u.plan ?? (u.isPro ? "pro" : "free") };
    saveAuth(withPlan);
    setUser(withPlan);
    setJustPaid(false);
    track(withPlan.isPro ? "signin_completed" : "signup_completed", { plan: withPlan.plan ?? "free" });
  }, []);

  const signOut = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  const refreshPlan = useCallback(async () => {
    const stored = readAuth();
    if (stored) await verifyWithServer(stored, true);
  }, [verifyWithServer]);

  const openModal = useCallback((view?: ModalView, source?: string) => {
    setModalView(view);
    setModalOpen(true);
    if (source) track("premium_feature_clicked", { source });
  }, []);
  const closeModal = useCallback(() => { setModalOpen(false); setJustPaid(false); }, []);

  const plan: PlanKey = user?.plan ?? (user?.isPro ? "pro" : "free");
  const value = useMemo<AuthContextValue>(() => ({
    user, isLoaded, isLoggedIn: !!user, plan, isPro: plan !== "free", limits: planFor(plan).limits,
    justPaid, signIn, signOut, refreshPlan, openModal, closeModal, modalOpen,
  }), [user, isLoaded, plan, justPaid, signIn, signOut, refreshPlan, openModal, closeModal, modalOpen]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {modalOpen && (
        <ProModal
          open={modalOpen}
          initialView={modalView}
          justPaid={justPaid}
          isLoggedIn={!!user}
          isPro={plan !== "free"}
          onClose={closeModal}
          onSignIn={signIn}
        />
      )}
    </Ctx.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const v = useContext(Ctx);
  if (!v) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return v;
}
