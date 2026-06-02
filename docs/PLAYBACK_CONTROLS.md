# Playback Controls

This document describes the controls used by the watch player, how each control works, and when each control is visible.

## Scope

- Watch page player UI in `src/components/WatchPage/*`
- Keyboard shortcuts and control visibility hooks in `src/hooks/video/*`
- Timing constants in `src/constants/video.ts`

## Control Surfaces

The watch player has 4 control surfaces:

1. Top header controls (`VideoHeader.tsx`)
2. Bottom playback controls (`PlaybackControls.tsx`)
3. Pause overlay (`PausedOverlay.tsx`)
4. Subtitle overlay (`SubtitleDisplay.tsx`)

## Top Header Controls

Implemented in `src/components/WatchPage/VideoHeader.tsx`.

| Control | Action |
| --- | --- |
| Back button (left arrow) | Calls `onBack`, which navigates back from the watch page |
| Report button (flag icon) | Calls `onReport` (currently logs a playback issue) |

### Visibility

- Uses `showControls` prop.
- Visible when `showControls === true`.
- Hidden with fade-out when `showControls === false`.

## Bottom Playback Controls

Implemented in `src/components/WatchPage/PlaybackControls.tsx`.

### Timeline and Seek

| Control | Action |
| --- | --- |
| Progress bar click | Seeks to clicked position (`onSeek`) |
| Remaining time text | Shows `-(duration - currentTime)` formatted via `formatTime` |
| Slider keyboard controls | Left/Right: +/-10 seconds, Home: 0, End: duration |

### Transport Controls

| Control | Action |
| --- | --- |
| Play/Pause | Toggles playback (`onPlayPause`) |
| Rewind | Seeks backward 10 seconds (`onBackward`) |
| Forward | Seeks forward 10 seconds (`onForward`) |

### Audio Controls

Implemented by `src/components/WatchPage/VolumeControl.tsx`.

| Control | Action |
| --- | --- |
| Mute toggle button | Toggles muted/unmuted state (`onToggleMute`) |
| Volume slider | Sets explicit volume (`onVolumeChange`) |
| Volume icon states | Muted/0, low (<0.33), medium (<0.66), high (>=0.66) |

### Display Controls

| Control | Action |
| --- | --- |
| Fullscreen toggle | Calls `onToggleFullscreen` |
| Center title | Displays `title` when available |

### Visibility

- Entire bottom control strip uses `showControls`.
- Visible when `showControls === true`.
- Hidden with fade-out when `showControls === false`.

## Pause Overlay

Implemented in `src/components/WatchPage/PausedOverlay.tsx`.

### Behavior

- Full-screen clickable overlay shown when playback is paused and title metadata is available.
- Clicking the overlay resumes playback (`onPlay`).
- Displays title, overview, and cast when present.

### Visibility condition

In watch page composition (`WatchPageContent.tsx`):

- show overlay when `!isPlaying && playbackData?.info`

## Subtitle Overlay

Implemented in `src/components/WatchPage/SubtitleDisplay.tsx`.

### Behavior

- Shows active subtitle text only when a cue exists.
- Supports multi-line subtitles by splitting on newline characters.

### Visibility condition

- Hidden when subtitle string is empty.
- Visible when subtitle string is non-empty.

## Keyboard Shortcuts

Implemented in `src/hooks/video/useKeyboardShortcuts.ts`.

| Key | Action |
| --- | --- |
| Space | Play/Pause |
| ArrowLeft | Seek backward 10 seconds |
| ArrowRight | Seek forward 10 seconds |
| ArrowUp | Volume up (`+0.1`) |
| ArrowDown | Volume down (`-0.1`) |
| f or F | Toggle fullscreen |
| Escape | Exit fullscreen (if active) or navigate back |

Notes:

- Shortcut values come from `src/constants/video.ts` (`KEYBOARD_SHORTCUTS`).
- Shortcut handlers also trigger transient visual feedback state via `onTriggerFeedback`.

## Show/Hide Rules for Controls

Implemented in `src/hooks/video/useControlsVisibility.ts`.

### Rule summary

- Controls start visible.
- On mouse move/focus: controls become visible immediately.
- While playing, controls auto-hide after `VIDEO_CONTROLS.CONTROLS_HIDE_DELAY` (3000 ms).
- On mouse leave while playing: controls hide immediately.
- While paused: controls remain visible.

## Control Timing Constants

Defined in `src/constants/video.ts`.

| Constant | Value | Meaning |
| --- | --- | --- |
| `SEEK_FORWARD` | 10 | Seconds jumped on forward action |
| `SEEK_BACKWARD` | 10 | Seconds jumped on backward action |
| `VOLUME_STEP` | 0.1 | Volume step for keyboard up/down |
| `CONTROLS_HIDE_DELAY` | 3000 | Milliseconds before auto-hide while playing |
| `CONTROL_FEEDBACK_DURATION` | 300 | Milliseconds for active control feedback |

## Related Files

- `src/components/WatchPage/WatchPageContent.tsx`
- `src/components/WatchPage/PlaybackControls.tsx`
- `src/components/WatchPage/VolumeControl.tsx`
- `src/components/WatchPage/VideoHeader.tsx`
- `src/components/WatchPage/PausedOverlay.tsx`
- `src/components/WatchPage/SubtitleDisplay.tsx`
- `src/hooks/video/useControlsVisibility.ts`
- `src/hooks/video/useKeyboardShortcuts.ts`
- `src/constants/video.ts`
