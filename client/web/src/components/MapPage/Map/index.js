import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import mapboxgl, { styleUrl } from 'services/mapbox'
import { selectLocation } from 'redux/actions'
import LocationMarkers from './LocationMarkers'
import UserMarker from './UserMarker'
// import LocationsLayer from './LocationsLayer'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    '& canvas.mapboxgl-canvas:focus': {
      outline: 'none',
    },
  }
})

const Map = ({ locations, userLocation, selectedLocationId, selectLocation }) => {
  const classes = useStyles()
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
    if (!map || !userLocation) return
    map.setCenter(userLocation)
  }, [map, userLocation])

  return (
    <div ref={mapContainer} className={classes.root}>
      {map && (
        <>
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
          {/*<LocationsLayer
            map={map}
            locations={locations}
            selectLocation={selectLocation}
          />*/}
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  locations: select.sortedLocations(state),
  userLocation: select.userLocation(state),
  selectedLocationId: select.selectedLocationId(state),
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
