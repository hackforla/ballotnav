/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import clx from 'classnames'
import { Link } from 'react-router-dom'

import logo from '../../assets/ballotnav-logo.png'

import Footer from 'components/main/Footer'

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
      <div
        className={clx('backgroundBlur', { 'is-active': activeBurger })}
        onClick={handleClick}
      ></div>
      <div className={clx('navbar-brand', { 'is-active': activeBurger })}>
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
        <div className="hamburger-menu">
          <div className="hamburger-menu-content">
            <img src={logo} alt="" />
            <a className="navbar-item" href="/about">
              About
            </a>
            <a className="navbar-item" href="/volunteer">
              Volunteer
            </a>
            <a className="navbar-item" href="/press">
              Press
            </a>
          </div>
          <Footer />
        </div>
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
