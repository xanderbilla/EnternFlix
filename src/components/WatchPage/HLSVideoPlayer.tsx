import { useEffect, useRef, forwardRef } from "react";
import Hls from "hls.js";
import { HLS_CONFIG } from "@/constants/video";
import { constructVideoUrl } from "@/utils/videoHelpers";

interface HLSVideoPlayerProps {
  masterPlaylistUrl: string;
  showVideo: boolean;
  onManifestParsed: () => void;
  onError: (error: string) => void;
  onPlay: () => void;
  onPause: () => void;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  onVideoClick: () => void;
}

const HLSVideoPlayer = forwardRef<HTMLVideoElement, HLSVideoPlayerProps>(
  (
    {
      masterPlaylistUrl,
      showVideo,
      onManifestParsed,
      onError,
      onPlay,
      onPause,
      onTimeUpdate,
      onDurationChange,
      onVideoClick,
    },
    ref,
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    // Stash the latest callbacks in a ref so the HLS init effect can call
    // them without depending on their (often unstable) identity. This avoids
    // tearing down and re-initialising the HLS pipeline whenever a parent
    // recreates an event handler.
    const callbacksRef = useRef({
      onManifestParsed,
      onError,
      onPlay,
      onPause,
      onTimeUpdate,
      onDurationChange,
    });
    useEffect(() => {
      callbacksRef.current = {
        onManifestParsed,
        onError,
        onPlay,
        onPause,
        onTimeUpdate,
        onDurationChange,
      };
    });

    useEffect(() => {
      if (ref && videoRef.current) {
        if (typeof ref === "function") {
          ref(videoRef.current);
        } else {
          ref.current = videoRef.current;
        }
      }
    }, [ref]);

    useEffect(() => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      const videoUrl = constructVideoUrl(masterPlaylistUrl);
      const cb = callbacksRef;

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: HLS_CONFIG.ENABLE_WORKER,
          lowLatencyMode: HLS_CONFIG.LOW_LATENCY_MODE,
          backBufferLength: HLS_CONFIG.BACK_BUFFER_LENGTH,
        });

        hlsRef.current = hls;
        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          cb.current.onManifestParsed();
          // Don't autoplay - let user click to play
          // Browsers block autoplay without user interaction
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                cb.current.onError("Network error - failed to load video");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                cb.current.onError("Media error - trying to recover");
                hls.recoverMediaError();
                break;
              default:
                cb.current.onError("Fatal error - cannot play video");
                hls.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
        video.addEventListener("loadedmetadata", () => {
          cb.current.onManifestParsed();
          // Don't autoplay - let user click to play
        });
      } else {
        cb.current.onError("HLS is not supported in this browser");
      }

      const handleTimeUpdate = () => cb.current.onTimeUpdate(video.currentTime);
      const handleDurationChange = () =>
        cb.current.onDurationChange(video.duration);
      const handlePlay = () => cb.current.onPlay();
      const handlePause = () => cb.current.onPause();

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("durationchange", handleDurationChange);
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("durationchange", handleDurationChange);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);

        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }, [masterPlaylistUrl]);

    return (
      <video
        ref={videoRef}
        className={`w-full h-full object-contain transition-opacity duration-700 ${
          showVideo ? "opacity-100" : "opacity-0"
        }`}
        playsInline
        onClick={onVideoClick}
        aria-label="Video player"
      />
    );
  },
);

HLSVideoPlayer.displayName = "HLSVideoPlayer";

export default HLSVideoPlayer;
