import { NavLink } from "react-router";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import "./Nav.scss";
import { CONSTS } from "../../consts/consts";
import { IoHomeOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaMoon, FaSun } from "react-icons/fa";
import { TTheme } from "../../interfaces/global";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";

interface NavProps {
  theme: TTheme;
  onToggleTheme: (theme: TTheme) => void;
}

const Nav = ({ onToggleTheme, theme }: NavProps) => {
  const { LINK_HOME, LINK_LOGIN, LINK_REGISTER, NAV_LOGO } = CONSTS.NAV;
  const [isMainNavOpen, setIsMainNavOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMainNavOpen(true);
      } else {
        setIsMainNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`nav-container ${isMainNavOpen ? "open" : "close"}`}>
      <div className="main-nav">
        <div className="nav-logo">
          <RiMoneyCnyCircleLine fontSize={50} />
          <div className="nav-title">{NAV_LOGO}</div>
        </div>
        <div className="nav-dark">
          <div className="dark-toggle">
            <div className={`dark-circle ${theme}`} />
            <FaMoon
              color="#00308F"
              size={20}
              onClick={() => onToggleTheme("dark")}
            />
            <FaSun
              color="#BDB76B"
              size={20}
              onClick={() => onToggleTheme("light")}
            />
          </div>
        </div>
        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <IoHomeOutline fontSize={24} />
            <span>{LINK_HOME}</span>
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <IoLogInOutline fontSize={24} />
            <span>{LINK_LOGIN}</span>
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <SiGnuprivacyguard fontSize={24} />
            <span> {LINK_REGISTER}</span>
          </NavLink>
        </div>
      </div>
      {isMainNavOpen ? (
        <IoMdCloseCircleOutline
          className="close-icon"
          onClick={() => setIsMainNavOpen(false)}
        />
      ) : (
        <RxHamburgerMenu
          className="hamburger"
          onClick={() => setIsMainNavOpen(true)}
        />
      )}
    </nav>
  );
};

export default Nav;
