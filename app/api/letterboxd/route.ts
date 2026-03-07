import { NextResponse } from "next/server";

// Change this to your Letterboxd username
const LETTERBOXD_USERNAME = "adityakhalkar";

export async function GET() {
  try {
    const res = await fetch(
      `https://letterboxd.com/${LETTERBOXD_USERNAME}/rss/`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ films: [] });
    }

    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    const films = items.slice(0, 4).map((item) => {
      // Try namespace-prefixed tags first, fall back to <title>
      const filmTitle =
        item.match(
          /<letterboxd:filmTitle>([\s\S]*?)<\/letterboxd:filmTitle>/
        )?.[1] ||
        item
          .match(/<title>([\s\S]*?)<\/title>/)?.[1]
          ?.replace(/,\s*\d{4}\s*-\s*.*$/, "") ||
        "Unknown";

      const ratingStr =
        item.match(
          /<letterboxd:memberRating>([\s\S]*?)<\/letterboxd:memberRating>/
        )?.[1] || "";

      const link =
        item.match(/<link\s*>([\s\S]*?)<\/link>/)?.[1]?.trim() || "#";

      let stars = "";
      if (ratingStr) {
        const num = parseFloat(ratingStr);
        const full = Math.floor(num);
        const half = num % 1 >= 0.5;
        stars = "\u2605".repeat(full) + (half ? "\u00BD" : "");
      } else {
        // Try to extract stars from <title> like "Film, 2023 - ★★★★"
        const titleStars = item
          .match(/<title>[\s\S]*?<\/title>/)?.[0]
          ?.match(/[\u2605\u00BD]+/)?.[0];
        if (titleStars) stars = titleStars;
      }

      return { title: filmTitle.trim(), rating: stars, link };
    });

    return NextResponse.json({ films });
  } catch {
    return NextResponse.json({ films: [] });
  }
}
