import React, { Fragment, useMemo } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LocationCard from './LocationCard'
import Divider from '@material-ui/core/Divider'
import distance from '@turf/distance'
import { selectLocation } from 'redux/actions'

const LocationsList = ({ center, locations, selectLocation }) => {
  const sortedLocations = useMemo(
    () => {
      if (!center) return locations

      return locations
        .map(loc => ({
          ...loc,
          distanceToCenter: loc.geomLongitude && loc.geomLatitude
            ? distance (
              [center.lng, center.lat],
              [loc.geomLongitude, loc.geomLatitude],
              { units: 'miles' },
            )
            : Infinity
        }))
        .sort((a, b) => a.distanceToCenter - b.distanceToCenter)
    },
    [center, locations]
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
  center: state.query.lngLat,
  locations: state.data.locations,
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationId) => dispatch(selectLocation(locationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationsList)

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
