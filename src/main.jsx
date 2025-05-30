import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Routes from "../src/Routes.jsx";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>
);
