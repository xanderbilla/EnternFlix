import { NavbarGenre } from "@/types/navbar";

export interface NavLink {
  href: string;
  label: string;
}

export const DESKTOP_NAV_LINKS: NavLink[] = [
  { href: "/browse/trending", label: "Trending" },
  { href: "/browse/tv-shows", label: "TV Shows" },
  { href: "/browse/movies", label: "Movies" },
  { href: "/browse/latest", label: "Latest" },
];

export const DEFAULT_GENRES: Record<string, NavbarGenre[]> = {
  movies: [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
    { id: 53, name: "Thriller" },
  ],
  "tv-shows": [
    { id: 10759, name: "Action & Adventure" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 9648, name: "Mystery" },
  ],
  anime: [
    { id: 16, name: "Animation" },
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 14, name: "Fantasy" },
  ],
};
