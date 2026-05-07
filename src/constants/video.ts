export const VIDEO_CONTROLS = {
  SEEK_FORWARD: 10,
  SEEK_BACKWARD: 10,
  VOLUME_STEP: 0.1,
  CONTROLS_HIDE_DELAY: 3000,
  CONTROL_FEEDBACK_DURATION: 300, // milliseconds
} as const;

export const HLS_CONFIG = {
  ENABLE_WORKER: true,
  LOW_LATENCY_MODE: false,
  BACK_BUFFER_LENGTH: 90,
} as const;

export const KEYBOARD_SHORTCUTS = {
  PLAY_PAUSE: " ",
  SEEK_FORWARD: "ArrowRight",
  SEEK_BACKWARD: "ArrowLeft",
  VOLUME_UP: "ArrowUp",
  VOLUME_DOWN: "ArrowDown",
  FULLSCREEN: "f",
  ESCAPE: "Escape",
  MUTE: "m",
} as const;
