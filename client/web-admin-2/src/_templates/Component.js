import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ComponentName = () => {
  const classes = useStyles()

  return <div className={classes.root}>ComponentName</div>
}

export default ComponentName
