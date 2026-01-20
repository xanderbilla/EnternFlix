"use client";

import FavoritesContent from "./FavoritesContent";
import PageLayout from "@/components/Layout/PageLayout";

export default function FavoritesPageContent() {
  return (
    <PageLayout
      showBanner={true}
      bannerVariant="category"
      bannerTitle="Your Favorites"
      bannerDescription="All your favorite movies and TV shows in one place. Never lose track of what you love to watch."
      bannerCategory="favorites"
    >
      <FavoritesContent />
    </PageLayout>
  );
}
