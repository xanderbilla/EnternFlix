"use client";

import { useRef, useEffect } from "react";
import Icon from "@/components/Icon/Icon";

interface Season {
  id: number;
  title: string;
}

interface Props {
  seasons: Season[];
  activeTab: number;
  onTabChange: (id: number) => void;
  showLeftScroll: boolean;
  showRightScroll: boolean;
  onScroll: () => void;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export default function TabNavigation({
  seasons,
  activeTab,
  onTabChange,
  showLeftScroll,
  showRightScroll,
  onScroll,
  onScrollLeft,
  onScrollRight,
}: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {showLeftScroll && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-0 bg-gradient-to-r from-zinc-900/80 via-zinc-900/40 to-transparent" />
          <button
            onClick={onScrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 transition-all duration-300 bg-zinc-900/80 rounded-full"
            aria-label="Scroll seasons left"
          >
            <Icon
              name="arrowBack"
              size={24}
              className="text-zinc-400 hover:text-white"
            />
          </button>
        </>
      )}
      {showRightScroll && (
        <>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-0 bg-gradient-to-l from-zinc-900/80 via-zinc-900/40 to-transparent" />
          <button
            onClick={onScrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 transition-all duration-300 bg-zinc-900/80 rounded-full"
            aria-label="Scroll seasons right"
          >
            <Icon
              name="arrowForward"
              size={24}
              className="text-zinc-400 hover:text-white"
            />
          </button>
        </>
      )}
      <div
        ref={tabsRef}
        onScroll={onScroll}
        className="tabs flex space-x-10 overflow-x-auto no-scrollbar relative"
      >
        {seasons.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-4 pt-1 text-base font-medium transition-all duration-300 relative whitespace-nowrap ${
              activeTab === tab.id
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.title}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
            )}
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-800" />
    </div>
  );
}
