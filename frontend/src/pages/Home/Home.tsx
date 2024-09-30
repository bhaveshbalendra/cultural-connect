import Feed from "@/components/Feed";
import RightSideBar from "@/components/RightSideBar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="flex">
      <div className="flex-grow">
        {/* <Feed /> */}
        <Outlet />
      </div>
      <RightSideBar />
    </div>
  );
}

export default Home;
