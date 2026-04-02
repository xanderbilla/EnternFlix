import { Metadata } from "next";
import MoviesPageContent from "@/components/MoviesPage/MoviesPageContent";

export const metadata: Metadata = {
  title: "Movies - EnternFlix",
  description:
    "Discover trending movies, popular blockbusters, and top-rated films. Stream the latest movies across all genres on EnternFlix.",
  keywords: [
    "movies",
    "films",
    "blockbusters",
    "cinema",
    "streaming",
    "action",
    "comedy",
    "horror",
    "romance",
    "thriller",
  ],
  openGraph: {
    title: "Movies - EnternFlix",
    description:
      "Discover trending movies, popular blockbusters, and top-rated films. Stream the latest movies across all genres on EnternFlix.",
    type: "website",
    siteName: "EnternFlix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movies - EnternFlix",
    description:
      "Discover trending movies, popular blockbusters, and top-rated films. Stream the latest movies across all genres on EnternFlix.",
  },
};

export default function MoviesPage() {
  return (
    <MoviesPageContent
      movieLists={[
        { title: "Trending Movies", hookName: "trendingMovies" },
        { title: "Popular Movies", hookName: "popularMovies" },
        { title: "Top Rated Movies", hookName: "topRatedMovies" },
        { title: "Upcoming Movies", hookName: "upcomingMovies" },
        { title: "Action Movies", hookName: "actionMovies" },
        { title: "Comedy Movies", hookName: "comedyMovies" },
        { title: "Horror Movies", hookName: "horrorMovies" },
        { title: "Romance Movies", hookName: "romanceMovies" },
        { title: "Thriller Movies", hookName: "thrillerMovies" },
      ]}
    />
  );
}
