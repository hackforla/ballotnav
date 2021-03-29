import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import MenuButton from './MenuButton'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: theme.layout.pageWidth,
    maxWidth: '100%',
  },
  links: {
    display: 'flex',
    alginItems: 'stretch',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  link: {
    fontWeight: 600,
    fontSize: 18,
    color: theme.palette.primary.main,
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    width: ({ menuOpen }) => menuOpen ? '100vw' : 0,
  },
  menuContent: {
    flex: 1,
    '& img': {
      margin: '20px 20px 90px',
      height: '23px',
    },
    '& a': {
      marginLeft: 15,
      fontWeight: 600,
      fontSize: '1.31em',
      marginBottom: 15,
    }
  }
}))

const Header = ({ openSearchModal, stateName, jurisdictionName }) => {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile } = useBreakpoints()
  const isMobileMap = isMobile && pathname === '/map'
  const classes = useStyles({ menuOpen })

  const handleClick = useCallback(() => {
    setMenuOpen((menuOpen) => !menuOpen)
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== 'Alt') {
      handleClick(e)
    }
  }, [handleClick])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav
      role="navigation"
      aria-label="main navigation"
      className={clsx(classes.root, 'navbar')}>
      <div className={clsx('navbar-brand', { 'is-active': menuOpen })}>
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
        {isMobile && (
          <MenuButton
            menuOpen={menuOpen}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
      <div className={clsx('navbar-menu', { 'is-active': menuOpen })}>
        {isMobile && (
          <Div100vh className={classes.menu}>
            <div className={classes.menuContent}>
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
        )}
        {!isMobile && (
          <div className={classes.links}>
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/volunteer">
              Volunteer
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

const mapDispatchToProps = (dispatch) => ({
  openSearchModal: () => dispatch(openModal('search')),
})

export default connect(null, mapDispatchToProps)(Header)
