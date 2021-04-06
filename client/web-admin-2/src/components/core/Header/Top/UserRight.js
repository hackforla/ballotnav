import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useAuthActions from 'store/actions/auth'
import { useAuth } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
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
    },
  },
}))

const UserRight = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const { logout } = useAuthActions()

  return (
    <div className={classes.root}>
      <div className={classes.name}>
        {user.firstName} {user.lastName}
      </div>
      <div className={classes.divider}>|</div>
      <div className={classes.logout} onClick={logout}>
        Logout
      </div>
    </div>
  )
}

export default UserRight
