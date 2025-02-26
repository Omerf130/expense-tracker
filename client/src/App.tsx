import "./App.scss";
import { Outlet } from "react-router";
import Nav from "./components/nav/Nav";
import { useEffect, useState } from "react";
import { TLanguage, TTheme } from "./interfaces/global";
import useAuth from "./hooks/useAuth";
import { IExpense } from "./interfaces/expense";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

function App() {
  const [theme, setTheme] = useState<TTheme>("light");
  const { auth, setAuth } = useAuth();
  const [expenses, setExpenses] = useState<IExpense[] | null>(null);
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<TLanguage>(
    (localStorage.getItem("lang") as TLanguage) ?? "en"
  );
  useEffect(() => {
    if (document) {
      const bodyElement = document.querySelector("body");
      lang === "he"
        ? bodyElement?.classList.add("rtl")
        : bodyElement?.classList.remove("rtl");
    }
  }, [lang]);

  const onToggleLanguage = (lng: TLanguage) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  const onToggleTheme = (theme: TTheme) => {
    setTheme(theme);
  };

  return (
    <div className={`app ${theme}`}>
      <Nav
        onToggleTheme={onToggleTheme}
        theme={theme}
        auth={auth}
        setAuth={setAuth}
        onToggleLanguage={onToggleLanguage}
        lang={lang}
      />
      <Outlet context={{ auth, setAuth, expenses, setExpenses }} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={lang === "he"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  );
}

export default App;
