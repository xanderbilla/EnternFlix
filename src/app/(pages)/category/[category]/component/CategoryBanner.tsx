"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/helper/axios";
import { usePathname } from "next/navigation";
import catReq from "@/helper/catReq";

interface Movie {
  backdrop_path: string;
}

const CategoryBanner: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null); // Changed initial state type
  const path = usePathname().split("/");
  const categoryName = path[2].charAt(0).toUpperCase() + path[2].slice(1);
  const formatCategoryName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const fetchData = async () => {
    try {
      const request = await axios.get(catReq.fetchAnimes);
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

  return (
    <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh]">
      {movie && ( // Added a conditional rendering check for movie
        <>
          <Image
            className="w-full h-full object-cover brightness-[80%]"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt=""
            width={1920}
            height={1080}
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full flex h-full">
            <div className="bg-gradient-to-r from-black to-transparent w-full md:w-2/3 h-full flex flex-col justify-center items-start p-4 md:p-12">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white">
                {formatCategoryName(categoryName)}
              </h1>
              <p className="mt-4 w-full md:w-1/2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white">
                Explore a wide range of anime series and movies. Dive into the
                world of animation and enjoy your favorite shows.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryBanner;
