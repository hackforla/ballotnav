import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 500,
    border: `1px ${theme.palette.primary.main} solid`,
    borderRadius: '1em',
    padding: '1em',
    color: theme.palette.primary.dark,
  },
  title: {
    color: theme.palette.primary.dark,
    fontSize: 20,
  },
}))

const Interview = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Interview</h3>
      <div>Read the questions as you complete the location information.</div>
    </div>
  )
}

export default Interview
