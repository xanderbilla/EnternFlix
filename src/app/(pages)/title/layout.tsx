import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - EnternFlix",
    default: "Watch Now",
  },
  description:
    "Watch movies, TV shows, and anime with detailed information, cast, ratings, and reviews on EnternFlix.",
};

export default function TitleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
