import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <h1>This will be here always</h1>
      {/* <SideBar /> */}
      <div>
        {/* <Navbar /> */}
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
