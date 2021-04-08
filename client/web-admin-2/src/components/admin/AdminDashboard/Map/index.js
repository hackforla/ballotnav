import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}))

const Map = () => {
  const classes = useStyles()

  return <div className={classes.root}>Map</div>
}

export default Map
