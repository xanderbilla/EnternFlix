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
  BsGrid3X3Gap,
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
import { HiOutlineViewList } from "react-icons/hi";

export const iconMap = {
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
  list: HiOutlineViewList,
  grid: BsGrid3X3Gap,

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
