import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function RightSideBar() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Link to="/profile">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <span>bhavesh / . 1h</span>
              <span>Original audio</span>
            </div>
          </div>
        </Link>
        <button className="text-center">switch</button>
      </div>
      <div>
        <h3>Suggested for you</h3>
        <div className="flex items-center justify-between">
          <Link to="/profile">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <span>bhavesh / . 1h</span>
                <span>Original audio</span>
              </div>
            </div>
          </Link>
          <button className="text-center">follow</button>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
