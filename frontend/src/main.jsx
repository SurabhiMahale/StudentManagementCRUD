import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Register from "./pages/Register.jsx";

const checkIfAuthorised = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api`, {
      headers: {
        "auth-token": token,
      },
    });
    return res.data.user;
  } catch (error) {
    localStorage.clear();
    return redirect("/login");
  }
};

const loginLoader = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api`, {
      headers: {
        "auth-token": token,
      },
    });
    return redirect("/");
  } catch (error) {
    localStorage.clear();
    console.log(error);
    // return redirect("/login");
    return null;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: checkIfAuthorised,
  },
  {
    path: "/login",
    element: <Login />,
    loader: loginLoader,
  },
  {
    path: "/register",
    element: <Register />,
    loader: loginLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
