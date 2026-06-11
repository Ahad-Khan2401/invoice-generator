"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

/**
 * Wraps children with Google OAuth context.
 * Client component so it can be imported from the server layout.
 */
export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  // Always mount the provider: useGoogleLogin() THROWS at render time when the
  // context is missing, which would crash the whole app the moment the Pro
  // modal opens. With a placeholder id the library only errors if a login is
  // actually attempted — that is the genuinely graceful failure mode.
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "missing-client-id";
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}
