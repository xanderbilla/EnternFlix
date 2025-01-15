"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import Image from "next/image";
import axios from "@/helper/axios";
import requests from "@/helper/request";
import { useRouter } from "next/navigation";

interface Movie {
  backdrop_path: string;
  title: string;
  name: string;
  original_name: string;
  overview: string;
}

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null); // Changed initial state type
const route = useRouter();
  const fetchData = async () => {
    try {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomIndex = Math.floor(
        Math.random() * request.data.results.length
      );
      setMovie(request.data.results[randomIndex]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="relative h-[80vh] w-full">
      {movie && ( // Added a conditional rendering check for movie
        <>
          <Image
            className="w-full h-full object-cover brightness-[60%]"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt=""
            width={1920} // Adjust width and height as needed
            height={1080}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r 
          from-black/20 to-transparent">
            <div className="absolute top-[40%] ml-4 md:ml-16">
              <p
                className="text-white text-2xl md:text-5xl h-full w-[50%] lg:text-6xl 
                font-bold drop-shadow-xl"
              >
                {movie.title || movie.name || movie.original_name}
              </p>
              <p
                className="text-white text-xs md:text-base mt-3 md:mt-8 
                w-[90%] md:w-[80%] lg:w-[50%] lg:text-lg drop-shadow-xl"
              >
                {truncate(movie.overview, 150)}
              </p>
              <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                <button
                  className="bg-white text-black rounded-[4px] 
                  py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold 
                  flex flex-row items-center hover:bg-neutral-300 transition"
                >
                  <BsPlayFill className="mr-1" /> Play
                </button>
                <button
                  className="bg-white text-white bg-opacity-30 rounded-[4px] 
                  py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold 
                  flex flex-row items-center hover:bg-opacity-20 gap-1 transition"
                onClick={() => route.push('/title/70205012')} 
                >
                  <AiOutlineInfoCircle className="mr-1" /> More Info
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 w-full h-16 bg-gradient-to-t 
          from-zinc-900 to-transparent"/>
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
