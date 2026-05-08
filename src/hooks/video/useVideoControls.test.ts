import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useVideoControls } from "./useVideoControls";

interface MockVideo {
  paused: boolean;
  currentTime: number;
  volume: number;
  muted: boolean;
  play: ReturnType<typeof vi.fn>;
  pause: ReturnType<typeof vi.fn>;
}

function attachMockVideo(ref: { current: HTMLVideoElement | null }): MockVideo {
  const video: MockVideo = {
    paused: true,
    currentTime: 30,
    volume: 1,
    muted: false,
    play: vi.fn(function (this: MockVideo) {
      this.paused = false;
    }),
    pause: vi.fn(function (this: MockVideo) {
      this.paused = true;
    }),
  };
  ref.current = video as unknown as HTMLVideoElement;
  return video;
}

describe("useVideoControls", () => {
  let result: ReturnType<
    typeof renderHook<ReturnType<typeof useVideoControls>, void>
  >["result"];
  let video: MockVideo;

  beforeEach(() => {
    const hook = renderHook(() => useVideoControls());
    result = hook.result;
    video = attachMockVideo(result.current.videoRef);
  });

  it("exposes initial volume=1 and isMuted=false", () => {
    expect(result.current.volume).toBe(1);
    expect(result.current.isMuted).toBe(false);
  });

  it("plays when paused and pauses when playing", () => {
    act(() => result.current.handlePlayPause());
    expect(video.play).toHaveBeenCalledTimes(1);
    video.paused = false;
    act(() => result.current.handlePlayPause());
    expect(video.pause).toHaveBeenCalledTimes(1);
  });

  it("seeks to a specific time", () => {
    act(() => result.current.handleSeek(125));
    expect(video.currentTime).toBe(125);
  });

  it("forwards and rewinds by the configured step", () => {
    act(() => result.current.handleForward());
    expect(video.currentTime).toBe(40);
    act(() => result.current.handleBackward());
    expect(video.currentTime).toBe(30);
  });

  it("clamps volume between 0 and 1 and updates muted state", () => {
    act(() => result.current.handleVolumeChange(1.5));
    expect(result.current.volume).toBe(1);
    expect(video.volume).toBe(1);

    act(() => result.current.handleVolumeChange(-0.4));
    expect(result.current.volume).toBe(0);
    expect(result.current.isMuted).toBe(true);

    act(() => result.current.handleVolumeChange(0.3));
    expect(result.current.isMuted).toBe(false);
  });

  it("steps volume up and down", () => {
    act(() => result.current.handleVolumeChange(0.5));
    act(() => result.current.handleVolumeUp());
    expect(result.current.volume).toBeCloseTo(0.6, 5);
    act(() => result.current.handleVolumeDown());
    expect(result.current.volume).toBeCloseTo(0.5, 5);
  });

  it("toggles muted state", () => {
    act(() => result.current.toggleMute());
    expect(result.current.isMuted).toBe(true);
    expect(video.muted).toBe(true);
    act(() => result.current.toggleMute());
    expect(result.current.isMuted).toBe(false);
    expect(video.muted).toBe(false);
  });
});
