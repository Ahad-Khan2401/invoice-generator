import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { LANDING_SLUGS } from "@/lib/landing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`,        lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/privacy`,      lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,        lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  // Long-tail SEO landing pages
  const landing: MetadataRoute.Sitemap = LANDING_SLUGS.map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...core, ...landing];
}
