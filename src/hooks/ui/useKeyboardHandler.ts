import { useCallback } from "react";

export const useKeyboardHandler = () => {
  return useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  }, []);
};
