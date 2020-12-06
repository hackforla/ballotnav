import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { selectLocation } from 'store/actions'
import { lineString } from '@turf/helpers'
import bbox from '@turf/bbox'
import Map from './Map'

const MapContainer = ({
  locations,
  userLocation,
  selectedLocation,
  selectLocation,
}) => {
  const firstRun = useState(true)
  const [position, setPosition] = useState(null)


  // only run this the first time after the map is loaded
  // useEffect(() => {
  //   if (!map || !firstRun.current) return
  //   firstRun.current = false
  //
  //   console.log(selectedLocation)
  //
  //   if (selectedLocation) map.setCenter(selectedLocation.geomPoint.coordinates)
  //
  //   if (!userLocation || locations.length === 0 || !locations[0].geomPoint) return
  //
  //   const initialZoom = [
  //     locations[0].geomPoint.coordinates,
  //     [userLocation.lng, userLocation.lat],
  //   ]
  //   const line = lineString(initialZoom)
  //   map.fitBounds(bbox(line), { padding: FIT_BOUNDS_PADDING })
  //
  // }, [map, userLocation, locations, selectedLocation])



  useEffect(() => {
    if (selectedLocation && userLocation) {
      const points = [
        selectedLocation.geomPoint.coordinates,
        [userLocation.lng, userLocation.lat],
      ]
      const line = lineString(points)
      return setPosition({
        bounds: bbox(line)
      })
    }

    if (selectedLocation)
      return setPosition({
        center: selectedLocation.geomPoint.coordinates
      })

    if (userLocation && locations.length === 0)
      return setPosition({
        center: userLocation
      })

    if (userLocation && locations.length > 0) {
      const points = [
        locations[0].geomPoint.coordinates,
        [userLocation.lng, userLocation.lat],
      ]
      const line = lineString(points)
      return setPosition({
        bounds: bbox(line)
      })
    }

    // map.setCenter(userLocation)
    // if (locations.length === 0 || !locations[0].geomPoint) return
    // const initialZoom = [
    //   locations[0].geomPoint.coordinates,
    //   [userLocation.lng, userLocation.lat],
    // ]
    // const line = lineString(initialZoom)
    // map.fitBounds(bbox(line), { padding: FIT_BOUNDS_PADDING })
  }, [locations, userLocation, selectedLocation])

  console.log('position:', position)
  console.log(locations, userLocation, selectedLocation)

  // return null

  if (!position) return null
  return (
    <Map
      locations={locations}
      userLocation={userLocation}
      selectedLocation={selectedLocation}
      selectLocation={selectLocation}
      center={position.center}
      zoom={position.zoom}
      bounds={position.bounds}
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
