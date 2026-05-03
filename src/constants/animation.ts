export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

export const ANIMATION_EASING = {
  EASE_IN: "ease-in",
  EASE_OUT: "ease-out",
  EASE_IN_OUT: "ease-in-out",
  LINEAR: "linear",
} as const;

export const TRANSITION_CLASSES = {
  OPACITY: "transition-opacity duration-300",
  TRANSFORM: "transition-transform duration-200 ease-in-out",
  ALL: "transition-all duration-300",
} as const;
