export const queryKeys = {
  trending: ["trending"] as const,

  randomContent: ["random", "content"] as const,

  title: (id: string) => ["title", id] as const,
  person: (id: string) => ["person", id] as const,
  personMovies: (id: string, type: string) =>
    ["personMovies", id, type] as const,
  playback: (
    contentType: string,
    contentId: string,
    seasonId?: string | null,
    episodeId?: string | null,
  ) =>
    [
      "playback",
      contentType,
      contentId,
      seasonId ?? null,
      episodeId ?? null,
    ] as const,

  search: (
    query: string,
    scope: "all" | "movie" | "tv" | "people" = "all",
    sort: string = "recent",
  ) => ["search", query, scope, sort] as const,

  genres: (category: string) => ["genres", category] as const,

  customContent: (type: string) => ["custom", "content", type] as const,
  customMovie: (id: string) => ["custom", "movie", id] as const,
  banner: (type: string) => ["banner", type] as const,
  discover: (type: string, content: string) =>
    ["discover", type, content] as const,
  discoverByAttribute: (attributeId: string, content: string) =>
    ["discover", "attribute", attributeId, content] as const,
  discoverInfinite: (type: string, content: string, sort: string = "") =>
    ["discoverInfinite", type, content, sort] as const,
  discoverByAttributeInfinite: (
    attributeId: string,
    content: string,
    sort: string = "",
  ) => ["discoverByAttributeInfinite", attributeId, content, sort] as const,
  attributesGenres: (contentType: string) =>
    ["attributes", "genres", contentType] as const,
} as const;
