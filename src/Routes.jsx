import { createBrowserRouter } from "react-router";
import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Contact from "../src/Pages/Contact";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about-us",
    element: <About />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
]);
export default Routes;
