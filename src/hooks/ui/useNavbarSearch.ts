"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SEARCH_RETURN_PATH_KEY = "enternflix-navbar-search-return-path";
export type SearchScope = "content" | "people";

function normalizeScope(value: string | null): SearchScope {
  if (value === "people") {
    return value;
  }

  return "content";
}

function buildPathWithQuery(pathname: string, params: string) {
  return params ? `${pathname}?${params}` : pathname;
}

export function useNavbarSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const queryFromUrl = (searchParams.get("q") ?? "").trim();
  const scopeFromUrl = normalizeScope(searchParams.get("in"));
  const [isSearchOpen, setIsSearchOpen] = useState(
    pathname === "/search" && !!queryFromUrl,
  );
  const [searchValue, setSearchValue] = useState(queryFromUrl);
  const [selectedScope, setSelectedScope] = useState<SearchScope>(scopeFromUrl);

  useEffect(() => {
    // Sync local state when URL params change (e.g. back/forward navigation or
    // a direct link). Calling setState inside useEffect is intentional here —
    // URL params are the authoritative source of truth and we must mirror them
    // into controlled inputs after the navigation commits.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchValue(queryFromUrl);
    setSelectedScope(scopeFromUrl);

    if (pathname === "/search" && queryFromUrl) {
      setIsSearchOpen(true);
    }
  }, [pathname, queryFromUrl, scopeFromUrl]);

  useEffect(() => {
    if (pathname === "/search") {
      return;
    }

    const currentPath = buildPathWithQuery(pathname, searchParams.toString());
    window.sessionStorage.setItem(SEARCH_RETURN_PATH_KEY, currentPath);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isSearchOpen || pathname === "/search") {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, pathname]);

  useEffect(() => {
    const trimmedQuery = searchValue.trim();
    const currentQuery = (searchParams.get("q") ?? "").trim();
    const currentScope = normalizeScope(searchParams.get("in"));

    if (!isSearchOpen || !trimmedQuery) {
      return;
    }

    // Prevent replacing the same URL repeatedly on /search,
    // which can retrigger listeners and redundant fetches.
    if (
      pathname === "/search" &&
      currentQuery === trimmedQuery &&
      currentScope === selectedScope
    ) {
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", trimmedQuery);
      params.set("in", selectedScope === "people" ? "people" : "all");
      router.replace(`/search?${params.toString()}`);
    }, 350);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    isSearchOpen,
    pathname,
    queryFromUrl,
    router,
    searchParams,
    searchValue,
    selectedScope,
    scopeFromUrl,
  ]);

  const handleSearchOpen = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [],
  );

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    setSelectedScope("content");
    setIsSearchOpen(false);

    if (pathname !== "/search") {
      return;
    }

    const previousPath = window.sessionStorage.getItem(SEARCH_RETURN_PATH_KEY);
    if (previousPath && previousPath !== "/search") {
      router.replace(previousPath);
      return;
    }

    router.replace("/");
  }, [pathname, router]);

  const handleScopeChange = useCallback((scope: SearchScope) => {
    setSelectedScope(scope);
  }, []);

  return {
    searchContainerRef,
    isSearchOpen,
    searchValue,
    selectedScope,
    handleSearchOpen,
    handleSearchChange,
    handleClearSearch,
    handleScopeChange,
  };
}
