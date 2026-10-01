import { SlSocialTwitter } from "react-icons/sl";
import { RiFileVideoLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoLinkSharp, IoHomeOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

//

export const sidebarItems = [
  {
    id: 1,
    name: "Home",
    icon: IoHomeOutline,
  },
  {
    id: 2,
    name: "Tweet",
    icon: SlSocialTwitter,
  },
  {
    id: 3,
    name: "Document",
    icon: IoDocumentTextOutline,
  },
  {
    id: 4,
    name: "Brainthought",
    icon: IoLinkSharp,
  },
  {
    id: 5,
    name: "Youtube",
    icon: RiFileVideoLine,
  },
  {
    id: 6,
    name: "Logout",
    icon: FiLogOut,
  },
];
