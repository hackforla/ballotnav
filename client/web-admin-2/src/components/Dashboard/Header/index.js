import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { logout } from 'store/actions/auth'
import { useAuth } from 'store/selectors'
import HomeButton from './HomeButton'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: '#041B54',
    height: theme.layout.headerHeight,
  },
  inner: {
    margin: '0 auto',
    width: theme.layout.pageWidth,
    maxWidth: '100%',
    padding: 10,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    marginRight: '1em',
  },
  logout: {
    cursor: 'pointer',
  },
}))

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user } = useAuth()

  const doLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <HomeButton />
        <div className={classes.right}>
          <div className={classes.name}>
            { user.firstName } { user.lastName }
          </div>
          <div className={classes.logout} onClick={doLogout}>Logout</div>
        </div>
      </div>
    </div>
  )
}

export default Header
