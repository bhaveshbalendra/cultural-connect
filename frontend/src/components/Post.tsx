import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bookmark,
  Ellipsis,
  Heart,
  LucideShare,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

function Post() {
  return (
    <div className="max-w-[350px] border-2 border-cyan-100">
      <div className="flex items-center justify-between m-1">
        <Link to="/profile">
          <div className="flex items-center gap-2 ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>bhavesh / . 1h</span>
              <span>Original audio</span>
            </div>
          </div>
        </Link>
        <Button className="bg-transparent outline-none">
          <Ellipsis className="w-4" />
        </Button>
      </div>
      <div>
        <img
          className="w-full"
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1904&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="unsplash"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <Heart />
          <MessageCircle />
          <LucideShare />
        </div>
        <Bookmark />
      </div>
      <div>643 likes</div>
      <div>bhavesh Good day of monkeys</div>
      <div>view all 2,000 comments</div>
      <div>
        <span>Add a comments...</span>
        <span>😁</span>
      </div>
      <hr />
    </div>
  );
}

export default Post;
