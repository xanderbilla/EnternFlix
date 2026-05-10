import { memo } from "react";
import { Movie } from "@/types/movie";
import { DynamicMovieCard as MovieCard } from "@/utils/dynamicImports";
import { MovieListRowProps } from "@/types/components";

function MovieListRow({ movies, scrollRef, onMovieClick }: MovieListRowProps) {
  return (
    <div
      id="movie-list"
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto overflow-y-visible w-full h-full no-scrollbar scroll-smooth"
    >
      {movies.map((movie: Movie, index: number) => (
        <div
          key={movie.id}
          className={`group/item flex-none w-[130px] sm:w-[160px] md:w-[200px] lg:w-[240px] relative z-0 hover:z-50 ${
            index === 0 ? "ml-3 sm:ml-4 md:ml-12" : ""
          } ${index === movies.length - 1 ? "mr-3 sm:mr-4 md:mr-12" : ""}`}
        >
          <MovieCard
            data={movie}
            isFirst={index === 0}
            isLast={index === movies.length - 1}
            onMovieClick={onMovieClick}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(MovieListRow);
