import { memo } from "react";
import { Movie } from "@/types/movie";
import { DynamicMovieCard as MovieCard } from "@/utils/dynamicImports";
import { MovieListScrollGridProps } from "@/types/components";

function MovieGrid({ movies, scrollRef }: MovieListScrollGridProps) {
  return (
    <div
      id="movie-list"
      ref={scrollRef}
      className="flex gap-2 overflow-x-hidden overflow-y-visible w-full h-full scrollbar-hide"
    >
      {movies.map((movie: Movie, index: number) => (
        <div
          key={movie.id}
          className="group/item flex-none w-[160px] md:w-[200px] lg:w-[240px] relative z-0 hover:z-50"
        >
          <MovieCard
            data={movie}
            isFirst={index === 0}
            isLast={index === movies.length - 1}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(MovieGrid);
