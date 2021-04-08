import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import mapboxgl, { styleUrl } from 'services/mapbox'

const useStyles = makeStyles({
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
})

const Map = () => {
  const classes = useStyles()
  const mapContainer = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
    })

    map.on('load', () => {
      setMap(map)
    })
  }, [])

  return (
    <div ref={mapContainer} className={classes.root}>
      {map && (
        <>
        </>
      )}
    </div>
  )
}

export default Map
