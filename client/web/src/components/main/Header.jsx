import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from "../../assets/ballotnav-logo.png";

const Header = () => {
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={logo} />
        </Link>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <a className="navbar-item">
            About
          </a>
          <a className="navbar-item">
            Volunteer
          </a>
          <a className="navbar-item">
            Press
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;