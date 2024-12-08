"use client";

import MovieList from "@/components/MovieList/MovieList";
import Navbar from "@/components/Navbar/Navbar";
import requests from "@/helper/request";
import React, { useState } from "react";

type Props = {};

export default function Page({}: Props) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="text-white">
      <Navbar classname="relative"/>
      <div className="p-8 text-4xl w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
          className="p-4 w-full bg-transparent border-b-2 border-red-900/80 text-white focus:outline-none"
        />
      </div>
      <MovieList title="" data={requests.fetchTopRated} />
    </div>
  );
}
