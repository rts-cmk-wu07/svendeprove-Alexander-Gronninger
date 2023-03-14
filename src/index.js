import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ClassDetails from "./pages/ClassDetails";
import Search from "./pages/Search";
import Calendar from "./pages/Calendar";
import Signups from "./pages/Signups";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    index: true,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/klasse/:id", element: <ClassDetails /> },
      { path: "/søg", element: <Search /> },
      { path: "/kalender", element: <Calendar /> },
      { path: "/signups", element: <Signups /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
