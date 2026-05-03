"use client";

import type { BaseDialogProps } from "@/types/components";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useVideo } from "@/contexts/VideoContext";

export default function BaseDialog({
  isOpen,
  onClose,
  onBack,
  children,
  zIndex = 9999,
  className = "",
  ariaLabel,
  ariaLabelledBy,
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
      // Animation lifecycle: `shouldRender` and `isEntering`/`isClosing` mirror
      // the open/close transition driven by the `isOpen` prop. They cannot be
      // pure derivations because the closing phase must persist after `isOpen`
      // flips to false (so the exit animation can play before unmount). This
      // is a synchronization-with-an-external-system pattern (the DOM body
      // overflow + the banner controller).
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
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
      role="presentation"
    >
      <div className="min-h-full flex items-center justify-center py-8">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? "Dialog")}
          aria-labelledby={ariaLabelledBy}
          className={`bg-zinc-900 rounded-lg shadow-2xl overflow-hidden transition-all duration-500 ease-in-out origin-center ${
            isClosing
              ? "scale-75 opacity-0"
              : isEntering
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
          } ${className}`}
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
