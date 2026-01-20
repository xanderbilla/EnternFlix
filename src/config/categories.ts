import { Metadata } from "next";

export interface MovieListItem {
  title: string;
  hookName: string;
}

export interface CategoryConfig {
  slug: string;
  title: string;
  description: string;
  bannerTitle: string;
  bannerDescription: string;
  movieLists: MovieListItem[];
  metadata: Metadata;
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  anime: {
    slug: "anime",
    title: "Anime",
    bannerTitle: "Explore the World of Anime",
    bannerDescription:
      "Dive into Japanese animation with the best series and movies from Japan.",
    description:
      "Explore the world of Japanese animation. Stream trending anime series, popular shows, and top-rated anime movies on EnternFlix.",
    movieLists: [
      { title: "Trending Anime", hookName: "trendingAnime" },
      { title: "Popular Anime", hookName: "popularAnime" },
      { title: "Top Rated Anime", hookName: "topRatedAnime" },
      { title: "Action Anime", hookName: "actionAnime" },
      { title: "Anime TV Shows", hookName: "animeTV" },
      { title: "Anime Movies", hookName: "animeMovies" },
    ],
    metadata: {
      title: "Anime",
      description:
        "Explore the world of Japanese animation. Stream trending anime series, popular shows, and top-rated anime movies on EnternFlix.",
      keywords: [
        "anime",
        "japanese animation",
        "manga",
        "otaku",
        "streaming",
        "action anime",
        "anime series",
        "anime movies",
      ],
      openGraph: {
        title: "Anime - EnternFlix",
        description:
          "Explore the world of Japanese animation. Stream trending anime series, popular shows, and top-rated anime movies on EnternFlix.",
        type: "website",
        siteName: "EnternFlix",
      },
      twitter: {
        card: "summary_large_image",
        title: "Anime - EnternFlix",
        description:
          "Explore the world of Japanese animation. Stream trending anime series, popular shows, and top-rated anime movies on EnternFlix.",
      },
    },
  },
  movies: {
    slug: "movies",
    title: "Movies",
    bannerTitle: "Experience Cinema at Home",
    bannerDescription:
      "Watch the latest blockbusters and timeless classics from the comfort of your home.",
    description:
      "Discover trending movies, popular blockbusters, and top-rated films. Stream the latest movies across all genres on EnternFlix.",
    movieLists: [
      { title: "Trending Movies", hookName: "trendingMovies" },
      { title: "Popular Movies", hookName: "popularMovies" },
      { title: "Top Rated Movies", hookName: "topRatedMovies" },
      { title: "Upcoming Movies", hookName: "upcomingMovies" },
      { title: "Action Movies", hookName: "actionMovies" },
      { title: "Comedy Movies", hookName: "comedyMovies" },
      { title: "Horror Movies", hookName: "horrorMovies" },
      { title: "Romance Movies", hookName: "romanceMovies" },
      { title: "Thriller Movies", hookName: "thrillerMovies" },
    ],
    metadata: {
      title: "Movies",
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
    },
  },
  "tv-shows": {
    slug: "tv-shows",
    title: "TV Shows",
    bannerTitle: "Discover Amazing TV Series",
    bannerDescription:
      "From gripping dramas to hilarious comedies, find your next binge-worthy show.",
    description:
      "Discover trending TV series, popular shows, and top-rated dramas. Stream the best television content across all genres on EnternFlix.",
    movieLists: [
      { title: "Trending TV Shows", hookName: "trendingTV" },
      { title: "Popular TV Shows", hookName: "popularTV" },
      { title: "Top Rated TV Shows", hookName: "topRatedTV" },
      { title: "Action & Adventure", hookName: "actionTV" },
      { title: "Comedy Shows", hookName: "comedyTV" },
      { title: "Drama Shows", hookName: "dramaTV" },
      { title: "Crime Shows", hookName: "crimeTV" },
      { title: "Netflix Originals", hookName: "netflixOriginals" },
    ],
    metadata: {
      title: "TV Shows",
      description:
        "Discover trending TV series, popular shows, and top-rated dramas. Stream the best television content across all genres on EnternFlix.",
      keywords: [
        "tv shows",
        "series",
        "television",
        "drama",
        "comedy",
        "streaming",
        "binge watch",
        "netflix originals",
      ],
      openGraph: {
        title: "TV Shows - EnternFlix",
        description:
          "Discover trending TV series, popular shows, and top-rated dramas. Stream the best television content across all genres on EnternFlix.",
        type: "website",
        siteName: "EnternFlix",
      },
      twitter: {
        card: "summary_large_image",
        title: "TV Shows - EnternFlix",
        description:
          "Discover trending TV series, popular shows, and top-rated dramas. Stream the best television content across all genres on EnternFlix.",
      },
    },
  },
  trending: {
    slug: "trending",
    title: "Trending",
    bannerTitle: "What's Hot Right Now",
    bannerDescription:
      "Stay up to date with the most popular content across all categories and discover what everyone is watching.",
    description:
      "Discover what's hot right now. Stay up to date with trending movies, TV shows, and popular content everyone is watching on EnternFlix.",
    movieLists: [
      { title: "Trending This Week", hookName: "trending" },
      { title: "Trending Movies", hookName: "trendingMovies" },
      { title: "Trending TV Shows", hookName: "trendingTV" },
      { title: "Popular Movies", hookName: "popularMovies" },
      { title: "Popular TV Shows", hookName: "popularTV" },
    ],
    metadata: {
      title: "Trending",
      description:
        "Discover what's hot right now. Stay up to date with trending movies, TV shows, and popular content everyone is watching on EnternFlix.",
      keywords: [
        "trending",
        "popular",
        "hot",
        "viral",
        "most watched",
        "trending movies",
        "trending tv shows",
        "popular content",
      ],
      openGraph: {
        title: "Trending - EnternFlix",
        description:
          "Discover what's hot right now. Stay up to date with trending movies, TV shows, and popular content everyone is watching on EnternFlix.",
        type: "website",
        siteName: "EnternFlix",
      },
      twitter: {
        card: "summary_large_image",
        title: "Trending - EnternFlix",
        description:
          "Discover what's hot right now. Stay up to date with trending movies, TV shows, and popular content everyone is watching on EnternFlix.",
      },
    },
  },
};

// Helper to get category config
export function getCategoryConfig(slug: string): CategoryConfig | null {
  return CATEGORIES[slug] || null;
}

// Get all valid category slugs for static generation
export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORIES);
}
