import React from 'react';
import './nav.css'
import { checkLogin, logout } from './Utils/auth';
import { useEffect, useState } from 'react';

function Nav() {

  const [is_parent, setIsParent] = useState(null);

  useEffect(() => {
    checkParent();
  }, []);

  async function checkParent() {
    const result = await checkLogin();
    const is_parent = result.is_parent.data[0];
    setIsParent(is_parent);
  }


  if (is_parent === 0) {
    return <div className='nav-container'>
      <nav className='nav'>
        <ul className='nav-links'>
          <li> <h1 className='logo-title'>Study Buddy</h1></li>
          <li><a href="/"> Home </a></li>
          <li><a href="/work"> Work Mode </a></li>
          <li><a href="/login" onClick={logout}> Logout </a></li>
        </ul>
      </nav>
      <div className="bar"> </div>
    </div>
  } else {
    return <div className='nav-container'>
      <nav className='nav'>
        <ul className='nav-links'>
          <li> <h1 className='logo-title'>Study Buddy</h1></li>
          <li><a href="/login" onClick={logout}> Logout </a></li>
        </ul>
      </nav>
      <div className="bar"> </div>
    </div>
  }

}

export default Nav;