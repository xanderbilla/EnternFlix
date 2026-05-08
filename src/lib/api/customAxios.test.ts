import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/env/env", () => ({
  config: {
    customApi: { baseUrl: "https://api.test.local" },
    http: { timeoutMs: 1234 },
  },
}));

const interceptorCalls: { req: number; res: number } = { req: 0, res: 0 };

vi.mock("./axiosInterceptors", () => ({
  configureRequestInterceptor: vi.fn(() => {
    interceptorCalls.req += 1;
  }),
  configureResponseInterceptor: vi.fn(() => {
    interceptorCalls.res += 1;
  }),
}));

describe("customAxios", () => {
  it("creates an axios instance with the custom API base URL and timeout, wired with interceptors", async () => {
    const { default: instance } = await import("./customAxios");
    const interceptors = await import("./axiosInterceptors");

    expect(instance.defaults.baseURL).toBe("https://api.test.local");
    expect(instance.defaults.timeout).toBe(1234);
    expect(instance.defaults.headers["Content-Type"]).toBe("application/json");
    expect(interceptors.configureRequestInterceptor).toHaveBeenCalledWith(
      instance,
    );
    expect(interceptors.configureResponseInterceptor).toHaveBeenCalledWith(
      instance,
      "CustomAPI",
    );
  });
});
