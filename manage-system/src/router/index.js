import { createBrowserRouter, Outlet } from "react-router-dom";
import userRouters from "./userRouters";
import manageRouters from "./manageRouters";

const router = createBrowserRouter([
  {
    path: "/manage",
    element: <Outlet />,
    children: manageRouters
  },
  {
    path: "/user",
    element: <Outlet />,
    children: userRouters
  }
]);

export default router;
