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

const DirectionsButton = ({ origin, location }) => {
  const classes = useStyles()

  const showDirections = useCallback(() => {
    const query = queryString.stringify({
      api: 1,
      origin: `${origin.lat},${origin.lng}`,
      destination: `${location.geomLatitude},${location.geomLongitude}`,
    })
    window.open(`https://www.google.com/maps/dir/?${query}`)
  }, [location, origin])

  if (!origin || !location.geomLatitude || !location.geomLongitude)
    return null

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
  origin: PropTypes.shape({}),
}

DirectionsButton.defaultProps = {
  location: null,
  origin: null,
}
