export const queryKeys = {
  trending: ["trending"] as const,
  trendingMovies: ["trending", "movies"] as const,
  trendingTV: ["trending", "tv"] as const,

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

  tv: {
    popular: ["tv", "popular"] as const,
    topRated: ["tv", "topRated"] as const,
    action: ["tv", "action"] as const,
    comedy: ["tv", "comedy"] as const,
    drama: ["tv", "drama"] as const,
    crime: ["tv", "crime"] as const,
  },

  netflixOriginals: ["netflix", "originals"] as const,

  anime: {
    trending: ["anime", "trending"] as const,
    movies: ["anime", "movies"] as const,
    tv: ["anime", "tv"] as const,
    popular: ["anime", "popular"] as const,
    topRated: ["anime", "topRated"] as const,
    action: ["anime", "action"] as const,
  },

  randomContent: ["random", "content"] as const,

  categoryContent: (category: string) => ["category", category] as const,

  title: (id: string) => ["title", id] as const,

  search: (query: string) => ["search", query] as const,

  genres: (category: string) => ["genres", category] as const,

  customContent: (type: string) => ["custom", "content", type] as const,
  customMovie: (id: string) => ["custom", "movie", id] as const,
  banner: (type: string) => ["banner", type] as const,
  discover: (type: string, content: string) =>
    ["discover", type, content] as const,
  discoverByAttribute: (attributeId: string, content: string) =>
    ["discover", "attribute", attributeId, content] as const,
} as const;
