import { Metadata } from "next";
import { DynamicHome, DynamicFrontPage } from "@/utils/dynamicImports";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover unlimited movies, TV shows, and anime on EnternFlix. Watch trending content, explore new releases, and stream your favorite entertainment.",
  keywords: [
    "home",
    "streaming",
    "movies",
    "tv shows",
    "anime",
    "trending",
    "new releases",
    "entertainment",
  ],
  openGraph: {
    title: "Home - EnternFlix",
    description:
      "Discover unlimited movies, TV shows, and anime on EnternFlix. Watch trending content, explore new releases, and stream your favorite entertainment.",
    type: "website",
    siteName: "EnternFlix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home - EnternFlix",
    description:
      "Discover unlimited movies, TV shows, and anime on EnternFlix. Watch trending content, explore new releases, and stream your favorite entertainment.",
  },
};

export default function HomePage() {
  const user = true;
  return <>{!user ? <DynamicFrontPage /> : <DynamicHome />}</>;
}
