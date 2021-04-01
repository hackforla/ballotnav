import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from 'store/actions/auth'
import { useAuth } from 'store/selectors'
import bnLogo from 'assets/logos/ballotnav.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 600,
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
  name: {},
  divider: {
    margin: '0 1em',
  },
  logout: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
}))

const HeaderTop = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const dispatch = useDispatch()

  const doLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

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
        <div className={classes.logout} onClick={doLogout}>Logout</div>
      </div>
    </div>
  )
}

export default HeaderTop
