"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/helper/axios";
import requests from "@/helper/request";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

interface Movie {
  backdrop_path: string;
  title: string;
  name: string;
  original_name: string;
  overview: string;
}

const Page: React.FC = () => {
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

  console.log(movie);

  return (
    <>
    <Navbar />
      <div className="relative w-full">
        {movie && ( // Added a conditional rendering check for movie
          <>
            <Image
              className="w-full h-64 object-cover brightness-[80%]"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt=""
              width={1920} // Adjust width and height as needed
              height={1080}
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-10/12 flex items-center justify-center h-36">
              <input
                type="text"
                placeholder="Search for movies, TV shows, videos, or cast..."
                className="w-full p-4 rounded bg-zinc-800 text-white text-lg focus:border-red-500"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 px-12">
        <div className="py-4">
          <h1 className="text-4xl font-bold mb-6 text-white">Movie</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="bg-zinc-800 w-48 h-72 p-1 rounded shadow"
              >
                <div className="animate-pulse h-full">
                  <div className="bg-zinc-900 h-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <h1 className="text-4xl font-bold mb-6 text-white">Tv Shows</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="bg-zinc-800 w-48 h-72 p-1 rounded shadow"
              >
                <div className="animate-pulse h-full">
                  <div className="bg-zinc-900 h-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <h1 className="text-4xl font-bold mb-6 text-white">Videos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-zinc-800 p-1 rounded shadow">
                <div className="animate-pulse">
                  <div className="bg-zinc-900 h-40 mb-2 rounded"></div>
                  <div className="p-2">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-zinc-900 rounded-full"></div>
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-zinc-900 rounded-full"></div>
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-zinc-900 rounded-full"></div>
                      </div>
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-zinc-900 rounded-full"></div>
                    </div>
                    <div className="h-6 bg-zinc-900 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <h1 className="text-4xl font-bold mb-6 text-white">Cast</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="w-48 h-56 p-1 rounded shadow">
                <div className="animate-pulse h-full">
                  <div className="bg-zinc-800 h-44 w-44 rounded-full"></div>
                  <div className="h-6 bg-zinc-800 rounded mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
