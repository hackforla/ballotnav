import React from 'react'
import PropTypes from 'prop-types'
import LocationName from '../shared/LocationName'
import LocationAddress from '../shared/LocationAddress'
import LocationHours from '../shared/LocationHours'

const Card = ({ location }) => {
  return (
    <>
      <LocationName location={location} />
      <LocationAddress location={location} />
      <LocationHours location={location} />
    </>
  )
}

export default Card

Card.propTypes = {
  location: PropTypes.shape({}).isRequired,
}
