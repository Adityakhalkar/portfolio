import type { MetadataRoute } from "next";

const SITE = "https://www.adityakhalkar.me";

/* Template sub-pages (features, pricing) are intentionally left out: they are
   thin variations of their parent and dilute what the site is understood to
   be about. */
const ROUTES: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1.0, freq: "monthly" },
  { path: "/showcase", priority: 0.8, freq: "monthly" },
  { path: "/templates", priority: 0.8, freq: "monthly" },
  { path: "/gsap", priority: 0.6, freq: "yearly" },
  { path: "/templates/agent-marketplace", priority: 0.5, freq: "yearly" },
  { path: "/templates/ai-governance", priority: 0.5, freq: "yearly" },
  { path: "/templates/motion-design", priority: 0.5, freq: "yearly" },
  { path: "/templates/supply-chain", priority: 0.5, freq: "yearly" },
  { path: "/templates/threat-intel", priority: 0.5, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, freq }) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  }));
}
