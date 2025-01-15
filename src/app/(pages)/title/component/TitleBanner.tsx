"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsPlay } from "react-icons/bs";
import { PiVideoCamera } from "react-icons/pi";

interface Movie {
  backdrop_path: string;
  title?: string;
  number_of_seasons?: number;
  name?: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  first_air_date?: string;
  release_date?: string;
}

interface TitleBannerProps {
  data: Movie | null;
  mediaType: string;
}

const TitleBanner: React.FC<TitleBannerProps> = ({ data, mediaType }) => {
  const releaeYear = data?.first_air_date
    ? data.first_air_date.substring(0, 4)
    : data?.release_date
    ? data.release_date.substring(0, 4)
    : "Unknown";

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
      {data && (
        <>
          <Image
            className="w-full h-full object-cover brightness-[60%]"
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
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
                {data.title || data.name || data.original_name}
              </p>
              <div className="flex gap-2 md:gap-4 font-light text-zinc-400 text-sm md:text-base mt-2 md:mt-4 lg:text-lg drop-shadow-xl">
                <p>{releaeYear}</p>
                <p className="border border-zinc-400 px-1 md:px-2">U/A 13+</p>
                {mediaType === "tv" && <p>{data.number_of_seasons} Seasons</p>}
                <p>Anime</p>
              </div>
              <p
                className="text-white text-sm md:text-base mt-3 md:mt-8 
            w-[95%] md:w-[90%] lg:w-[50%] lg:text-lg drop-shadow-xl"
              >
                {truncate(data.overview, 200)}
              </p>

                <div className="flex gap-2">
                {mediaType !== "tv" && (
                  <button className="flex items-center gap-1 font-medium text-black bg-zinc-200 px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 mt-2 md:mt-4 lg:mt-8 rounded-full transition duration-300 ease-in-out hover:bg-white hover:shadow-lg">
                  <BsPlay className="inline-block h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" fill="#000" />
                  <span className="text-sm md:text-sm lg:text-base">
                    Play Now
                  </span>
                  </button>
                )}
                <button className="flex items-center gap-2 text-white bg-zinc-600 px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 mt-2 md:mt-4 lg:mt-8 rounded-full transition duration-300 ease-in-out hover:bg-zinc-500 hover:shadow-lg">
                  <PiVideoCamera className="inline-block h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                  <span className="text-sm md:text-sm lg:text-base">
                  Watch Trailer
                  </span>
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

export default TitleBanner;
