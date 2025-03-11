"use client";
import dynamic from "next/dynamic";
import requests from "@/helper/request";
import useInfoModal from "@/hooks/useInfoModal/useInfoModal";

const Home = () => {
  const { isOpen, closeModal } = useInfoModal();
  const Banner = dynamic(() => import("@/components/Banner/Banner"));
  const Navbar = dynamic(() => import("@/components/Navbar/Navbar"));
  const Footer = dynamic(() => import("@/components/Footer/Footer"));
  const MovieList = dynamic(() => import("@/components/MovieList/MovieList"));

  return (
    <>
      <Navbar />
      <Banner />
      <div className="pb-4 mt-2 md:mt-4 lg:mt-6">
        <MovieList title="Trending" data={requests.fetchTrending} />
        <MovieList title="Popular" data={requests.fetchNetflixOriginals} />
        <MovieList title="Top Rated" data={requests.fetchTopRated} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
