import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useInitMap from './useInitMap'
import useAddStates from './useAddStates'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    '& canvas.mapboxgl-canvas:focus': {
      outline: 'none',
    },
  },
}))

const Map = () => {
  const classes = useStyles()
  const mapContainer = useRef(null)
  const map = useInitMap(mapContainer)
  useAddStates(map)

  return (
    <div ref={mapContainer} className={classes.root} />
  )
}

export default Map
