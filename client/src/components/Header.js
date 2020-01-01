import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to={'/'} className="logo">
        <img width="50px" height="50px" src={Logo} />
        <h1>JoBot</h1>
      </Link>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon">
        <span className="navicon"></span>
      </label>
      <ul className="menu">
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

        {/* <li>
          <Link to={'/'} className="page hire-me">
            Hire Me
          </Link>
        </li> */}
      </ul>
    </header>
  );
};

export default Header;
