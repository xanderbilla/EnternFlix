"use client";

import { Movie } from "@/types/movie";
import { getImageUrl } from "@/utils/movieHelpers";

interface SearchBannerProps {
  movie: Movie | null;
}

export default function SearchBanner({ movie }: SearchBannerProps) {
  const backdropUrl = movie?.backdrop_path
    ? getImageUrl(movie.backdrop_path, "original")
    : null;

  return (
    <div className="relative h-[40vh] md:h-[45vh] lg:h-[50vh] bg-zinc-900 overflow-hidden">
      {backdropUrl && (
        <>
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0 animate-fadeIn [animation-delay:100ms] [animation-duration:1000ms] [animation-fill-mode:forwards]"
            style={{ backgroundImage: `url('${backdropUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent opacity-0 animate-fadeIn [animation-delay:100ms] [animation-duration:1000ms] [animation-fill-mode:forwards]" />
        </>
      )}
    </div>
  );
}
