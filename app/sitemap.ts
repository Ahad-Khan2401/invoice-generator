import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { LANDING_SLUGS } from "@/lib/landing";
import { POSTS, POST_SLUGS } from "@/lib/posts";
import { TOOL_SLUGS } from "@/lib/tools";

/* lastModified must reflect REAL change dates — stamping "now" on every URL
   on every build is a false freshness signal that search engines learn to
   ignore. Static pages carry the date of their last substantive edit. */
const RELEASE = new Date("2026-10-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const core: MetadataRoute.Sitemap = [
    { url: base,                   lastModified: RELEASE, changeFrequency: "weekly",  priority: 1 },
    { url: `${base}/how-it-works`, lastModified: RELEASE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`,      lastModified: RELEASE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/templates`,    lastModified: RELEASE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools`,        lastModified: RELEASE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`,         lastModified: RELEASE, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/about`,        lastModified: RELEASE, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/contact`,      lastModified: RELEASE, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/privacy`,      lastModified: RELEASE, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,        lastModified: RELEASE, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const tools: MetadataRoute.Sitemap = TOOL_SLUGS.map((slug) => ({
    url: `${base}/tools/${slug}`,
    lastModified: RELEASE,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog posts — lastModified from each post's real updated date
  const posts: MetadataRoute.Sitemap = POST_SLUGS.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(POSTS[slug]?.updated ?? POSTS[slug]?.date ?? RELEASE),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Landing pages (profession / country / document type)
  const landing: MetadataRoute.Sitemap = LANDING_SLUGS.map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: RELEASE,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...core, ...tools, ...landing, ...posts];
}
