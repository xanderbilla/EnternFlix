import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

vi.mock("@/lib/api/customAxios", () => ({
  default: { get: vi.fn() },
}));

import customAxios from "@/lib/api/customAxios";
import { usePlayback } from "./usePlayback";

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("usePlayback", () => {
  beforeEach(() => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockReset();
  });

  it("resolves with playback data on success", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: { masterPlaylistUrl: "https://cdn/test.m3u8" } },
    });
    const { result } = renderHook(() => usePlayback("movie", "abc"), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({
      masterPlaylistUrl: "https://cdn/test.m3u8",
    });
  });

  it("errors when API returns no data", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { data: null },
    });
    const { result } = renderHook(() => usePlayback("tv", "xyz"), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true), {
      timeout: 5000,
    });
    expect(result.current.error?.message).toMatch(/playback/i);
  });

  it("does not fetch when disabled", async () => {
    renderHook(() => usePlayback("movie", "abc", false), { wrapper });
    await new Promise((r) => setTimeout(r, 0));
    expect(customAxios.get).not.toHaveBeenCalled();
  });

  it("does not fetch when contentId is empty", async () => {
    renderHook(() => usePlayback("movie", ""), { wrapper });
    await new Promise((r) => setTimeout(r, 0));
    expect(customAxios.get).not.toHaveBeenCalled();
  });
});
