import React, { useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import mapboxgl from 'services/mapbox'
import LocationIcon from 'components/shared/LocationIcon'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  '@global': {
    '.mapboxgl-canvas-container': {
      '& .location-marker svg': {
        fill: theme.palette.locationMarkers.default,
      },
      '& .location-marker.selected': {
        zIndex: 1,
        '& svg': {
          fill: theme.palette.locationMarkers.selected,
        },
      },
    },
  },
}))

const LocationMarkers = ({
  map,
  locations,
  selectLocation,
  selectedLocationId,
}) => {
  useStyles()
  const [markers, setMarkers] = useState({})

  // add/remove markers
  useEffect(() => {
    if (!locations) return

    const markers = {}

    locations.forEach((location) => {
      const el = document.createElement('div')
      el.className = 'location-marker'
      el.innerHTML = renderToString(
        <LocationIcon facilityTypeId={location.facilityTypeId} />
      )

      // NOTE: comment the options in Marker to use the default markers.
      // this lets you check that the offset is correct for the custom markers
      markers[location.id] = new mapboxgl.Marker({
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

    setMarkers(markers)

    return () => {
      Object.values(markers).forEach((marker) => marker.remove())
      setMarkers({})
    }
  }, [map, locations])

  // set highlighting and click handlers
  useEffect(() => {
    Object.keys(markers).forEach((locationId) => {
      locationId = Number(locationId)
      const el = markers[locationId].getElement()

      if (locationId === selectedLocationId) {
        el.classList.add('selected')
        el.onclick = (e) => {
          e.preventDefault()
          selectLocation(null)
        }
      } else {
        el.classList.remove('selected')
        el.onclick = (e) => {
          e.preventDefault()
          selectLocation(locationId)
        }
      }
    })
  }, [markers, selectedLocationId, selectLocation])

  return null
}

export default LocationMarkers
