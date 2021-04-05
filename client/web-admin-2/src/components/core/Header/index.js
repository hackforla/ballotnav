import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from 'store/selectors'
import Top from './Top'
import Tabs from './Tabs'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: '#041B54',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: ({ isAuth }) => isAuth ? 'auto' : 150,
  },
  inner: {
    margin: '0 3em',
    width: theme.layout.pageWidth,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
}))

const Header = () => {
  const { user } = useAuth()
  const isAuth = !user
  const classes = useStyles({ isAuth })
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Top isAuth={isAuth} />
        {!isAuth && <Tabs />}
      </div>
    </div>
  )
}

export default Header
