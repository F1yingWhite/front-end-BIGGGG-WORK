import { UserDashboard } from "../pages/user/UserDashboard";
import { UserLogin } from "../pages/user/UserLogin";

const userRouters = [
  {
    path: "login",
    element: <UserLogin />,
  },
  {
    path: "dashboard",
    element: <UserDashboard />,
    children: [

    ]
  },
]

export default userRouters;