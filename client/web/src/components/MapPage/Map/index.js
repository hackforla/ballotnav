import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl, { styleUrl } from 'services/mapbox'
import { selectLocation } from 'redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import LocationsLayer from './LocationsLayer'
import LocationMarkers from './LocationMarkers'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    '& .marker svg': {
      fill: '#614799',
    },
    '& .marker.selected svg': {
      fill: '#FF0029',
    }
  }
})

const Map = ({ locations, center, selectedLocationId, selectLocation }) => {
  const mapContainer = useRef(null)
  const [map, setMap] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
      zoom: 13,
    })

    map.on('load', () => setMap(map))
  }, [])

  useEffect(() => {
    if (!map) return
    map.setCenter(center)
  }, [map, center])

  return (
    <div ref={mapContainer} className={classes.root}>
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
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  locations: state.data.locations,
  center: state.query.lngLat,
  selectedLocationId: state.ui.selectedLocationId,
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationId) => dispatch(selectLocation(locationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)

Map.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  selectLocation: PropTypes.func.isRequired,
  selectedLocationId: PropTypes.number,
}

Map.defaultProps = {
  locations: [],
  center: null,
  selectedLocationId: null,
}
