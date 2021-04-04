import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  inner: {
    margin: '0 3em',
    width: theme.layout.pageWidth,
    maxWidth: '100%',
    padding: '1.5em 0',
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <div className={classes.inner}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Layout
