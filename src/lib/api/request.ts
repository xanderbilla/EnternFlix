import { config } from "@/lib/env/env";

const key = config.tmdb.apiKey;

/**
 * Percent-encode a path segment so IDs containing `/`, `?`, `#`, spaces, etc.
 * cannot break out of the URL path or inject query parameters.
 */
const encPath = (value: string | number): string =>
  encodeURIComponent(String(value));

/**
 * Percent-encode a value placed in a query string, using the
 * `application/x-www-form-urlencoded` convention (spaces → `+`).
 */
const encQuery = (value: string | number): string =>
  encodeURIComponent(String(value)).replace(/%20/g, "+");

const requests = {
  // Custom backend — relative paths resolved against customAxios.baseURL
  fetchAllContent: (type: string = "all") => `c/content?type=${encQuery(type)}`,
  fetchMovieById: (id: string) => `c/content/${encPath(id)}`,
  fetchPersonById: (id: string) => `c/people/${encPath(id)}`,
  fetchPersonMovies: (id: string, type: string = "all") =>
    `c/people/${encPath(id)}/content?type=${encQuery(type)}`,
  fetchDiscoverByAttribute: (attributeId: string, content: string = "all") =>
    `c/attributes/${encPath(attributeId)}?content=${encQuery(content)}`,
  fetchDiscover: (type: string = "latest", content: string = "all") =>
    `c/discover?type=${encQuery(type)}&content=${encQuery(content)}`,
  fetchBanner: (type: string = "all") => `c/banner?type=${encQuery(type)}`,
  fetchPlayback: (contentType: string, contentId: string) =>
    `c/play/${encPath(contentType.toLowerCase())}/${encPath(contentId)}`,

  fetchTrending: `trending/all/week?api_key=${key}&language=en-US`,
  searchRequest: `search/multi?api_key=${key}&query=`,

  fetchMoviesPopular: `movie/popular?api_key=${key}&language=en-US`,
  fetchTVPopular: `tv/popular?api_key=${key}&language=en-US`,
  fetchAnimePopular: `discover/tv?api_key=${key}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc&language=en-US&vote_count.gte=50`,
  fetchMoviesTrending: `trending/movie/week?api_key=${key}&language=en-US`,
  fetchTVTrending: `trending/tv/week?api_key=${key}&language=en-US`,
  fetchMoviesTopRated: `movie/top_rated?api_key=${key}&language=en-US`,
  fetchTVTopRated: `tv/top_rated?api_key=${key}&language=en-US`,
};

export default requests;
