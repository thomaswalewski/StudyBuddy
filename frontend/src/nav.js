import React from 'react';
import './nav.css'

function Nav() {
  return <div className='nav-container'>
    <nav className='nav'>
      <ul className='nav-links'>
        <li> <h1 className='logo-title'>Study Buddy</h1></li>
        <li><a href="/"> Home </a></li>
        <li><a href="/work"> Work Mode </a></li>
        <li><a href="/parent"> Parent Mode</a></li>
        <li><a href="/login"> Logout </a></li>
      </ul>
    </nav>
    <div className="bar"> </div>
  </div>

}

export default Nav;