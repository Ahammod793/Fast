import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import '../index.css'
import { themeProvider } from '../thame/ThameContext'
import NavBar from './NavBar'
import Footer from './Footer'
export default function Main() {
    const {theme} = useContext(themeProvider) 
  return (
    <div className={`bg-primary text-secondary duration-500 min-h-screen ${theme ? 'light' : 'dark'}`}> 
  <NavBar />
  <Outlet />
  
  <Footer />
  
</div>

  )
}
