import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import LocationCard from './LocationCard'
import Divider from '@material-ui/core/Divider'

const LocationsList = ({ center, locations, selectLocation }) => {
  const sortedLocations = useMemo(
    () => {
      if (!center) return locations

      // TODO: sort by distance from center
      return locations
    },
    [center, locations]
  )

  return sortedLocations.map((location, index) => (
    <div key={location.id}>
      <LocationCard
        location={location}
        selectLocation={selectLocation.bind(null, location.id)}
      />
      {index !== locations.length - 1 && (
        <Divider style={{ margin: '8px 0' }} />
      )}
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
