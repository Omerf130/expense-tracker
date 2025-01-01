import './App.scss'
import { Outlet } from 'react-router'
import Nav from './components/nav/Nav'

function App() {

  return (
    <div className='app'>
      <Nav/>
      <Outlet/>
    </div>
  )
}

export default App
