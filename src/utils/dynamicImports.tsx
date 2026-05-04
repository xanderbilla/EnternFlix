"use client";

import dynamic from "next/dynamic";

export const DynamicNavbar = dynamic(
  () => import("@/components/Navbar/Navbar"),
  { ssr: false },
);

export const DynamicFooter = dynamic(
  () => import("@/components/Footer/Footer"),
  { ssr: false },
);

export const DynamicBanner = dynamic(
  () => import("@/components/Banner/Banner"),
  { ssr: false },
);

export const DynamicHome = dynamic(() => import("@/components/Home/Home"), {
  ssr: false,
});

export const DynamicMovieList = dynamic(
  () => import("@/components/MovieList/MovieList"),
  { ssr: false },
);

export const DynamicMovieCard = dynamic(
  () => import("@/components/MovieCard/MovieCard"),
  { ssr: false },
);

export const DynamicMovieListRow = dynamic(
  () => import("@/components/MovieList/MovieListRow"),
  { ssr: false },
);

export const DynamicIcon = dynamic(() => import("@/components/Icon/Icon"), {
  ssr: false,
});

export const DynamicButton = dynamic(
  () => import("@/components/Button/Button"),
  { ssr: false },
);

export const DynamicCircularButton = dynamic(
  () => import("@/components/UI/CircularButton"),
  { ssr: false },
);

export const DynamicBaseDialog = dynamic(
  () => import("@/components/UI/BaseDialog"),
  { ssr: false },
);

export const DynamicDialogHeader = dynamic(
  () => import("@/components/UI/DialogHeader"),
  { ssr: false },
);

export const DynamicInfoDialog = dynamic(
  () => import("@/components/Dialogs/InfoDialog"),
  { ssr: false },
);

export const DynamicCastDialog = dynamic(
  () => import("@/components/Dialogs/CastDialog"),
  { ssr: false },
);

export const DynamicExploreDialog = dynamic(
  () => import("@/components/Dialogs/ExploreDialog"),
  { ssr: false },
);

export const DynamicDialogRenderer = dynamic(
  () => import("@/components/Dialogs/DialogRenderer"),
  { ssr: false },
);

export const DynamicBannerContent = dynamic(
  () => import("@/components/Banner/BannerContent"),
  { ssr: false },
);

export const DynamicMovieCardHoverOverlay = dynamic(
  () => import("@/components/MovieCard/MovieCardHoverOverlay"),
  { ssr: false },
);

export const DynamicMovieCardActionButtons = dynamic(
  () => import("@/components/MovieCard/MovieCardActionButtons"),
  { ssr: false },
);

export const DynamicMovieCardMetadata = dynamic(
  () => import("@/components/MovieCard/MovieCardMetadata"),
  { ssr: false },
);

export const DynamicScrollButton = dynamic(
  () => import("@/components/MovieList/ScrollButton"),
  { ssr: false },
);

export const DynamicMovieListHeader = dynamic(
  () => import("@/components/MovieList/MovieListHeader"),
  { ssr: false },
);

export const DynamicSearchResults = dynamic(
  () => import("@/components/SearchPage/SearchResults"),
  { ssr: false },
);
