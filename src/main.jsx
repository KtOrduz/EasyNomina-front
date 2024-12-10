import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NotFound } from "./pages/NotFound.jsx";
import { Login } from "./pages/Login.jsx";
import { Admin } from "./pages/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
