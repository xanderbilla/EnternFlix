"use client";

import PageLayout from "@/components/Layout/PageLayout";
import { DynamicMovieList } from "@/utils/dynamicImports";

interface CategoryPageContentProps {
  title: string;
  description: string;
  category: string;
  movieLists: Array<{
    title: string;
    hookName: string;
  }>;
}

export default function CategoryPageContent({
  title,
  description,
  category,
  movieLists,
}: CategoryPageContentProps) {
  return (
    <PageLayout
      showBanner={true}
      bannerVariant="category"
      bannerTitle={title}
      bannerDescription={description}
      bannerCategory={category}
    >
      {movieLists.map((list, index) => (
        <DynamicMovieList
          key={index}
          title={list.title}
          hookName={list.hookName}
        />
      ))}
    </PageLayout>
  );
}
