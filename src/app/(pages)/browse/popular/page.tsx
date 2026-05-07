import BrowseCollectionPageContent from "@/components/BrowseCollectionPage/BrowseCollectionPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PopularPageProps {
  searchParams: Promise<{ type?: string }>;
}

export const metadata = createPageMetadata({
  title: "Popular",
  description: "Browse popular movies and TV shows on EnternFlix.",
  path: "/browse/popular",
  keywords: ["popular movies", "popular tv shows", "trending now"],
});

export default async function PopularPage({ searchParams }: PopularPageProps) {
  const { type } = await searchParams;
  const contentType = (type as "movie" | "tv" | "all") || "all";

  return (
    <BrowseCollectionPageContent mode="popular" contentType={contentType} />
  );
}
