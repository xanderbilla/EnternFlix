const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const requests = {
  // General (mixed content)
  fetchTrending: `trending/all/week?api_key=${key}&language=en-US`,
  searchRequest: `search/multi?api_key=${key}&query=`,

  // Movies ONLY (use discover/movie and movie/ endpoints)
  fetchMoviesTrending: `trending/movie/week?api_key=${key}&language=en-US`,
  fetchMoviesPopular: `movie/popular?api_key=${key}&language=en-US`,
  fetchMoviesTopRated: `movie/top_rated?api_key=${key}&language=en-US`,
  fetchMoviesUpcoming: `movie/upcoming?api_key=${key}&language=en-US`,
  fetchMoviesAction: `discover/movie?api_key=${key}&with_genres=28&language=en-US`,
  fetchMoviesComedy: `discover/movie?api_key=${key}&with_genres=35&language=en-US`,
  fetchMoviesHorror: `discover/movie?api_key=${key}&with_genres=27&language=en-US`,
  fetchMoviesRomance: `discover/movie?api_key=${key}&with_genres=10749&language=en-US`,
  fetchMoviesThriller: `discover/movie?api_key=${key}&with_genres=53&language=en-US`,

  // TV Shows ONLY (use discover/tv and tv/ endpoints)
  fetchTVTrending: `trending/tv/week?api_key=${key}&language=en-US`,
  fetchTVPopular: `tv/popular?api_key=${key}&language=en-US`,
  fetchTVTopRated: `tv/top_rated?api_key=${key}&language=en-US`,
  fetchTVAction: `discover/tv?api_key=${key}&with_genres=10759&language=en-US`,
  fetchTVComedy: `discover/tv?api_key=${key}&with_genres=35&language=en-US`,
  fetchTVDrama: `discover/tv?api_key=${key}&with_genres=18&language=en-US`,
  fetchTVCrime: `discover/tv?api_key=${key}&with_genres=80&language=en-US`,
  fetchNetflixOriginals: `discover/tv?api_key=${key}&with_networks=213&language=en-US`,

  // Anime ONLY (Japanese animation content)
  fetchAnimeTrending: `discover/tv?api_key=${key}&with_genres=16&with_origin_country=JP&language=en-US&sort_by=popularity.desc&first_air_date.gte=2023-01-01`,
  fetchAnimeMovies: `discover/movie?api_key=${key}&with_genres=16&with_origin_country=JP&language=en-US&sort_by=popularity.desc`,
  fetchAnimeTV: `discover/tv?api_key=${key}&with_genres=16&with_origin_country=JP&language=en-US&sort_by=popularity.desc`,
  fetchAnimePopular: `discover/tv?api_key=${key}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc&language=en-US&vote_count.gte=50`,
  fetchAnimeTopRated: `discover/tv?api_key=${key}&with_genres=16&with_origin_country=JP&sort_by=vote_average.desc&vote_count.gte=100&language=en-US`,
  fetchAnimeAction: `discover/tv?api_key=${key}&with_genres=16&with_origin_country=JP&language=en-US&sort_by=popularity.desc&vote_count.gte=30`,

  // Legacy (keeping for backward compatibility)
  fetchTopRated: `movie/top_rated?api_key=${key}&language=en-US`,
  fetchHorrorMovies: `discover/movie?api_key=${key}&with_genres=27&language=en-US`,
  fetchActionMovies: `discover/movie?api_key=${key}&with_genres=28&language=en-US`,
  fetchComedyMovies: `discover/movie?api_key=${key}&with_genres=35&language=en-US`,
  fetchDocumentaries: `discover/movie?api_key=${key}&with_genres=99&language=en-US`,
  fetchRomanceMovies: `discover/movie?api_key=${key}&with_genres=10749&language=en-US`,
};

export default requests;
