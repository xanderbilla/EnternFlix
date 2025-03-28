"use client";

import React from "react";
import dynamic from "next/dynamic";
import catReq from "@/helper/catReq";
import { usePathname } from "next/navigation";

const CategoryBanner = dynamic(() => import("./component/CategoryBanner"));
const MovieList = dynamic(() => import("@/components/MovieList/MovieList"));

const categoryConfig = {
  "tv-show": {
    title: "TV Shows",
    bannerTitle: "Discover Amazing TV Series",
    bannerDescription:
      "From gripping dramas to hilarious comedies, find your next binge-worthy show.",
    sections: [
      { title: "Popular TV Shows", fetchFunction: catReq.fetchTvShows },
      { title: "Trending This Week", fetchFunction: catReq.fetchTrending },
      { title: "New Releases", fetchFunction: catReq.fetchNewPopular },
      { title: "Must Watch", fetchFunction: catReq.fetchTvShows },
    ],
  },
  anime: {
    title: "Anime",
    bannerTitle: "Explore the World of Anime",
    bannerDescription:
      "Dive into Japanese animation with the best series and movies.",
    sections: [
      { title: "Popular Anime", fetchFunction: catReq.fetchAnimes },
      { title: "New Releases", fetchFunction: catReq.fetchNewPopular },
      { title: "Trending Anime", fetchFunction: catReq.fetchTrending },
      { title: "Must Watch", fetchFunction: catReq.fetchAnimes },
    ],
  },
  movies: {
    title: "Movies",
    bannerTitle: "Experience Cinema at Home",
    bannerDescription: "Watch the latest blockbusters and timeless classics.",
    sections: [
      { title: "Popular Movies", fetchFunction: catReq.fetchMovies },
      { title: "New Releases", fetchFunction: catReq.fetchNewPopular },
      { title: "Trending Movies", fetchFunction: catReq.fetchTrending },
      { title: "Must Watch", fetchFunction: catReq.fetchMovies },
    ],
  },
  trending: {
    title: "Trending",
    bannerTitle: "What's Hot Right Now",
    bannerDescription:
      "Stay up to date with the most popular content across all categories.",
    sections: [
      { title: "Trending Today", fetchFunction: catReq.fetchTrending },
      { title: "Popular Movies", fetchFunction: catReq.fetchMovies },
      { title: "Popular TV Shows", fetchFunction: catReq.fetchTvShows },
      { title: "Popular Anime", fetchFunction: catReq.fetchAnimes },
    ],
  },
  "my-list": {
    title: "My List",
    bannerTitle: "Your Personal Collection",
    bannerDescription: "All your favorite movies and shows in one place.",
    sections: [
      { title: "Your List", fetchFunction: catReq.fetchMyList },
      { title: "Recommended Movies", fetchFunction: catReq.fetchMovies },
      { title: "Recommended TV Shows", fetchFunction: catReq.fetchTvShows },
      { title: "Trending Now", fetchFunction: catReq.fetchTrending },
    ],
  },
};

export default function Page() {
  const path = usePathname().split("/");
  const category = path[2];

  // Get category configuration or use a default
  const currentCategory = categoryConfig[
    category as keyof typeof categoryConfig
  ] || {
    title: "Browse",
    bannerTitle: "Discover Entertainment",
    bannerDescription: "Find your next favorite movie or show.",
    sections: [
      { title: "Popular Now", fetchFunction: catReq.fetchTrending },
      { title: "Movies", fetchFunction: catReq.fetchMovies },
      { title: "TV Shows", fetchFunction: catReq.fetchTvShows },
      { title: "Anime", fetchFunction: catReq.fetchAnimes },
    ],
  };

  return (
    <>
      <CategoryBanner
        title={currentCategory.bannerTitle}
        description={currentCategory.bannerDescription}
        category={category}
      />

      {/* Render different sections with their own fetch functions */}
      {currentCategory.sections.map((section, index) => (
        <MovieList
          key={index}
          title={section.title}
          data={section.fetchFunction}
        />
      ))}
    </>
  );
}
