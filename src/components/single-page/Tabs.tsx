"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { SeasonDetails } from "./SeasonDetails";
import { EpisodesGrid } from "./EpisodesGrid";
import { TabsSkeleton } from "../Skeleton/TabsSkeleton";

type Props = {
  data: {
    id: number;
    number_of_seasons: number;
    seasons?: Array<{
      id: number;
      season_number: number;
      name: string;
      overview: string;
      air_date: string;
      episode_count: number;
      poster_path: string;
    }>;
  };
};

export default function Tabs({ data }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handlePlaySeason = () => {
    router.push(`/watch/${data.id}/season/${activeTab}/episode/1`);
  };

  // Generate seasons data
  const seasonsData = Array.from(
    { length: data.number_of_seasons },
    (_, i) => ({
      id: i + 1,
      title: `Season ${i + 1}`,
      content: `Tab ${i + 1}`,
    })
  );

  const checkScrollButtons = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      const hasScroll = scrollWidth > clientWidth;
      setShowLeftScroll(hasScroll && scrollLeft > 0);
      setShowRightScroll(
        hasScroll && scrollLeft < scrollWidth - clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
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

  if (isLoading) {
    return <TabsSkeleton />;
  }

  return (
    <div className="px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
      <div className="relative">
        {showLeftScroll && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-0 bg-gradient-to-r from-zinc-900/80 via-zinc-900/40 to-transparent" />
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 transition-all duration-300 bg-zinc-900/80 rounded-full"
              aria-label="Scroll seasons left"
            >
              <IoIosArrowBack className="text-zinc-400 hover:text-white text-2xl" />
            </button>
          </>
        )}
        {showRightScroll && (
          <>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-0 bg-gradient-to-l from-zinc-900/80 via-zinc-900/40 to-transparent" />
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 transition-all duration-300 bg-zinc-900/80 rounded-full"
              aria-label="Scroll seasons right"
            >
              <IoIosArrowForward className="text-zinc-400 hover:text-white text-2xl" />
            </button>
          </>
        )}
        <div
          ref={tabsRef}
          onScroll={handleScroll}
          className="tabs flex space-x-10 overflow-x-auto no-scrollbar relative"
        >
          {seasonsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

      <div className="tab-content mt-6 sm:mt-8 md:mt-10">
        {seasonsData.map(
          (tab) =>
            tab.id === activeTab && (
              <div key={tab.id}>
                <SeasonDetails
                  seasonData={
                    data.seasons?.[tab.id - 1] ?? {
                      id: tab.id,
                      season_number: tab.id,
                      name: `Season ${tab.id}`,
                      overview: "",
                      air_date: "",
                      episode_count: 0,
                      poster_path: "",
                    }
                  }
                  onPlaySeason={handlePlaySeason}
                />
                <EpisodesGrid
                  seasonNumber={tab.id}
                  seasonName={
                    data.seasons?.[tab.id - 1]?.name ?? `Season ${tab.id}`
                  }
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
