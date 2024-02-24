import React from "react";

const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          <label htmlFor="email">Username</label>
          <input type="text" name="userName" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="passWord" name="passWord" id="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
