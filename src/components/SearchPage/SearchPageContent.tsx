"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearch, useTrending } from "@/hooks/api/useMovies";
import PageLayout from "@/components/Layout/PageLayout";
import SearchResults from "./SearchResults";
import Icon from "@/components/Icon/Icon";

// Native debounce implementation
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function SearchPageContent() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Use React Query hooks
  const { data: trendingData } = useTrending();
  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearch(debouncedQuery);

  // Memoize random movie selection to prevent it from changing on every render
  const movie = useMemo(() => {
    if (trendingData?.results?.length) {
      return trendingData.results[
        Math.floor(Math.random() * trendingData.results.length)
      ];
    }
    return null;
  }, [trendingData]);

  // Flatten all pages into a single array
  const searchRes = useMemo(() => {
    if (!searchData?.pages) return [];
    return searchData.pages.flatMap((page) => page.results || []);
  }, [searchData]);

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedQuery(query);
      }, 1000),
    [],
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [debouncedSearch],
  );

  // Infinite scroll effect
  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <PageLayout
      showBanner={true}
      bannerVariant="category"
      bannerCategory="trending"
    >
      {/* Search Input Section */}
      <div className="relative -mt-16 z-20 px-4 md:px-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for movies, TV shows, anime..."
              className="
                w-full
                p-3 sm:p-4 md:px-12
                pl-10 sm:pl-12
                rounded-lg
                bg-zinc-800/90
                text-white
                text-base sm:text-lg md:text-xl
                border-none
                outline-none
                focus:outline-none
                focus:ring-0
                backdrop-blur-sm
              "
              onChange={handleSearch}
              value={searchQuery}
            />
            <Icon
              name="search"
              size={18}
              className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Search Results */}
      {(searchQuery || debouncedQuery) && (
        <div className="min-h-[50vh] px-4 md:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <SearchResults
              searchQuery={searchQuery}
              debouncedQuery={debouncedQuery}
              searchRes={searchRes}
              hasNextPage={hasNextPage || false}
              loadMoreRef={loadMoreRef}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
}
