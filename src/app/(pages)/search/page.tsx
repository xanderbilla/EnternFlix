import { Suspense } from "react";
import SearchPageContent from "@/components/SearchPage/SearchPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import { TEXT_LIMITS } from "@/constants/common";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

const BASE_KEYWORDS = [
  "search",
  "movies",
  "tv shows",
  "anime",
  "cast",
  "discover",
  "find content",
];
const DEFAULT_DESCRIPTION =
  "Search for movies, TV shows, anime, and cast members. Discover new content and find your favorite entertainment on EnternFlix.";

function sanitizeQuery(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().slice(0, TEXT_LIMITS.SEARCH_QUERY_MAX);
  return trimmed.length > 0 ? trimmed : null;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = sanitizeQuery(q);

  if (!query) {
    return createPageMetadata({
      title: "Search",
      description: DEFAULT_DESCRIPTION,
      path: "/search",
      keywords: BASE_KEYWORDS,
    });
  }

  return createPageMetadata({
    title: `Search results for "${query}"`,
    description: `Browse search results for "${query}" on EnternFlix.`,
    path: `/search?q=${encodeURIComponent(query)}`,
    keywords: [...BASE_KEYWORDS, query.toLowerCase()],
    noIndex: true,
  });
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}
