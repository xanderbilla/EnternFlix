"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useNavbar } from "@/hooks/ui/useNavbar";
import { NavbarProps } from "@/types/navbar";
import { DESKTOP_NAV_LINKS } from "@/constants/navbar";
import Link from "next/link";
import SearchField from "@/components/UI/SearchField";
import { useNavbarSearch } from "@/hooks/ui/useNavbarSearch";
import { useDialogBodyScroll } from "@/hooks/ui/useDialogBodyScroll";

const Navbar = ({ classname = "" }: NavbarProps) => {
  const pathname = usePathname();
  const { showBackground, showMobileMenu, toggleMobileMenu } = useNavbar();
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

  useDialogBodyScroll(showMobileMenu);

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
        className={`px-4 sm:px-6 md:px-16 py-4 flex flex-row items-center transition duration-500 ${navbarBackgroundClass}`}
      >
        {/* Logo */}
        <Link
          href="/browse"
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
        <div className="flex-row ml-4 sm:ml-6 md:ml-8 gap-4 sm:gap-6 md:gap-8 hidden md:flex">
          {DESKTOP_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname?.startsWith(href) ? "page" : undefined}
              className="text-sm text-gray-300 hover:text-white transition cursor-pointer aria-[current=page]:text-white"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Side - Search + Hamburger */}
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

          {/* Hamburger — mobile only, animates burger ↔ X */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 gap-0 focus:outline-none"
            aria-label={
              showMobileMenu ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={showMobileMenu}
            aria-controls="mobile-nav-menu"
            onClick={toggleMobileMenu}
          >
            <span
              className={`block w-5 h-px bg-white rounded transition-all duration-300 origin-center ${
                showMobileMenu ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white rounded transition-all duration-200 my-[3px] ${
                showMobileMenu ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white rounded transition-all duration-300 origin-center ${
                showMobileMenu ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          id="mobile-nav-menu"
          className="animate-slideDown fixed inset-0 z-50 bg-zinc-900 flex flex-col items-center justify-center md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close button — absolute top-right */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Close navigation menu"
            className="absolute top-4 right-4 sm:right-6 text-white p-1 focus:outline-none"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Logo — centered */}
          <Link
            href="/"
            aria-label="EnternFlix home"
            onClick={toggleMobileMenu}
            className="mb-10"
          >
            <Image
              height={90}
              width={150}
              src="/logo.png"
              alt="EnternFlix"
              loading="eager"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Nav links — centered below logo */}
          <nav
            className="flex flex-col items-center gap-6 sm:gap-8"
            aria-label="Mobile navigation"
          >
            {DESKTOP_NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={toggleMobileMenu}
                aria-current={pathname?.startsWith(href) ? "page" : undefined}
                className="text-lg sm:text-xl font-medium text-gray-300 hover:text-white transition aria-[current=page]:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
