/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import clx from 'classnames'
import { Link } from 'react-router-dom'

import logo from '../../assets/ballotnav-logo.png'

const Header = ({ location: { pathname } }) => {
  const [activeBurger, setActiveBurger] = useState(false)

  const handleClick = () => {
    setActiveBurger(!activeBurger)
  }

  const handleKeyDown = (e) => {
    if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== 'Alt') {
      handleClick(e)
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="main navigation"
      className={clx('navbar', { map: ['/map'].includes(pathname) })}
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={logo} alt="BallotNav logo"></img>
        </Link>
        <a // eslint-disable-line
          role="button"
          tabIndex={0}
          className={clx('navbar-burger', { 'is-active': activeBurger })}
          aria-label="menu"
          aria-expanded={activeBurger}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div className={clx('navbar-menu', { 'is-active': activeBurger })}>
        <div className="navbar-end">
          <Link className="navbar-item" to="/about">
            About
          </Link>
          <Link className="navbar-item" to="/volunteer">
            Volunteer
          </Link>
          <Link className="navbar-item" to="/press">
            Press
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
