"use client";

import PageLayout from "@/components/Layout/PageLayout";
import { DynamicMovieList } from "@/utils/dynamicImports";
import { MovieListItem } from "@/types/components";
import { useBannerByPage } from "@/hooks/api/useMovies";
import { getImageUrl } from "@/utils/movieHelpers";

interface MoviesPageContentProps {
  movieLists: MovieListItem[];
}

export default function MoviesPageContent({
  movieLists,
}: MoviesPageContentProps) {
  // Fetch banner for movies page
  const { data: bannerMovie } = useBannerByPage("MOVIE");

  const backdropUrl = bannerMovie?.backdropPath
    ? getImageUrl(bannerMovie.backdropPath, "original")
    : null;

  return (
    <PageLayout showBanner={false}>
      {/* Banner Section */}
      <div className="relative h-[65vh] -mt-24">
        {backdropUrl ? (
          <>
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${backdropUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          </>
        )}
        <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-0 right-0 px-4 md:px-16">
          <h1 className="font-bold text-white mb-2 leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Experience Cinema at Home
          </h1>
          <p className="text-white/90 max-w-3xl leading-relaxed text-base sm:text-lg md:text-xl">
            Watch the latest blockbusters and timeless classics from the comfort
            of your home.
          </p>
        </div>
      </div>

      {/* Movie Lists Section */}
      <div className="relative -mt-32 md:-mt-40 lg:-mt-48 z-10 space-y-6">
        {/* Latest Movies List */}
        <DynamicMovieList title="Latest Movies" hookName="allMovies" />

        {/* Other Movie Lists */}
        {movieLists.map((list) => (
          <DynamicMovieList
            key={list.hookName}
            title={list.title}
            hookName={list.hookName}
          />
        ))}
      </div>
    </PageLayout>
  );
}
