import PageLayout from "@/components/Layout/PageLayout";
import MovieGridSection from "@/components/MovieList/MovieGridSection";

const Home = () => {
  return (
    <PageLayout showBanner={true} bannerVariant="home">
      <MovieGridSection title="Recently Added" hookName="trending" />
      <MovieGridSection title="Latest Release" hookName="latestRelease" />
    </PageLayout>
  );
};

export default Home;
