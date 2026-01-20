import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NotFoundContent from "@/app/NotFoundContent";

export const metadata: Metadata = {
  title: "Unavailable Content - EnternFlix",
  description:
    "The content you're looking for is not available. Explore our vast collection of movies, TV shows, and anime on EnternFlix.",
  authors: [{ name: "Emma" }],
  keywords: [
    "404",
    "not found",
    "unavailable",
    "content",
    "streaming",
    "movies",
    "tv shows",
  ],
  openGraph: {
    title: "Unavailable Content - EnternFlix",
    description:
      "The content you're looking for is not available. Explore our vast collection of movies, TV shows, and anime on EnternFlix.",
    type: "website",
    siteName: "EnternFlix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unavailable Content - EnternFlix",
    description:
      "The content you're looking for is not available. Explore our vast collection of movies, TV shows, and anime on EnternFlix.",
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
