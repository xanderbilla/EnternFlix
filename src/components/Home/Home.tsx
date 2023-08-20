"use client"

import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Navbar/Navbar";
import MovieList from "@/components/MovieList/MovieList";
import requests from "@/helper/request";
import InfoModal from "@/components/InfoModal/InfoModal";
import useInfoModal from "@/hooks/useInfoModal/useInfoModal";

const Home = () => {  

  const {isOpen, closeModal} = useInfoModal();

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal} movieId={123}/>
      <Navbar />
      <Banner />
      <div className="pb-40">
        <MovieList title="Trending" data={requests.fetchTrending} />
      </div>
    </>
  );
};

export default Home;
