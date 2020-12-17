import React from 'react'
import PropTypes from 'prop-types'
import LocationName from './LocationName'
import LocationAddress from './LocationAddress'
import LocationHours from './LocationHours'
import DisplayNote from './DisplayNote'

const LocationCard = ({ location, isSelected, hoursExpandable }) => {
  return (
    <div style={{ marginLeft: -10 }}>
      <LocationName location={location} isSelected={isSelected} />
      <LocationAddress location={location} />
      <LocationHours location={location} expandable={hoursExpandable} />
      <DisplayNote location={location} />
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
