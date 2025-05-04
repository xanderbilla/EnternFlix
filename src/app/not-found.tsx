"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/helper/axios";
import requests from "@/helper/request";

export default function NotFound() {
  const router = useRouter();
  const [backdrop, setBackdrop] = useState<string | null>(null);

  useEffect(() => {
    // Fetch a random trending movie/TV backdrop
    const fetchBackdrop = async () => {
      try {
        const res = await axios.get(requests.fetchTrending);
        const results = res.data.results;
        if (results && results.length > 0) {
          const random = results[Math.floor(Math.random() * results.length)];
          setBackdrop(random.backdrop_path);
        }
      } catch (err) {
        setBackdrop(null);
      }
    };
    fetchBackdrop();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-900">
      {/* Backdrop image */}
      {backdrop && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center brightness-50 transition-all duration-500"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
          }}
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent z-10" />
      {/* Content */}
      <div className="relative z-20 text-center max-w-2xl mx-auto flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-[7rem] sm:text-[10rem] md:text-[14rem] font-extrabold text-white drop-shadow-lg mb-2 transition-all duration-500">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8">
          Sorry, we can&apos;t find the page you&apos;re looking for.
          <br />
          You&apos;ll find lots to explore on the home page.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 font-medium shadow-lg"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
