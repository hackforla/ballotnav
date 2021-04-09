import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 100,
    maxWidth: 600,
    margin: '0 auto',
    textAlign: 'center',
    '& button': {
      margin: '1em 0',
    },
    '& a': {
      color: theme.palette.primary.main,
    },
  },
  title: {
    marginBottom: 20,
    color: theme.palette.primary.main,
  },
}))

const Layout = ({ title, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        { title }
      </h1>
      {children}
    </div>
  )
}

export default Layout
