"use client";

import NavbarItems from "@/components/NavbarItems/NavbarItems";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import AccountMenu from "@/components/AccountMenu/AccountMenu";
import { BsBell, BsChevronDown, BsSearch, BsList } from "react-icons/bs";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { LiaUserEditSolid } from "react-icons/lia";
import { GoPerson } from "react-icons/go";

const TOP_OFFSET = 66;

type NavbarProps = {
  classname?: string;
};

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
    const handleScroll = () => {
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
          className="flex flex-row items-center gap-2 cursor-pointer relative md:hidden"
        >
          <BsList className="text-white" size={24} />
        </div>
        <Image
          height={70}
          width={80}
          src="/img/logo.png"
          alt="logo"
          onClick={() => router.push("/")}
          className="cursor-pointer ml-4"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItems label="Home" />
          <NavbarItems label="TV Shows" />
          <NavbarItems label="Movies" />
          <NavbarItems label="New & Popular" />
          <NavbarItems label="My List" />
          <NavbarItems label="Browse by Language" />
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
            <div className="w-10 h-10 rounded-md overflow-hidden">
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
            className={`fixed top-0 left-0 h-full w-full bg-zinc-900 bg-opacity-95 transition-transform transform ${
              showMobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
            >
            <div className="absolute flex w-full flex-row justify-end items-end p-4 z-50">
              <button onClick={toggleMobileMenu} className="text-white">
              X
              </button>
            </div>
            <div className="flex flex-col p-4">
              <MobileMenu visible={showMobileMenu} />
            </div>
            <hr className="border-t border-gray-700 my-4" />
            <div className="px-3 group/item flex flex-row gap-3 items-center w-full text-white cursor-pointer">
              <LiaUserEditSolid size={26} className="w-8" />
              <p
              className="group-hover/item:underline"
              onClick={() => {
                toggleMobileMenu();
                router.push("/browse");
              }}
              >
              Manage Profile
              </p>
            </div>
            <div className="px-3 group/item flex flex-row gap-3 items-center w-full text-white cursor-pointer">
              <GoPerson size={24} className="w-8" />
              <p className="group-hover/item:underline">Account</p>
            </div>
            <div
              className="px-3 mt-12 border p-2 w-2/3 flex items-center justify-center text-center hover:underline text-white cursor-pointer"
              onClick={() => {
              toggleMobileMenu();
              // Add sign out logic here
              }}
            >
              Sign Out from Netflix
            </div>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
