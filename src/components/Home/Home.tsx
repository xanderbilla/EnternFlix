"use client";

import PageLayout from "@/components/Layout/PageLayout";
import { DynamicMovieList } from "@/utils/dynamicImports";

const Home = () => {
  return (
    <PageLayout showBanner={true} bannerVariant="home">
      <DynamicMovieList title="Trending" hookName="trending" />
      <DynamicMovieList title="Netflix Originals" hookName="netflixOriginals" />
      <DynamicMovieList title="Top Rated Movies" hookName="topRatedMovies" />
      <DynamicMovieList title="Popular Movies" hookName="popularMovies" />
      <DynamicMovieList title="Action Movies" hookName="actionMovies" />
      <DynamicMovieList title="Comedy Movies" hookName="comedyMovies" />
      <DynamicMovieList title="Horror Movies" hookName="horrorMovies" />
    </PageLayout>
  );
};

export default Home;
