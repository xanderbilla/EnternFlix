"use client";

import PageLayout from "@/components/Layout/PageLayout";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import { DynamicMovieList } from "@/utils/dynamicImports";
import { CategoryPageContentProps } from "@/types/components";

export default function CategoryPageContent({
  title,
  description,
  category,
  movieLists,
}: CategoryPageContentProps) {
  // Grid content for grid view
  const gridContent = <CategoryGrid category={category} />;

  return (
    <PageLayout
      showBanner={true}
      bannerVariant="category"
      bannerCategory={category}
      gridContent={gridContent}
    >
      {/* List view content */}
      {movieLists.map((list) => (
        <DynamicMovieList
          key={list.hookName}
          title={list.title}
          hookName={list.hookName}
        />
      ))}
    </PageLayout>
  );
}
