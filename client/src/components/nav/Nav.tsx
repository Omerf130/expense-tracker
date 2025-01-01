import { NavLink } from "react-router";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import "./Nav.scss";
import { CONSTS } from "../../consts/consts";
import { IoHomeOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";



const Nav = () => {
  const {LINK_HOME, LINK_LOGIN, LINK_REGISTER, NAV_LOGO} = CONSTS.NAV;

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <RiMoneyCnyCircleLine fontSize={50}/>
        <div className="nav-title">{NAV_LOGO}</div>
      </div>
      <div className="nav-links">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        <IoHomeOutline fontSize={24}/>
        <span>{LINK_HOME}</span>
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        <IoLogInOutline fontSize={24}/>
        <span>{LINK_LOGIN}</span>
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        <SiGnuprivacyguard fontSize={24}/>
       <span> {LINK_REGISTER}</span>
      </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
