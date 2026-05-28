"use client";

import { useMemo, useEffect, useRef, useCallback, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useSearch } from "@/hooks/api/useMovies";
import PageLayout from "@/components/Layout/PageLayout";
import SortDropdown, { type SortOption } from "@/components/UI/SortDropdown";
import { DynamicSearchResults as SearchResults } from "@/utils/dynamicImports";

type SearchSort = "" | "recent" | "latest" | "alpha_asc" | "alpha_desc";

const SEARCH_SORT_OPTIONS: SortOption[] = [
  { value: "recent", label: "Recent" },
  { value: "latest", label: "Latest" },
  { value: "alpha_asc", label: "Sort by A - Z" },
  { value: "alpha_desc", label: "Sort by Z - A" },
];

const isSearchSort = (value: string | null): value is SearchSort =>
  value === "" ||
  value === "recent" ||
  value === "latest" ||
  value === "alpha_asc" ||
  value === "alpha_desc";

export default function SearchPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const query = (searchParams.get("q") ?? "").trim();
  const scopeParam = searchParams.get("in");
  const selectedMode = scopeParam === "people" ? "people" : "content";
  const scope = selectedMode === "people" ? "people" : "all";

  const rawSort = searchParams.get("sort");
  const selectedSort: SearchSort = isSearchSort(rawSort) ? rawSort : "recent";

  useEffect(() => {
    if (!query) {
      router.replace("/browse");
    }
  }, [query, router]);

  const handleSortChange = useCallback(
    (nextSort: string) => {
      if (!isSearchSort(nextSort)) return;

      const params = new URLSearchParams(searchParams.toString());
      if (nextSort) {
        params.set("sort", nextSort);
      } else {
        params.delete("sort");
      }

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useSearch(query, scope, selectedSort || "recent");

  const searchRes = useMemo(() => {
    if (!searchData?.pages) return [];
    return searchData.pages.flatMap((page) => page.content.results || []);
  }, [searchData]);

  const peopleRes = useMemo(() => {
    if (!searchData?.pages?.length) return [];
    return searchData.pages[0]?.people.results || [];
  }, [searchData]);

  const contentCount = searchData?.pages?.[0]?.content.count ?? 0;
  const peopleCount = searchData?.pages?.[0]?.people.count ?? 0;

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
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

  if (!query) {
    return null;
  }

  return (
    <PageLayout showBanner={false} reserveTopPaddingWhenNoBanner={false}>
      <section className="relative z-10 pt-16 md:pt-20 bg-zinc-900 min-h-screen">
        <div className="sticky top-[var(--navbar-height)] z-20 flex min-h-[68px] items-center px-4 sm:px-6 md:px-16 py-3 bg-zinc-900 transition duration-500">
          <h1 className="text-white text-lg sm:text-xl md:text-[22px] lg:text-[30px] font-medium leading-none">
            Search Results
          </h1>

          <div className="ml-auto flex items-center gap-2">
            <SortDropdown
              value={selectedSort}
              options={SEARCH_SORT_OPTIONS}
              onChange={handleSortChange}
              buttonLabel="Sort"
              ariaLabel="Sort search results"
              showOptionIcon={false}
              isOpen={sortDropdownOpen}
              onOpenChange={setSortDropdownOpen}
            />
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-16">
          <SearchResults
            debouncedQuery={query}
            searchRes={searchRes}
            peopleRes={peopleRes}
            contentCount={contentCount}
            peopleCount={peopleCount}
            selectedMode={selectedMode}
            hasNextPage={hasNextPage || false}
            loadMoreRef={loadMoreRef}
            isLoading={isLoading || isFetching}
            onCardHover={() => setSortDropdownOpen(false)}
          />
        </div>
      </section>
    </PageLayout>
  );
}
