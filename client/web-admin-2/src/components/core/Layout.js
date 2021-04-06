import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import PageWidth from './PageWidth'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
  },
  inner: {
    padding: '1.5em 0',
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <PageWidth className={classes.inner}>
        { children }
      </PageWidth>
    </div>
  )
}

export default Layout
