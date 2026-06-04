/**
 * Client-side auth storage helpers.
 * Stored in localStorage — never contains raw email.
 */

const KEY = "pdfbb_auth_v1";
const VERIFY_EVERY = 7 * 24 * 60 * 60 * 1000;

export interface AuthUser {
  name:         string;
  emailHash:    string;
  token:        string;
  expires:      number;
  isPro:        boolean;
  lastVerified: number;
}

export function readAuth(): AuthUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as AuthUser;
    if (!d.token || !d.emailHash || !d.expires) return null;
    if (Date.now() > d.expires) { clearAuth(); return null; }
    return d;
  } catch { return null; }
}

export function saveAuth(u: AuthUser): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(u));
    // Clear old v3 pro-only key
    try { localStorage.removeItem("pdfbb_pro_v3"); } catch {}
  } catch {}
}

export function clearAuth(): void {
  try {
    ["pdfbb_auth_v1", "pdfbb_pro_v3", "pdfbb_pro_v2", "pdfbb_pro_until"]
      .forEach(k => { try { localStorage.removeItem(k); } catch {} });
  } catch {}
}

export function needsVerify(u: AuthUser): boolean {
  return Date.now() - u.lastVerified > VERIFY_EVERY;
}
