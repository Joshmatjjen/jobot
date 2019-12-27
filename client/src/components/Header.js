import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header class="header">
      <Link to={'/'} className="logo">
        <img width="50px" height="50px" src={Logo} />
        <h1>JoBot</h1>
      </Link>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul class="menu">
        <li>
          <Link to={'/shop'} className="page">
            Shop
          </Link>
        </li>

        <li>
          <Link to={'/about'} className="page">
            About Me
          </Link>
        </li>

        <li>
          <Link to={'/'} className="page hire-me">
            Hire Me
          </Link>
        </li>
      </ul>
    </header>
    // <nav>
    //   <div className="nav">
    //     <Link to={'/'} className="logo">
    //       <img width="50px" height="50px" src={Logo} />
    //       <h1>JoBot</h1>
    //     </Link>
    //     <ul className="nav-bar">
    //       <li>
    //         <Link to={'/shop'} className="page">
    //           Shop
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to={'/about'} className="page">
    //           About Me
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to={'/hire'} className="page">
    //           Hire Me
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default Header;
