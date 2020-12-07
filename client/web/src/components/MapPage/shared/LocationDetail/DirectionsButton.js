import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as DirectionsIcon } from 'assets/icons/directions.svg'
import queryString from 'query-string'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    borderRadius: 20,
    padding: '10px 14px',
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    display: 'inline-block',
    color: '#FFF',
    marginRight: 15,
    fontWeight: 700,
  },
}))

function addressString(location) {
  return [
    `${location.address1}, ${location.address2} ${location.city},`,
    `${location.state} ${location.zip}`,
  ].join(' ')
}

const DirectionsButton = ({ location, userLngLat, userAddress }) => {
  const classes = useStyles()

  const showDirections = useCallback(() => {
    const query = queryString.stringify({
      api: 1,
      origin: (() => {
        if (userAddress) return userAddress
        if (userLngLat) return `${userLngLat.lat},${userLngLat.lng}`
        return undefined
      })(),
      destination: addressString(location),
    })
    window.open(`https://www.google.com/maps/dir/?${query}`)
  }, [location, userLngLat, userAddress])

  return (
    <div className={classes.root} onClick={showDirections}>
      <div className={classes.inner}>
        <span className={classes.text}>Directions</span>
        <DirectionsIcon />
      </div>
    </div>
  )
}

export default DirectionsButton

DirectionsButton.propTypes = {
  location: PropTypes.shape({}),
  userLngLat: PropTypes.shape({}),
  userAddress: PropTypes.string,
}

DirectionsButton.defaultProps = {
  location: null,
  userLngLat: undefined,
  userAddress: undefined,
}
