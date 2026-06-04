"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

/**
 * Wraps children with Google OAuth context.
 * Client component so it can be imported from the server layout.
 */
export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  // If not configured yet, render children without Google provider
  // (Pro button will still show but Google sign-in will fail gracefully)
  if (!clientId) return <>{children}</>;
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}
