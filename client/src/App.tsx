import './App.scss'
import { Outlet } from 'react-router'
import Nav from './components/nav/Nav'
import { useState } from 'react'
import { TTheme } from './interfaces/global';

function App() {
  const [theme, setTheme] = useState<TTheme>("light");

  const onToggleTheme = (theme: TTheme) => {
    setTheme(theme);
  }

  return (
    <div className={`app ${theme}`}>
      <Nav onToggleTheme={onToggleTheme} theme={theme}/>
      <Outlet/>
    </div>
  )
}

export default App
