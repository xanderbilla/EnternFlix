import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MoviesPageContent from "@/components/MoviesPage/MoviesPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import { prefetchContentPage } from "@/lib/query/serverPrefetch";

export const metadata = createPageMetadata({
  title: "TV Shows",
  description:
    "Discover trending TV shows, popular series, and binge-worthy episodes. Stream the latest TV entertainment on EnternFlix.",
  path: "/browse/tv-shows",
  keywords: [
    "tv shows",
    "series",
    "episodes",
    "drama",
    "comedy",
    "crime",
    "family",
    "mystery",
  ],
});

export default async function TvShowsPage() {
  const queryClient = new QueryClient();
  await prefetchContentPage(queryClient, "tv");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoviesPageContent
        contentType="tv"
        heroTitle="Binge the Best TV Stories"
        heroDescription="Catch trending series, fan favorites, and fresh episodes all in one place."
        movieLists={[
          {
            title: "Recently Added TV Shows",
            hookName: "recentlyAddedTvShows",
          },
          { title: "Latest TV Shows", hookName: "latestTvShows" },
          { title: "Trending TV Shows", hookName: "trendingTvShows" },
          { title: "Popular TV Shows", hookName: "popularTvShows" },
        ]}
      />
    </HydrationBoundary>
  );
}
