import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  process.env = { ...ORIGINAL_ENV };
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("config", () => {
  it("flags isTest when NODE_ENV=test", async () => {
    (process.env as Record<string, string>).NODE_ENV = "test";
    process.env.NEXT_PUBLIC_TMDB_API_KEY = "k";
    process.env.NEXT_PUBLIC_CUSTOM_API_URL = "https://api";
    process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL = "https://cdn";
    const { config } = await import("./env");
    expect(config.isTest).toBe(true);
    expect(config.isProd).toBe(false);
    expect(config.isDev).toBe(false);
  });

  it("readBool accepts 'true' and '1' as true, everything else as false", async () => {
    (process.env as Record<string, string>).NODE_ENV = "production";
    process.env.NEXT_PUBLIC_ENABLE_LOGGING = "1";
    process.env.NEXT_PUBLIC_TMDB_API_KEY = "k";
    process.env.NEXT_PUBLIC_CUSTOM_API_URL = "https://api";
    process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL = "https://cdn";
    let mod = await import("./env");
    expect(mod.config.enableLogging).toBe(true);

    vi.resetModules();
    process.env.NEXT_PUBLIC_ENABLE_LOGGING = "false";
    mod = await import("./env");
    expect(mod.config.enableLogging).toBe(false);

    vi.resetModules();
    delete process.env.NEXT_PUBLIC_ENABLE_LOGGING;
    mod = await import("./env");
    expect(mod.config.enableLogging).toBe(false);
  });

  it("exposes the configured TMDB and custom API base URLs", async () => {
    (process.env as Record<string, string>).NODE_ENV = "test";
    process.env.NEXT_PUBLIC_TMDB_API_KEY = "tmdb-key";
    process.env.NEXT_PUBLIC_CUSTOM_API_URL = "https://api.example";
    process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL = "https://cdn.example";
    const { config } = await import("./env");
    expect(config.tmdb).toEqual({
      apiKey: "tmdb-key",
      baseUrl: "https://api.themoviedb.org/3",
    });
    expect(config.customApi).toEqual({
      baseUrl: "https://api.example",
      imageBaseUrl: "https://cdn.example",
    });
  });
});
