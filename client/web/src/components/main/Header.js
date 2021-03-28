/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import clx from 'classnames'
import { Link } from 'react-router-dom'
import useBreakpoints from 'hooks/useBreakpoints'
import logo from 'assets/logos/ballotnav.svg'
import Footer from 'components/main/Footer'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { openModal } from 'store/actions/modals'
import * as select from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import Div100vh from 'react-div-100vh'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    flex: 1,
  },
  jurisdictionName: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 700,
  },
  stateName: {
    color: theme.palette.primary.main,
    fontSize: 12,
    fontWeight: 400,
  },
}))

const Header = ({ openSearchModal, stateName, jurisdictionName }) => {
  const classes = useStyles()
  const { pathname } = useLocation()
  const [activeBurger, setActiveBurger] = useState(false)
  const { isMobile } = useBreakpoints()

  const handleClick = () => {
    setActiveBurger(!activeBurger)
  }

  const handleKeyDown = (e) => {
    if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== 'Alt') {
      handleClick(e)
    }
  }

  const isMobileMap = isMobile && ['/map'].includes(pathname)

  useEffect(() => {
    setActiveBurger(false)
  }, [pathname])

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
        {isMobileMap ? (
          <IconButton
            size="small"
            aria-label="search"
            onClick={openSearchModal}
          >
            <SearchIcon color="primary" fontSize="large" />
          </IconButton>
        ) : (
          <Link to="/" className="navbar-item">
            <img src={logo} alt="BallotNav logo"></img>
          </Link>
        )}
        {isMobileMap && (
          <div className={classes.title}>
            {jurisdictionName && stateName && (
              <>
                <div className={classes.jurisdictionName}>
                  {jurisdictionName}
                </div>
                <div className={classes.stateName}>{stateName}</div>
              </>
            )}
          </div>
        )}
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

const mapStateToProps = (state) => ({
  jurisdictionName: select.jurisdiction(state)?.name,
  stateName: select.state(state)?.name,
})

const mapDispatchToProps = (dispatch) => ({
  openSearchModal: () => dispatch(openModal('search')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
