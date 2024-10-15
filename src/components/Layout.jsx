import React from 'react'
import Navbar from './navbar'
import Foter from './Foter'
import './Layout.css'

function Layout({children}) {
  return (
    <div className='layout-container'>
    <Navbar/>
      <main>
       {children} 
    </main>
    <footer>
    <Foter/>
    </footer>  
    </div>
  )
}

export default Layout