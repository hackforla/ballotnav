import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

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
    <div
      key={location.id}
      onClick={() => selectLocation(location.id)}>
      { location.name }
    </div>
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
