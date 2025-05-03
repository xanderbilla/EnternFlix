const key = "09389ac5239422a440a1fcb9738328fd";

const catReq = {
  fetchTvShows: `discover/tv?api_key=${key}&sort_by=popularity.desc`,
  fetchMovies: `discover/movie?api_key=${key}&sort_by=popularity.desc`,
  fetchNewPopular: `discover/movie?api_key=${key}&sort_by=release_date.desc`,
  fetchAnimes: `discover/tv?api_key=${key}&with_genres=16&sort_by=popularity.desc`,
  fetchTrending: `trending/all/week?api_key=${key}`,
  fetchMyList: `discover/movie?api_key=${key}&sort_by=vote_average.desc`,
};

export default catReq;
