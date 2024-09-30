import LeftSideBar from "@/components/LeftSideBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex justify-center w-full min-h-screen bg-slate-200">
      <div className="w-[1500px] mx-10 h-full">
        <div className="flex ">
          {/* Sidebar */}
          <div className="fixed ">
            <LeftSideBar />
          </div>
          <div className="w-48 min-h-dvh bg-slate-500"></div>
          <div className="flex-grow bg-purple-400 min-h-dvh">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
