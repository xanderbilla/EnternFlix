import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Navbar/Navbar";
import MovieList from "@/components/MovieList/MovieList";
import requests from "@/helper/request";

const Home = () => {  
  return (
    <>
      <Navbar />
      <Banner />
      <div className="pb-40">
        <MovieList
          title="Netflix Originals"
          data={requests.fetchNetflixOriginals}
        />
        <MovieList title="Trending" data={requests.fetchTrending} />
        <MovieList title="Top Rated" data={requests.fetchTopRated} />
        <MovieList title="Horror Movies" data={requests.fetchHorrorMovies} />
        <MovieList title="Action Movies" data={requests.fetchActionMovies} />
        <MovieList title="Comedy Movies" data={requests.fetchComedyMovies} />
        <MovieList title="Documentry" data={requests.fetchDocumentaries} />
        <MovieList title="Romantic Movies" data={requests.fetchRomanceMovies} />
      </div>
    </>
  );
};

export default Home;
