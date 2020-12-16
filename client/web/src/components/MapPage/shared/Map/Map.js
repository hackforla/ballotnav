import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import mapboxgl, { styleUrl } from 'services/mapbox'
import LocationMarkers from './LocationMarkers'
import UserMarker from './UserMarker'
import JurisdictionBoundary from './JurisdictionBoundary'
import useSize from 'hooks/useSize'
import useBreakpoints from 'hooks/useBreakpoints'

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

const Map = ({
  jurisdiction,
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
  const { isMobile } = useBreakpoints()

  const fitBoundsOptions = useMemo(() => {
    const padding = isMobile ? 25 : 50
    return {
      padding: {
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
      },
      animate: false,
    }
  }, [isMobile])

  const initMap = useCallback(
    ({ center, zoom, bounds }) => {
      if (!center && !bounds) throw new Error('Center or bounds is required')

      const opts = {
        container: mapContainer.current,
        style: styleUrl,
        fitBoundsOptions,
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
    [selectLocation, onMapReady, fitBoundsOptions]
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
      if (bounds) map.fitBounds(bounds, fitBoundsOptions)
    })
  }, [fitBoundsOptions])

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
          <JurisdictionBoundary map={map} jurisdiction={jurisdiction} />
        </>
      )}
    </div>
  )
}

export default Map

Map.propTypes = {
  jurisdiction: PropTypes.shape({}),
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
  jurisdiction: null,
  locations: [],
  userLocation: null,
  selectedLocationId: null,
  position: {},
}
