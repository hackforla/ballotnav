import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectLocation } from 'redux/actions'
import LocationsList from './LocationsList'
import LocationDetail from './LocationDetail'

const Locations = ({
  center,
  locations,
  selectedLocation,
  selectLocation
}) => {
  if (selectedLocation) {
    return (
      <LocationDetail
        location={selectedLocation}
        closeDetail={() => selectLocation(null)}
      />
    )
  }

  return (
    <LocationsList
      locations={locations}
      center={center}
      selectLocation={selectLocation}
    />
  )
}

const mapStateToProps = (state) => ({
  center: state.query.lngLat,
  locations: state.data.locations,
  selectedLocation: state.data.locations.find(loc =>
    loc.id === state.ui.selectedLocationId
  ),
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationId) => dispatch(selectLocation(locationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Locations)

Locations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  selectedLocation: PropTypes.shape({}),
  selectLocation: PropTypes.func.isRequired,
}

Locations.defaultProps = {
  locations: [],
  center: null,
  selectedLocationId: null,
}
