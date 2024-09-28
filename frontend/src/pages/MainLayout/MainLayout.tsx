import LeftSideBar from "@/components/LeftSideBar";
import Home from "../Home/Home";

function MainLayout() {
  return (
    <div>
      <LeftSideBar />
      <div>
        <Home />
      </div>
    </div>
  );
}

export default MainLayout;
