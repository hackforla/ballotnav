import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'services/mapbox'

function Geocoder({ center, onResult }) {
  const container = useRef(null)
  const geocoder = useRef(null)

  useEffect(() => {
    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      countries: 'us',
      types: 'address, neighborhood, locality, place, district, postcode',
      placeholder: 'Enter an address or Zip',
    })

    geocoder.current.addTo(container.current)
  }, [])

  useEffect(() => {
    const handleResult = ({ result }) => {
      const [lng, lat] = result.center
      onResult({ lng, lat })
    }

    geocoder.current.on('result', handleResult)
    return () => geocoder.current.off('result', handleResult)
  }, [onResult])

  useEffect(() => {
    if (center)
      geocoder.current.setProximity({
        longitude: center.lng,
        latitude: center.lat,
      })
    else geocoder.current.setProximity(null)
  }, [center])

  return <div ref={container} className="geocoder" />
}

export default Geocoder

Geocoder.propTypes = {
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  onResult: PropTypes.func,
}

Geocoder.defaultProps = {
  center: null,
  onResult: (lngLat) => {},
}
