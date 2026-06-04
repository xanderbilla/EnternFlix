import type { Movie } from "@/types/movie";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

/**
 * Reusable schema.org JSON-LD builders.
 *
 * Keep these intentionally small. Builders return plain objects so callers
 * can compose / extend before rendering with `<JsonLd />`.
 */

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdObject
  | JsonLdValue[];
interface JsonLdObject {
  [key: string]: JsonLdValue | undefined;
}

function pruneUndefined<T extends JsonLdObject>(obj: T): T {
  const out: JsonLdObject = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

function resolveImage(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return getAbsoluteUrl(path);
}

function watchUrl(id: string, mediaType: "movie" | "tv"): string {
  return getAbsoluteUrl(
    `/watch?id=${encodeURIComponent(id)}&type=${mediaType}`,
  );
}

export function buildMovieJsonLd(content: Movie): JsonLdObject {
  return pruneUndefined({
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": `${siteConfig.url}#/movie/${content.id}`,
    name: content.title,
    description: content.overview,
    image: resolveImage(content.backdropPath),
    url: watchUrl(content.id, "movie"),
    datePublished: content.releaseDate,
    inLanguage: content.originalLanguage,
    genre: content.genres?.map((g) => g.name),
    duration:
      typeof content.runtime === "number" && content.runtime > 0
        ? `PT${content.runtime}M`
        : undefined,
    countryOfOrigin: content.originCountry?.map((code) => ({
      "@type": "Country",
      name: code,
    })),
    productionCompany: content.studios?.map((s) => ({
      "@type": "Organization",
      name: s.name,
    })),
    actor: content.casts?.map((c) => ({
      "@type": "Person",
      name: c.name,
    })),
    contentRating: content.contentRating,
  });
}

export function buildTvSeriesJsonLd(content: Movie): JsonLdObject {
  return pruneUndefined({
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "@id": `${siteConfig.url}#/tv/${content.id}`,
    name: content.title,
    description: content.overview,
    image: resolveImage(content.backdropPath),
    url: watchUrl(content.id, "tv"),
    startDate: content.firstAirDate,
    endDate: content.lastAirDate,
    inLanguage: content.originalLanguage,
    genre: content.genres?.map((g) => g.name),
    numberOfSeasons: content.numberOfSeasons,
    numberOfEpisodes: content.numberOfEpisodes,
    countryOfOrigin: content.originCountry?.map((code) => ({
      "@type": "Country",
      name: code,
    })),
    productionCompany: content.studios?.map((s) => ({
      "@type": "Organization",
      name: s.name,
    })),
    actor: content.casts?.map((c) => ({
      "@type": "Person",
      name: c.name,
    })),
    contentRating: content.contentRating,
  });
}

export function buildTitleJsonLd(
  content: Movie,
  mediaType: "movie" | "tv",
): JsonLdObject {
  return mediaType === "tv"
    ? buildTvSeriesJsonLd(content)
    : buildMovieJsonLd(content);
}

interface CollectionPageOptions {
  name: string;
  description?: string;
  path: string;
}

export function buildCollectionPageJsonLd({
  name,
  description,
  path,
}: CollectionPageOptions): JsonLdObject {
  const url = getAbsoluteUrl(path);
  return pruneUndefined({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name,
    description,
    isPartOf: { "@id": `${siteConfig.url}#website` },
  });
}

interface JsonLdProps {
  data: JsonLdObject | JsonLdObject[];
  id?: string;
}

/** Renders a server-safe JSON-LD <script> tag. */
export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
