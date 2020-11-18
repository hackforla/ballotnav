import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl, { styleUrl } from 'services/mapbox'
import { selectLocation } from 'redux/actions'

const Map = ({ locations, center, selectLocation }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
      zoom: 13,
    })

    map.current.on('load', () => {
      map.current.addSource('locations', {
        type: 'geojson',
        data: null,
      })

      map.current.addLayer({
        id: 'location-circles',
        type: 'circle',
        source: 'locations',
        paint: {
          'circle-radius': {
            base: 0.5,
            stops: [
              [10, 2],
              [15, 10],
            ],
          },
          'circle-color': '#FF0029',
          'circle-opacity': 1,
        },
      }, 'poi-label')

      map.current.on('click', 'location-circles', (e) => {
        selectLocation(e.features[0].properties.id)
      })

      setLoaded(true)
    })
  }, [selectLocation])

  useEffect(() => {
    map.current.setCenter(center)
  }, [center])

  useEffect(() => {
    if (!loaded) return
    map.current.getSource('locations').setData(locations)
  }, [loaded, locations])

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
    />
  )
}

function locationsToGeoJson(locations) {
  return {
    type: 'FeatureCollection',
    features: locations.map((loc) => ({
      type: 'Feature',
      properties: loc,
      geometry: {
        type: 'Point',
        coordinates: [loc.geomLongitude, loc.geomLatitude],
      },
    })),
  }
}

const mapStateToProps = (state) => ({
  locations: locationsToGeoJson(state.data.locations),
  center: state.query.lngLat,
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationId) => dispatch(selectLocation(locationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)

Map.propTypes = {
  locations: PropTypes.shape({}),
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  selectLocation: PropTypes.func.isRequired,
}

Map.defaultProps = {
  locations: [],
  center: null,
}
