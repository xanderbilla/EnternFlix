import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  debounce,
  throttle,
  sleep,
  isClient,
  isServer,
  safeJsonParse,
  generateId,
  clamp,
} from "./common";

describe("common utils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("debounce", () => {
    it("invokes the callback only after the wait elapses", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced();
      debounced();
      debounced();
      expect(fn).not.toHaveBeenCalled();
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("passes the latest arguments through", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 50);
      debounced("a");
      debounced("b");
      vi.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledWith("b");
    });
  });

  describe("throttle", () => {
    it("invokes the callback at most once within the window", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);
      throttled();
      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(100);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe("sleep", () => {
    it("resolves after the requested delay", async () => {
      const promise = sleep(200);
      vi.advanceTimersByTime(200);
      await expect(promise).resolves.toBeUndefined();
    });
  });

  describe("isClient / isServer", () => {
    it("reports client environment when window exists", () => {
      expect(isClient()).toBe(true);
      expect(isServer()).toBe(false);
    });
  });

  describe("safeJsonParse", () => {
    it("parses valid JSON", () => {
      expect(safeJsonParse('{"a":1}', { a: 0 })).toEqual({ a: 1 });
    });

    it("returns the fallback on invalid JSON", () => {
      expect(safeJsonParse("not-json", { ok: true })).toEqual({ ok: true });
    });
  });

  describe("generateId", () => {
    it("returns non-empty unique-looking ids", () => {
      vi.useRealTimers();
      const a = generateId();
      const b = generateId();
      expect(a).toMatch(/^\d+-[a-z0-9]+$/);
      expect(a).not.toBe(b);
    });
  });

  describe("clamp", () => {
    it("clamps within bounds", () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-1, 0, 10)).toBe(0);
      expect(clamp(99, 0, 10)).toBe(10);
    });
  });
});
