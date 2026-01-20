import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - EnternFlix",
  description:
    "Search for movies, TV shows, anime, and cast members. Discover new content and find your favorite entertainment on EnternFlix.",
  keywords: [
    "search",
    "movies",
    "tv shows",
    "anime",
    "cast",
    "discover",
    "find content",
  ],
  openGraph: {
    title: "Search - EnternFlix",
    description:
      "Search for movies, TV shows, anime, and cast members. Discover new content and find your favorite entertainment on EnternFlix.",
    type: "website",
    siteName: "EnternFlix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search - EnternFlix",
    description:
      "Search for movies, TV shows, anime, and cast members. Discover new content and find your favorite entertainment on EnternFlix.",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
