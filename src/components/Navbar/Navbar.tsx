"use client";

import Icon from "@/components/Icon/Icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import NavbarProfile from "./NavbarProfile";
import NavbarActions from "./NavbarActions";
import { useNavbar } from "@/hooks/ui/useNavbar";
import dynamic from "next/dynamic";

const NavbarItems = dynamic(
  () => import("@/components/NavbarItems/NavbarItems"),
);

const MobileMenu = dynamic(() => import("@/components/MobileMenu/MobileMenu"));

const AccountMenu = dynamic(
  () => import("@/components/AccountMenu/AccountMenu"),
);

type NavbarProps = {
  classname?: string;
};

const navbarItems = [
  { label: "Trending", path: "/trending" },
  { label: "Anime", path: "/anime" },
  { label: "TV Shows", path: "/tv-shows" },
  { label: "Movies", path: "/movies" },
  { label: "Favorites", path: "/favorites" },
];

const Navbar = ({ classname = "" }: NavbarProps) => {
  const router = useRouter();
  const {
    showMobileMenu,
    showAccountMenu,
    showBackground,
    toggleMobileMenu,
    handleAccountMenuEnter,
    handleAccountMenuLeave,
  } = useNavbar();

  return (
    <nav className={twMerge("w-full fixed top-0 left-0 z-40", classname)}>
      <div
        className={`px-4 md:px-16 py-4 flex flex-row items-center transition duration-500
        ${
          showBackground
            ? "bg-zinc-900/95 shadow-lg shadow-black/20"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition lg:hidden"
          aria-label="Toggle mobile menu"
        >
          <Icon name="menu" size={24} className="text-white" />
        </button>

        {/* Logo */}
        <Image
          height={90}
          width={150}
          src="/logo.png"
          alt="logo"
          onClick={() => router.push("/")}
          className="cursor-pointer ml-2 md:ml-0 h-8 md:h-10 w-auto object-contain hover:opacity-90 transition"
        />

        {/* Desktop Navigation */}
        <div className="flex-row ml-8 gap-8 hidden lg:flex">
          {navbarItems.map((item) => (
            <NavbarItems key={item.label} label={item.label} path={item.path} />
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex flex-row ml-auto gap-2 md:gap-4 items-center">
          <NavbarActions onSearchClick={() => router.push("/search")} />
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition text-gray-200 hover:text-white"
            aria-label="Notifications"
          >
            <Icon name="bell" size={20} />
          </button>
          <NavbarProfile
            showAccountMenu={showAccountMenu}
            onMenuEnter={handleAccountMenuEnter}
            onMenuLeave={handleAccountMenuLeave}
            AccountMenu={AccountMenu}
          />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-full bg-black transition-transform duration-500 transform ${
            showMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleMobileMenu}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition"
            >
              <span className="text-white text-2xl font-light">×</span>
            </button>
          </div>
          <div className="flex flex-col pt-20 px-8 bg-gradient-to-b from-zinc-900 to-black h-full">
            <MobileMenu visible={showMobileMenu} items={navbarItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
