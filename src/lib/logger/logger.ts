import { config } from "@/lib/env/env";

type Level = "debug" | "info" | "warn" | "error";

const LEVEL_RANK: Record<Level | "off", number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  off: 4,
};

function emit(level: Level, args: unknown[]): void {
  if (LEVEL_RANK[level] < LEVEL_RANK[config.logLevel]) return;
  console[level](...args);
}

export const logger = {
  debug: (...args: unknown[]) => emit("debug", args),
  info: (...args: unknown[]) => emit("info", args),
  warn: (...args: unknown[]) => emit("warn", args),
  error: (...args: unknown[]) => emit("error", args),
};
