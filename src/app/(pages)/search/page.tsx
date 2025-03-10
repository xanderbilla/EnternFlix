"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import requests from "@/helper/request";
import Navbar from "@/components/Navbar/Navbar";
import instance from "@/helper/axios";
import SearchList from "./component/SearchList";

interface Movie {
  backdrop_path: string;
  title: string;
  name: string;
  original_name: string;
  overview: string;
  media_type: string;
}

const Page: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null); // Changed initial state type
  const [searchRes, setSearchRes] = useState<Movie[]>([]); // Changed initial state type
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchSearchResults = async () => {
    try {
      const res = await instance.get(`${requests.searchRequest}${searchQuery}`);
      setSearchRes(res.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  console.log(searchRes);

  return (
    <>
      <Navbar />
      <div className="relative w-full ">
        {movie && (
          <>
            <div className="relative w-full h-80">
              <Image
                className="w-full h-full object-cover brightness-[80%]"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt=""
                width={1920} // Adjust width and height as needed
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-10/12 flex flex-col sm:flex-row items-center justify-center h-auto sm:h-36 gap-2 p-4">
              <input
                type="text"
                placeholder="Search for movies, TV shows, videos, or cast..."
                className="w-full sm:w-3/4 p-4 rounded bg-zinc-800 text-white text-lg focus:border-red-500"
                onChange={handleSearch}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 px-12">
        {searchRes.some((item: Movie) => item.media_type === "tv") && (
          <SearchList
            title="TV Shows"
            data={searchRes.filter((item: Movie) => item.media_type === "tv")}
          />
        )}
        {searchRes.some((item: Movie) => item.media_type === "movie") && (
          <SearchList
            title="Movies"
            data={searchRes.filter(
              (item: Movie) => item.media_type === "movie"
            )}
          />
        )}
        {searchRes.some((item: Movie) => item.media_type === "person") && (
          <SearchList
            title="Cast"
            data={searchRes.filter(
              (item: Movie) => item.media_type === "person"
            )}
          />
        )}
      </div>
    </>
  );
};

export default Page;
