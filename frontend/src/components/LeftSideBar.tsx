import React, { useState } from "react";
import {
  Heart,
  Calendar,
  Home as HomeIcon,
  MessageCircle,
  PlusSquare,
  Search,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreatePost from "./CreatePost";

const sideBarItems = [
  { icon: <HomeIcon />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <Calendar />, text: "Events" },
  { icon: <MessageCircle />, text: "Message" },
  { icon: <Heart />, text: "Notifications" },
  { icon: <PlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className="w-7 h-7">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
];

function LeftSideBar() {
  const [dialog, setDialog] = useState(false);

  function handleDialog(text: string) {
    if (text === "Create") {
      setDialog(true); // Open dialog when "Create" is clicked
    }
  }

  return (
    <div className="flex flex-col h-screen gap-6 p-4">
      <span className="px-4 py-2 font-bold text-white bg-red-400 rounded-lg">
        Cultural Connect
      </span>
      <div className="flex-grow">
        {sideBarItems.map((item, index) => (
          <button
            onClick={() => handleDialog(item.text)}
            className="flex justify-start mb-5"
            key={index}
          >
            <div className="flex items-center w-full gap-2 p-3 transition-colors rounded-lg hover:bg-neutral-200">
              <span>{item.icon}</span>
              <span className="capitalize">{item.text}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 p-3 transition-colors rounded-lg hover:bg-neutral-200">
        <LogOut />
        <span className="capitalize">Logout</span>
      </div>

      {/* Dialog Component */}
      <CreatePost open={dialog} setOpen={setDialog} />
    </div>
  );
}

export default LeftSideBar;
