import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      {/* <SideBar /> */}
      <div>
        {/* <Navbar /> */}
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
