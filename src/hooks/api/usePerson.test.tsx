import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

vi.mock("@/lib/api/customAxios", () => ({
  default: { get: vi.fn() },
}));

import customAxios from "@/lib/api/customAxios";
import { usePerson, usePersonMovies } from "./usePerson";

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("usePerson", () => {
  beforeEach(() => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockReset();
  });

  it("resolves with person data", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: { id: "p1", name: "Alice" } },
    });
    const { result } = renderHook(() => usePerson("p1"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ id: "p1", name: "Alice" });
  });

  it("errors when person is not found", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { data: null },
    });
    const { result } = renderHook(() => usePerson("p2"), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true), {
      timeout: 5000,
    });
    expect(result.current.error?.message).toMatch(/not found/i);
  });

  it("does not fetch when id is empty", async () => {
    renderHook(() => usePerson(""), { wrapper });
    await new Promise((r) => setTimeout(r, 0));
    expect(customAxios.get).not.toHaveBeenCalled();
  });

  it("does not fetch when disabled", async () => {
    renderHook(() => usePerson("p1", false), { wrapper });
    await new Promise((r) => setTimeout(r, 0));
    expect(customAxios.get).not.toHaveBeenCalled();
  });
});

describe("usePersonMovies", () => {
  beforeEach(() => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockReset();
  });

  it("returns the items array from the response", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: { items: [{ id: "m1" }, { id: "m2" }] } },
    });
    const { result } = renderHook(() => usePersonMovies("p1", "movie"), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: "m1" }, { id: "m2" }]);
  });

  it("returns empty array when items are missing", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: null },
    });
    const { result } = renderHook(() => usePersonMovies("p1"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });

  it("does not fetch when id is empty", async () => {
    renderHook(() => usePersonMovies(""), { wrapper });
    await new Promise((r) => setTimeout(r, 0));
    expect(customAxios.get).not.toHaveBeenCalled();
  });
});
