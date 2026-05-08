import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

function createHandlers() {
  return {
    onPlayPause: vi.fn(),
    onForward: vi.fn(),
    onBackward: vi.fn(),
    onVolumeUp: vi.fn(),
    onVolumeDown: vi.fn(),
    onToggleFullscreen: vi.fn(),
    onEscape: vi.fn(),
    onTriggerFeedback: vi.fn(),
  };
}

function dispatch(key: string) {
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));
}

describe("useKeyboardShortcuts", () => {
  it("calls onPlayPause and feedback for the spacebar", () => {
    const handlers = createHandlers();
    renderHook(() =>
      useKeyboardShortcuts({ isPlaying: true, volume: 0.5, ...handlers }),
    );
    dispatch(" ");
    expect(handlers.onPlayPause).toHaveBeenCalledTimes(1);
    expect(handlers.onTriggerFeedback).toHaveBeenCalledWith("play");
  });

  it("maps arrow keys to seek and volume callbacks", () => {
    const handlers = createHandlers();
    renderHook(() =>
      useKeyboardShortcuts({ isPlaying: true, volume: 0.5, ...handlers }),
    );
    dispatch("ArrowRight");
    dispatch("ArrowLeft");
    dispatch("ArrowUp");
    dispatch("ArrowDown");
    expect(handlers.onForward).toHaveBeenCalledTimes(1);
    expect(handlers.onBackward).toHaveBeenCalledTimes(1);
    expect(handlers.onVolumeUp).toHaveBeenCalledTimes(1);
    expect(handlers.onVolumeDown).toHaveBeenCalledTimes(1);
  });

  it("toggles fullscreen for both 'f' and 'F'", () => {
    const handlers = createHandlers();
    renderHook(() =>
      useKeyboardShortcuts({ isPlaying: true, volume: 0.5, ...handlers }),
    );
    dispatch("f");
    dispatch("F");
    expect(handlers.onToggleFullscreen).toHaveBeenCalledTimes(2);
  });

  it("calls onEscape for the Escape key", () => {
    const handlers = createHandlers();
    renderHook(() =>
      useKeyboardShortcuts({ isPlaying: true, volume: 0.5, ...handlers }),
    );
    dispatch("Escape");
    expect(handlers.onEscape).toHaveBeenCalledTimes(1);
  });

  it("ignores unrelated keys", () => {
    const handlers = createHandlers();
    renderHook(() =>
      useKeyboardShortcuts({ isPlaying: true, volume: 0.5, ...handlers }),
    );
    dispatch("a");
    dispatch("Enter");
    expect(handlers.onPlayPause).not.toHaveBeenCalled();
    expect(handlers.onEscape).not.toHaveBeenCalled();
    expect(handlers.onTriggerFeedback).not.toHaveBeenCalled();
  });

  it("removes its keydown listener on unmount", () => {
    const handlers = createHandlers();
    const { unmount } = renderHook(() =>
      useKeyboardShortcuts({ isPlaying: true, volume: 0.5, ...handlers }),
    );
    unmount();
    dispatch(" ");
    expect(handlers.onPlayPause).not.toHaveBeenCalled();
  });
});
