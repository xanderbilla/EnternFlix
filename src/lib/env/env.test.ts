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
    process.env.NEXT_PUBLIC_CUSTOM_API_URL = "https://api";
    process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL = "https://cdn";
    const { config } = await import("./env");
    expect(config.isTest).toBe(true);
    expect(config.isProd).toBe(false);
    expect(config.isDev).toBe(false);
  });

  it("parses logLevel from NEXT_PUBLIC_LOG_LEVEL", async () => {
    (process.env as Record<string, string>).NODE_ENV = "production";
    process.env.NEXT_PUBLIC_LOG_LEVEL = "warn";
    process.env.NEXT_PUBLIC_CUSTOM_API_URL = "https://api";
    process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL = "https://cdn";
    let mod = await import("./env");
    expect(mod.config.logLevel).toBe("warn");

    vi.resetModules();
    process.env.NEXT_PUBLIC_LOG_LEVEL = "debug";
    mod = await import("./env");
    expect(mod.config.logLevel).toBe("debug");

    vi.resetModules();
    delete process.env.NEXT_PUBLIC_LOG_LEVEL;
    mod = await import("./env");
    // production default when unset is "error"
    expect(mod.config.logLevel).toBe("error");
  });

  it("exposes the configured custom API base URLs", async () => {
    (process.env as Record<string, string>).NODE_ENV = "test";
    process.env.NEXT_PUBLIC_CUSTOM_API_URL = "https://api.example";
    process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL = "https://cdn.example";
    const { config } = await import("./env");
    expect(config.customApi).toEqual({
      baseUrl: "https://api.example",
      imageBaseUrl: "https://cdn.example",
    });
  });
});
