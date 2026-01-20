"use client";

import { useTopRatedMovies, useTopRatedTV } from "@/hooks/api/useMovies";
import { Movie } from "@/types/movie";
import { DynamicMovieCard as MovieCard } from "@/utils/dynamicImports";

export default function FavoritesContent() {
  const { data: moviesData, isLoading: moviesLoading } = useTopRatedMovies();
  const { data: tvData, isLoading: tvLoading } = useTopRatedTV();

  const isLoading = moviesLoading || tvLoading;

  // Combine and shuffle the results to simulate user favorites
  const favorites: Movie[] = [];
  if (moviesData?.results) {
    favorites.push(...moviesData.results.slice(0, 10));
  }
  if (tvData?.results) {
    favorites.push(...tvData.results.slice(0, 10));
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="relative -mt-32 md:-mt-40 lg:-mt-48 z-10 pb-4">
      <div className="px-4 md:px-12 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {favorites.map((item, index) => (
            <MovieCard
              key={item.id}
              data={item}
              isFirst={index === 0}
              isLast={index === favorites.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
