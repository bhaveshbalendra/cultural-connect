import {
  Divide,
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

const sideBarItems = [
  {
    icon: <Home />,
    text: "Home",
  },
  {
    icon: <Search />,
    text: "search",
  },
  {
    icon: <MessageCircle />,
    text: "message",
  },
  {
    icon: <Heart />,
    text: "Notifications",
  },
  {
    icon: <PlusSquare />,
    text: "Create",
  },
  {
    icon: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "avatar",
  },
];
function LeftSideBar() {
  return (
    <div>
      {sideBarItems.map((item, index) => (
        <div key={index}>
          {item.icon} {item.text}
        </div>
      ))}
    </div>
  );
}

export default LeftSideBar;
