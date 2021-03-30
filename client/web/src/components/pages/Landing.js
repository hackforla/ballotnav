import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.layout.pageWidth,
    maxWidth: '100%',
    margin: '50px auto',
    textAlign: 'center',
    '& h1': {
      fontSize: 20,
      fontWeight: 'bold',
    },
    '& a': {
      display: 'block',
      textDecoration: 'underline',
      marginTop: 10,
    },
  },
}))

const Landing = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>About Ballotnav</h1>
      <p>coming soon...</p>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.hackforla.org/projects/ballot-nav"
      >
        Project Overview
      </a>
      <a target="_blank" rel="noreferrer" href="https://demo.ballotnav.org">
        View the Demo
      </a>
    </div>
  )
}

export default Landing
