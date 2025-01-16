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
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition
    duration-500 ${showBackground ? "bg-zinc-900 bg-opacity-95" : ""}`}
      >
        <div
          onClick={toggleMobileMenu}
          className="flex flex-row items-center gap-2 cursor-pointer relative lg:hidden"
        >
          <BsList className="text-white" size={24} />
        </div>
        <Image
          height={90}
          width={150}
          src="/logo.png"
          alt="logo"
          onClick={() => router.push("/")}
          className="cursor-pointer ml-4"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {navbarItems.map((item, index) => (
            <NavbarItems key={index} label={item.label} path={item.path} />
          ))}
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch size={20} onClick={() => router.push("/search")} />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell size={20} />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative md:flex"
          >
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-md overflow-hidden">
              <Image
                height={40}
                width={40}
                src="/img/default-blue.png"
                alt="avatar"
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
          <div
            className={`fixed top-0 left-0 h-full w-full bg-zinc-950 transition-transform transform ${
              showMobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="absolute flex w-full flex-row justify-end items-end p-4 z-50">
              <button onClick={toggleMobileMenu} className="text-white">
                X
              </button>
            </div>
            <div className="flex flex-col p-4">
              <MobileMenu visible={showMobileMenu} items={navbarItems}/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
