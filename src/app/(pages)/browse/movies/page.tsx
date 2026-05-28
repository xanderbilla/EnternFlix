import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MoviesPageContent from "@/components/MoviesPage/MoviesPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import { prefetchContentPage } from "@/lib/query/serverPrefetch";

export const metadata = createPageMetadata({
  title: "Movies",
  description:
    "Discover trending movies, popular blockbusters, and top-rated films. Stream the latest movies across all genres on EnternFlix.",
  path: "/browse/movies",
  keywords: [
    "movies",
    "films",
    "blockbusters",
    "cinema",
    "action",
    "comedy",
    "horror",
    "romance",
    "thriller",
  ],
});

export default async function MoviesPage() {
  const queryClient = new QueryClient();
  await prefetchContentPage(queryClient, "movie");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoviesPageContent
        contentType="movie"
        heroTitle="Experience Cinema at Home"
        heroDescription="Watch the latest blockbusters and timeless classics from the comfort of your home."
        movieLists={[
          { title: "Recently Added Movies", hookName: "recentlyAdded" },
          { title: "Latest Movies", hookName: "latestMovies" },
          { title: "Trending Movies", hookName: "trendingMovies" },
          { title: "Popular Movies", hookName: "popularMovies" },
        ]}
      />
    </HydrationBoundary>
  );
}
