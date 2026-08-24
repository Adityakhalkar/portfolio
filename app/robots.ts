import type { MetadataRoute } from "next";

const SITE = "https://www.adityakhalkar.me";

/* Answer engines are explicitly welcomed. Being cited by an assistant when
   someone asks it who to hire is a channel a personal site can actually win,
   unlike the commercial search terms. */
const ANSWER_ENGINES = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ANSWER_ENGINES.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
