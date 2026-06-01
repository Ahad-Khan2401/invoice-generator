import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Free Invoice Generator — Create & Download PDF Invoices Instantly",
    template: `%s | ${SITE.name}`,
  },
  description:
    "Create professional invoices, receipts, and quotations online for free. Add your logo, apply tax, and download a PDF in seconds. No signup required.",
  keywords: [
    "free invoice generator", "pdf invoice generator", "invoice maker",
    "invoice template", "create invoice online", "receipt generator",
    "quotation generator", "freelancer invoice",
  ],
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "Free Invoice Generator — Create & Download PDF Invoices Instantly",
    description:
      "Create professional invoices, receipts, and quotations online for free. No signup required.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Invoice Generator — ${SITE.name}`,
    description: "Create & download professional PDF invoices for free. No signup.",
  },
  robots: { index: true, follow: true },
  // AdSense account meta tag (used during site verification)
  other: { "google-adsense-account": SITE.adsenseClient },
  ...(SITE.googleSiteVerification
    ? { verification: { google: SITE.googleSiteVerification } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsEnabled = !SITE.adsenseClient.includes("ca-pub-XXXX");

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-slate-900 antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Google AdSense loader — only injected once a real ID is set */}
        {adsEnabled && (
          <Script
            id="adsbygoogle-init"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsenseClient}`}
          />
        )}
      </body>
    </html>
  );
}