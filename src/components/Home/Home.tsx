"use client";

import PageLayout from "@/components/Layout/PageLayout";
import { DynamicMovieList } from "@/utils/dynamicImports";
import LazyMovieList from "./LazyMovieList";

const Home = () => {
  return (
    <PageLayout showBanner={true} bannerVariant="home">
      {/* Load first 2 immediately for LCP */}
      <DynamicMovieList title="Trending" hookName="trending" />
      <DynamicMovieList title="Netflix Originals" hookName="netflixOriginals" />

      {/* Lazy load the rest */}
      <LazyMovieList title="Top Rated Movies" hookName="topRatedMovies" />
      <LazyMovieList title="Popular Movies" hookName="popularMovies" />
      <LazyMovieList title="Action Movies" hookName="actionMovies" />
      <LazyMovieList title="Comedy Movies" hookName="comedyMovies" />
      <LazyMovieList title="Horror Movies" hookName="horrorMovies" />
    </PageLayout>
  );
};

export default Home;
