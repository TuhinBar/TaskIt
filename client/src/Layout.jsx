import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fetchOwnerLocal } from "./Utils/fetchUser";
import Sidebar from "./Componnets/Sidebar/Sidebar";

import classes from "./Layout.module.css";

const Layout = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const user = fetchOwnerLocal();
    console.log("User", user);
    if (!user) {
      localStorage.removeItem("user");
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className={classes.mainContainer}>
      <Sidebar />
      <div className={classes.bodyContainer}>
        <Outlet />
      </div>

      <ToastContainer
        transition={Slide}
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        closeButton={false}
      />
    </main>
  );
};

export default Layout;
