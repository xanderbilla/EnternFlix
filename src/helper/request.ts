const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const customApiUrl = process.env.NEXT_PUBLIC_CUSTOM_API_URL;

const requests = {
  // Custom API endpoints
  fetchAllMovies: `${customApiUrl}/movies`,
  fetchMovieById: (id: string) => `${customApiUrl}/movies/${id}`,
  fetchPersonById: (id: string) => `${customApiUrl}/persons/${id}`,
  fetchPersonMovies: (id: string) => `${customApiUrl}/persons/${id}/movies`,
  fetchDiscoverByAttribute: (attributeId: string) =>
    `${customApiUrl}/discover/${attributeId}`,
  fetchBanner: `${customApiUrl}/banner`,
  fetchBannerByPage: (page: string) => `${customApiUrl}/banner?pg=${page}`,

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
