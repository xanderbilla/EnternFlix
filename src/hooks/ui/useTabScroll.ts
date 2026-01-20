"use client";

import { useState, useRef, useEffect } from "react";

interface UseTabScrollProps {
  numberOfSeasons: number;
}

export function useTabScroll({ numberOfSeasons }: UseTabScrollProps) {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const seasonsData = Array.from({ length: numberOfSeasons }, (_, i) => ({
    id: i + 1,
    title: `Season ${i + 1}`,
    content: `Tab ${i + 1}`,
  }));

  const checkScrollButtons = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      const hasScroll = scrollWidth > clientWidth;
      setShowLeftScroll(hasScroll && scrollLeft > 0);
      setShowRightScroll(
        hasScroll && scrollLeft < scrollWidth - clientWidth - 10,
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  const handleScroll = () => {
    checkScrollButtons();
  };

  const scroll = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        tabsRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      tabsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return {
    activeTab,
    setActiveTab,
    showLeftScroll,
    showRightScroll,
    seasonsData,
    handleScroll,
    scroll,
    tabsRef,
  };
}
