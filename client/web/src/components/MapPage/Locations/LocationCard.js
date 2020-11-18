import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LocationMarker from '../LocationMarker'

const useStyles = makeStyles({
  root: {
    padding: 5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'grey',
    }
  },
})

function distanceString(location) {
  // center not given
  if (!location.distanceToCenter)
    return null
  // center given but location not geocoded
  if (location.distanceToCenter === Infinity)
    return 'Unknown distance'
  // center given and location geocoded
  return `${location.distanceToCenter.toFixed(2)} miles`
}

const LocationCard = ({ location, selectLocation }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.root}
      onClick={selectLocation}
    >
      <Typography
        style={{ fontWeight: 'bold' }}
        color='primary'
        variant='subtitle1'
      >
        { location.name }
      </Typography>
      <div>
        { location.address1 }, { location.address2 } { location.city }, { location.state } { location.zip }
      </div>
      <div>{ distanceString(location) }</div>
      <LocationMarker facilityTypeId={location.facilityTypeId} />
    </div>
  )
}

export default LocationCard
