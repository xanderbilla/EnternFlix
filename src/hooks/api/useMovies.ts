import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import customAxios from "@/lib/api/customAxios";
import requests from "@/lib/api/request";
import {
  Movie,
  MoviesResponse,
  MovieResponse,
  SearchResponse,
  SearchResponseData,
  AttributesResponse,
  ContentAttribute,
} from "@/types/movie";
import type { PaginatedResponse } from "@/types/api";
import { queryKeys } from "@/lib/query/queryKeys";

function toPaginated<T>(items: T[]): PaginatedResponse<T> {
  return {
    results: items,
    page: 1,
    total_pages: 1,
    total_results: items.length,
  };
}

export const useCustomContent = (type: string = "all") =>
  useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: queryKeys.customContent(type),
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchDiscover("recent", type),
      );
      return toPaginated(data.data?.items ?? []);
    },
  });

export const useCustomMovies = () => useCustomContent("movie");

export const useCustomMovie = (id: string, enabled: boolean = true) =>
  useQuery<Movie, Error>({
    queryKey: queryKeys.customMovie(id),
    queryFn: async () => {
      const { data } = await customAxios.get<MovieResponse>(
        requests.fetchMovieById(id),
      );
      if (!data.data) {
        throw new Error("Movie not found");
      }
      return data.data;
    },
    enabled: enabled && !!id,
  });

export const useTrending = () =>
  useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: queryKeys.trending,
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchDiscover("trending", "all"),
      );
      return toPaginated(data.data?.items ?? []);
    },
  });

function emptySearchResponse(page: number): SearchResponseData {
  return {
    content: {
      results: [],
      count: 0,
      page,
      pageSize: 20,
    },
    people: {
      results: [],
      count: 0,
      page: 1,
      pageSize: 20,
    },
    warnings: [],
  };
}

export const useSearch = (
  query: string,
  scope: "all" | "movie" | "tv" | "people" = "all",
  sort: string = "recent",
) =>
  useInfiniteQuery<SearchResponseData, Error>({
    queryKey: queryKeys.search(query, scope, sort),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await customAxios.get<SearchResponse>(
        requests.fetchSearch(query, {
          in: scope,
          sort,
          contentPage: Number(pageParam),
          peoplePage: 1,
          contentPageSize: 20,
          peoplePageSize: 20,
        }),
      );
      return data.data ?? emptySearchResponse(Number(pageParam));
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(
        lastPage.content.count / Math.max(lastPage.content.pageSize, 1),
      );
      return lastPage.content.page < totalPages
        ? lastPage.content.page + 1
        : undefined;
    },
    enabled: !!query && query.length > 2,
  });

export const useRandomContent = () =>
  useQuery<Movie, Error>({
    queryKey: queryKeys.randomContent,
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchDiscover("recent", "all"),
      );
      const movies = data.data?.items ?? [];
      if (movies.length === 0) throw new Error("No content available");
      return movies[Math.floor(Math.random() * movies.length)];
    },
  });

export const useBanner = (type: string = "all") =>
  useQuery<Movie, Error>({
    queryKey: queryKeys.banner(type),
    queryFn: async () => {
      const { data } = await customAxios.get<MovieResponse>(
        requests.fetchBanner(type),
      );
      if (!data.data) {
        throw new Error("Banner content unavailable");
      }
      return data.data;
    },
  });

export const useDiscoverByAttribute = (
  attributeId: string,
  content: string = "all",
  enabled: boolean = true,
) =>
  useQuery<Movie[], Error>({
    queryKey: queryKeys.discoverByAttribute(attributeId, content),
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchDiscoverByAttribute(attributeId, content),
      );
      return data.data?.items ?? [];
    },
    enabled: enabled && !!attributeId,
  });

export const useInfiniteDiscoverByAttribute = (
  attributeId: string,
  content: string = "all",
  enabled: boolean = true,
  sort?: "alpha_asc" | "alpha_desc",
) => {
  const safeQueryKey = [
    "discoverByAttributeInfinite",
    String(attributeId || ""),
    String(content || "all"),
    String(sort || ""),
  ] as const;

  return useInfiniteQuery({
    queryKey: safeQueryKey,
    queryFn: async ({ pageParam = null }: { pageParam?: string | null }) => {
      const cursor = pageParam as string | null;
      let url = `c/attributes/${encodeURIComponent(String(attributeId || ""))}?content=${encodeURIComponent(String(content || "all"))}&limit=20`;
      if (sort) {
        url += `&sort=${encodeURIComponent(sort)}`;
      }
      if (cursor) {
        url += `&cursor=${encodeURIComponent(cursor)}`;
      }

      const { data } = await customAxios.get<MoviesResponse>(url);
      const pageData = data?.data;

      if (!pageData) {
        return {
          items: [],
          nextCursor: undefined,
          count: 0,
        };
      }

      return {
        items: Array.isArray(pageData.items) ? pageData.items : [],
        nextCursor: pageData.nextCursor,
        count: Number(pageData.count) || 0,
      };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: unknown) => {
      if (!lastPage || typeof lastPage !== "object") {
        return undefined;
      }
      const page = lastPage as DiscoverPageData;
      return page.nextCursor || undefined;
    },
    enabled: enabled && !!attributeId,
  });
};

