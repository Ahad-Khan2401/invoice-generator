import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { LANDING_SLUGS } from "@/lib/landing";
import { POSTS, POST_SLUGS } from "@/lib/posts";
import { TOOL_SLUGS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: base,                   lastModified: now, changeFrequency: "weekly",  priority: 1 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`,        lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/privacy`,      lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,        lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/contact`,      lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/blog`,         lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/tools`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/templates`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Free calculator tools
  const tools: MetadataRoute.Sitemap = TOOL_SLUGS.map((slug) => ({
    url: `${base}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog posts — lastModified from each post's real updated date (freshness signal)
  const posts: MetadataRoute.Sitemap = POST_SLUGS.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(POSTS[slug]?.updated ?? POSTS[slug]?.date ?? now),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Long-tail SEO landing pages (profession + country)
  const landing: MetadataRoute.Sitemap = LANDING_SLUGS.map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...core, ...tools, ...landing, ...posts];
}
