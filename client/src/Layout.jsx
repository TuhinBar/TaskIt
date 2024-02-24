import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fetchOwnerLocal } from "./Utils/fetchUser";

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
    <main>
      <h1>This will be here always</h1>
      {/* <SideBar /> */}
      <div>
        {/* <Navbar /> */}
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
