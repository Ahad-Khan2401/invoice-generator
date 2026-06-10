import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { LANDING_SLUGS } from "@/lib/landing";
import { LANDING_ES_SLUGS } from "@/lib/landing-es";
import { LANDING_PT_SLUGS } from "@/lib/landing-pt";
import { POST_SLUGS } from "@/lib/posts";
import { TOOL_SLUGS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const langs = (path: string) =>
    Object.fromEntries([
      ...SITE.hreflangLocales.map((l) => [l, `${base}${path}`]),
      ["x-default", `${base}${path}`],
    ]);

  const core: MetadataRoute.Sitemap = [
    { url: base,                   lastModified: now, changeFrequency: "weekly",  priority: 1,   alternates: { languages: langs("") } },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`,        lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/privacy`,      lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,        lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/contact`,      lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/blog`,         lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/tools`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Free calculator tools
  const tools: MetadataRoute.Sitemap = TOOL_SLUGS.map((slug) => ({
    url: `${base}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog posts
  const posts: MetadataRoute.Sitemap = POST_SLUGS.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Long-tail SEO landing pages (profession + country)
  const landing: MetadataRoute.Sitemap = LANDING_SLUGS.map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
    alternates: { languages: langs(`/${slug}`) },
  }));

  // Spanish landing pages
  const landingEs: MetadataRoute.Sitemap = LANDING_ES_SLUGS.map((slug) => ({
    url: `${base}/es/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
    alternates: { languages: { "es": `${base}/es/${slug}`, "x-default": base } },
  }));

  // Portuguese landing pages
  const landingPt: MetadataRoute.Sitemap = LANDING_PT_SLUGS.map((slug) => ({
    url: `${base}/pt/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
    alternates: { languages: { "pt-BR": `${base}/pt/${slug}`, "x-default": base } },
  }));

  return [...core, ...tools, ...landing, ...landingEs, ...landingPt, ...posts];
}
