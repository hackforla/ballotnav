import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
// import Footer from 'components/main/Footer'
import useBreakpoints from 'hooks/useBreakpoints'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
// import ballotnavLogo from 'assets/logos/ballotnav.svg'

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      overflow: 'hidden',
    },
    html: {
      overflow: 'hidden',
    }
  },
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backdropFilter: 'blur(50px)',
    background: 'rgba(4, 8, 34, 0.7)',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  links: {
    flex: 1,
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: 21,
    '& a': {
      color: 'inherit',
      display: 'block',
      marginBottom: 12,
    },
  },
}))

const Menu = ({ closeMenu }) => {
  const classes = useStyles()
  const { isDesktop } = useBreakpoints()

  if (isDesktop) return null
  return (
    <div className={classes.root}>
      <IconButton
        size="small"
        aria-label="close"
        onClick={closeMenu}
        style={{ marginBottom: 25 }}
      >
        <CloseIcon color='primary' style={{ fontSize: 32, color: 'white' }} />
      </IconButton>
      <div className={classes.links}>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/volunteer" onClick={closeMenu}>Volunteer</Link>
      </div>
    </div>
  )
}

export default Menu
