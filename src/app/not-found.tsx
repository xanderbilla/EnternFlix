"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-zinc-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-zinc-800">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-medium text-white mt-8">
              Page Not Found
            </h2>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-lg text-gray-400 mb-8">
            Sorry, we can&apos;t find the page you&apos;re looking for.
            You&apos;ll find lots to explore on the home page.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 font-medium"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
