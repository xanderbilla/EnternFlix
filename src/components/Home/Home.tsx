import PageLayout from "@/components/Layout/PageLayout";
import MovieList from "@/components/MovieList/MovieList";

const Home = () => {
  return (
    <PageLayout showBanner={true} bannerVariant="home">
      <MovieList title="Recently Added" hookName="trending" />
      <MovieList title="Latest Release" hookName="latestRelease" />
    </PageLayout>
  );
};

export default Home;
