import MoviesPageContent from "@/components/MoviesPage/MoviesPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";

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

export default function TvShowsPage() {
  return (
    <MoviesPageContent
      contentType="tv"
      heroTitle="Binge the Best TV Stories"
      heroDescription="Catch trending series, fan favorites, and fresh episodes all in one place."
      movieLists={[
        { title: "Recently Added TV Shows", hookName: "recentlyAddedTvShows" },
        { title: "Latest TV Shows", hookName: "latestTvShows" },
        { title: "Trending TV Shows", hookName: "trendingTvShows" },
        { title: "Popular TV Shows", hookName: "popularTvShows" },
      ]}
    />
  );
}
