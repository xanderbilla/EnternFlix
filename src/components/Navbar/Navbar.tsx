"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useNavbar } from "@/hooks/ui/useNavbar";
import { NavbarProps } from "@/types/navbar";
import Link from "next/link";
import SearchField from "@/components/UI/SearchField";
import { useNavbarSearch } from "@/hooks/ui/useNavbarSearch";

const Navbar = ({ classname = "" }: NavbarProps) => {
  const pathname = usePathname();
  const { showBackground } = useNavbar();
  const {
    searchContainerRef,
    isSearchOpen,
    searchValue,
    selectedScope,
    handleSearchOpen,
    handleSearchChange,
    handleClearSearch,
    handleScopeChange,
  } = useNavbarSearch();

  const isMoviesActive = pathname?.startsWith("/browse/movies");
  const isTvShowsActive = pathname?.startsWith("/browse/tv-shows");
  const isLatestActive = pathname?.startsWith("/browse/latest");
  const isTransparentRoute =
    pathname === "/browse" ||
    pathname === "/movies" ||
    pathname === "/tv-shows" ||
    pathname?.startsWith("/browse/movies") ||
    pathname?.startsWith("/browse/tv-shows");

  const navbarBackgroundClass = isTransparentRoute
    ? showBackground
      ? "bg-zinc-900"
      : "bg-gradient-to-b from-black/70 to-transparent"
    : "bg-zinc-900";

  return (
    <nav
      aria-label="Primary"
      className={twMerge("w-full fixed top-0 left-0 z-40", classname)}
    >
      <div
        className={`px-4 md:px-16 py-4 flex flex-row items-center transition duration-500 ${navbarBackgroundClass}`}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="EnternFlix home"
          className="inline-flex items-center"
        >
          <Image
            height={90}
            width={150}
            src="/logo.png"
            alt="EnternFlix"
            loading="eager"
            priority
            className="cursor-pointer h-8 md:h-10 w-auto object-contain hover:opacity-90 transition"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex-row ml-8 gap-8 hidden md:flex">
          <Link
            href="/browse/tv-shows"
            aria-current={isTvShowsActive ? "page" : undefined}
            className="text-sm text-gray-300 hover:text-white transition cursor-pointer aria-[current=page]:text-white"
          >
            TV Shows
          </Link>
          <Link
            href="/browse/movies"
            aria-current={isMoviesActive ? "page" : undefined}
            className="text-sm text-gray-300 hover:text-white transition cursor-pointer aria-[current=page]:text-white"
          >
            Movies
          </Link>
          <Link
            href="/browse/latest"
            aria-current={isLatestActive ? "page" : undefined}
            className="text-sm text-gray-300 hover:text-white transition cursor-pointer aria-[current=page]:text-white"
          >
            Latest
          </Link>
        </div>

        {/* Right Side - Search Icon */}
        <div
          ref={searchContainerRef}
          className="flex flex-row ml-auto gap-2 md:gap-4 items-center"
        >
          <SearchField
            isOpen={isSearchOpen}
            value={searchValue}
            selectedScope={selectedScope}
            onOpen={handleSearchOpen}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onScopeChange={handleScopeChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
