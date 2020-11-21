import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'services/mapbox'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& .mapboxgl-ctrl-geocoder': {
      width: '100% !important',
      maxWidth: 'none',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      '&--input': {
        border: '1px solid #B3B3B3',
        borderRadius: 40,
        backgroundColor: '#FFF',
        '&:focus': {
          outline: 'none',
          border: `1px ${theme.palette.primary.main} solid`,
        }
      }
    }
  }
}))

function Geocoder({ center, address, onResult }) {
  const container = useRef(null)
  const geocoder = useRef(null)
  const classes = useStyles()

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
      const { center: [lng, lat], place_name: address } = result
      geocoder.current.setPlaceholder(address)
      geocoder.current.clear()
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

  return <div ref={container} className={classes.root} />
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
