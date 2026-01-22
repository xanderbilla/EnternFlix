import { useCallback } from "react";

/**
 * Custom hook for handling keyboard events (Enter and Space)
 * Follows accessibility best practices for interactive elements
 *
 * @returns Memoized keyboard event handler
 */
export const useKeyboardHandler = () => {
  return useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  }, []);
};
