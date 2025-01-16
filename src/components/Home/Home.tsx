"use client";

import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Navbar/Navbar";
import MovieList from "@/components/MovieList/MovieList";
import requests from "@/helper/request";
import useInfoModal from "@/hooks/useInfoModal/useInfoModal";

const Home = () => {
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <Navbar />
      <Banner />
      <div className="pb-4 mt-2 md:mt-4 lg:mt-6">
        <MovieList title="Trending" data={requests.fetchTrending} />
        <MovieList title="Popular" data={requests.fetchNetflixOriginals} />
        <MovieList title="Top Rated" data={requests.fetchTopRated} />
      </div>
    </>
  );
};

export default Home;
