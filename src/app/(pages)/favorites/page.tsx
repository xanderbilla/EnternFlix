import { Metadata } from "next";
import FavoritesPageContent from "@/components/FavoritesPage/FavoritesPageContent";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "Your personal collection of favorite movies and TV shows. Keep track of content you love and want to watch again on EnternFlix.",
  keywords: [
    "favorites",
    "watchlist",
    "saved movies",
    "saved shows",
    "personal collection",
    "bookmarks",
  ],
  openGraph: {
    title: "Favorites - EnternFlix",
    description:
      "Your personal collection of favorite movies and TV shows. Keep track of content you love and want to watch again on EnternFlix.",
    type: "website",
    siteName: "EnternFlix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favorites - EnternFlix",
    description:
      "Your personal collection of favorite movies and TV shows. Keep track of content you love and want to watch again on EnternFlix.",
  },
};

export default function FavoritesPage() {
  return <FavoritesPageContent />;
}
