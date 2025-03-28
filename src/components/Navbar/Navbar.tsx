"use client";

import NavbarItems from "@/components/NavbarItems/NavbarItems";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import AccountMenu from "@/components/AccountMenu/AccountMenu";
import { BsBell, BsChevronDown, BsSearch, BsList } from "react-icons/bs";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const TOP_OFFSET = 66;

type NavbarProps = {
  classname?: string;
};

const navbarItems = [
  { label: "TV Shows", path: "/tv-show" },
  { label: "Anime", path: "/anime" },
  { label: "Movies", path: "/movies" },
  { label: "Trending", path: "/trending" },
  { label: "My List", path: "/my-list" },
];

const Navbar = ({ classname = "" }: NavbarProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const router = useRouter();

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll: () => void = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={twMerge("w-full fixed z-40", classname)}>
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
          <BsList className="text-white" size={24} />
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
          {navbarItems.map((item, index) => (
            <NavbarItems key={index} label={item.label} path={item.path} />
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex flex-row ml-auto gap-4 md:gap-7 items-center">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition text-gray-200 hover:text-white"
            aria-label="Search"
            onClick={() => router.push("/search")}
          >
            <BsSearch size={20} />
          </button>

          <button
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition text-gray-200 hover:text-white"
            aria-label="Notifications"
          >
            <BsBell size={20} />
          </button>

          {/* Account Menu */}
          <div
            onClick={toggleAccountMenu}
            className="flex items-center gap-2 cursor-pointer relative group"
          >
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg overflow-hidden">
              <Image
                height={40}
                width={40}
                src="/img/default-blue.png"
                alt="avatar"
                className="object-cover hover:opacity-90 transition"
              />
            </div>
            <BsChevronDown
              className={`text-white transition-transform duration-300 ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              } group-hover:text-white`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
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
