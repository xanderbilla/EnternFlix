/**
 * Centralized, validated runtime configuration.
 *
 * Rules:
 * - This is the ONLY module allowed to read `process.env.*` in app code.
 * - Required vars are validated on first load — fail-fast on the server, warn
 *   in the browser so a single missing key does not crash the app shell.
 * - Only `NEXT_PUBLIC_*` values are inlined into the client bundle. Never put
 *   secrets behind that prefix.
 * - `NEXT_PUBLIC_*` values MUST be accessed via literal dot-notation
 *   (e.g. `process.env.NEXT_PUBLIC_FOO`) so Next.js can statically replace
 *   them at build time. Dynamic `process.env[name]` bracket access resolves
 *   to `undefined` in the browser. The validators below therefore receive
 *   pre-evaluated values plus a name (for error messages only).
 */

type AppEnv = "development" | "test" | "production";
type LogLevel = "debug" | "info" | "warn" | "error" | "off";

interface AppConfig {
  appEnv: AppEnv;
  isProd: boolean;
  isDev: boolean;
  isTest: boolean;
  logLevel: LogLevel;
  app: {
    // CI-injected build version, e.g. "v1.4.2". Empty string in local dev.
    version: string;
    // Deployment environment label ("dev" | "prod" | "").
    deployEnv: string;
  };
  http: {
    timeoutMs: number;
  };
  customApi: {
    baseUrl: string;
    imageBaseUrl: string;
  };
  images: {
    extraHosts: string[];
  };
}

function requireValue(name: string, value: string | undefined): string {
  if (value && value.length > 0) return value;
  const message = `[config] Missing required environment variable: ${name}`;
  if (typeof window === "undefined") {
    throw new Error(message);
  }
  console.error(message);
  return "";
}

function withDefault(value: string | undefined, fallback: string): string {
  return value && value.length > 0 ? value : fallback;
}

function parseInteger(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const VALID_LOG_LEVELS: LogLevel[] = ["debug", "info", "warn", "error", "off"];

function parseLogLevel(
  value: string | undefined,
  fallback: LogLevel,
): LogLevel {
  if (value && (VALID_LOG_LEVELS as string[]).includes(value)) {
    return value as LogLevel;
  }
  return fallback;
}

const nodeEnv = (process.env.NODE_ENV ?? "development") as AppEnv;

export const config: AppConfig = {
  appEnv: nodeEnv,
  isProd: nodeEnv === "production",
  isDev: nodeEnv === "development",
  isTest: nodeEnv === "test",
  logLevel: parseLogLevel(
    process.env.NEXT_PUBLIC_LOG_LEVEL,
    nodeEnv === "production" ? "error" : "debug",
  ),
  app: {
    version: withDefault(process.env.NEXT_PUBLIC_APP_VERSION, ""),
    deployEnv: withDefault(process.env.NEXT_PUBLIC_APP_ENV, ""),
  },
  http: {
    // Axios per-request timeout, in milliseconds.
    timeoutMs: parseInteger(process.env.NEXT_PUBLIC_HTTP_TIMEOUT_MS, 10_000),
  },
  customApi: {
    // Primary backend — application is non-functional without these.
    baseUrl: requireValue(
      "NEXT_PUBLIC_CUSTOM_API_URL",
      process.env.NEXT_PUBLIC_CUSTOM_API_URL,
    ),
    imageBaseUrl: requireValue(
      "NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL",
      process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL,
    ),
  },
  images: {
    // Comma-separated extra hostnames allowed by `next/image`.
    extraHosts: parseList(process.env.NEXT_PUBLIC_IMAGE_HOSTS),
  },
};

export type { AppConfig, AppEnv, LogLevel };
