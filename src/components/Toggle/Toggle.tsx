import React from "react";
import { ToggleProps } from "@/types/components";
import { memo } from "react";

const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  name,
  ariaLabel,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        name={name}
        aria-label={ariaLabel}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
    </label>
  );
};

export default memo(Toggle);
