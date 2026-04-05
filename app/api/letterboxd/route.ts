import { NextResponse } from "next/server";

const LETTERBOXD_USERNAME = "MeekOmni";

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
        const titleStars = item
          .match(/<title>[\s\S]*?<\/title>/)?.[0]
          ?.match(/[\u2605\u00BD]+/)?.[0];
        if (titleStars) stars = titleStars;
      }

      const poster =
        item.match(/src="(https:\/\/a\.ltrbxd\.com\/resized\/film-poster[^"]*)"/)?.[1] || "";

      const year =
        item.match(
          /<letterboxd:filmYear>([\s\S]*?)<\/letterboxd:filmYear>/
        )?.[1] || "";

      // Decode HTML entities like &#039; → '
      const decoded = filmTitle.trim()
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");

      return { title: decoded, year, rating: stars, link, poster };
    });

    return NextResponse.json({ films });
  } catch {
    return NextResponse.json({ films: [] });
  }
}