export const useDiscover = (type: string = "latest", content: string = "all") =>
  useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: queryKeys.discover(type, content),
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchDiscover(type, content),
      );
      return toPaginated(data.data?.items ?? []);
    },
  });

interface DiscoverPageData {
  items: Movie[];
  nextCursor?: string;
  count: number;
}

export const useInfiniteDiscover = (
  type: string = "latest",
  content: string = "all",
  enabled: boolean = true,
  sort?: "alpha_asc" | "alpha_desc",
) => {
  // Keep a dedicated key for infinite discover to avoid cache-shape collisions
  // with `useDiscover` (which stores a non-infinite paginated object).
  const safeQueryKey = [
    "discoverInfinite",
    String(type || "latest"),
    String(content || "all"),
    String(sort || ""),
  ] as const;

  return useInfiniteQuery({
    queryKey: safeQueryKey,
    queryFn: async ({ pageParam = null }: { pageParam?: string | null }) => {
      const cursor = pageParam as string | null;
      // Build URL with cursor for pagination
      let url = `c/discover?type=${encodeURIComponent(String(type || "latest"))}&content=${encodeURIComponent(String(content || "all"))}&limit=20`;
      if (sort) {
        url += `&sort=${encodeURIComponent(sort)}`;
      }
      if (cursor) {
        url += `&cursor=${encodeURIComponent(cursor)}`;
      }

      const { data } = await customAxios.get<MoviesResponse>(url);

      // Handle the response structure safely
      const pageData = data?.data;
      if (!pageData) {
        return {
          items: [],
          nextCursor: undefined,
          count: 0,
        };
      }

      const result: DiscoverPageData = {
        items: Array.isArray(pageData.items) ? pageData.items : [],
        nextCursor: pageData.nextCursor,
        count: Number(pageData.count) || 0,
      };
      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: unknown) => {
      if (!lastPage || typeof lastPage !== "object") {
        return undefined;
      }
      const page = lastPage as DiscoverPageData;
      return page.nextCursor || undefined;
    },
    enabled,
  });
};

export const useGenresAttributes = (contentType: "movie" | "tv") =>
  useQuery<ContentAttribute[], Error>({
    queryKey: queryKeys.attributesGenres(contentType),
    queryFn: async () => {
      const fetchAttributeItems = async (type: string) => {
        const { data } = await customAxios.get<AttributesResponse>(
          requests.fetchAttributes(type),
        );

        // API can return either:
        // 1) data: { items: [...] }
        // 2) data: [...]
        const payload = data.data;
        if (Array.isArray(payload)) {
          return payload as ContentAttribute[];
        }

        if (
          payload &&
          typeof payload === "object" &&
          "items" in payload &&
          Array.isArray((payload as { items?: unknown }).items)
        ) {
          return (payload as { items: ContentAttribute[] }).items;
        }

        return [];
      };

      let allAttributes = await fetchAttributeItems("genres");

      // Backends may accept different enum spellings for type.
      if (allAttributes.length === 0) {
        allAttributes = await fetchAttributeItems("GENRE");
      }
      if (allAttributes.length === 0) {
        allAttributes = await fetchAttributeItems("genre");
      }

      const expectedContentType = contentType === "movie" ? "movie" : "tv";

      const normalized = allAttributes.filter((attribute) => {
        // Some environments return lowercase/uppercase values or omit fields.
        const normalizedContentType = String(attribute.contentType ?? "all")
          .trim()
          .toLowerCase();

        const attributeKinds = Array.isArray(attribute.attributeType)
          ? attribute.attributeType.map((kind) => String(kind).toLowerCase())
          : [];

        const isGenre =
          attributeKinds.length === 0 ||
          attributeKinds.includes("genre") ||
          attributeKinds.includes("genres");

        const isActive = attribute.active !== false;
        const matchesContentType =
          normalizedContentType === "all" ||
          normalizedContentType === "attribute" ||
          normalizedContentType === expectedContentType;

        return isGenre && isActive && matchesContentType;
      });

      // Keep list stable and deduplicated by id.
      const uniqueById = new Map<string, ContentAttribute>();
      normalized.forEach((attribute) => {
        if (!uniqueById.has(attribute.id)) {
          uniqueById.set(attribute.id, attribute);
        }
      });

      return Array.from(uniqueById.values()).sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    },
  });
