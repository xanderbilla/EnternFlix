import {
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsFillPlayFill,
  BsGithub,
  BsInstagram,
  BsSearch,
} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";

export const iconMap = {
  // Navigation & UI
  chevronDown: BsChevronDown,
  chevronLeft: BsChevronLeft,
  chevronRight: BsChevronRight,
  home: AiOutlineHome,
  search: BsSearch,

  // Media Controls
  playFillLarge: BsFillPlayFill,

  // Social
  github: BsGithub,
  instagram: BsInstagram,
} as const;
