/**
 * Branding + SEO defaults. Template consumers should rebrand by editing this
 * file and (where required) the matching `NEXT_PUBLIC_*` environment values.
 *
 * `url` is driven by `NEXT_PUBLIC_SITE_URL` so the same build can be promoted
 * across environments (preview, staging, production) without code changes.
 * The hardcoded fallback keeps local dev and existing tests deterministic.
 */
const FALLBACK_SITE_URL = "https://enternflix.vercel.app";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl =
  rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl : FALLBACK_SITE_URL;

export const siteConfig = {
  name: "EnternFlix",
  shortName: "EnternFlix",
  tagline: "Stream Movies, TV Shows & Anime Online",
  description:
    "Stream unlimited movies, TV shows, and anime on EnternFlix. Discover trending content, explore categories, and enjoy next-gen entertainment anytime, anywhere.",
  url: siteUrl,
  locale: "en_US",
  creator: "EnternFlix",
  themeColor: "#000000",
  ogImage: "/logo.png",
  twitter: {
    handle: "",
    site: "",
  },
  keywords: [
    "streaming platform",
    "movies online",
    "tv shows",
    "anime streaming",
    "watch movies",
    "entertainment",
    "video streaming",
  ],
} as const;

export function getAbsoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.url).toString();
}
