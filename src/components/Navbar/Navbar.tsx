"use client";

import { DynamicIcon as Icon } from "@/utils/dynamicImports";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useNavbar } from "@/hooks/ui/useNavbar";
import { NavbarProps } from "@/types/navbar";
import Link from "next/link";

const Navbar = ({ classname = "" }: NavbarProps) => {
  const router = useRouter();
  const { showBackground } = useNavbar();

  return (
    <nav className={twMerge("w-full fixed top-0 left-0 z-40", classname)}>
      <div
        className={`px-4 md:px-16 py-4 flex flex-row items-center transition duration-500
        ${
          showBackground
            ? "bg-zinc-900/95"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        {/* Logo */}
        <Image
          height={90}
          width={150}
          src="/logo.png"
          alt="logo"
          loading="eager"
          priority
          onClick={() => router.push("/")}
          className="cursor-pointer h-8 md:h-10 w-auto object-contain hover:opacity-90 transition"
        />

        {/* Desktop Navigation */}
        <div className="flex-row ml-8 gap-8 hidden md:flex">
          <Link
            href="/movies"
            className="text-white hover:text-gray-300 transition cursor-pointer"
          >
            Movies
          </Link>
        </div>

        {/* Right Side - Search Icon */}
        <div className="flex flex-row ml-auto gap-2 md:gap-4 items-center">
          <button
            onClick={() => router.push("/search")}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition"
            aria-label="Search"
          >
            <Icon name="search" size={20} className="text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
