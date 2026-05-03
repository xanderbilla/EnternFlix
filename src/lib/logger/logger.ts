import { config } from "@/lib/env/env";

type Level = "debug" | "info" | "warn" | "error";

function emit(level: Level, args: unknown[]): void {
  if (!config.enableLogging && level !== "error") return;
  console[level](...args);
}

export const logger = {
  debug: (...args: unknown[]) => emit("debug", args),
  info: (...args: unknown[]) => emit("info", args),
  warn: (...args: unknown[]) => emit("warn", args),
  error: (...args: unknown[]) => emit("error", args),
};
