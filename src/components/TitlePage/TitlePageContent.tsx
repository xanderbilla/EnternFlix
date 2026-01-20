"use client";

import React from "react";
import { useTitle, type TitleData, type TVShow } from "@/hooks/api/useTitle";
import {
  DynamicTitleBanner as TitleBanner,
  DynamicTabs as Tabs,
  DynamicTitleInfo as TitleInfo,
} from "@/utils/dynamicImports";

interface TitlePageContentProps {
  id: string;
}

export default function TitlePageContent({ id }: TitlePageContentProps) {
  const { data, isLoading, error } = useTitle(id);

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Oops!</h1>
          <p className="text-gray-400">
            {error instanceof Error ? error.message : "Content not found"}
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Type assertion to help TypeScript understand the data structure
  const titleData = data as TitleData;

  return (
    <div className="flex flex-col text-white min-h-screen bg-zinc-900">
      <TitleBanner data={titleData.content} mediaType={titleData.mediaType} />
      {titleData.mediaType === "tv" && (
        <Tabs data={titleData.content as TVShow} />
      )}
      <TitleInfo mediaType={titleData.mediaType} data={titleData.content} />
    </div>
  );
}
