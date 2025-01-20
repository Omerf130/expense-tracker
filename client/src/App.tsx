import './App.scss'
import { Outlet } from 'react-router'
import Nav from './components/nav/Nav'
import { useState } from 'react'
import { IAuth, TTheme } from './interfaces/global';

function App() {
  const [theme, setTheme] = useState<TTheme>("light");
  const [auth, setAuth] = useState<IAuth>({ token: null, userPayload: null });

  const onToggleTheme = (theme: TTheme) => {
    setTheme(theme);
  }

  return (
    <div className={`app ${theme}`}>
      <Nav onToggleTheme={onToggleTheme} theme={theme}/>
      <Outlet context={{ auth, setAuth }}/>
    </div>
  )
}

export default App
