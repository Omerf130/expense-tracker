import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import Nav from './components/nav/Nav'

function App() {
  const [] = useState(0)

  return (
    <div className='app'>
      <Nav/>
      <Outlet/>
      
    </div>
  )
}

export default App
