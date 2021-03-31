import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { logout } from 'store/actions/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'red',
    height: 50,
  },
}))

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const doLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <div className={classes.root}>
      Header
      <div onClick={doLogout}>Logout</div>
    </div>
  )
}

export default Header
