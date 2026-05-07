import MoviesPageContent from "@/components/MoviesPage/MoviesPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";

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

export default function MoviesPage() {
  return (
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
  );
}
