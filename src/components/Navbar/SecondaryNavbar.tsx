"use client";

import { useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SecondaryNavbarProps, NavbarGenre } from "@/types/navbar";
import { ViewMode } from "@/types/common";
import { DEFAULT_GENRES, SORT_OPTIONS } from "@/constants/navbar";
import GenresDropdown from "./GenresDropdown";
import ViewModeToggle from "./ViewModeToggle";
import { Suspense } from "react";

function SecondaryNavbarContent({
  pageTitle,
  genres = [],
  showBackground,
}: SecondaryNavbarProps) {
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Suggestions for you");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const viewMode = (searchParams.get("view") as ViewMode) || "list";

  const getGenresForPage = useCallback((): NavbarGenre[] => {
    if (genres.length > 0) return genres;

    if (pathname.includes("/movies")) return DEFAULT_GENRES.movies;
    if (pathname.includes("/tv-shows")) return DEFAULT_GENRES["tv-shows"];
    if (pathname.includes("/anime")) return DEFAULT_GENRES.anime;

    return [];
  }, [genres, pathname]);

  const currentGenres = getGenresForPage();

  const handleGenreClick = useCallback((genre: NavbarGenre) => {
    setShowGenresDropdown(false);
  }, []);

  const handleSortClick = useCallback((sortOption: string) => {
    setSelectedSort(sortOption);
    setShowSortDropdown(false);
  }, []);

  const handleViewModeChange = useCallback(
    (mode: ViewMode) => {
      const params = new URLSearchParams(searchParams.toString());
      if (mode === "list") {
        params.delete("view");
      } else {
        params.set("view", mode);
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.push(newUrl);
    },
    [pathname, searchParams, router],
  );

  const shouldShowSecondaryNav =
    (pathname.includes("/movies") ||
      pathname.includes("/tv-shows") ||
      pathname.includes("/anime") ||
      pathname.includes("/trending")) &&
    pathname !== "/" &&
    !pathname.includes("/search") &&
    !pathname.includes("/favorites") &&
    !pathname.includes("/title/");

  if (!shouldShowSecondaryNav) {
    return null;
  }

  return (
    <div
      className={`w-full px-4 md:px-16 py-3 transition duration-500 ${
        showBackground ? "bg-zinc-900/95" : ""
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
            {pageTitle}
          </h1>

          <GenresDropdown
            genres={currentGenres}
            isOpen={showGenresDropdown}
            onToggle={() => setShowGenresDropdown(!showGenresDropdown)}
            onGenreClick={handleGenreClick}
          />
        </div>

        <ViewModeToggle
          viewMode={viewMode}
          selectedSort={selectedSort}
          showSortDropdown={showSortDropdown}
          onViewModeChange={handleViewModeChange}
          onToggleSortDropdown={() => setShowSortDropdown(!showSortDropdown)}
          onSortClick={handleSortClick}
          sortOptions={SORT_OPTIONS}
        />
      </div>
    </div>
  );
}

const SecondaryNavbar = (props: SecondaryNavbarProps) => {
  return (
    <Suspense fallback={null}>
      <SecondaryNavbarContent {...props} />
    </Suspense>
  );
};

export default SecondaryNavbar;
