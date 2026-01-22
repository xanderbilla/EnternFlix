import dynamic from "next/dynamic";

// Common component dynamic imports
export const DynamicNavbar = dynamic(
  () => import("@/components/Navbar/Navbar"),
);

export const DynamicFooter = dynamic(
  () => import("@/components/Footer/Footer"),
);

export const DynamicBanner = dynamic(
  () => import("@/components/Banner/Banner"),
);

export const DynamicMovieList = dynamic(
  () => import("@/components/MovieList/MovieList"),
);

export const DynamicMovieCard = dynamic(
  () => import("@/components/MovieCard/MovieCard"),
);

// Page components
export const DynamicHome = dynamic(() => import("@/components/Home/Home"));

export const DynamicFrontPage = dynamic(
  () => import("@/components/FrontPage/FrontPage"),
);
