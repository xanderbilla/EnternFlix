"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import LazyLoadManager from "@/utils/lazyLoadManager";
import { LazyMovieListProps } from "@/types/components";

const MovieList = dynamic(() => import("@/components/MovieList/MovieList"), {
  ssr: false, // Don't render on server for below-fold content
});

export default function LazyMovieList({ title, hookName }: LazyMovieListProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const manager = LazyLoadManager.getInstance();
    manager.observe(element, () => setIsVisible(true));

    return () => {
      if (element) {
        manager.unobserve(element);
      }
    };
  }, []);

  return (
    <div ref={ref} className="min-h-[280px]">
      {isVisible && <MovieList title={title} hookName={hookName} />}
    </div>
  );
}
