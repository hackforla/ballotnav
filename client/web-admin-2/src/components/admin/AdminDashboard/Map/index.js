import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Map from './Map'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}))

const MapContainer = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Map />
    </div>
  )
}

export default MapContainer
