import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/config/site";
import { DEFAULT_GENRES } from "@/constants/navbar";

/**
 * Static sitemap for the public-facing routes. Dynamic per-title pages
 * intentionally live behind `noindex` (see watch route) so they are excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "/",
    "/browse",
    "/browse/movies",
    "/browse/tv-shows",
    "/browse/latest",
    "/browse/popular",
    "/browse/recent",
    "/browse/trending",
    "/search",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: getAbsoluteUrl(path),
    lastModified: now,
    changeFrequency: "daily",
    priority: path === "/" || path === "/browse" ? 1 : 0.7,
  }));

  const seenGenreIds = new Set<number>();
  const genreEntries: MetadataRoute.Sitemap = [];
  for (const genres of Object.values(DEFAULT_GENRES)) {
    for (const genre of genres) {
      if (seenGenreIds.has(genre.id)) continue;
      seenGenreIds.add(genre.id);
      genreEntries.push({
        url: getAbsoluteUrl(`/browse/genre/${genre.id}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return [...staticEntries, ...genreEntries];
}
