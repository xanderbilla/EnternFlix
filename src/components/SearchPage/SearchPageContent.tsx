"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import debounce from "lodash-es/debounce";
import { useSearch, useTrending } from "@/hooks/api/useMovies";
import { DynamicNavbar, DynamicFooter } from "@/utils/dynamicImports";
import SearchHero from "@/components/search/SearchHero";
import SearchResults from "@/components/search/SearchResults";

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
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-zinc-900">
      <DynamicNavbar />
      <SearchHero
        movie={movie}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
      />

      {(searchQuery || debouncedQuery) && (
        <div className="min-h-[calc(100vh-16rem)] bg-zinc-900 pt-8 pb-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
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
      <DynamicFooter />
    </div>
  );
}
