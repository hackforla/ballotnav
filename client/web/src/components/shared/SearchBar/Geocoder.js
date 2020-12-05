import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'services/mapbox'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .mapboxgl-ctrl-geocoder': {
      width: '100% !important',
      maxWidth: 'none',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      '&--button': {
        backgroundColor: 'transparent !important',
      },
      '&--input': {
        border: `1px ${theme.palette.primary.main} solid`,
        borderRadius: 40,
        backgroundColor: '#FFF',
        color: theme.palette.primary.main,
        fontSize: 16,
        padding: '6px 45px !important',
        height: '50px !important',
        '&:focus': {
          outline: 'none',
        },
      },
      '&--icon': {
        fill: theme.palette.grey[400],
      },
      '&--icon-close': {
        width: 25,
        height: 25,
        marginTop: 5,
        marginRight: 5,
      },
      '&--icon-loading': {
        width: 32,
        height: 40,
        marginTop: -2,
        marginRight: 0,
      },
      '&--icon-search': {
        left: 7,
        width: 35,
        height: 32,
        fill: theme.palette.primary.main,
      },
    },
  },
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
      bbox: [-85.61, 30.36, -80.84, 35.00],
      filter: function (item) {
        return item.context
          .map(function (i) {
            return (
              i.id.split('.').shift() === 'region' &&
              i.text === 'Georgia'
            )
          })
          .reduce(function (acc, cur) {
            return acc || cur
          })
      },
    })

    geocoder.current.addTo(container.current)
  }, [])

  useEffect(() => {
    const handleResult = ({ result }) => {
      const {
        center: [lng, lat],
        place_name: address,
      } = result
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
