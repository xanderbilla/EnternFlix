import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

vi.mock("@/lib/api/customAxios", () => ({
  default: {
    get: vi.fn(async () => ({
      data: { data: [{ id: "a" }, { id: "b" }] },
    })),
  },
}));

vi.mock("@/lib/api/axios", () => ({
  default: { get: vi.fn() },
}));

import customAxios from "@/lib/api/customAxios";
import { useBanner, useTrending } from "./useMovies";

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("useBanner", () => {
  it("loads then resolves with the first banner item", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: { id: "banner-1", title: "Hero" } },
    });
    const { result } = renderHook(() => useBanner("movie"), { wrapper });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ id: "banner-1", title: "Hero" });
  });
});

describe("useTrending", () => {
  it("wraps the custom API list in a paginated envelope", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: [{ id: "1" }, { id: "2" }] },
    });
    const { result } = renderHook(() => useTrending(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({
      page: 1,
      total_pages: 1,
      total_results: 2,
      results: [{ id: "1" }, { id: "2" }],
    });
  });
});
