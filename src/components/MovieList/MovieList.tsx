"use client";

import { useEffect, useState, useMemo, useCallback, useRef, memo } from "react";
import { Movie, MovieListProps } from "@/types/movie";
import {
  useTrending,
  useTrendingMovies,
  useTrendingTV,
  usePopularMovies,
  useTopRatedMovies,
  useUpcomingMovies,
  useActionMovies,
  useComedyMovies,
  useHorrorMovies,
  useRomanceMovies,
  useThrillerMovies,
  usePopularTV,
  useTopRatedTV,
  useActionTV,
  useComedyTV,
  useDramaTV,
  useCrimeTV,
  useNetflixOriginals,
  useTrendingAnime,
  usePopularAnime,
  useTopRatedAnime,
  useActionAnime,
  useAnimeTV,
  useAnimeMovies,
} from "@/hooks/api/useMovies";
import ScrollButton from "./ScrollButton";
import MovieGrid from "./MovieGrid";
import { useMovieScroll } from "@/hooks/ui/useMovieScroll";

// Hook mapping - moved outside component for performance
const HOOK_MAP: Record<string, () => ReturnType<typeof useTrending>> = {
  trending: useTrending,
  trendingMovies: useTrendingMovies,
  trendingTV: useTrendingTV,
  popularMovies: usePopularMovies,
  topRatedMovies: useTopRatedMovies,
  upcomingMovies: useUpcomingMovies,
  actionMovies: useActionMovies,
  comedyMovies: useComedyMovies,
  horrorMovies: useHorrorMovies,
  romanceMovies: useRomanceMovies,
  thrillerMovies: useThrillerMovies,
  popularTV: usePopularTV,
  topRatedTV: useTopRatedTV,
  actionTV: useActionTV,
  comedyTV: useComedyTV,
  dramaTV: useDramaTV,
  crimeTV: useCrimeTV,
  netflixOriginals: useNetflixOriginals,
  trendingAnime: useTrendingAnime,
  popularAnime: usePopularAnime,
  topRatedAnime: useTopRatedAnime,
  actionAnime: useActionAnime,
  animeTV: useAnimeTV,
  animeMovies: useAnimeMovies,
};

const MovieList: React.FC<MovieListProps> = ({ hookName, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  // Get the appropriate hook based on hookName
  const useHook = HOOK_MAP[hookName];

  // Use the hook to fetch data
  const { data: response, isLoading, error } = useHook?.() || {};

  const movies = useMemo(() => response?.results || [], [response?.results]);

  // Function to check if we can scroll more
  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Show left button if we've scrolled right
      setShowLeftButton(scrollLeft > 0);

      // Show right button if there's more content to scroll
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10); // Adding small buffer
    }
  }, []);

  const { scroll } = useMovieScroll(scrollRef, checkScrollButtons);

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
  }, [movies, checkScrollButtons]); // Re-run when movies change

  // Don't show anything while loading or invalid hook
  if (!useHook || isLoading) {
    return null;
  }

  // Handle error or no movies
  if (error || !movies || movies.length === 0) {
    return null;
  }

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
          <ScrollButton
            direction="left"
            onClick={() => scroll("left")}
            show={(showButtons || window.innerWidth <= 768) && showLeftButton}
          />

          <MovieGrid movies={movies} scrollRef={scrollRef} />

          <ScrollButton
            direction="right"
            onClick={() => scroll("right")}
            show={(showButtons || window.innerWidth <= 768) && showRightButton}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(MovieList);
