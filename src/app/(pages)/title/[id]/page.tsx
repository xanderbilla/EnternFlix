"use client";

import React from "react";
import TitleBanner from "../component/TitleBanner";
import axios from "axios";
import Tabs from "../component/Tabs";
import TitleInfo from "../component/TitleInfo";

interface Movie {
  backdrop_path: string;
  title?: string;
  number_of_seasons?: number;
  name?: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  first_air_date?: string;
  release_date?: string;
}

export default function Page() {
  const [movie, setMovie] = React.useState<Movie | null>(null);
  const [mediaType, setMediaType] = React.useState<"movie" | "tv">("tv");
  const fetchData = async () => {
    try {
      const request = await axios.get(
        `https://api.themoviedb.org/3/tv/46260?api_key=${process.env.NEXT_PUBLIC_DB_API_KEY}`
      );

      setMovie(request.data);
      console.log(request.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const movie1 = {
    adult: false,
    backdrop_path: "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
    genre_ids: [28, 878, 35, 10751],
    id: 939243,
    original_language: "en",
    original_title: "Sonic the Hedgehog 3",
    overview:
      "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
    popularity: 2732.833,
    poster_path: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
    release_date: "2024-12-19",
    title: "Sonic the Hedgehog 3",
    video: false,
    vote_average: 7.6,
    vote_count: 548,
  };

  return (
    <div className="flex flex-col text-white">
      <TitleBanner data={movie} mediaType={mediaType} />
      {mediaType === "tv" && <Tabs />}
      <TitleInfo mediaType={mediaType}/>
    </div>
  );
}
