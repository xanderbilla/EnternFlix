"use client";

import PageLayout from "@/components/Layout/PageLayout";
import { DynamicMovieList } from "@/utils/dynamicImports";

const Home = () => {
  return (
    <PageLayout showBanner={true} bannerVariant="home">
      <DynamicMovieList title="Latest" hookName="trending" />
    </PageLayout>
  );
};

export default Home;
