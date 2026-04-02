"use client";

import PageLayout from "@/components/Layout/PageLayout";
import { DynamicMovieList } from "@/utils/dynamicImports";

const Home = () => {
  return (
    <PageLayout showBanner={true} bannerVariant="home">
      <DynamicMovieList title="Recently Added" hookName="trending" />
      <DynamicMovieList title="Latest Release" hookName="latestRelease" />
    </PageLayout>
  );
};

export default Home;
