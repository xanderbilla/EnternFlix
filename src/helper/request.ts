const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const requests = {
  // Only keep what's actually used
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
