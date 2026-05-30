import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
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
import { STALE_TIMES } from "@/constants/common";
import { queryKeys } from "@/lib/query/queryKeys";
import { toPaginated } from "@/lib/query/queryHelpers";

interface DiscoverPageData {
  items: Movie[];
  nextCursor?: string;
  count: number;
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
    // Keep stale results visible while new sort/scope fetches so the grid
    // doesn't snap to empty between query-key changes.
    placeholderData: keepPreviousData,
    enabled: !!query && query.length > 2,
  });

export const useRandomContent = () => {
  const queryClient = useQueryClient();
  return useQuery<Movie, Error>({
    queryKey: queryKeys.randomContent,
    queryFn: async () => {
      const cached = queryClient.getQueryData<PaginatedResponse<Movie>>(
        queryKeys.discover("recent", "all"),
      );
      const items = cached?.results;
      if (items && items.length > 0) {
        return items[Math.floor(Math.random() * items.length)];
      }
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchDiscover("recent", "all"),
      );
      const movies = data.data?.items ?? [];
      if (movies.length === 0) throw new Error("No content available");
      return movies[Math.floor(Math.random() * movies.length)];
    },
  });
};

export const useBanner = (
  type: string = "all",
  options?: { retry?: boolean | number },
) =>
  useQuery<Movie, Error>({
    queryKey: queryKeys.banner(type),
    staleTime: STALE_TIMES.CONTENT,
    placeholderData: keepPreviousData,
    ...(options?.retry !== undefined && { retry: options.retry }),
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
    placeholderData: keepPreviousData,
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
  return useInfiniteQuery({
    queryKey: queryKeys.discoverByAttributeInfinite(
      String(attributeId || ""),
      String(content || "all"),
      String(sort || ""),
    ),
    queryFn: async ({ pageParam = null }: { pageParam?: string | null }) => {
      const cursor = pageParam as string | null;
      const url = requests.fetchDiscoverByAttributePaginated(
        String(attributeId || ""),
        String(content || "all"),
        { limit: 20, ...(sort && { sort }), ...(cursor && { cursor }) },
      );

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
    staleTime: STALE_TIMES.CONTENT,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchDiscover(type, content),
      );
      return toPaginated(data.data?.items ?? []);
    },
  });

export const useInfiniteDiscover = (
  type: string = "latest",
  content: string = "all",
  enabled: boolean = true,
  sort?: "alpha_asc" | "alpha_desc",
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.discoverInfinite(
      String(type || "latest"),
      String(content || "all"),
      String(sort || ""),
    ),
    queryFn: async ({ pageParam = null }: { pageParam?: string | null }) => {
      const cursor = pageParam as string | null;
      const url = requests.fetchDiscoverPaginated(
        String(type || "latest"),
        String(content || "all"),
        { limit: 20, ...(sort && { sort }), ...(cursor && { cursor }) },
      );

      const { data } = await customAxios.get<MoviesResponse>(url);

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
    staleTime: Infinity,
    queryFn: async () => {
      const fetchAttributeItems = async (type: string, suppressLog = false) => {
        const { data } = await customAxios.get<AttributesResponse>(
          requests.fetchAttributes(type),
          suppressLog ? { _suppressNetworkErrorLog: true } : undefined,
        );

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

      // Try each key variant in order, short-circuiting on the first success.
      // All calls use _suppressNetworkErrorLog so exploratory failures stay out
      // of the console; only a genuine server error (5xx) surfaces as a log.
      let allAttributes: ContentAttribute[] = [];
      for (const [index, type] of (
        ["genres", "GENRE", "genre"] as const
      ).entries()) {
        try {
          const items = await fetchAttributeItems(type, true);
          if (items.length > 0) {
            allAttributes = items;
            break;
          }
        } catch {
          // Last variant exhausted — stay with empty array
          if (index === 2) allAttributes = [];
        }
      }

      const expectedContentType = contentType === "movie" ? "movie" : "tv";

      const normalized = allAttributes.filter((attribute) => {
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
