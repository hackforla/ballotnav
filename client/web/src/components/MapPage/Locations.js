import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Locations = ({ center, locations }) => {
  const sortedLocations = useMemo(
    () => {
      if (!center) return locations

      // TODO: sort by distance from center
      return locations
    },
    [center, locations]
  )

  return sortedLocations.map(location => (
    <div key={location.id}>{ location.name }</div>
  ))
}

const mapStateToProps = (state) => {
  return {
    center: state.query.lngLat,
    locations: state.data.locations,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations)

Locations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
}

Locations.defaultProps = {
  locations: [],
}
