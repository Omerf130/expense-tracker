import { NavLink } from "react-router";
import "./Nav.scss";

const Nav = () => {
  return (
    <nav className="nav-container">
      <div className="nav-logo"></div>

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Register
      </NavLink>
    </nav>
  );
};

export default Nav;
