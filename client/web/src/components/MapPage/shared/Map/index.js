import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { selectLocation } from 'store/actions/router'
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

const DEFAULT_ZOOM = 13

const MapContainer = ({
  jurisdiction,
  locations,
  userLocation,
  selectedLocation,
  selectLocation,
  selectedJurisdictionId,
}) => {
  const [position, setPosition] = useState(null)
  const [map, setMap] = useState(null)
  const delta = useDeltaObject({
    jurisdiction,
    userLocation,
    selectedLocation,
    selectedJurisdictionId,
  })

  const setMapPosition = useCallback(() => {
    // search box
    if (userLocation && !selectedLocation) {
      if (locations.length === 0)
        return setPosition({
          center: userLocation,
          zoom: DEFAULT_ZOOM,
        })

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
    // move map whenever jurisdiction exists and is changed
    if (jurisdiction && delta.jurisdiction) return setMapPosition()

    // also move the map when the userLocation exists and is changed, if:
    // (1) there's no selectedJurisdictionId. This happens when the user moves
    // to or between locations where we don't have jurisdictional coverage.
    // (2) the selectedJurisdictionId hasn't changed. This happens when
    // the user moves between locations in the same jurisdiction.
    if (
      userLocation &&
      delta.userLocation &&
      (!selectedJurisdictionId || !delta.selectedJurisdictionId)
    )
      return setMapPosition()
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
  selectedJurisdictionId: select.selectedJurisdictionId(state),
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
  selectedLocation: PropTypes.shape({}),
  selectedJurisdictionId: PropTypes.number,
}

MapContainer.defaultProps = {
  jurisdiction: null,
  locations: [],
  userLocation: null,
  selectedLocation: null,
  selectedJurisdictionId: null,
}
