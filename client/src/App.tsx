import './App.scss'
import { Outlet } from 'react-router'
import Nav from './components/nav/Nav'
import { useState } from 'react'
import { TTheme } from './interfaces/global';
import useAuth from './hooks/useAuth';
import { IExpense } from './interfaces/expense';

function App() {
  const [theme, setTheme] = useState<TTheme>("light");
  const { auth, setAuth } = useAuth();
  const [expenses,setExpenses] = useState<IExpense[] | null>(null);


  const onToggleTheme = (theme: TTheme) => {
    setTheme(theme);
  }

  return (
    <div className={`app ${theme}`}>
      <Nav onToggleTheme={onToggleTheme} theme={theme} auth={auth} setAuth={setAuth}/>
      <Outlet context={{ auth, setAuth, expenses, setExpenses }}/>
    </div>
  )
}

export default App