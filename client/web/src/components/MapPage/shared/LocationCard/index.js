import React from 'react'
import PropTypes from 'prop-types'
import LocationName from './LocationName'
import LocationAddress from './LocationAddress'
import LocationSchedule from './LocationSchedule'

const LocationCard = ({ location, isSelected, hoursExpandable }) => {
  return (
    <div style={{ marginLeft: -10 }}>
      <LocationName location={location} isSelected={isSelected} />
      <LocationAddress location={location} />
      <LocationSchedule location={location} expandable={hoursExpandable} />
    </div>
  )
}

export default LocationCard

LocationCard.propTypes = {
  location: PropTypes.shape({}).isRequired,
  isSelected: PropTypes.bool,
  hoursExpandable: PropTypes.bool,
}

LocationCard.defaultProps = {
  isSelected: false,
  hoursExpandable: false,
}
