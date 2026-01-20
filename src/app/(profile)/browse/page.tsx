"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "@/components/Button/Button";

const profiles = [
  {
    name: "John Doe",
    img: "/img/default-blue.png",
  },
  {
    name: "Kids",
    img: "/img/default-green.png",
  },
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-zinc-900">
      <Link href="/" className="absolute h-16 md:h-24 top-6 lg:left-6 lg:top-6">
        <Image
          className="rounded-sm"
          src="/logo.png"
          alt="Logo"
          height={70}
          width={80}
        />
      </Link>
      <div className="flex flex-col items-center justify-center gap-14 md:gap-10 h-4/5 md:mt-16">
        <h1 className="text-white text-4xl md:text-5xl lg:text-5xl tracking-wide mb-2">
          Who&#39;s Watching?
        </h1>
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
          {profiles.map((profile, idx) => (
            <div
              key={profile.name}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => {}}
            >
              <div className="rounded-md overflow-hidden border-4 border-transparent group-hover:border-white transition-all duration-200">
                <Image
                  className="w-[100px] h-[100px] object-cover"
                  src={profile.img}
                  alt={profile.name}
                  height={100}
                  width={100}
                />
              </div>
              <span className="mt-4 text-lg font-medium text-neutral-400 group-hover:text-white transition-colors duration-200">
                {profile.name}
              </span>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/account?tab=profiles")}
          className="mt-10 md:mt-6"
        >
          MANAGE PROFILES
        </Button>
      </div>
    </div>
  );
};

export default Page;
