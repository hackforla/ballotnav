import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import LocationCard from './LocationCard'

const LocationsList = ({ center, locations, selectLocation }) => {
  const sortedLocations = useMemo(
    () => {
      if (!center) return locations

      // TODO: sort by distance from center
      return locations
    },
    [center, locations]
  )

  return sortedLocations.map(location => (
    <LocationCard
      key={location.id}
      location={location}
      selectLocation={selectLocation.bind(null, location.id)}
    />
  ))
}

export default LocationsList

LocationsList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  selectLocation: PropTypes.func.isRequired,
}

LocationsList.defaultProps = {
  locations: [],
  center: null,
}
