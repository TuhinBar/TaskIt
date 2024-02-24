import React, { useEffect } from "react";
import classes from "./Login.module.css";
import LoginForm from "../../Componnets/Forms/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../store/store";
import { login } from "../../store/features/userActions";
import { ToastContainer, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error, user } = useSelector(userSelector);

  useEffect(() => {
    if (user) {
      navigate("/tasks");
    }
  }, [user, navigate]);
  useEffect(() => {
    if (success) {
      toast.success(`Welcome back! ${user.userName}`);
      navigate("/tasks");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, props.history]);

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      userName: formData.get("userName"),
      passWord: formData.get("passWord"),
    };
    dispatch(login(data));
  };
  return (
    <div className={classes.container}>
      <div className={classes.loginDivImg}>
        <div>
          <h1>Task It</h1>
          <p>
            The best way to manage your tasks. <br />
          </p>
        </div>

        <img
          className={classes["login-img"]}
          src="https://i.imgur.com/JnNgP5S.jpeg"
          alt="Task It"
        />
      </div>
      <div className={classes.loginForm}>
        <h2>Welcome to Task It</h2>
        <LoginForm onSubmit={handleLogin} />
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
    </div>
  );
};

export default Login;
