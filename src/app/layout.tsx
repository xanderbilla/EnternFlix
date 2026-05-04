import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/lib/query/QueryProvider";
import { VideoProvider } from "@/contexts/VideoContext";
import { TransitionProvider } from "@/contexts/TransitionContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://enternflix.vercel.app"),
  title: {
    default: "EnternFlix - Stream Movies, TV Shows & Anime Online",
    template: "%s - EnternFlix",
  },
  description:
    "Stream unlimited movies, TV shows, and anime on EnternFlix. Discover trending content, explore categories, and enjoy next-gen entertainment anytime, anywhere.",
  keywords: [
    "streaming platform",
    "movies online",
    "tv shows",
    "anime streaming",
    "watch movies",
    "entertainment",
    "netflix alternative",
    "video streaming",
  ],
  authors: [{ name: "EnternFlix" }],
  creator: "EnternFlix",
  publisher: "EnternFlix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enternflix.vercel.app",
    siteName: "EnternFlix",
    title: "EnternFlix - Stream Movies, TV Shows & Anime Online",
    description:
      "Stream unlimited movies, TV shows, and anime on EnternFlix. Discover trending content, explore categories, and enjoy next-gen entertainment anytime, anywhere.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EnternFlix - Stream Movies, TV Shows & Anime Online",
    description:
      "Stream unlimited movies, TV shows, and anime on EnternFlix. Discover trending content, explore categories, and enjoy next-gen entertainment anytime, anywhere.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <QueryProvider>
          <VideoProvider>
            <TransitionProvider>{children}</TransitionProvider>
          </VideoProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
