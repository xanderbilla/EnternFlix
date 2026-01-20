import { Movie } from "@/types/movie";
import { DynamicMovieCard as MovieCard } from "@/utils/dynamicImports";

interface MovieGridProps {
  movies: Movie[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export default function MovieGrid({ movies, scrollRef }: MovieGridProps) {
  return (
    <div
      id="movie-list"
      ref={scrollRef}
      className="flex gap-2 overflow-x-hidden w-full h-full scrollbar-hide"
    >
      {movies.map((movie: Movie, index: number) => (
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
  );
}
