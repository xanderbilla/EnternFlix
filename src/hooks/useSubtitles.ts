import { useState, useEffect } from "react";
import { SubtitleCue } from "@/types/video";
import { logger } from "@/lib/logger/logger";
import {
  parseVTT,
  getCurrentSubtitle,
  constructVideoUrl,
} from "@/utils/videoHelpers";
import { SubtitleTrack } from "@/types/playback";

export function useSubtitles(
  subtitleTracks: SubtitleTrack[],
  selectedTrackId: string | null,
  currentTime: number,
) {
  const [subtitleCues, setSubtitleCues] = useState<SubtitleCue[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");

  useEffect(() => {
    if (!selectedTrackId || selectedTrackId === "off") {
      if (subtitleCues.length > 0) {
        setSubtitleCues([]);
      }
      if (currentSubtitle !== "") {
        setCurrentSubtitle("");
      }
      return;
    }

    const track = subtitleTracks.find((t) => t.id === selectedTrackId);
    if (!track) return;

    const fullUrl = constructVideoUrl(track.url);

    fetch(fullUrl)
      .then((res) => res.text())
      .then((vttText) => {
        const cues = parseVTT(vttText);
        setSubtitleCues(cues);
      })
      .catch((err) => {
        logger.error("Failed to load subtitles:", err);
      });
    // Only depend on selectedTrackId to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrackId]);

  useEffect(() => {
    if (subtitleCues.length === 0) {
      if (currentSubtitle !== "") {
        setCurrentSubtitle("");
      }
      return;
    }

    const subtitle = getCurrentSubtitle(subtitleCues, currentTime);
    if (subtitle !== currentSubtitle) {
      setCurrentSubtitle(subtitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, subtitleCues]);

  return { currentSubtitle };
}
