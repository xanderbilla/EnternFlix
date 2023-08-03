const key = "09389ac5239422a440a1fcb9738328fd"

const requests = {
    fetchNetflixOriginals: `discover/tv?api_key=${key}&with_networks=213`,
    fetchTrending: `trending/all/week?api_key=${key}&language=en-US`,
    fetchTopRated: `movie/top_rated?api_key=${key}&language=en-US`,
    fetchHorrorMovies: `discover/movie?api_key=${key}&with_genres=27`,
    fetchActionMovies: `discover/movie?api_key=${key}&with_genres=28`,
    fetchComedyMovies: `discover/movie?api_key=${key}&with_genres=35`,
    fetchDocumentaries: `discover/movie?api_key=${key}&with_genres=99`,
    fetchRomanceMovies: `discover/movie?api_key=${key}&with_genres=10749`,
}

export default requests;