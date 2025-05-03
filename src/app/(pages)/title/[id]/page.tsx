"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "@/helper/axios";
import { PageSkeleton } from "@/components/Skeleton/PageSkeleton";

const TitleBanner = dynamic(
  () => import("@/components/single-page/TitleBanner")
);
const Tabs = dynamic(() => import("@/components/single-page/Tabs"));
const TitleInfo = dynamic(
  () => import("@/components/single-page/TitleInfo")
);

interface Movie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status: string;
  tagline?: string;
  created_by?: Array<{ id: number; name: string; profile_path: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string }>;
}

interface TVShow {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  runtime?: number;
  number_of_seasons: number;
  number_of_episodes?: number;
  status: string;
  tagline?: string;
  created_by?: Array<{ id: number; name: string; profile_path: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string }>;
  seasons?: Array<{
    id: number;
    season_number: number;
    name: string;
    overview: string;
    air_date: string;
    episode_count: number;
    poster_path: string;
  }>;
}

export default function Page() {
  const params = useParams();
  const [content, setContent] = useState<Movie | null>(null);
  const [mediaType, setMediaType] = useState<"movie" | "tv" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Try fetching as a TV show first
        const tvResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${params.id}?api_key=${process.env.NEXT_PUBLIC_DB_API_KEY}&append_to_response=seasons`
        );

        if (tvResponse.data) {
          setContent(tvResponse.data);
          setMediaType("tv");
          setIsLoading(false);
          return;
        }
      } catch (error) {
        // If TV show fetch fails, try as a movie
        try {
          const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_DB_API_KEY}`
          );

          if (movieResponse.data) {
            setContent(movieResponse.data);
            setMediaType("movie");
            setIsLoading(false);
            return;
          }
        } catch (movieError) {
          setError("Content not found");
          setIsLoading(false);
        }
      }
    };

    if (params.id) {
      fetchContent();
    }
  }, [params.id]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Oops!</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!content || !mediaType) {
    return null;
  }

  return (
    <div className="flex flex-col text-white min-h-screen bg-zinc-900">
      <TitleBanner data={content} mediaType={mediaType} />
      {mediaType === "tv" && <Tabs data={content as TVShow} />}
      <TitleInfo mediaType={mediaType} data={content} />
    </div>
  );
}
