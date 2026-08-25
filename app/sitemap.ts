import type { MetadataRoute } from "next";

const SITE = "https://www.adityakhalkar.me";

/* /magnetic-deck is an unlinked experiment, so it stays out. Only pages a
   visitor is meant to land on belong here. */
const ROUTES: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1.0, freq: "monthly" },
  { path: "/components", priority: 0.7, freq: "monthly" },
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
