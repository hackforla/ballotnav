import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getUserLocation } from 'services/geolocation'
import { ReactComponent as PinIcon } from 'assets/icons/pin.svg'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
    marginRight: 20,
    fontSize: 14,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: 4,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  icon: {
    width: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    display: 'inline-block',
    marginLeft: 4,
  },
}))

const UseMyLocation = ({ onResult }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleClick = useCallback(() => {
    setLoading(true)
    getUserLocation()
      .then((lngLat) => {
        setLoading(false)
        setError(false)
        onResult(lngLat)
      })
      .catch(error => {
        setLoading(false)
        setError(true)
      })
  }, [onResult])

  return (
    <div className={classes.root}>
      <span className={classes.inner} onClick={handleClick}>
        <div className={classes.icon}>
          { loading
              ? <CircularProgress size={10} />
              : <PinIcon width={20} height={20} />
          }
        </div>
        <span className={classes.text}>
          { error ? 'could not locate. retry?' : 'use my location' }
        </span>
      </span>
    </div>
  )
}

export default UseMyLocation

UseMyLocation.propTypes = {
  onResult: PropTypes.func,
}

UseMyLocation.defaultProps = {
  onResult: (lngLat) => {},
}
