import { createBrowserRouter } from "react-router";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminLayout from "./Components/Layout/AdminLayout";
import Choose from "./Pages/Choose";
import Tree from "./Pages/Tree";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup role={"user"} />,
  },
  {
    path: "/admin/signup",
    element: <Signup role={"admin"} />,
  },
  {
    path: "/subAdmin/signup",
    element: <Signup role={"subadmin"} />,
  },
  {
    path: "/choose",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Choose />,
      },
      {
        path: "*",
        element: <h1>Page Not Found! 404</h1>,
      },
    ],
  },
  {
    path: "/tree",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Tree />,
      },
      {
        path: "*",
        element: <h1>Page Not Found! 404</h1>,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found! 404</h1>,
  },
]);
export default Routes;
