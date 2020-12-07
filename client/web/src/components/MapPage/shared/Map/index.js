import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { selectLocation } from 'store/actions'
import { lineString } from '@turf/helpers'
import bbox from '@turf/bbox'
import Map from './Map'

function bboxFromPoints(points) {
  return bbox(lineString(points))
}

const MapContainer = ({
  locations,
  userLocation,
  selectedLocation,
  selectLocation,
}) => {
  const [position, setPosition] = useState(null)

  useEffect(() => {
    if (selectedLocation && userLocation)
      return setPosition({
        bounds: bboxFromPoints([
          selectedLocation.geomPoint.coordinates,
          [userLocation.lng, userLocation.lat],
        ]),
      })

    if (selectedLocation)
      return setPosition({
        center: selectedLocation.geomPoint.coordinates
      })

    if (userLocation && locations.length === 0)
      return setPosition({
        center: userLocation
      })

    if (userLocation && locations.length > 0)
      return setPosition({
        bounds: bboxFromPoints([
          locations[0].geomPoint.coordinates,
          [userLocation.lng, userLocation.lat],
        ]),
      })

    if (locations.length > 1)
      return setPosition({
        bounds: bboxFromPoints(locations.map((loc) => loc.geomPoint.coordinates))
      })

    if (locations.length === 1)
      return setPosition({
        center: locations[0].geomPoint.coordinates,
      })

    // default to continental US
    return setPosition({
      bounds: [
        [-124.848974, 24.396308],
        [-66.885444, 49.384358],
      ]
    })

  }, [locations, userLocation, selectedLocation])

  if (!position) return null
  return (
    <Map
      locations={locations}
      userLocation={userLocation}
      selectedLocation={selectedLocation}
      selectLocation={selectLocation}
      position={position}
    />
  )
}

const mapStateToProps = (state) => ({
  locations: select.sortedLocations(state),
  userLocation: select.userLocation(state),
  selectedLocation: select.selectedLocation(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationId) => dispatch(selectLocation(locationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)

MapContainer.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  userLocation: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  selectLocation: PropTypes.func.isRequired,
  selectedLocationId: PropTypes.number,
}

MapContainer.defaultProps = {
  locations: [],
  userLocation: null,
  selectedLocationId: null,
}
