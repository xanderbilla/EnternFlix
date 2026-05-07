import BrowseCollectionPageContent from "@/components/BrowseCollectionPage/BrowseCollectionPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";

interface LatestPageProps {
  searchParams: Promise<{ type?: string }>;
}

export const metadata = createPageMetadata({
  title: "Latest",
  description: "Browse the latest movies and TV shows on EnternFlix.",
  path: "/browse/latest",
  keywords: ["latest movies", "latest tv shows", "new releases"],
});

export default async function LatestPage({ searchParams }: LatestPageProps) {
  const { type } = await searchParams;
  const contentType = type === "tv" ? "tv" : type === "movie" ? "movie" : "all";

  return (
    <BrowseCollectionPageContent mode="latest" contentType={contentType} />
  );
}
