import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    backgroundColor: 'orange',
    margin: '0 auto',
    width: 1134,
    maxWidth: '100%',
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        { children }
      </div>
    </div>
  )
}

export default Layout
