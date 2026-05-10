"use client";

import type { CSSProperties } from "react";
import type { FavoritesBannerProps } from "@/types/components";
import { getImageUrl } from "@/utils/movieHelpers";

export default function FavoritesBanner({ movie }: FavoritesBannerProps) {
  if (!movie) {
    return null;
  }

  const backdropUrl = movie?.backdropPath
    ? getImageUrl(movie.backdropPath, "original")
    : null;

  return (
    <section
      className="relative h-[85vh] md:h-[92vh] lg:h-[100vh]"
      role="region"
      aria-label="Favorites banner"
    >
      {backdropUrl ? (
        <>
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-dynamic"
            style={{ "--bg-image": `url('${backdropUrl}')` } as CSSProperties}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
      )}
      <div className="absolute bottom-1/3 md:bottom-1/3 lg:bottom-2/5 left-0 right-0 px-4 md:px-16">
        <h1 className="font-bold text-white mb-6 leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Watch Your Favorites
        </h1>
        <p className="text-white/90 max-w-3xl leading-relaxed text-base sm:text-lg md:text-xl mb-8">
          Discover and enjoy all your favorite movies and TV shows in one place.
          Your personal collection of handpicked entertainment awaits.
        </p>
      </div>
    </section>
  );
}
