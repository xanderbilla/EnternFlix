"use client"

import React from "react";
import CategoryBanner from "./component/CategoryBanner";
import MovieList from "@/components/MovieList/MovieList";
import catReq from "@/helper/catReq";
import { usePathname } from "next/navigation";

type Props = {};

export default function Page({}: Props) {
    const path = usePathname().split("/");
    const categoryName = path[2].charAt(0).toUpperCase() + path[2].slice(1);
    const formatCategoryName = (name: string) => {
      return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
  return (
    <>
      <CategoryBanner />
      <MovieList title={`Trending ${formatCategoryName(categoryName)}s`} data={catReq.fetchAnimes} />
    </>
  );
}
