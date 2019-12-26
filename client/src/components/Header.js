import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <nav>
      <div className="nav">
        <Link to={'/'} className="logo">
          <img width="50px" height="50px" src={Logo} />
          <h1>JoBot</h1>
        </Link>
        <ul className="nav-bar">
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
            <Link to={'/hire'} className="page">
              Hire Me
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
