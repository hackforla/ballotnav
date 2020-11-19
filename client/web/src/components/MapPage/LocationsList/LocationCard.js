import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LocationMarker from '../LocationMarker'
import { ReactComponent as PinIcon } from 'assets/icons/pin.svg'
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 10px 10px 0',
    // cursor: 'pointer',
    // '&:hover': {
    //   backgroundColor: 'lightgrey',
    // }
  },
  row: {
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
  locationName: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '20px',
    color: theme.palette.primary.main,
    marginBottom: 4,
  },
  dropOff: {
    color: '#808080',
    fontSize: 16,
    fontWeight: 600,
  },
  address: {
    color: '#1C1C1C',
    fontWeight: 400,
    fontSize: 16,
    marginRight: 14,
    display: 'inline-block',
  },
  distance: {
    color: '#808080',
    fontWeight: 400,
    fontSize: 14,
  },
  link: {
    color: theme.palette.link.main,
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'right',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  openStatus: {
    color: '#63A375',
    fontWeight: 600,
    fontSize: 16,
    display: 'inline-block',
    marginRight: 10,
  },
  openUntil: {
    color: '#1C1C1C',
    fontWeight: 400,
    fontSize: 16,
    display: 'inline-block',
    marginRight: 10,
  },
  timezone: {
    color: '#808080',
    fontWeight: 400,
    fontSize: 16,
  }
}))

function addressString(location) {
  return [
    `${ location.address1 }, ${ location.address2 } ${ location.city },`,
    `${ location.state } ${ location.zip }`,
  ].join(' ')
}

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
    <div className={classes.root}>
      <div className={classes.row}>
        <div className={classes.iconCell}>
          <LocationMarker
            size={42}
            fill='#5B71C0'
            facilityTypeId={location.facilityTypeId}
          />
        </div>
        <div className={classes.textCell}>
          <div className={classes.locationName}>
            { location.name }
          </div>
          <div className={classes.dropOff}>
            Drop off (outside)
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.iconCell}>
          <PinIcon width={25} height={30} />
        </div>
        <div className={classes.textCell}>
          <span className={classes.address}>{ addressString(location) }</span>
          <span className={classes.distance}>{ distanceString(location) }</span>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.iconCell}>
          <ClockIcon />
        </div>
        <div className={classes.textCell}>
          <span className={classes.openStatus}>Open now</span>
          <span className={classes.openUntil}>until 9pm</span>
          <span className={classes.timezone}>(PDT)</span>
        </div>
      </div>
      <div onClick={selectLocation} className={classes.link}>
        Get location requirements, hours and directions
      </div>
    </div>
  )
}

export default LocationCard
