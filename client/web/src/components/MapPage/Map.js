import React, { useRef, useState, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl, { styleUrl } from 'services/mapbox'
import { selectLocation } from 'redux/actions'
import LocationMarker from './LocationMarker'

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
              [15, 4],
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

    const markers = {}
    locations.features.forEach(location => {
      const el = document.createElement('div')
      el.className = 'marker'
      el.innerHTML = renderToString(<LocationMarker fill='#614799' />)
      el.addEventListener('click', () => selectLocation(location.properties.id))
      markers[location.properties.id] = new mapboxgl.Marker({
        element: el,
        offset: [0, 10],
        anchor: 'bottom',
      })
        .setLngLat(location.geometry.coordinates)
        .addTo(map.current)
    })

    return () => {
      console.log('removing:', markers)
      Object.values(markers).forEach(marker => marker.remove())
    }
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
  console.log('running locations to geojson')
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
