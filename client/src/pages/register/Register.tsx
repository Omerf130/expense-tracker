import React from 'react'
import "./Register.scss";

const Register = () => {
  return (
    <div className="page">
      <div className="cover">
        <h1>Sign Up</h1>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="E-Mail" />
        <input type="password" placeholder="password" />
        <div className="signup-btn">Sign Up</div>

        <p className="text">Or Sign Up Using</p>
        
        <div className="alt-signup">
          <div className="facebook"></div>
          <div className="google"></div>
        </div>
      </div>
    </div>
  );
};

export default Register