"use client";

import { DynamicIcon as Icon } from "@/utils/dynamicImports";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useNavbar } from "@/hooks/ui/useNavbar";
import { NavbarProps } from "@/types/navbar";
import Link from "next/link";

const Navbar = ({ classname = "" }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { showBackground } = useNavbar();

  const isMoviesActive = pathname?.startsWith("/movies");

  return (
    <nav
      aria-label="Primary"
      className={twMerge("w-full fixed top-0 left-0 z-40", classname)}
    >
      <div
        className={`px-4 md:px-16 py-4 flex flex-row items-center transition duration-500
        ${
          showBackground
            ? "bg-zinc-900/95"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
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
            href="/movies"
            aria-current={isMoviesActive ? "page" : undefined}
            className="text-gray-300 hover:text-white transition cursor-pointer aria-[current=page]:text-white"
          >
            Movies
          </Link>
        </div>

        {/* Right Side - Search Icon */}
        <div className="flex flex-row ml-auto gap-2 md:gap-4 items-center">
          <button
            type="button"
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
