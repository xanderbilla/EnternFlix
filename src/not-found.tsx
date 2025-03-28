"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "@/helper/axios";
import requests from "@/helper/request";

interface Movie {
  backdrop_path: string;
}

export default function NotFound() {
  const router = useRouter();
  const [backdrop, setBackdrop] = useState<string>("");

  useEffect(() => {
    const fetchRandomBackdrop = async () => {
      try {
        const response = await axios.get(requests.fetchTrending);
        const results = response.data.results;
        if (results && results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);
          const randomMovie = results[randomIndex];
          if (randomMovie.backdrop_path) {
            setBackdrop(
              `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching backdrop:", error);
      }
    };

    fetchRandomBackdrop();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-zinc-900 flex items-center justify-center">
      {/* Backdrop Image */}
      {backdrop && (
        <div className="absolute inset-0">
          <Image
            src={backdrop}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-zinc-900/60" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-8">
        <h1 className="text-[8rem] md:text-[12rem] font-bold text-white opacity-20 select-none">
          404
        </h1>
        <div className="mt-[-6rem] md:mt-[-8rem] space-y-6">
          <h2 className="text-4xl md:text-5xl font-medium text-white">
            Lost in Space?
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Sorry, we can&apos;t find the page you&apos;re looking for.
            Let&apos;s get you back to exploring amazing content.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
