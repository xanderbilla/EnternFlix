import GenrePageContent from "@/components/GenrePage/GenrePageContent";
import { DEFAULT_GENRES } from "@/constants/navbar";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildCollectionPageJsonLd } from "@/lib/seo/jsonLd";

type ContentType = "movie" | "tv" | "all";
const ALLOWED_CONTENT_TYPES: readonly ContentType[] = [
  "movie",
  "tv",
  "all",
] as const;

interface GenrePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}

function resolveGenreName(id: string): string | null {
  const numericId = Number.parseInt(id, 10);
  if (!Number.isFinite(numericId)) return null;
  for (const genres of Object.values(DEFAULT_GENRES)) {
    const match = genres.find((g) => g.id === numericId);
    if (match) return match.name;
  }
  return null;
}

function parseContentType(value: string | undefined): ContentType {
  return ALLOWED_CONTENT_TYPES.find((t) => t === value) ?? "all";
}

export async function generateMetadata({ params }: GenrePageProps) {
  const { id } = await params;
  const genreName = resolveGenreName(id);
  const title = genreName
    ? `${genreName} Movies & TV Shows`
    : "Browse by Genre";
  const description = genreName
    ? `Stream ${genreName} movies and TV shows on EnternFlix. Discover trending titles in the ${genreName} category.`
    : "Browse movies and TV shows by genre on EnternFlix.";

  return createPageMetadata({
    title,
    description,
    path: `/browse/genre/${id}`,
    keywords: genreName
      ? [genreName.toLowerCase(), `${genreName.toLowerCase()} movies`]
      : ["genre", "movies by genre", "tv by genre"],
  });
}

export default async function GenrePage({
  params,
  searchParams,
}: GenrePageProps) {
  const { id } = await params;
  const { type } = await searchParams;
  const genreName = resolveGenreName(id);
  const collectionName = genreName
    ? `${genreName} Movies & TV Shows`
    : "Browse by Genre";
  const collectionJsonLd = buildCollectionPageJsonLd({
    name: collectionName,
    description: genreName
      ? `Browse ${genreName} movies and TV shows on EnternFlix.`
      : "Browse movies and TV shows by genre on EnternFlix.",
    path: `/browse/genre/${id}`,
  });

  return (
    <>
      <JsonLd data={collectionJsonLd} id="genre-collection-jsonld" />
      <GenrePageContent genreId={id} contentType={parseContentType(type)} />
    </>
  );
}
