import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import Div100vh from 'react-div-100vh'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import useBreakpoints from 'hooks/useBreakpoints'
import { openModal } from 'store/actions/modals'
import logo from 'assets/logos/ballotnav.svg'
import Footer from 'components/main/Footer'
import CurrentJurisdiction from './CurrentJurisdiction'

const Header = ({ openSearchModal, stateName, jurisdictionName }) => {
  const { pathname } = useLocation()
  const [activeBurger, setActiveBurger] = useState(false)
  const { isMobile } = useBreakpoints()
  const isMobileMap = isMobile && pathname === '/map'

  const handleClick = useCallback(() => {
    setActiveBurger((activeBurger) => !activeBurger)
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== 'Alt') {
      handleClick(e)
    }
  }, [handleClick])

  useEffect(() => {
    setActiveBurger(false)
  }, [pathname])

  return (
    <nav role="navigation" aria-label="main navigation" className="navbar">
      <div
        className={clsx('backgroundBlur', { 'is-active': activeBurger })}
        onClick={handleClick}
      ></div>
      <div className={clsx('navbar-brand', { 'is-active': activeBurger })}>
        {isMobileMap ? (
          <>
            <IconButton
              size="small"
              aria-label="search"
              onClick={openSearchModal}
            >
              <SearchIcon color="primary" fontSize="large" />
            </IconButton>
            <CurrentJurisdiction />
          </>
        ) : (
          <Link to="/" className="navbar-item">
            <img src={logo} alt="BallotNav logo" />
          </Link>
        )}
        <a // eslint-disable-line
          role="button"
          tabIndex={0}
          className={clsx('navbar-burger', { 'is-active': activeBurger })}
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
      <div className={clsx('navbar-menu', { 'is-active': activeBurger })}>
        <Div100vh className="hamburger-menu">
          <div className="hamburger-menu-content">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/volunteer">
              Volunteer
            </Link>
          </div>
          <Footer />
        </Div100vh>
        <div className="navbar-end">
          <Link className="navbar-item" to="/about">
            About
          </Link>
          <Link className="navbar-item" to="/volunteer">
            Volunteer
          </Link>
        </div>
      </div>
    </nav>
  )
}

const mapDispatchToProps = (dispatch) => ({
  openSearchModal: () => dispatch(openModal('search')),
})

export default connect(null, mapDispatchToProps)(Header)
