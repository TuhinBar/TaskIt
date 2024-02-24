import React, { useState } from "react";
import classes from "./Forms.module.css";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const LoginForm = (props) => {
  const [showVisibleText, setShowVisibleText] = useState(false);

  const handleVisibleToggle = () => {
    setShowVisibleText(!showVisibleText);
  };

  return (
    <div>
      <form className={classes.form} onSubmit={props.onSubmit}>
        <div className={classes.inputtags}>
          <FaRegUser className={classes.icons} />
          <input
            className={classes.input}
            placeholder="Username"
            type="text"
            name="userName"
            id="email"
          />
        </div>
        <div>
          <MdOutlineLock className={classes.icons} />
          <input
            className={classes.input}
            placeholder="Password"
            type={showVisibleText ? "text" : "password"}
            name="passWord"
            id="password"
          />
          {showVisibleText ? (
            <IoMdEyeOff
              size={20}
              className={classes.showhidepw}
              onClick={handleVisibleToggle}
            />
          ) : (
            <IoMdEye
              size={20}
              className={classes.showhidepw}
              onClick={handleVisibleToggle}
            />
          )}
        </div>
        <button className={classes.loginbtn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
