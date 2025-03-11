"use client"

import React from "react";
import dynamic from "next/dynamic";
import catReq from "@/helper/catReq";
import { usePathname } from "next/navigation";

const CategoryBanner = dynamic(() => import("./component/CategoryBanner"));
const MovieList = dynamic(() => import("@/components/MovieList/MovieList"));

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
