import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import useBreakpoints from 'hooks/useBreakpoints'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { HomeButton } from './Buttons'
import Footer from 'components/core/Footer'

const useStyles = makeStyles((theme) => ({
  '@global': {
    'html,body': {
      overflow: ({ open, isDesktop }) =>
        open && !isDesktop ? 'hidden' : 'auto',
    },
  },
  root: {
    display: ({ isDesktop }) => (isDesktop ? 'none' : 'block'),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backdropFilter: 'blur(50px)',
    background: 'rgba(4, 8, 34, 0.7)',
    zIndex: 100,
    opacity: ({ open }) => (open ? 1 : 0),
    pointerEvents: ({ open }) => (open ? 'all' : 'none'),
    transition: 'all 0.25s ease-out',
    overflowX: 'hidden',
  },
  wrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 300,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    transform: ({ open }) => `translateX(${open ? 0 : '100%'})`,
    transition: 'all 0.25s ease-out',
  },
  header: {
    height: theme.layout.headerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 10px',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 30,
    color: theme.palette.primary.main,
    '& a': {
      color: 'inherit',
      display: 'block',
      marginBottom: 30,
      fontWeight: 600,
      fontSize: 21,
    },
  },
}))

const Menu = ({ isMenuOpen, closeMenu }) => {
  const { isDesktop } = useBreakpoints()
  const classes = useStyles({
    open: isMenuOpen,
    isDesktop,
  })

  const ignoreClick = useCallback((e) => e.stopPropagation(), [])

  return (
    <div className={classes.root} onClick={closeMenu}>
      <div className={classes.wrap} onClick={ignoreClick}>
        <div className={classes.header}>
          <IconButton size="small" aria-label="close" onClick={closeMenu}>
            <CloseIcon color="primary" style={{ fontSize: 32 }} />
          </IconButton>
        </div>
        <nav className={classes.content}>
          <div style={{ marginBottom: 30 }}>
            <HomeButton closeMenu={closeMenu} />
          </div>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
          <Link to="/volunteer" onClick={closeMenu}>
            Volunteer
          </Link>
        </nav>
        <Footer />
      </div>
    </div>
  )
}

export default Menu
