import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    margin: '0 1em',
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 600,
  },
  active: {
    textDecoration: 'none',
    cursor: 'default',
  },
}))

const AuthRight = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Link
        className={classes.link}
        activeClassName={classes.active}
        to="/login"
      >
        Login
      </Link>
      <div className={classes.divider}>|</div>
      <Link
        className={classes.link}
        activeClassName={classes.active}
        to="/register"
      >
        Register
      </Link>
    </div>
  )
}

export default AuthRight
