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
  chevronDown: BsChevronDown,
  chevronLeft: BsChevronLeft,
  chevronRight: BsChevronRight,
  home: AiOutlineHome,
  search: BsSearch,

  playFillLarge: BsFillPlayFill,

  github: BsGithub,
  instagram: BsInstagram,
} as const;
