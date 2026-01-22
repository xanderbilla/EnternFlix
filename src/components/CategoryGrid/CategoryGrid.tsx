"use client";

import { memo } from "react";
import { useMoviesByEndpoint } from "@/hooks/api/useMovies";
import { DynamicMovieCard } from "@/utils/dynamicImports";
import NotFoundContent from "@/app/NotFoundContent";
import requests from "@/helper/request";
import { CategoryGridProps } from "@/types/components";

function CategoryGrid({ category }: CategoryGridProps) {
  // Get the appropriate endpoint based on category
  const getEndpointForCategory = (cat: string) => {
    switch (cat) {
      case "movies":
        return requests.fetchMoviesPopular;
      case "tv-shows":
        return requests.fetchTVPopular;
      case "anime":
        return requests.fetchAnimePopular;
      case "trending":
        return requests.fetchTrending;
      case "favorites":
        return requests.fetchMoviesTopRated;
      default:
        return requests.fetchTrending;
    }
  };

  const { data, error } = useMoviesByEndpoint(
    ["category-grid", category],
    getEndpointForCategory(category),
  );

  if (error || !data?.results || !data.results.length) {
    return <NotFoundContent />;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 pt-32">
      {/* Netflix-style grid with same gap as MovieList */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {data.results.map((item, index) => (
          <div key={`${item.id}-${index}`}>
            <DynamicMovieCard
              data={item}
              isFirst={index === 0}
              isLast={index === data.results.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(CategoryGrid);
