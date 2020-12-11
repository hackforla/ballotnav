import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import mapboxgl, { styleUrl } from 'services/mapbox'
import LocationMarkers from './LocationMarkers'
import UserMarker from './UserMarker'
import useSize from 'hooks/useSize'

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

const FIT_BOUNDS_OPTIONS = {
  padding: {
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
  },
  animate: false,
}

const Map = ({
  locations,
  userLocation,
  selectedLocation,
  selectLocation,
  position,
  onMapReady,
}) => {
  const classes = useStyles()
  const mapContainer = useRef(null)
  const size = useSize(mapContainer)
  const [map, setMap] = useState(null)

  const initMap = useCallback(
    ({ center, zoom, bounds }) => {
      if (!center && !bounds) throw new Error('Center or bounds is required')

      const opts = {
        container: mapContainer.current,
        style: styleUrl,
        fitBoundsOptions: FIT_BOUNDS_OPTIONS,
      }

      if (center) opts.center = center
      if (zoom) opts.zoom = zoom
      if (bounds) opts.bounds = bounds

      const map = new mapboxgl.Map(opts)
      map.on('load', () => {
        setMap(map)
        onMapReady(map)
      })

      // deselect location on off-marker click
      map.on('click', (e) => {
        if (!e.originalEvent.defaultPrevented) selectLocation(null)
      })
    },
    [selectLocation, onMapReady]
  )

  const updateMap = useCallback((map, { center, zoom, bounds, animate }) => {
    // setTimeout corrects an issue in mobile where map resizing was
    // interfering with setting the center/bounds
    setTimeout(() => {
      if (center) {
        if (animate) map.panTo(center)
        else map.setCenter(center)
      }
      if (zoom) map.setZoom(zoom)
      if (bounds) map.fitBounds(bounds, FIT_BOUNDS_OPTIONS)
    })
  }, [])

  useEffect(() => {
    if (map) updateMap(map, position)
    else initMap(position)
  }, [map, position, initMap, updateMap])

  useEffect(() => {
    if (map) map.resize()
  }, [map, size])

  return (
    <div ref={mapContainer} className={classes.root}>
      {map && (
        <>
          <LocationMarkers
            map={map}
            locations={locations}
            selectLocation={selectLocation}
            selectedLocationId={selectedLocation?.id}
          />
          <UserMarker map={map} userLocation={userLocation} />
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
  position: PropTypes.shape({
    center: PropTypes.any,
    zoom: PropTypes.number,
    bounds: PropTypes.any,
    animate: PropTypes.bool,
  }),
}

Map.defaultProps = {
  locations: [],
  userLocation: null,
  selectedLocationId: null,
  position: {},
}
