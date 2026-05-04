import { useCallback } from "react";

export const useMovieScroll = (
  scrollRef: React.RefObject<HTMLDivElement | null>,
  checkScrollButtons: () => void,
) => {
  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (scrollRef.current) {
        const { current } = scrollRef;

        let cardWidth = 160;
        if (window.innerWidth >= 1024) {
          cardWidth = 240; // lg breakpoint
        } else if (window.innerWidth >= 768) {
          cardWidth = 200; // md breakpoint
        }

        const gapWidth = 8;
        const scrollAmount = (cardWidth + gapWidth) * 3;

        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });

        setTimeout(checkScrollButtons, 400);
      }
    },
    [scrollRef, checkScrollButtons],
  );

  return { scroll };
};
