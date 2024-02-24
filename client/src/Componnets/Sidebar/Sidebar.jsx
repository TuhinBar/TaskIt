import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.css";
import { MdDashboard, MdExitToApp, MdPeople, MdPortrait } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";

const sideBarMenus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard size={25} />,
  },

  {
    name: "Teams",
    path: "/teams",
    icon: <MdPeople size={25} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <MdPortrait size={25} />,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className={classes.nav}>
      {/* <h1>Task It</h1> */}
      <ul className={classes.navUl}>
        {sideBarMenus.map((menu, index) => (
          <li
            className={classes.menu}
            key={index}
            onClick={() => navigate(menu.path)}
          >
            {menu.icon}
            {/* <p>{menu.name}</p> */}
          </li>
        ))}
        <button
          title="Logout"
          className={classes.logout}
          onClick={() => dispatch(logout())}
        >
          <MdExitToApp size={20} />
        </button>
      </ul>
    </nav>
  );
};

export default Sidebar;
