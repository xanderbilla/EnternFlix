import React from "react";
import {
  BsBell,
  BsChevronDown,
  BsList,
  BsChevronLeft,
  BsChevronRight,
  BsFillPlayFill,
  BsPlayFill,
  BsPlay,
  BsFacebook,
  BsGithub,
  BsInstagram,
} from "react-icons/bs";
import { AiOutlineInfoCircle, AiOutlineHome } from "react-icons/ai";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDown,
  IoMdAdd,
} from "react-icons/io";
import { SlLike } from "react-icons/sl";
import { HiOutlineUser, HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { LiaUserEditSolid } from "react-icons/lia";
import { FiLogOut } from "react-icons/fi";
import { PiVideoCamera } from "react-icons/pi";

// Icon mapping for react-icons
const iconMap = {
  // Navigation & UI
  bell: BsBell,
  chevronDown: BsChevronDown,
  menu: BsList,
  chevronLeft: BsChevronLeft,
  chevronRight: BsChevronRight,
  arrowForward: IoIosArrowForward,
  arrowBack: IoIosArrowBack,
  arrowDown: IoIosArrowDown,
  home: AiOutlineHome,

  // Media Controls
  play: BsPlay,
  playFill: BsPlayFill,
  playFillLarge: BsFillPlayFill,
  info: AiOutlineInfoCircle,
  add: IoMdAdd,
  like: SlLike,
  video: PiVideoCamera,

  // User & Account
  user: HiOutlineUser,
  userEdit: LiaUserEditSolid,
  help: HiOutlineQuestionMarkCircle,
  logout: FiLogOut,

  // Social
  facebook: BsFacebook,
  github: BsGithub,
  instagram: BsInstagram,
} as const;

// Custom SVG icons
const customIcons = {
  search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
        clipRule="evenodd"
      />
    </svg>
  ),
} as const;

export type IconName = keyof typeof iconMap | keyof typeof customIcons;

export interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  color?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = "",
  color = "currentColor",
  onClick,
  "aria-label": ariaLabel,
  ...props
}) => {
  // Check if it's a react-icon
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

  // Check if it's a custom SVG icon
  if (name in customIcons) {
    const CustomIcon = customIcons[name as keyof typeof customIcons];
    return (
      <CustomIcon
        width={size}
        height={size}
        className={className}
        style={{ color }}
        onClick={onClick}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }

  // Fallback for unknown icons (only warn in development)
  if (process.env.NODE_ENV === "development") {
    console.warn(`Icon "${name}" not found`);
  }
  return null;
};

export default Icon;
