import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import MainLayout from "./pages/MainLayout/MainLayout";
import Home from "./pages/Home/Home";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}
