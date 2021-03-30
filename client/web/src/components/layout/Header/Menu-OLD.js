import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Footer from 'components/main/Footer'

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      overflow: 'hidden',
    },
    html: {
      overflow: 'hidden',
    }
  },
  menu: {
    position: 'absolute',
    top: theme.layout.headerHeight,
    right: 0,
    height: `calc(100vh - ${theme.layout.headerHeight}px)`,
    width: '100vw',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
  },
  links: {
    marginTop: 50,
    marginLeft: 20,
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 21,
    '& a': {
      color: 'inherit',
      display: 'block',
      marginBottom: 30,
    },
  },
}))

const Menu = ({ closeMenu }) => {
  const classes = useStyles()

  return (
    <div className={classes.menu}>
      <div className={classes.content}>
        <div className={classes.links}>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/volunteer" onClick={closeMenu}>Volunteer</Link>
        </div>
      </div>
      <Footer showOnMapPage />
    </div>
  )
}

export default Menu
