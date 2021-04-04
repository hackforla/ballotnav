import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import useAuthActions from 'store/actions/auth'
import { useAuth } from 'store/selectors'
import bnLogo from 'assets/logos/ballotnav.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 30,
    display: 'block',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    fontWeight: 700,
  },
  divider: {
    margin: '0 1em',
  },
  logout: {
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
}))

const HeaderTop = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const { logout } = useAuthActions()

  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={bnLogo} alt="Ballotnav logo" className={classes.logo} />
      </Link>
      <div className={classes.right}>
        <div className={classes.name}>
          { user.firstName } { user.lastName }
        </div>
        <div className={classes.divider}>|</div>
        <div className={classes.logout} onClick={logout}>Logout</div>
      </div>
    </div>
  )
}

export default HeaderTop
