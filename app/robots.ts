import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everyone (incl. Googlebot, Bingbot) may crawl everything
      { userAgent: "*", allow: "/" },
      // Explicitly welcome AI search / answer engines so our content
      // can appear in AI Overviews, ChatGPT, Perplexity, Claude, etc.
      {
        userAgent: [
          "Googlebot", "Bingbot", "Google-Extended",
          "GPTBot", "OAI-SearchBot", "ChatGPT-User",
          "PerplexityBot", "Perplexity-User",
          "ClaudeBot", "Claude-Web", "anthropic-ai",
          "Applebot", "Applebot-Extended", "Amazonbot", "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
