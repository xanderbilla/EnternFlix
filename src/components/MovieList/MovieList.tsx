"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "@/helper/axios";
import MovieCard from "../MovieCard/MovieCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Movie {
  id: number;
  // Define other properties of the movie here
}

interface MovieListProps {
  data: string;
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount =
        direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const request = await axios.get(data);
      setMovies(request.data.results);
      return request;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!movies || movies.length === 0) {
    return null;
  }

  console.log(movies);

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8 relative">
      <div className="flex flex-col md:gap-2 lg:gap-4">
        <p className="text-white text-md text-lg md:text-xl lg:text-2xl font-medium">
          {title}
        </p>
        <div
          className="relative"
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
        >
          {(showButtons || window.innerWidth <= 768) && showLeftButton && (
            <button
              type="button"
              title="Scroll left"
              onClick={() => {
                scroll("left");
                setShowLeftButton(true);
              }}
              className="absolute left-0 top-0 bottom-0 z-[30] w-8 md:w-10 lg:w-12 bg-gradient-to-r from-zinc-900 bg-opacity-0 items-center justify-center cursor-pointer hover:bg-opacity-20 transition-all duration-500 ease-in-out"
            >
              <BsChevronLeft className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
            </button>
          )}

          <div
            id="movie-list"
            ref={scrollRef}
            className="flex space-x-6 overflow-x-hidden w-full h-full scrollbar-hide"
          >
            {movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-44 md:w-72">
                <MovieCard data={movie} />
              </div>
            ))}
          </div>

          {(showButtons || window.innerWidth <= 768) && (
            <button
              type="button"
              title="Scroll right"
              onClick={() => {
                scroll("right");
                setShowLeftButton(true);
              }}
              className="absolute right-0 top-0 bottom-0 z-[30] w-8 md:w-10 lg:w-12 bg-gradient-to-l from-zinc-900 bg-opacity-0 items-center justify-center cursor-pointer hover:bg-opacity-20 transition-all duration-500 ease-in-out"
            >
              <BsChevronRight className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
