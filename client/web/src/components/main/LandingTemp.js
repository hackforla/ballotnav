import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.layout.pageWidth,
    margin: '50px auto',
    textAlign: 'center',
    '& h1': {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
}))

const Landing = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>About Ballotnav</h1>
      <p>coming soon...</p>
    </div>
  )
}

export default Landing
