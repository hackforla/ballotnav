import React, { useEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server'
import mapboxgl from 'services/mapbox'
import LocationMarker from '../LocationMarker'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  '@global': {
    '.mapboxgl-canvas-container': {
      '& .location-marker svg': {
        fill: '#614799',
      },
      '& .location-marker.selected': {
        zIndex: 1,
        '& svg': {
          fill: '#FF0029',
        },
      },
    },
  },
})

const LocationMarkers = ({
  map,
  locations,
  selectLocation,
  selectedLocationId,
}) => {
  useStyles()
  const markers = useRef({})

  // add/remove markers
  useEffect(() => {
    if (!locations) return

    locations.forEach(location => {
      const el = document.createElement('div')
      el.className = 'location-marker'
      el.innerHTML = renderToString(
        <LocationMarker facilityTypeId={location.facilityTypeId} />
      )
      el.addEventListener('click', () => selectLocation(location.id))

      // NOTE: comment the options in Marker to use the default markers.
      // this lets you check that the offset is correct for the custom markers
      markers.current[location.id] = new mapboxgl.Marker({
        element: el,
        offset: [0, 12],
        anchor: 'bottom',
      })
        .setLngLat({
          lng: location.geomLongitude,
          lat: location.geomLatitude,
        })
        .addTo(map)
    })

    return () => {
      Object.values(markers.current).forEach(marker => marker.remove())
      markers.current = {}
    }
  }, [map, selectLocation, locations])

  // highlight selected marker
  useEffect(() => {
    if (!selectedLocationId) return
    const marker = markers.current[selectedLocationId]
    if (!marker) return

    marker.getElement().classList.add('selected')
    return () => marker.getElement().classList.remove('selected')
  }, [selectedLocationId])

  return null
}

export default LocationMarkers
