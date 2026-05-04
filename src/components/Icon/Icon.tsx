import type { IconProps, IconName } from "@/types/components";
import React from "react";
import { memo } from "react";
import { iconMap } from "@/constants/iconMap";
import { customIcons } from "@/constants/customIcons";
import { logger } from "@/lib/logger/logger";

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = "",
  color = "currentColor",
  onClick,
  "aria-label": ariaLabel,
  ...props
}) => {
  if (name in iconMap) {
    const IconComponent = iconMap[name as keyof typeof iconMap];
    return (
      <IconComponent
        size={size}
        className={className}
        color={color}
        onClick={onClick}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }

  if (name in customIcons) {
    const CustomIcon = customIcons[name as keyof typeof customIcons];
    return (
      <CustomIcon
        width={size}
        height={size}
        className={className}
        style={color ? { color } : undefined}
        onClick={onClick}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }

  logger.warn(`Icon "${name}" not found`);
  return null;
};

export default memo(Icon);
