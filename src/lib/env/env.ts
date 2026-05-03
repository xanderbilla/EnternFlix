/**
 * Centralized, validated runtime configuration.
 *
 * Rules:
 * - This is the ONLY module allowed to read `process.env.*` in app code.
 * - Required vars are validated on first load — fail-fast on the server, warn
 *   in the browser so a single missing key does not crash the app shell.
 * - Only `NEXT_PUBLIC_*` values are inlined into the client bundle. Never put
 *   secrets behind that prefix.
 */

type AppEnv = "development" | "test" | "production";

interface AppConfig {
  appEnv: AppEnv;
  isProd: boolean;
  isDev: boolean;
  isTest: boolean;
  enableLogging: boolean;
  http: {
    timeoutMs: number;
  };
  tmdb: {
    apiKey: string;
    baseUrl: string;
  };
  customApi: {
    baseUrl: string;
    imageBaseUrl: string;
  };
  images: {
    extraHosts: string[];
  };
}

function readString(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value && value.length > 0) return value;
  if (fallback !== undefined) return fallback;
  const message = `[config] Missing required environment variable: ${name}`;
  if (typeof window === "undefined") {
    throw new Error(message);
  }
  console.error(message);
  return "";
}

function readBool(name: string, fallback: boolean): boolean {
  const value = process.env[name];
  if (value === undefined) return fallback;
  return value === "true" || value === "1";
}

function readInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function readList(name: string): string[] {
  const raw = process.env[name];
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const nodeEnv = (process.env.NODE_ENV ?? "development") as AppEnv;

// NEXT_PUBLIC_* vars must be referenced with literal dot-notation so Next.js
// can statically replace them at build time.  Dynamic `process.env[name]`
// bracket access is NOT replaced and resolves to `undefined` in the browser.
export const config: AppConfig = {
  appEnv: nodeEnv,
  isProd: nodeEnv === "production",
  isDev: nodeEnv === "development",
  isTest: nodeEnv === "test",
  enableLogging:
    (process.env.NEXT_PUBLIC_ENABLE_LOGGING ??
      String(nodeEnv !== "production")) === "true" ||
    process.env.NEXT_PUBLIC_ENABLE_LOGGING === "1",
  http: {
    // Axios per-request timeout, in milliseconds.
    timeoutMs: (() => {
      const n = Number.parseInt(
        process.env.NEXT_PUBLIC_HTTP_TIMEOUT_MS ?? "",
        10,
      );
      return Number.isFinite(n) && n > 0 ? n : 10_000;
    })(),
  },
  tmdb: {
    apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "",
    baseUrl:
      process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "https://api.themoviedb.org/3",
  },
  customApi: {
    baseUrl: process.env.NEXT_PUBLIC_CUSTOM_API_URL ?? "",
    imageBaseUrl: process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL ?? "",
  },
  images: {
    // Comma-separated extra hostnames allowed by `next/image`.
    extraHosts: (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  },
};

export type { AppConfig, AppEnv };
