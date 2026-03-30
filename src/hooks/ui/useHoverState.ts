import { useState, useCallback } from "react";

/**
 * Custom hook for managing hover state with side effects
 * Provides clean interface for hover enter/leave handlers
 *
 * @param onHoverEnter - Optional callback when hover starts
 * @param onHoverLeave - Optional callback when hover ends
 * @returns Hover state and handlers
 */
export function useHoverState(
  onHoverEnter?: () => void,
  onHoverLeave?: () => void,
) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHoverEnter?.();
  }, [onHoverEnter]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHoverLeave?.();
  }, [onHoverLeave]);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}
