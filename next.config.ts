import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Old thin ES/PT landing pages were removed (low-value duplicate content).
      { source: "/es/:slug*", destination: "/", permanent: true },
      { source: "/pt/:slug*", destination: "/", permanent: true },
      // Duplicate post merged into the stronger VAT guide (keyword cannibalization fix).
      { source: "/blog/uk-vat-invoice-requirements", destination: "/blog/vat-invoice-requirements-uk", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;