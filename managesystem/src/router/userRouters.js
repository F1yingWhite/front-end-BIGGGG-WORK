import { ClassificationPage } from "../pages/user/ClassificationPage";
import { MainPage } from "../pages/user/MainPage";
import { ShoppingCart } from "../pages/user/ShoppingCart";
import { UserDashboard } from "../pages/user/UserDashboard";
import { UserLogin } from "../pages/user/UserLogin";
import { UserPage } from "../pages/user/UserPage";

const userRouters = [
  {
    path: "login",
    element: <UserLogin />,
  },
  {
    path: "dashboard",
    element: <UserDashboard />,
    children: [
      {
        path: "home",
        element: <MainPage />
      },
      {
        path: "categories",
        element: <ClassificationPage />
      },
      {
        path: "cart",
        element: <ShoppingCart />
      },
      {
        path: "profile",
        element: <UserPage />
      },
    ]
  },
]

export default userRouters;