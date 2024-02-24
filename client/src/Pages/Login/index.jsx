import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import LoginForm from "../../Componnets/Forms/LoginForm";
import { login, signup } from "../../store/features/userActions";
import { userSelector } from "../../store/store";
import classes from "./Login.module.css";
import { useLocation } from "react-router-dom";
import SignupForm from "../../Componnets/Forms/SignupForm";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentTab = location.pathname;
  const { success, error, user } = useSelector(userSelector);

  useEffect(() => {
    if (user) {
      navigate("/teams");
    }
  }, [user, navigate]);
  useEffect(() => {
    if (success) {
      toast.success(`Welcome back! ${user.userName}`);
      navigate("/teams");
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

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      userName: formData.get("userName"),
      passWord: formData.get("passWord"),
      confirmPassword: formData.get("confirmPassword"),
    };
    if (data.passWord !== data.confirmPassword) {
      toast.error("Passwords does not match");
      return;
    }
    dispatch(signup(data));
  };

  return (
    <div className={classes.container}>
      <div className={classes.loginDivImg}>
        <div>
          <h1>Task It</h1>
          <p>
            Welcome to your task management system.
            <br />
          </p>
        </div>

        {/* <img
          className={classes["login-img"]}
          src="https://i.imgur.com/JnNgP5S.jpeg"
          alt="Task It"
        /> */}
      </div>
      {currentTab === "/login" ? (
        <div className={classes.loginForm}>
          <h2>Login</h2>
          <LoginForm onSubmit={handleLogin} />
          <p>
            Don't have an account? <Link to="/signup">Click here</Link>
          </p>
        </div>
      ) : (
        <div className={classes.loginForm}>
          <h2>Signup</h2>
          <SignupForm onSubmit={handleSignup} />
          <p>
            Already have an account? <Link to="/login">Click here</Link>
          </p>
        </div>
      )}
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
