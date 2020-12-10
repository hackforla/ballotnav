import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { selectLocation } from 'store/actions'
import { lineString } from '@turf/helpers'
import bbox from '@turf/bbox'
import Map from './Map'

// returns a bounding box that contains all the points.
// points are all [lng, lat]
function surround(points) {
  return bbox(lineString(points))
}

// returns a bounding box centered on center that contains
// all of the points.
// center and points are all [lng, lat]
function surroundWithCenter(center, points) {
  const diff = [0, 0]
  points.forEach((point) => {
    diff[0] = Math.max(diff[0], Math.abs(point[0] - center[0]))
    diff[1] = Math.max(diff[1], Math.abs(point[1] - center[1]))
  })
  return [
    center[0] - diff[0], center[1] - diff[1], // southwest
    center[0] + diff[0], center[1] + diff[1], // northeast
  ]
}

const CONTINENTAL_US = [
  [-124.848974, 24.396308],
  [-66.885444, 49.384358],
]

const MapContainer = ({
  locations,
  userLocation,
  selectedLocation,
  selectLocation,
}) => {
  const [position, setPosition] = useState(null)

  useEffect(() => {
    if (userLocation) {
      if (selectedLocation)
        return setPosition({
          bounds: surround([
            selectedLocation.geomPoint.coordinates,
            [userLocation.lng, userLocation.lat],
          ]),
        })

      if (locations.length === 0)
        return setPosition({
          center: userLocation,
        })

      if (locations.length > 0)
        return setPosition({
          bounds: surroundWithCenter(
            [userLocation.lng, userLocation.lat],
            locations.slice(0, 5).map((loc) => loc.geomPoint.coordinates),
          )
        })
    } else {
      if (selectedLocation)
        return setPosition({
          center: selectedLocation.geomPoint.coordinates,
        })

      if (locations.length === 0)
        return setPosition({
          bounds: CONTINENTAL_US,
        })

      if (locations.length === 1)
        return setPosition({
          center: locations[0].geomPoint.coordinates,
        })

      if (locations.length > 1)
        return setPosition({
          bounds: surround(locations.map((loc) => loc.geomPoint.coordinates)),
        })
    }
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
