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
  const [showRightButton, setShowRightButton] = useState(true);

  // Function to check if we can scroll more
  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Show left button if we've scrolled right
      setShowLeftButton(scrollLeft > 0);

      // Show right button if there's more content to scroll
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10); // Adding small buffer
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;

      // Get card width based on screen size
      let cardWidth = 160; // Default mobile width
      if (window.innerWidth >= 1024) {
        cardWidth = 240; // lg breakpoint
      } else if (window.innerWidth >= 768) {
        cardWidth = 200; // md breakpoint
      }

      // Calculate width of 3 cards plus gaps
      const gapWidth = 8; // gap-2 equals 8px
      const scrollAmount = (cardWidth + gapWidth) * 3;

      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // Update button visibility after scroll animation
      setTimeout(checkScrollButtons, 400);
    }
  };

  // Add scroll event listener to update button visibility
  useEffect(() => {
    const handleScroll = () => {
      checkScrollButtons();
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      // Initial check
      checkScrollButtons();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [movies]); // Re-run when movies change

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
    <div className="px-4 md:px-12 mt-4 space-y-4 relative">
      <div className="flex flex-col gap-3">
        <p className="text-white text-lg md:text-xl lg:text-2xl font-medium">
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
              onClick={() => scroll("left")}
              className="absolute left-0 top-0 bottom-0 z-[30] w-36 
              bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-transparent
              items-center justify-start pl-4 flex cursor-pointer group/scroll"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center 
                bg-zinc-900 group-hover/scroll:bg-white/10 transition duration-300"
              >
                <BsChevronLeft className="w-6 h-6 text-white" />
              </div>
            </button>
          )}

          <div
            id="movie-list"
            ref={scrollRef}
            className="flex gap-2 overflow-x-hidden w-full h-full scrollbar-hide"
          >
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="flex-none w-[160px] md:w-[200px] lg:w-[240px]"
              >
                <MovieCard
                  data={movie}
                  isFirst={index === 0}
                  isLast={index === movies.length - 1}
                />
              </div>
            ))}
          </div>

          {(showButtons || window.innerWidth <= 768) && showRightButton && (
            <button
              type="button"
              title="Scroll right"
              onClick={() => scroll("right")}
              className="absolute right-0 top-0 bottom-0 z-[30] w-36 
              bg-gradient-to-l from-zinc-900 via-zinc-900/90 to-transparent
              items-center justify-end pr-4 flex cursor-pointer group/scroll"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center 
                bg-zinc-900 group-hover/scroll:bg-white/10 transition duration-300"
              >
                <BsChevronRight className="w-6 h-6 text-white" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
