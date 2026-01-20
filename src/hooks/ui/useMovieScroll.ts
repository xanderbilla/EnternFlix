import { useCallback } from "react";

export const useMovieScroll = (
  scrollRef: React.RefObject<HTMLDivElement | null>,
  checkScrollButtons: () => void,
) => {
  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (scrollRef.current) {
        const { current } = scrollRef;

        // Get card width based on screen size
        let cardWidth = 160; // Default mobile width
        if (window.innerWidth >= 1024) {
          cardWidth = 240; // lg breakpoint
        } else if (window.innerWidth >= 768) {
          cardWidth = 200; // md breakpoint
        }

        // Calculate width of 3 cards plus gaps
        const gapWidth = 8; // gap-2 equals 8px
        const scrollAmount = (cardWidth + gapWidth) * 3;

        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });

        // Update button visibility after scroll animation
        setTimeout(checkScrollButtons, 400);
      }
    },
    [scrollRef, checkScrollButtons],
  );

  return { scroll };
};
