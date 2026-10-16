import type { Metadata, Viewport } from "next";
import { Public_Sans, Source_Serif_4, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";
import GoogleProvider from "@/components/GoogleProvider";
import { AuthProvider } from "@/components/AuthProvider";

/* Three families, three jobs:
   - Public Sans   interface and body copy: plain, wide, easy for non-native readers.
   - Source Serif  headings: a sturdy, printed-page serif with optical sizes.
   - Inter         ONLY inside the invoice document itself, so existing PDFs keep their look. */
const publicSans = Public_Sans({ subsets: ["latin"], display: "swap", variable: "--font-public-sans" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], display: "swap", variable: "--font-source-serif", axes: ["opsz"] });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const otherMeta: Record<string, string> = { "google-adsense-account": SITE.adsenseClient };
if (SITE.bingSiteVerification) otherMeta["msvalidate.01"] = SITE.bingSiteVerification;
if (SITE.pinterestSiteVerification) otherMeta["p:domain_verify"] = SITE.pinterestSiteVerification;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Free PDF Invoice Generator — Create & Download Invoices Instantly",
    template: `%s | ${SITE.name}`,
  },
  description:
    "Create professional invoices, bills, receipts and quotations online for free. Add your logo, apply tax, and download a clean PDF in seconds. No signup, no watermark.",
  applicationName: SITE.name,
  icons: { icon: "/icon.png", apple: "/icon.png" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "Free PDF Invoice Generator — Create & Download Invoices Instantly",
    description:
      "Create professional invoices, receipts, and quotations online for free. No signup required.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free PDF Invoice Generator — ${SITE.name}`,
    description: "Create & download professional PDF invoices, bills, receipts & quotations for free. No signup.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  other: otherMeta,
  ...(SITE.googleSiteVerification
    ? { verification: { google: SITE.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsEnabled = !SITE.adsenseClient.includes("ca-pub-XXXX");

  return (
    <html lang="en">
      <body className={`${publicSans.variable} ${sourceSerif.variable} ${inter.variable} font-sans min-h-screen flex flex-col bg-paper text-ink antialiased`}>
        <a href="#main" className="skip-link">Skip to content</a>
        <GoogleProvider>
          <AuthProvider>
            <Header />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </GoogleProvider>

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
            strategy="lazyOnload"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsenseClient}`}
          />
        )}
        {/* Lemon Squeezy overlay checkout (on-site popup) */}
        <Script
          id="lemonsqueezy"
          src="https://assets.lemonsqueezy.com/lemon.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
