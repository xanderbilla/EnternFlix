"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BsPlayFill } from "react-icons/bs";

type Tab = {
  id: number;
  title: string;
  content: string;
};

type VideosData = {
  [key: number]: {
    id: number;
    title: string;
    duration: string;
    imageUrl: string;
  }[];
};

const tabsData: Tab[] = [
  { id: 1, title: "Season 1", content: "Tab 1" },
  { id: 2, title: "Season 2", content: "Tab 2" },
];

const videosData: VideosData = {
  1: [
    {
      id: 1,
      title: "Video 1",
      duration: "1:26:56",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 2,
      title: "Video 2",
      duration: "1:15:34",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 3,
      title: "Video 3",
      duration: "1:05:12",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 4,
      title: "Video 4",
      duration: "1:45:23",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 5,
      title: "Video 5",
      duration: "1:30:45",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
  ],
  2: [
    {
      id: 1,
      title: "Video 1",
      duration: "1:26:56",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 2,
      title: "Video 2",
      duration: "1:15:34",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 3,
      title: "Video 3",
      duration: "1:05:12",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
  ],
};

type Props = {};

export default function Tabs({}: Props) {
  const [activeTab, setActiveTab] = useState<number>(tabsData[0].id);

  const formatTime = (time: string): string => {
    const parts = time.split(":").map(Number);
    if (parts.length === 3) {
      return `${parts[0]}h ${parts[1]}m ${parts[2]}s`;
    } else if (parts.length === 2) {
      return `${parts[0]}m ${parts[1]}s`;
    } else {
      return time;
    }
  };

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8">
      <div className="tabs flex flex-wrap space-x-2 sm:space-x-4">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-base sm:text-lg md:text-xl w-24 sm:w-28 md:w-32 transition-all duration-300 ${
              activeTab === tab.id
                ? "border-b-2 border-zinc-500 font-semibold border-opacity-100"
                : "border-b-2 border-zinc-500 border-opacity-0"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content mt-4">
        {tabsData.map(
          (tab) =>
            tab.id === activeTab && (
              <div key={tab.id}>
                <p className="my-4 sm:my-6 md:my-8">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolores nisi modi, officiis a quo optio obcaecati at.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {videosData[tab.id].map((video) => (
                    <div
                      key={video.id}
                      className="h-auto bg-zinc-800 rounded-md overflow-hidden shadow-lg transform transition-transform"
                    >
                      <div className="relative group h-40 sm:h-48 md:h-56">
                        <Image
                          src={video.imageUrl}
                          alt={video.title}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <BsPlayFill className="rounded-full bg-white text-black text-2xl sm:text-3xl md:text-4xl h-8 w-8 sm:h-10 sm:w-10 text-center" />
                        </div>
                      </div>
                      <div className="p-2 sm:p-3 md:p-4 bg-zinc-900">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                            {video.title}
                          </h4>
                          <span className="text-xs sm:text-sm md:text-base text-gray-400">
                            {formatTime(video.duration)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
