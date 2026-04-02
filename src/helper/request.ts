const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const customApiUrl = process.env.NEXT_PUBLIC_CUSTOM_API_URL;

const requests = {
  // Custom API endpoints
  fetchAllContent: (type: string = "all") =>
    `${customApiUrl}/c/content?type=${type}`,
  fetchMovieById: (id: string) => `${customApiUrl}/c/content/${id}`,
  fetchPersonById: (id: string) => `${customApiUrl}/c/people/${id}`,
  fetchPersonMovies: (id: string, type: string = "all") =>
    `${customApiUrl}/c/people/${id}/content?type=${type}`,
  fetchDiscoverByAttribute: (attributeId: string, content: string = "all") =>
    `${customApiUrl}/c/attributes/${attributeId}?content=${content}`,
  fetchDiscover: (type: string = "latest", content: string = "all") =>
    `${customApiUrl}/c/discover?type=${type}&content=${content}`,
  fetchBanner: (type: string = "all") =>
    `${customApiUrl}/c/banner?type=${type}`,

  // TMDB API endpoints (keep for search and other features)
  fetchTrending: `trending/all/week?api_key=${key}&language=en-US`,
  searchRequest: `search/multi?api_key=${key}&query=`,

  // Used in useRandomContent hook
  fetchMoviesPopular: `movie/popular?api_key=${key}&language=en-US`,
  fetchTVPopular: `tv/popular?api_key=${key}&language=en-US`,
  fetchAnimePopular: `discover/tv?api_key=${key}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc&language=en-US&vote_count.gte=50`,
  fetchMoviesTrending: `trending/movie/week?api_key=${key}&language=en-US`,
  fetchTVTrending: `trending/tv/week?api_key=${key}&language=en-US`,
  fetchMoviesTopRated: `movie/top_rated?api_key=${key}&language=en-US`,
  fetchTVTopRated: `tv/top_rated?api_key=${key}&language=en-US`,
};

export default requests;
