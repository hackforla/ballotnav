import React from 'react'
import PropTypes from 'prop-types'
import LocationName from './LocationName'
import LocationAddress from './LocationAddress'
import LocationHours from './LocationHours'

const LocationCard = ({ location, hoursExpandable }) => {
  return (
    <div style={{ marginLeft: -10 }}>
      { location.id }
      <LocationName location={location} />
      <LocationAddress location={location} />
      <LocationHours location={location} expandable={hoursExpandable} />
    </div>
  )
}

export default LocationCard

LocationCard.propTypes = {
  location: PropTypes.shape({}).isRequired,
  hoursExpandable: PropTypes.bool,
}

LocationCard.defaultProps = {
  hoursExpandable: false,
}
