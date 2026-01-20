"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SeasonDetails } from "./SeasonDetails";
import { EpisodesGrid } from "./EpisodesGrid";
import TabNavigation from "./TabNavigation";
import { useTabScroll } from "@/hooks/ui/useTabScroll";

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
  const [isLoading, setIsLoading] = useState(true);

  const {
    activeTab,
    setActiveTab,
    showLeftScroll,
    showRightScroll,
    seasonsData,
    handleScroll,
    scroll,
  } = useTabScroll({ numberOfSeasons: data.number_of_seasons });

  const handlePlaySeason = () => {
    router.push(`/watch/${data.id}/season/${activeTab}/episode/1`);
  };

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
      <TabNavigation
        seasons={seasonsData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showLeftScroll={showLeftScroll}
        showRightScroll={showRightScroll}
        onScroll={handleScroll}
        onScrollLeft={() => scroll("left")}
        onScrollRight={() => scroll("right")}
      />

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
            ),
        )}
      </div>
    </div>
  );
}
