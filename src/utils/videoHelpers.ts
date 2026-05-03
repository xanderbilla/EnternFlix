import { SubtitleCue } from "@/types/video";
import { config } from "@/lib/env/env";

export function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function parseVTT(vttText: string): SubtitleCue[] {
  const cues: SubtitleCue[] = [];
  const lines = vttText.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.includes("-->")) {
      const [startStr, endStr] = line.split("-->").map((s) => s.trim());
      const start = parseVTTTimestamp(startStr);
      const end = parseVTTTimestamp(endStr);

      i++;
      let text = "";
      while (i < lines.length && lines[i].trim() !== "") {
        text += (text ? "\n" : "") + lines[i].trim();
        i++;
      }

      if (text) {
        cues.push({ start, end, text });
      }
    }
    i++;
  }

  return cues;
}

export function parseVTTTimestamp(timestamp: string): number {
  const parts = timestamp.split(":");
  if (parts.length === 3) {
    const hours = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]);
    const seconds = parseFloat(parts[2].replace(",", "."));
    return hours * 3600 + minutes * 60 + seconds;
  }
  return 0;
}

export function getCurrentSubtitle(
  cues: SubtitleCue[],
  currentTime: number,
): string {
  const currentCue = cues.find(
    (cue) => currentTime >= cue.start && currentTime <= cue.end,
  );
  return currentCue ? currentCue.text : "";
}

export function constructVideoUrl(basePath: string, baseUrl?: string): string {
  const url = baseUrl || config.customApi.imageBaseUrl;
  const path = basePath.startsWith("/") ? basePath.substring(1) : basePath;
  return `${url}${path}`;
}

export function isHLSSupported(): boolean {
  if (typeof window === "undefined") return false;

  const video = document.createElement("video");
  return video.canPlayType("application/vnd.apple.mpegurl") !== "";
}

export function clampVolume(volume: number): number {
  return Math.max(0, Math.min(1, volume));
}
