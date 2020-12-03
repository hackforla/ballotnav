import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as PinIcon } from 'assets/icons/pin.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCell: {
    width: 50,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCell: {
    flex: 1,
  },
  address: {
    color: '#1C1C1C',
    fontWeight: 400,
    fontSize: 16,
    display: 'inline-block',
  },
  distance: {
    color: '#808080',
    fontWeight: 400,
    fontSize: 14,
    marginLeft: 14,
  },
}))

function addressString(location) {
  return [
    `${location.address1}, ${location.address2} ${location.city},`,
    `${location.state} ${location.zip}`,
  ].join(' ')
}

function distanceString(location) {
  // center not given
  if (!location.distanceFromUser) return null
  // center given but location not geocoded
  if (location.distanceFromUser === Infinity) return 'Unknown distance'
  // center given and location geocoded
  return `${location.distanceFromUser.toFixed(2)} miles`
}

const LocationAddress = ({ location, showDistanceDetails }) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
        <div className={classes.iconCell}>
          <PinIcon width={25} height={30} />
        </div>
        <div className={classes.textCell}>
          <span className={classes.address}>
            {addressString(location)}
            {!showDistanceDetails && (
              <span className={classes.distance}>
                {distanceString(location)}
              </span>
            )}
          </span>
        </div>
      </div>
      {showDistanceDetails && <div>distance details (to be implemented)</div>}
    </>
  )
}

export default LocationAddress

LocationAddress.propTypes = {
  location: PropTypes.shape({}).isRequired,
  showDistanceDetails: PropTypes.bool,
}

LocationAddress.defaultProps = {
  showDistanceDetails: false,
}
