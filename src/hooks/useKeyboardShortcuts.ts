import { useEffect } from "react";
import { KEYBOARD_SHORTCUTS, VIDEO_CONTROLS } from "@/constants/video";

interface KeyboardShortcutsProps {
  isPlaying: boolean;
  volume: number;
  onPlayPause: () => void;
  onForward: () => void;
  onBackward: () => void;
  onVolumeUp: () => void;
  onVolumeDown: () => void;
  onToggleFullscreen: () => void;
  onEscape: () => void;
  onTriggerFeedback: (control: string) => void;
}

export function useKeyboardShortcuts({
  isPlaying,
  volume,
  onPlayPause,
  onForward,
  onBackward,
  onVolumeUp,
  onVolumeDown,
  onToggleFullscreen,
  onEscape,
  onTriggerFeedback,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcuts = [
        KEYBOARD_SHORTCUTS.PLAY_PAUSE,
        KEYBOARD_SHORTCUTS.VOLUME_UP,
        KEYBOARD_SHORTCUTS.VOLUME_DOWN,
        KEYBOARD_SHORTCUTS.SEEK_BACKWARD,
        KEYBOARD_SHORTCUTS.SEEK_FORWARD,
        KEYBOARD_SHORTCUTS.FULLSCREEN,
        "F",
        KEYBOARD_SHORTCUTS.ESCAPE,
      ];

      if (shortcuts.includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case KEYBOARD_SHORTCUTS.PLAY_PAUSE:
          onTriggerFeedback("play");
          onPlayPause();
          break;

        case KEYBOARD_SHORTCUTS.SEEK_BACKWARD:
          onTriggerFeedback("backward");
          onBackward();
          break;

        case KEYBOARD_SHORTCUTS.SEEK_FORWARD:
          onTriggerFeedback("forward");
          onForward();
          break;

        case KEYBOARD_SHORTCUTS.VOLUME_UP:
          onTriggerFeedback("volume");
          onVolumeUp();
          break;

        case KEYBOARD_SHORTCUTS.VOLUME_DOWN:
          onTriggerFeedback("volume");
          onVolumeDown();
          break;

        case KEYBOARD_SHORTCUTS.FULLSCREEN:
        case "F":
          onTriggerFeedback("fullscreen");
          onToggleFullscreen();
          break;

        case KEYBOARD_SHORTCUTS.ESCAPE:
          onEscape();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isPlaying,
    volume,
    onPlayPause,
    onForward,
    onBackward,
    onVolumeUp,
    onVolumeDown,
    onToggleFullscreen,
    onEscape,
    onTriggerFeedback,
  ]);
}
