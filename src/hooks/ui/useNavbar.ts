"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { UI } from "@/constants/common";

export function useNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const handleAccountMenuEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setShowAccountMenu(true);
  }, []);

  const handleAccountMenuLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowAccountMenu(false);
    }, 150);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= UI.NAVBAR_SCROLL_OFFSET_PX) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return {
    showMobileMenu,
    showAccountMenu,
    showBackground,
    toggleMobileMenu,
    handleAccountMenuEnter,
    handleAccountMenuLeave,
  };
}
