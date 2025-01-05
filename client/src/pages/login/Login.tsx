import React from "react";
import "./Login.scss";

const Login = () => {
  return (
    <div className="page">
      <div className="cover">
        <h1>Login</h1>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <div className="login-btn">Login</div>

        <p className="text">Or Login Using</p>
        
        <div className="alt-login">
          <div className="facebook"></div>
          <div className="google"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
