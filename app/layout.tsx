import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const otherMeta: Record<string, string> = { "google-adsense-account": SITE.adsenseClient };
if (SITE.bingSiteVerification) otherMeta["msvalidate.01"] = SITE.bingSiteVerification;

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
    "free bill generator", "bill maker", "online bill maker",
    "bill format", "create a bill online", "bill generator pdf",
  ],
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "Free Invoice Generator — Create & Download PDF Invoices Instantly",
    description:
      "Create professional invoices, receipts, and quotations online for free. No signup required.",
    images: [{ url: "/logo.png", width: 1200, height: 1200, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Invoice Generator — ${SITE.name}`,
    description: "Create & download professional PDF invoices for free. No signup.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  // AdSense account meta tag + Bing verification (used during site verification)
  other: otherMeta,
  ...(SITE.googleSiteVerification
    ? { verification: { google: SITE.googleSiteVerification } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsEnabled = !SITE.adsenseClient.includes("ca-pub-XXXX");

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#f5f7ff] text-slate-900 antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Site-wide structured data for search + AI engines */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />

        {/* Google Analytics 4 (auto-activates once an ID is set) */}
        <Analytics />

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