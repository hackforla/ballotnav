import React, { Fragment, useMemo } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LocationCard from './LocationCard'
import Divider from '@material-ui/core/Divider'
import distance from '@turf/distance'
import { selectLocation } from 'redux/actions'

const LocationsList = ({ locations, userLocation, selectLocation }) => {
  const sortedLocations = useMemo(
    () => {
      if (!locations) return []
      if (!userLocation) return locations

      return locations
        .map(loc => ({
          ...loc,
          distanceToCenter: loc.geomLongitude && loc.geomLatitude
            ? distance (
              [userLocation.lng, userLocation.lat],
              [loc.geomLongitude, loc.geomLatitude],
              { units: 'miles' },
            )
            : Infinity
        }))
        .sort((a, b) => a.distanceToCenter - b.distanceToCenter)
    },
    [userLocation, locations]
  )

  return sortedLocations.map((location, index) => (
    <Fragment key={location.id}>
      <LocationCard
        location={location}
        selectLocation={selectLocation.bind(null, location.id)}
      />
      {index !== locations.length - 1 && (
        <Divider style={{ margin: '8px 0' }} />
      )}
    </Fragment>
  ))
}

const mapStateToProps = (state) => ({
  userLocation: state.query.lngLat,
  locations: state.data.locations,
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationId) => dispatch(selectLocation(locationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationsList)

LocationsList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  userLocation: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  selectLocation: PropTypes.func.isRequired,
}

LocationsList.defaultProps = {
  locations: [],
  userLocation: null,
}
