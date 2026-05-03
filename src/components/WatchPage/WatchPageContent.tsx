"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlayback } from "@/hooks/api/usePlayback";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useSubtitles } from "@/hooks/useSubtitles";
import { useControlFeedback } from "@/hooks/useControlFeedback";
import { useControlsVisibility } from "@/hooks/useControlsVisibility";
import { useVideoControls } from "@/hooks/useVideoControls";
import { logger } from "@/lib/logger/logger";
import { useHLSPlayer } from "@/hooks/useHLSPlayer";
import { useFullscreen } from "@/hooks/useFullscreen";
import HLSVideoPlayer from "./HLSVideoPlayer";
import VideoHeader from "./VideoHeader";
import SubtitleDisplay from "./SubtitleDisplay";
import PlaybackControls from "./PlaybackControls";
import PausedOverlay from "./PausedOverlay";
import { LoadingState, ErrorState, ErrorPage } from "./VideoStates";
import VideoPlayerStyles from "./VideoPlayerStyles";

interface WatchPageContentProps {
  contentId: string;
  contentType: "movie" | "tv";
}

export default function WatchPageContent({
  contentId,
  contentType,
}: WatchPageContentProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { data: playbackData, isError } = usePlayback(
    contentType,
    contentId,
    true,
  );

  const { isLoading, error, showVideo, handleManifestParsed, handleError } =
    useHLSPlayer();
  const { isFullscreen, toggleFullscreen, exitFullscreen } =
    useFullscreen(containerRef);
  const {
    videoRef,
    volume,
    isMuted,
    handlePlayPause,
    handleSeek,
    handleForward,
    handleBackward,
    handleVolumeChange,
    handleVolumeUp,
    handleVolumeDown,
    toggleMute,
  } = useVideoControls();

  const { activeControl, triggerFeedback } = useControlFeedback();
  const { showControls, handleMouseMove, handleMouseLeave } =
    useControlsVisibility(isPlaying);
  const { currentSubtitle } = useSubtitles(
    playbackData?.playback.subtitles.tracks || [],
    playbackData?.playback.subtitles.defaultTrackId || null,
    currentTime,
  );

  useKeyboardShortcuts({
    isPlaying,
    volume,
    onPlayPause: handlePlayPause,
    onForward: handleForward,
    onBackward: handleBackward,
    onVolumeUp: handleVolumeUp,
    onVolumeDown: handleVolumeDown,
    onToggleFullscreen: toggleFullscreen,
    onEscape: () => {
      if (document.fullscreenElement) {
        exitFullscreen();
      } else {
        router.back();
      }
    },
    onTriggerFeedback: triggerFeedback,
  });

  if (isError) {
    return <ErrorPage onBack={() => router.back()} />;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <VideoPlayerStyles />

      {/* Loading State */}
      {isLoading && !error && <LoadingState />}

      {/* Error State */}
      {error && <ErrorState error={error} onBack={() => router.back()} />}

      {/* Paused Overlay */}
      {!isPlaying && playbackData?.info && (
        <PausedOverlay info={playbackData.info} onPlay={handlePlayPause} />
      )}

      {/* Video Header */}
      <VideoHeader
        showControls={showControls}
        onBack={() => router.back()}
        onReport={() => logger.info("Report playback issue")}
      />

      {/* Video Player */}
      {playbackData && (
        <HLSVideoPlayer
          ref={videoRef}
          masterPlaylistUrl={playbackData.playback.streaming.masterPlaylist}
          showVideo={showVideo}
          onManifestParsed={handleManifestParsed}
          onError={handleError}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={setCurrentTime}
          onDurationChange={setDuration}
          onVideoClick={handlePlayPause}
        />
      )}

      {/* Subtitle Display */}
      <SubtitleDisplay subtitle={currentSubtitle} />

      {/* Playback Controls */}
      <PlaybackControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        showControls={showControls}
        activeControl={activeControl}
        title={playbackData?.info?.title}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onForward={handleForward}
        onBackward={handleBackward}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
        onToggleFullscreen={toggleFullscreen}
        onTriggerFeedback={triggerFeedback}
      />
    </div>
  );
}
