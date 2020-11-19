import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl, { styleUrl } from 'services/mapbox'
import { selectLocation } from 'redux/actions'
import LocationsLayer from './LocationsLayer'
import LocationMarkers from './LocationMarkers'
import UserMarker from './UserMarker'

const Map = ({ locations, userLocation, selectedLocationId, selectLocation }) => {
  const mapContainer = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
      zoom: 13,
    })

    map.on('load', () => setMap(map))

    // deal with resizing when alert is closed
    const handleResize = () => setTimeout(() => map.resize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!map) return
    map.setCenter(userLocation)
  }, [map, userLocation])

  return (
    <div
      ref={mapContainer}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {map && (
        <>
          <LocationsLayer
            map={map}
            locations={locations}
            selectLocation={selectLocation}
          />
          <LocationMarkers
            map={map}
            locations={locations}
            selectLocation={selectLocation}
            selectedLocationId={selectedLocationId}
          />
          <UserMarker
            map={map}
            userLocation={userLocation}
          />
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  locations: state.data.locations,
  userLocation: state.query.lngLat,
  selectedLocationId: state.ui.selectedLocationId,
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationId) => dispatch(selectLocation(locationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)

Map.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  userLocation: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  selectLocation: PropTypes.func.isRequired,
  selectedLocationId: PropTypes.number,
}

Map.defaultProps = {
  locations: [],
  userLocation: null,
  selectedLocationId: null,
}
