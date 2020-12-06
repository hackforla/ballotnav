import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import mapboxgl, { styleUrl } from 'services/mapbox'
import LocationMarkers from './LocationMarkers'
import UserMarker from './UserMarker'

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

const DEFAULT_ZOOM = 13

const FIT_BOUNDS_OPTIONS = {
  padding: {
    top: 200,
    bottom: 200,
    left: 200,
    right: 200,
  },
  animate: false,
}

const Map = ({
  locations,
  userLocation,
  selectedLocation,
  selectLocation,
  center,
  zoom,
  bounds,
}) => {
  const classes = useStyles()
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [isReady, setIsReady] = useState(false)

  const initMap = useCallback(({ center, zoom, bounds }) => {
    if (map.current)
      throw new Error('Map already initialized')

    if (!center && !bounds)
      throw new Error('Center or bounds is required')

    const opts = {
      container: mapContainer.current,
      style: styleUrl,
      zoom: DEFAULT_ZOOM,
      fitBoundsOptions: FIT_BOUNDS_OPTIONS
    }

    if (center) opts.center = center
    if (zoom) opts.zoom = zoom
    if (bounds) opts.bounds = bounds

    map.current = new mapboxgl.Map(opts)
    map.current.on('load', () => setIsReady(true))

    // deselect location on off-marker click
    map.current.on('click', (e) => {
      if (!e.originalEvent.defaultPrevented) selectLocation(null)
    })

    // deal with resizing when alert is closed
    const handleResize = () => setTimeout(() => map.current.resize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [selectLocation])

  const updateMap = useCallback(({ center, zoom, bounds }) => {
    if (!map.current)
      throw new Error('Map not initialized')

    if (center) map.current.setCenter(center)
    if (zoom) map.current.setZoom(zoom)
    if (bounds) map.current.fitBounds(bounds, FIT_BOUNDS_OPTIONS)
  }, [])

  useEffect(() => {
    if (map.current)
      updateMap({ center, zoom, bounds })
    else
      initMap({ center, zoom, bounds })
  }, [center, zoom, bounds])

  return (
    <div ref={mapContainer} className={classes.root}>
      {isReady && (
        <>
          <LocationMarkers
            map={map.current}
            locations={locations}
            selectLocation={selectLocation}
            selectedLocationId={selectedLocation?.id}
          />
          <UserMarker map={map.current} userLocation={userLocation} />
        </>
      )}
    </div>
  )
}

export default Map

Map.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  userLocation: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  selectLocation: PropTypes.func.isRequired,
  selectedLocationId: PropTypes.number,
}

Map.defaultProps = {
  locations: [],
  userLocation: null,
  selectedLocationId: null,
}
