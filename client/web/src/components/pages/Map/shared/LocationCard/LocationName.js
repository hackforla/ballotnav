import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import LocationIcon from '../LocationIcon'
// import { ReactComponent as WheelchairIcon } from 'assets/icons/wheelchair.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
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
  wheelchair: {
    marginLeft: 6,
  },
}))

const LocationName = ({ location, isSelected }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { default: defaultColor, selected } = theme.palette.locationMarkers
  return (
    <div className={classes.root}>
      <div className={classes.iconCell}>
        <LocationIcon
          size={42}
          fill={isSelected ? selected : defaultColor}
          facilityTypeId={location.facilityTypeId}
        />
      </div>
      <div className={classes.textCell}>
        <div className={classes.locationName}>{location.name}</div>
        {/*<div className={classes.dropOff}>Drop off (outside)</div>*/}
      </div>
      {/*{location.isHandicapAccessible === 'Y' && (
        <WheelchairIcon className={classes.wheelchair} />
      )}*/}
    </div>
  )
}

export default LocationName

LocationName.propTypes = {
  location: PropTypes.shape({}).isRequired,
  isSelected: PropTypes.bool,
}

LocationName.defaultProps = {
  isSelected: false,
}
