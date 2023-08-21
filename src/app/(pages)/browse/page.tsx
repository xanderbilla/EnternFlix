"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      <div className="absolute h-16 md:h-24 top-6 lg:left-6 lg:top-6">
        <Image
          className="rounded-sm"
          src="/img/logo.png"
          alt="Logo"
          height={70}
          width={80}
          onClick={() => router.push("/")}
        />
      </div>
      <div className=" flex flex-col items-center justify-center gap-14 md:gap-10 h-4/5 md:mt-16">
        <h1 className="text-white text-4xl md:text-5xl lg:text-5xl">
          Who&#39;s Watching?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div
            className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer"
            onClick={() => {}}
          >
            <Image
              className="rounded-sm"
              src="/img/default-blue.png"
              alt="Default Profile"
              height={100}
              width={100}
            />
            <span className="text-sm font-medium text-neutral-400">
              John Doe
            </span>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer"
            onClick={() => {}}
          >
            <Image
              className="rounded-sm"
              src="/img/default-green.png"
              alt="Default Profile"
              height={100}
              width={100}
            />
            <span className="text-sm font-medium text-neutral-400">Kids</span>
          </div>
        </div>
        <button
          onClick={() => router.push("ManageProfiles")}
          className="text-gray-400 border-4 font-light text-sm border-opacity-25 border-gray-400 tracking-widest 
        px-3 py-1 mt-6 md:mt-2"
        >
          MANAGE PROFILES
        </button>
      </div>
    </div>
  );
};

export default Page;
