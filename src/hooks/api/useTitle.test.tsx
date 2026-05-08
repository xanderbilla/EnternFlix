import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

vi.mock("@/services/content/titleContent", () => ({
  fetchTitleData: vi.fn(),
}));

import { fetchTitleData } from "@/services/content/titleContent";
import { useTitle } from "./useTitle";

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("useTitle", () => {
  beforeEach(() => {
    (fetchTitleData as ReturnType<typeof vi.fn>).mockReset();
  });

  it("returns fetched title data", async () => {
    (fetchTitleData as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      content: { id: "t1", title: "Movie" },
      mediaType: "movie",
    });
    const { result } = renderHook(() => useTitle("t1"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.content.title).toBe("Movie");
  });

  it("does not fetch when id is empty", async () => {
    renderHook(() => useTitle(""), { wrapper });
    await new Promise((r) => setTimeout(r, 0));
    expect(fetchTitleData).not.toHaveBeenCalled();
  });

  it("does not fetch when disabled", async () => {
    renderHook(() => useTitle("t1", false), { wrapper });
    await new Promise((r) => setTimeout(r, 0));
    expect(fetchTitleData).not.toHaveBeenCalled();
  });

  it("propagates fetch errors", async () => {
    (fetchTitleData as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("not found"),
    );
    const { result } = renderHook(() => useTitle("missing"), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("not found");
  });
});
