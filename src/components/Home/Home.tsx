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
        <MovieList title="Trending" data={requests.fetchTrending} />
      </div>
    </>
  );
};

export default Home;
