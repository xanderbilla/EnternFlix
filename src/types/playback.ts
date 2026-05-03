export interface AudioTrack {
  id: string;
  label: string;
  language: string;
  bitrate: string;
  default: boolean;
}

export interface SubtitleTrack {
  id: string;
  label: string;
  language: string;
  format: string;
  url: string;
  default: boolean;
}

export interface CastMember {
  id: string;
  name: string;
}

export interface PlaybackInfo {
  casts: CastMember[];
  overview: string;
  title: string;
}

export interface PlaybackData {
  contentId: string;
  contentType: "MOVIE" | "TV";
  info?: PlaybackInfo;
  playback: {
    durationSec: number;
    streaming: {
      type: string;
      masterPlaylist: string;
    };
    video: {
      qualities: string[];
      defaultQuality: string;
    };
    audio: {
      tracks: AudioTrack[];
      defaultTrackId: string;
    };
    subtitles: {
      tracks: SubtitleTrack[];
      defaultTrackId: string | null;
    };
    preview: {
      video: string;
    };
    thumbnails: {
      poster: string;
      items: string[];
    };
    sprite: {
      image: string;
      vtt: string;
    };
  };
}

export type PlaybackResponse = import("@/types/api").ApiResponse<PlaybackData>;
