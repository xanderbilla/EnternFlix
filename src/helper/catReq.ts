const key = "09389ac5239422a440a1fcb9738328fd";

const catReq = {
  fetchTvShows: `discover/movie?api_key=${key}&with_genres=28`,
  fetchMovies: `discover/movie?api_key=${key}&with_genres=10749`,
  fetchNewPopular: `discover/movie?api_key=${key}&with_genres=27`,
  fetchAnimes: `discover/movie?api_key=${key}&with_genres=16`,
};

export default catReq;
