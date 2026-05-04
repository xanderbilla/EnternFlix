import { useState, useCallback } from "react";

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
