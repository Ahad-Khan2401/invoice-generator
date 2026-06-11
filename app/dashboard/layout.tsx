import type { Metadata } from "next";

/* The dashboard is private, user-specific content — keep it out of search. */
export const metadata: Metadata = {
  title: "Your Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
