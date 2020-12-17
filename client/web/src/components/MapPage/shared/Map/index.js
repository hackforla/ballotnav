import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { selectLocation } from 'store/actions'
import { lineString } from '@turf/helpers'
import bbox from '@turf/bbox'
import Map from './Map'
import { useDeltaObject } from 'react-delta'

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
    center[0] - diff[0], // west
    center[1] - diff[1], // south
    center[0] + diff[0], // east
    center[1] + diff[1], // north
  ]
}

const CONTINENTAL_US = [
  [-124.848974, 24.396308],
  [-66.885444, 49.384358],
]

const GEORGIA = [
  [-85.61, 30.36],
  [-80.84, 35.0],
]

const DEFAULT_ZOOM = 13

const MapContainer = ({
  jurisdiction,
  locations,
  userLocation,
  selectedLocation,
  selectLocation,
  isLoading,
}) => {
  const [position, setPosition] = useState(null)
  const [map, setMap] = useState(null)
  const delta = useDeltaObject({
    jurisdiction,
    userLocation,
    selectedLocation,
  })

  const setMapPosition = useCallback(() => {
    if (!jurisdiction)
      return setPosition({
        bounds: GEORGIA,
      })

    // search box
    if (userLocation && !selectedLocation) {
      return setPosition({
        bounds: surroundWithCenter(
          [userLocation.lng, userLocation.lat],
          locations.slice(0, 5).map((loc) => loc.geomPoint.coordinates)
        ),
      })
    }

    // jurisdiction select
    if (!userLocation && !selectedLocation) {
      if (jurisdiction.geojson)
        return setPosition({
          bounds: bbox(jurisdiction.geojson),
        })

      if (locations.length === 0)
        return setPosition({
          bounds: CONTINENTAL_US,
        })

      if (locations.length === 1)
        return setPosition({
          center: locations[0].geomPoint.coordinates,
          zoom: DEFAULT_ZOOM,
        })

      if (locations.length > 1)
        return setPosition({
          bounds: surround(locations.map((loc) => loc.geomPoint.coordinates)),
        })
    }

    // share link
    if (!userLocation && selectedLocation) {
      return setPosition({
        center: selectedLocation.geomPoint.coordinates,
        zoom: DEFAULT_ZOOM,
      })
    }

    // only happens when you refresh the page with a location selected
    if (userLocation && selectedLocation) {
      return setPosition({
        bounds: surroundWithCenter(
          [userLocation.lng, userLocation.lat],
          [selectedLocation.geomPoint.coordinates]
        ),
      })
    }
  }, [jurisdiction, locations, userLocation, selectedLocation])

  useEffect(() => {
    if (
      delta.jurisdiction ||
      (delta.userLocation && delta.userLocation.curr && !isLoading)
    )
      setMapPosition()
  })

  useEffect(() => {
    if (!map || !selectedLocation) return

    const bounds = map.getBounds()
    const { coordinates } = selectedLocation.geomPoint

    if (!bounds.contains(coordinates))
      setPosition({
        center: coordinates,
        animate: true,
      })
  }, [map, selectedLocation])

  if (!position) return null
  return (
    <Map
      jurisdiction={jurisdiction}
      locations={locations}
      userLocation={userLocation}
      selectedLocation={selectedLocation}
      selectLocation={selectLocation}
      position={position}
      onMapReady={setMap}
    />
  )
}

const mapStateToProps = (state) => ({
  jurisdiction: select.jurisdiction(state),
  locations: select.sortedLocations(state),
  userLocation: select.userLocation(state),
  selectedLocation: select.selectedLocation(state),
  isLoading: select.isLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationId) => dispatch(selectLocation(locationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)

MapContainer.propTypes = {
  jurisdiction: PropTypes.shape({}),
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  userLocation: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  selectLocation: PropTypes.func.isRequired,
  selectedLocationId: PropTypes.number,
  isLoading: PropTypes.bool,
}

MapContainer.defaultProps = {
  jurisdiction: null,
  locations: [],
  userLocation: null,
  selectedLocationId: null,
  isLoading: false,
}
