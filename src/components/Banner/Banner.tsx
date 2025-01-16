"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import Image from "next/image";
import axios from "@/helper/axios";
import requests from "@/helper/request";
import { useRouter } from "next/navigation";

interface Movie {
  backdrop_path?: string;
  title?: string;
  name?: string;
  original_name?: string;
  overview?: string;
  first_air_date?: string;
  release_date?: string;
}

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null); // Changed initial state type

  const releaeYear = movie?.first_air_date
    ? movie.first_air_date.substring(0, 4)
    : movie?.release_date
    ? movie.release_date.substring(0, 4)
    : "Unknown";
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
    <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
      {movie && (
        <>
          <Image
            className="w-full h-full object-cover brightness-[90%]"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt=""
            width={1920}
            height={1080}
          />
          <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t z-0 from-zinc-900 to-transparent" />
          <div
            className="absolute top-0 left-0 w-full md:w-2/3 h-full bg-gradient-to-r 
          from-black to-transparent"
          >
            <div className="absolute top-[40%] md:top-[30%] ml-4 md:ml-16">
              <p
                className="text-white text-2xl md:text-4xl lg:text-5xl h-full w-[70%] md:w-[50%] lg:w-[40%] 
            font-bold drop-shadow-xl"
              >
                {movie.title || movie.name || movie.original_name}
              </p>
              <div className="flex gap-2 md:gap-4 font-light text-zinc-400 text-sm md:text-base mt-2 md:mt-4 lg:text-lg drop-shadow-xl">
                <p className="text-xs md:text-sm lg:text-lg">{releaeYear}</p>
                <p className="border border-zinc-400 px-1 md:px-2 text-xs md:text-sm lg:text-lg">
                  U/A 13+
                </p>
              </div>
              <p
                className="text-white text-sm md:text-base mt-3 md:mt-8 
            w-[95%] md:w-[90%] lg:w-[50%] lg:text-lg drop-shadow-xl"
              >
                {truncate(movie.overview || "", 200)}
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
                  onClick={() => route.push("/title/70205012")}
                >
                  <AiOutlineInfoCircle className="mr-1" /> More Info
                </button>
              </div>
            </div>
            <div
              className="absolute bottom-0 inset-x-0 w-full h-16 bg-gradient-to-t 
          from-zinc-900 to-transparent"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
