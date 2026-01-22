"use client";

import FavoritesContent from "./FavoritesContent";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import PageLayout from "@/components/Layout/PageLayout";

export default function FavoritesPageContent() {
  // Grid content for grid view
  const gridContent = <CategoryGrid category="favorites" />;

  return (
    <PageLayout
      showBanner={true}
      bannerVariant="category"
      bannerCategory="favorites"
      gridContent={gridContent}
    >
      <FavoritesContent />
    </PageLayout>
  );
}
