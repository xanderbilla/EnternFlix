"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface TransitionContextType {
  isTransitioning: boolean;
  navigateWithTransition: (
    url: string,
    onBeforeTransition?: () => void,
  ) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined,
);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isTransitioning) {
      document.body.classList.add("transitioning");
    } else {
      document.body.classList.remove("transitioning");
    }
  }, [isTransitioning]);

  const navigateWithTransition = useCallback(
    (url: string, onBeforeTransition?: () => void) => {
      if (onBeforeTransition) {
        onBeforeTransition();
      }

      setIsTransitioning(true);

      setTimeout(() => {
        router.push(url);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 500);
    },
    [router],
  );

  return (
    <TransitionContext.Provider
      value={{ isTransitioning, navigateWithTransition }}
    >
      {/* Page content wrapper with fade effect */}
      <div
        className={`transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

      {/* Black overlay for transition */}
      <div
        className={`fixed inset-0 bg-black z-[99999] pointer-events-none transition-opacity duration-500 ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      />
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
