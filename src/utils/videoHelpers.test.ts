import { describe, it, expect, vi } from "vitest";
import {
  formatTime,
  parseVTT,
  parseVTTTimestamp,
  getCurrentSubtitle,
  constructVideoUrl,
  isHLSSupported,
  clampVolume,
} from "./videoHelpers";

vi.mock("@/lib/env/env", () => ({
  config: {
    customApi: {
      imageBaseUrl: "https://cdn.test.local/",
    },
  },
}));

describe("videoHelpers", () => {
  describe("formatTime", () => {
    it("formats seconds as m:ss", () => {
      expect(formatTime(0)).toBe("0:00");
      expect(formatTime(5)).toBe("0:05");
      expect(formatTime(65)).toBe("1:05");
      expect(formatTime(600)).toBe("10:00");
    });

    it("returns 0:00 for invalid values", () => {
      expect(formatTime(NaN)).toBe("0:00");
      expect(formatTime(-1)).toBe("0:00");
      expect(formatTime(Infinity)).toBe("0:00");
    });
  });

  describe("parseVTTTimestamp", () => {
    it("parses HH:MM:SS.ms timestamps to seconds", () => {
      expect(parseVTTTimestamp("00:00:05.000")).toBe(5);
      expect(parseVTTTimestamp("00:01:30.500")).toBe(90.5);
      expect(parseVTTTimestamp("01:00:00.000")).toBe(3600);
    });

    it("accepts comma decimal separators", () => {
      expect(parseVTTTimestamp("00:00:01,250")).toBe(1.25);
    });

    it("returns 0 for unsupported formats", () => {
      expect(parseVTTTimestamp("01:30")).toBe(0);
    });
  });

  describe("parseVTT", () => {
    it("extracts cues with timing and text", () => {
      const vtt = [
        "WEBVTT",
        "",
        "00:00:00.000 --> 00:00:02.000",
        "Hello",
        "",
        "00:00:03.000 --> 00:00:05.000",
        "World",
        "line two",
      ].join("\n");

      const cues = parseVTT(vtt);
      expect(cues).toHaveLength(2);
      expect(cues[0]).toEqual({ start: 0, end: 2, text: "Hello" });
      expect(cues[1]).toEqual({ start: 3, end: 5, text: "World\nline two" });
    });

    it("returns an empty array when no cues exist", () => {
      expect(parseVTT("WEBVTT\n\n")).toEqual([]);
    });
  });

  describe("getCurrentSubtitle", () => {
    const cues = [
      { start: 0, end: 2, text: "first" },
      { start: 3, end: 5, text: "second" },
    ];

    it("returns the cue text containing the current time", () => {
      expect(getCurrentSubtitle(cues, 1)).toBe("first");
      expect(getCurrentSubtitle(cues, 4)).toBe("second");
    });

    it("returns empty string when no cue matches", () => {
      expect(getCurrentSubtitle(cues, 10)).toBe("");
    });
  });

  describe("constructVideoUrl", () => {
    it("returns absolute http(s) urls unchanged", () => {
      expect(constructVideoUrl("https://example.com/v.m3u8")).toBe(
        "https://example.com/v.m3u8",
      );
      expect(constructVideoUrl("http://example.com/v.m3u8")).toBe(
        "http://example.com/v.m3u8",
      );
    });

    it("returns empty string for empty input", () => {
      expect(constructVideoUrl("")).toBe("");
    });

    it("joins relative paths against the explicit base", () => {
      expect(constructVideoUrl("clip.m3u8", "https://media.example/")).toBe(
        "https://media.example/clip.m3u8",
      );
      expect(constructVideoUrl("/clip.m3u8", "https://media.example")).toBe(
        "https://media.example/clip.m3u8",
      );
    });

    it("falls back to the configured image base url", () => {
      expect(constructVideoUrl("a.m3u8")).toBe("https://cdn.test.local/a.m3u8");
    });
  });

  describe("isHLSSupported", () => {
    it("returns true when the video element advertises HLS support", () => {
      const original = HTMLMediaElement.prototype.canPlayType;
      HTMLMediaElement.prototype.canPlayType = () => "probably";
      try {
        expect(isHLSSupported()).toBe(true);
      } finally {
        HTMLMediaElement.prototype.canPlayType = original;
      }
    });

    it("returns false when the video element does not support HLS", () => {
      const original = HTMLMediaElement.prototype.canPlayType;
      HTMLMediaElement.prototype.canPlayType = () => "";
      try {
        expect(isHLSSupported()).toBe(false);
      } finally {
        HTMLMediaElement.prototype.canPlayType = original;
      }
    });
  });

  describe("clampVolume", () => {
    it("clamps to the [0, 1] range", () => {
      expect(clampVolume(0.5)).toBe(0.5);
      expect(clampVolume(-0.1)).toBe(0);
      expect(clampVolume(2)).toBe(1);
    });
  });
});
