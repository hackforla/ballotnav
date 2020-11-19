import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'services/mapbox'

function Geocoder({ center, address, onResult }) {
  const container = useRef(null)
  const geocoder = useRef(null)

  useEffect(() => {
    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      countries: 'us',
      types: 'address, neighborhood, locality, place, district, postcode',
    })

    geocoder.current.addTo(container.current)
  }, [])

  useEffect(() => {
    const handleResult = ({ result }) => {
      geocoder.current.setPlaceholder(' ')
      geocoder.current.clear()
      const { center: [lng, lat], place_name: address } = result
      onResult({ lng, lat, address })
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

  useEffect(() => {
    geocoder.current.setPlaceholder(address || 'Enter an address or ZIP')
  }, [address])

  return <div ref={container} className="geocoder" />
}

export default Geocoder

Geocoder.propTypes = {
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  address: PropTypes.string,
  onResult: PropTypes.func,
}

Geocoder.defaultProps = {
  center: null,
  address: null,
  onResult: (lngLat) => {},
}
