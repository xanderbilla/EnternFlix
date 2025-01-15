import React from "react";
import CategoryBanner from "./component/CategoryBanner";
import MovieList from "@/components/MovieList/MovieList";
import requests from "@/helper/request";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <CategoryBanner />
      <MovieList title="Netflix Orginals" data={requests.fetchNetflixOriginals} />
    </>
  );
}
