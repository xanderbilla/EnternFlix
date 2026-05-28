import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { DynamicHome } from "@/utils/dynamicImports";
import { createPageMetadata } from "@/lib/seo/metadata";
import { prefetchContentPage } from "@/lib/query/serverPrefetch";

export const metadata = createPageMetadata({
  title: "Browse",
  description:
    "Discover unlimited movies, TV shows, and anime on EnternFlix. Watch trending content, explore new releases, and stream your favorite entertainment.",
  path: "/browse",
  keywords: [
    "browse",
    "streaming",
    "movies",
    "tv shows",
    "anime",
    "trending",
    "new releases",
  ],
});

export default async function BrowsePage() {
  const queryClient = new QueryClient();
  await prefetchContentPage(queryClient, "all");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DynamicHome />
    </HydrationBoundary>
  );
}
