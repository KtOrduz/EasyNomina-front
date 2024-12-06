import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HomePage } from "./pages/HomePage.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Login } from "./pages/Login.jsx";
import { Admin } from "./pages/Admin.jsx";
import Employees from "./pages/Module/Admin/Employees.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/Login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/Admin",
    element: <Admin/>,
    errorElement: <NotFound />,
  },
  {
    path: "/Admin/Employees",
    element: <Employees />,
    errorElement: <NotFound />, 
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
