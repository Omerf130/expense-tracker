import { NavLink, useNavigate } from "react-router";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import "./Nav.scss";
import { IoHomeOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaMoon, FaSun } from "react-icons/fa";
import { IAuth, TLanguage, TTheme } from "../../interfaces/global";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { logoutUser, getUserById } from "../../services/api/user";
import Avatar from "./Avatar";
import { IRegisterForm } from "../../interfaces/user";
import { useTranslation } from "react-i18next";

interface NavProps {
  theme: TTheme;
  onToggleTheme: (theme: TTheme) => void;
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
  onToggleLanguage: (lng: TLanguage) => void;
  lang: TLanguage;
}

const Nav = ({
  onToggleTheme,
  theme,
  auth,
  setAuth,
  onToggleLanguage,
  lang,
}: NavProps) => {
  const [isMainNavOpen, setIsMainNavOpen] = useState(window.innerWidth > 768);
  const [userDetails, setUserDetails] = useState<IRegisterForm | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  useEffect(() => {
    if (auth?.userPayload?._id) {
      handleGetUser(auth.userPayload._id);
    }
  }, [auth]);

  const onLogout = async () => {
    try {
      await logoutUser();
      setAuth({ token: null, userPayload: null });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUser = async (id: string) => {
    try {
      const data = await getUserById(id);
      data && setUserDetails(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={`nav-container ${isMainNavOpen ? "open" : "close"}`}>
      <div className="main-nav">
        <div className="nav-logo">
          <RiMoneyCnyCircleLine fontSize={50} />
          <div className="nav-title">{t("NAV.NAV_LOGO")}</div>
        </div>
        <div className="settings-wrapper">
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
          <div className="nav-lang">
            <div className="lang-toggle">
              <div className={`lang-circle ${lang}`} />
              <div onClick={() => onToggleLanguage("he")}>He</div>
              <div onClick={() => onToggleLanguage("en")}>En</div>
            </div>
          </div>
        </div>
        <div className="nav-links">
          {auth.token ? (
            <>
              {userDetails && <Avatar userDetails={userDetails} />}

              <NavLink
                to="/myExpenses"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <GiMoneyStack fontSize={24} />
                <span> {t("NAV.LINK_MY_EXPENSES")}</span>
              </NavLink>
              {auth.userPayload?.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <GiMoneyStack fontSize={24} />
                  <span> {t("NAV.LINK_MY_EXPENSES")}</span>
                </NavLink>
              )}

              <button onClick={onLogout}>
                <GiMoneyStack fontSize={24} />
                <span> {t("NAV.LINK_LOGOUT")}</span>
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <IoHomeOutline fontSize={24} />
                <span>{t("NAV.LINK_HOME")}</span>
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <IoLogInOutline fontSize={24} />
                <span>{t("NAV.LINK_LOGIN")}</span>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <SiGnuprivacyguard fontSize={24} />
                <span> {t("NAV.LINK_REGISTER")}</span>
              </NavLink>
            </>
          )}
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
