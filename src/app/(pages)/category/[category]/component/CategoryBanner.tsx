"use client";

import React, { useEffect, useState } from "react";
import axios from "@/helper/axios";
import catReq from "@/helper/catReq";

interface CategoryBannerProps {
  title: string;
  description: string;
  category: string;
}

interface Movie {
  backdrop_path: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  title,
  description,
  category,
}) => {
  const [backdropPath, setBackdropPath] = useState<string>("");

  useEffect(() => {
    const fetchRandomBackdrop = async () => {
      try {
        // Get the appropriate fetch function based on category
        let fetchUrl = catReq.fetchTrending; // default
        switch (category) {
          case "tv-show":
            fetchUrl = catReq.fetchTvShows;
            break;
          case "movies":
            fetchUrl = catReq.fetchMovies;
            break;
          case "anime":
            fetchUrl = catReq.fetchAnimes;
            break;
          case "trending":
            fetchUrl = catReq.fetchTrending;
            break;
          case "my-list":
            fetchUrl = catReq.fetchMyList;
            break;
        }

        const response = await axios.get(fetchUrl);
        const results = response.data.results;
        if (results && results.length > 0) {
          // Get a random backdrop from the results
          const randomIndex = Math.floor(Math.random() * results.length);
          const randomMovie = results[randomIndex];
          if (randomMovie.backdrop_path) {
            setBackdropPath(
              `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching backdrop:", error);
      }
    };

    fetchRandomBackdrop();
  }, [category]); // Re-fetch when category changes

  return (
    <div className="relative h-[56.25vw] md:h-[44vw] lg:h-[36vw]">
      <div
        className={`backdrop-image ${
          backdropPath ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: backdropPath ? `url(${backdropPath})` : "none",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-16 pb-16 md:pb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoryBanner;
