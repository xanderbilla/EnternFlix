import { useCallback, useEffect, useRef } from "react";

interface UseDropdownReturn {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export function useDropdown(
  isOpen: boolean,
  onClose: () => void,
): UseDropdownReturn {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return { dropdownRef };
}
