import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.css";
import { MdDashboard } from "react-icons/md";

const sideBarMenus = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: <MdDashboard size={25} />,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: <MdDashboard size={25} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <MdDashboard size={25} />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <nav className={classes.nav}>
      <h1>Task It</h1>
      <ul>
        {sideBarMenus.map((menu, index) => (
          <li
            className={classes.menu}
            key={index}
            onClick={() => navigate(menu.path)}
          >
            {menu.icon}
            <p>{menu.name}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
