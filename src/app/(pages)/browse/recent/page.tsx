import BrowseCollectionPageContent from "@/components/BrowseCollectionPage/BrowseCollectionPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";

interface RecentPageProps {
  searchParams: Promise<{ type?: string }>;
}

export const metadata = createPageMetadata({
  title: "Recent",
  description: "Browse recent movies and TV shows on EnternFlix.",
  path: "/browse/recent",
  keywords: ["recent movies", "recent tv shows", "newly added"],
});

export default async function RecentPage({ searchParams }: RecentPageProps) {
  const { type } = await searchParams;
  const contentType = type === "tv" ? "tv" : type === "movie" ? "movie" : "all";

  return (
    <BrowseCollectionPageContent mode="recent" contentType={contentType} />
  );
}
