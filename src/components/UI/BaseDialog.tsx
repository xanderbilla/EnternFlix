"use client";

import { ReactNode, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useVideo } from "@/contexts/VideoContext";

export interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  children:
    | ReactNode
    | ((props: {
        handleClose: () => void;
        handleBack: () => void;
      }) => ReactNode);
  zIndex?: number;
  className?: string;
}

export default function BaseDialog({
  isOpen,
  onClose,
  onBack,
  children,
  zIndex = 9999,
  className = "",
}: BaseDialogProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const { pauseBanner, resumeBanner } = useVideo();

  const handleClose = useCallback(() => {
    setIsEntering(false);
    setIsClosing(true);
    document.body.style.overflow = "unset";
    resumeBanner();
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 500);
  }, [resumeBanner, onClose]);

  const handleBack = useCallback(() => {
    if (onBack) {
      setIsEntering(false);
      setIsClosing(true);
      document.body.style.overflow = "unset";
      resumeBanner();
      setTimeout(() => {
        setShouldRender(false);
        onBack();
      }, 500);
    }
  }, [onBack, resumeBanner]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
      pauseBanner();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsEntering(true);
        });
      });
    } else if (shouldRender) {
      // Trigger close animation when isOpen becomes false
      setIsEntering(false);
      setIsClosing(true);
      document.body.style.overflow = "unset";
      resumeBanner();
      setTimeout(() => {
        setShouldRender(false);
      }, 500);
    }

    return () => {
      if (isOpen) {
        document.body.style.overflow = "unset";
        resumeBanner();
      }
    };
  }, [isOpen, pauseBanner, resumeBanner, shouldRender]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        // If back button exists, escape should trigger back action
        if (onBack) {
          handleBack();
        } else {
          handleClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, handleClose, handleBack, onBack]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`fixed inset-0 bg-black/50 overflow-y-auto no-scrollbar transition-opacity duration-500 ease-in-out ${
        isClosing ? "opacity-0" : isEntering ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex }}
      onClick={onBack ? handleBack : handleClose}
    >
      <div className="min-h-full flex items-center justify-center pt-8">
        <div
          className={`bg-zinc-900 rounded-lg shadow-2xl overflow-hidden transition-all duration-500 ease-in-out origin-center ${
            isClosing
              ? "scale-75 opacity-0"
              : isEntering
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
          } ${className}`}
          style={{
            transition:
              "opacity 500ms ease-in-out, transform 500ms ease-in-out, height 300ms ease-in-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {typeof children === "function"
            ? children({ handleClose, handleBack })
            : children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
