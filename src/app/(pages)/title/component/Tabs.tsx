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
    <div className="px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
      <div className="tabs flex flex-wrap space-x-4 sm:space-x-6 border-b border-zinc-800">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-base sm:text-lg md:text-xl font-medium transition-all duration-300 relative ${
              activeTab === tab.id
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab.title}
            <div
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                activeTab === tab.id ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="tab-content mt-6 sm:mt-8 md:mt-10">
        {tabsData.map(
          (tab) =>
            tab.id === activeTab && (
              <div key={tab.id}>
                <p className="text-base sm:text-lg md:text-xl text-zinc-300 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolores nisi modi, officiis a quo optio obcaecati at.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                  {videosData[tab.id].map((video) => (
                    <div
                      key={video.id}
                      className="group relative bg-zinc-900 rounded-xl overflow-hidden"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={video.imageUrl}
                          alt={video.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <BsPlayFill className="rounded-full bg-white text-black text-5xl sm:text-6xl p-4 shadow-2xl" />
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-black/80 text-white text-sm px-3 py-1.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-500">
                          {formatTime(video.duration)}
                        </div>
                      </div>
                      <div className="relative p-4 bg-zinc-900">
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 via-zinc-900/50 to-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                            {video.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-zinc-400">
                              Episode {video.id}
                            </span>
                            <span className="text-sm font-medium text-zinc-400">
                              Season {tab.id}
                            </span>
                          </div>
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
