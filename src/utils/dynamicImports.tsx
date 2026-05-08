/**
 * Centralized component re-exports.
 *
 * Historically these were `next/dynamic` wrappers with `ssr: false`, which
 * forced every page to render an empty shell on the server and defeated SEO,
 * SSR and streaming. Components now load through the standard module graph:
 * - components that need browser APIs already declare `"use client"`,
 * - components that don't will render on the server,
 * - `next/dynamic` is reserved for genuinely heavy/optional code-split chunks
 *   (none currently qualify).
 *
 * The `Dynamic*` aliases are preserved so existing call sites stay untouched.
 */
export { default as DynamicNavbar } from "@/components/Navbar/Navbar";
export { default as DynamicFooter } from "@/components/Footer/Footer";
export { default as DynamicBanner } from "@/components/Banner/Banner";
export { default as DynamicHome } from "@/components/Home/Home";
export { default as DynamicMovieList } from "@/components/MovieList/MovieList";
export { default as DynamicMovieCard } from "@/components/MovieCard/MovieCard";
export { default as DynamicMovieListRow } from "@/components/MovieList/MovieListRow";
export { default as DynamicIcon } from "@/components/Icon/Icon";
export { default as DynamicCircularButton } from "@/components/UI/CircularButton";
export { default as DynamicDialogHeader } from "@/components/UI/DialogHeader";
export { default as DynamicDialogRenderer } from "@/components/Dialogs/DialogRenderer";
export { default as DynamicBannerContent } from "@/components/Banner/BannerContent";
export { default as DynamicMovieCardHoverOverlay } from "@/components/MovieCard/MovieCardHoverOverlay";
export { default as DynamicMovieCardActionButtons } from "@/components/MovieCard/MovieCardActionButtons";
export { default as DynamicMovieCardMetadata } from "@/components/MovieCard/MovieCardMetadata";
export { default as DynamicScrollButton } from "@/components/MovieList/ScrollButton";
export { default as DynamicMovieListHeader } from "@/components/MovieList/MovieListHeader";
export { default as DynamicSearchResults } from "@/components/SearchPage/SearchResults";
