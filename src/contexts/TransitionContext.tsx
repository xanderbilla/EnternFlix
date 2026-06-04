"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
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
  const isNavigatingRef = useRef(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      if (onBeforeTransition) {
        onBeforeTransition();
      }

      setIsTransitioning(true);

      transitionTimerRef.current = setTimeout(() => {
        router.push(url);
        settleTimerRef.current = setTimeout(() => {
          setIsTransitioning(false);
          isNavigatingRef.current = false;
        }, 100);
      }, 500);
    },
    [router],
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
      }
      isNavigatingRef.current = false;
    };
  }, []);

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
