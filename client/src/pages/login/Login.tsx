import React, { useState } from "react";
import "./Login.scss";
import { ILoginForm } from "../../interfaces/user";
import { loginUser } from "../../services/api/user";
import { useNavigate, useOutletContext } from "react-router";
import { OutletContext } from "../../interfaces/global";
import { getTokenAndPayload } from "../../utils/utils";

const Login = () => {
  const { auth, setAuth } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  const initialState = { userName: "", password: "" };

  const [loginForm, setLoginForm] = useState<ILoginForm>(initialState);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser(loginForm);
      const { token, userPayload } = getTokenAndPayload();
      if (token) {
        setAuth({token, userPayload});
        navigate("/myExpenses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(auth);

  return (
    <div className="page">
      <form className="cover" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) =>
            setLoginForm({ ...loginForm, userName: e.target.value })
          }
          value={loginForm.userName}
          required
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
          value={loginForm.password}
          required
        />
        <button type="submit" className="login-btn">
          Login
        </button>
        <div className="alt-login">
          <div className="google"></div>
        </div>
      </form>
    </div>
  );
};

export default Login;
