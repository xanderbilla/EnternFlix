import BrowseCollectionPageContent from "@/components/BrowseCollectionPage/BrowseCollectionPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";

interface TrendingPageProps {
  searchParams: Promise<{ type?: string }>;
}

export const metadata = createPageMetadata({
  title: "Trending",
  description: "Browse trending movies and TV shows on EnternFlix.",
  path: "/browse/trending",
  keywords: ["trending movies", "trending tv shows", "hot titles"],
});

export default async function TrendingPage({
  searchParams,
}: TrendingPageProps) {
  const { type } = await searchParams;
  const contentType = (type as "movie" | "tv" | "all") || "all";

  return (
    <BrowseCollectionPageContent mode="trending" contentType={contentType} />
  );
}
