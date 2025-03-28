"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import requests from "@/helper/request";
import instance from "@/helper/axios";
import dynamic from "next/dynamic";
import { BsSearch } from "react-icons/bs";
import { debounce } from "lodash";

const Navbar = dynamic(() => import("@/components/Navbar/Navbar"));
const SearchList = dynamic(() => import("./component/SearchList"));

interface Movie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  original_name: string;
  overview: string;
  media_type: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  profile_path?: string;
}

const Page: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [searchRes, setSearchRes] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchSearchResults = async (query: string) => {
    if (!query.trim()) {
      setSearchRes([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await instance.get(`${requests.searchRequest}${query}`);
      setSearchRes(res.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const request = await instance.get(requests.fetchTrending);
      const randomIndex = Math.floor(
        Math.random() * request.data.results.length
      );
      setMovie(request.data.results[randomIndex]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce((query: string) => {
    setIsTyping(false);
    fetchSearchResults(query);
  }, 1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsTyping(true);
    debouncedSearch(query);
  };

  useEffect(() => {
    fetchData();
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative w-full">
        {movie && (
          <>
            <div className="relative w-full h-[60vh]">
              <Image
                className="w-full h-full object-cover brightness-[60%]"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt=""
                width={1920}
                height={1080}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-4xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
                Find Your Next Entertainment
              </h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for movies, TV shows, anime..."
                  className="w-full p-4 pl-12 rounded-lg bg-zinc-800/90 text-white text-lg border-2 border-transparent focus:border-red-500 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  onChange={handleSearch}
                  value={searchQuery}
                />
                <BsSearch
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="min-h-[50vh] bg-zinc-900 pt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {isTyping ? (
            <div className="text-center text-gray-400 py-12">Searching...</div>
          ) : isLoading ? (
            <div className="text-center text-gray-400 py-12">
              Loading results...
            </div>
          ) : searchQuery && searchRes.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No results found for &ldquo;{searchQuery}&rdquo;
            </div>
          ) : searchQuery ? (
            <div className="space-y-8">
              {searchRes.some((item) => item.media_type === "movie") && (
                <SearchList
                  title="Movies"
                  data={searchRes.filter((item) => item.media_type === "movie")}
                />
              )}
              {searchRes.some((item) => item.media_type === "tv") && (
                <SearchList
                  title="TV Shows"
                  data={searchRes.filter((item) => item.media_type === "tv")}
                />
              )}
              {searchRes.some((item) => item.media_type === "person") && (
                <SearchList
                  title="Cast"
                  data={searchRes.filter(
                    (item) => item.media_type === "person"
                  )}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Page;
