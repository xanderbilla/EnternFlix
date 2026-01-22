/**
 * Centralized React Query keys for type-safety and consistency
 */

export const queryKeys = {
  // Trending
  trending: ["trending"] as const,
  trendingMovies: ["trending", "movies"] as const,
  trendingTV: ["trending", "tv"] as const,

  // Movies
  movies: {
    popular: ["movies", "popular"] as const,
    topRated: ["movies", "topRated"] as const,
    upcoming: ["movies", "upcoming"] as const,
    action: ["movies", "action"] as const,
    comedy: ["movies", "comedy"] as const,
    horror: ["movies", "horror"] as const,
    romance: ["movies", "romance"] as const,
    thriller: ["movies", "thriller"] as const,
  },

  // TV Shows
  tv: {
    popular: ["tv", "popular"] as const,
    topRated: ["tv", "topRated"] as const,
    action: ["tv", "action"] as const,
    comedy: ["tv", "comedy"] as const,
    drama: ["tv", "drama"] as const,
    crime: ["tv", "crime"] as const,
  },

  // Netflix Originals
  netflixOriginals: ["netflix", "originals"] as const,

  // Anime
  anime: {
    trending: ["anime", "trending"] as const,
    movies: ["anime", "movies"] as const,
    tv: ["anime", "tv"] as const,
    popular: ["anime", "popular"] as const,
    topRated: ["anime", "topRated"] as const,
    action: ["anime", "action"] as const,
  },

  // Random content
  randomContent: ["random", "content"] as const,

  // Category content
  categoryContent: (category: string) => ["category", category] as const,

  // Title details
  title: (id: string) => ["title", id] as const,

  // Search
  search: (query: string) => ["search", query] as const,

  // Genres
  genres: (category: string) => ["genres", category] as const,
} as const;
