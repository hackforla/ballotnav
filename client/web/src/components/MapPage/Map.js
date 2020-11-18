import React, { useRef, useState, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl, { styleUrl } from 'services/mapbox'
import { selectLocation } from 'redux/actions'
import LocationMarker from './LocationMarker'
import { makeStyles } from '@material-ui/core/styles'

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
  const map = useRef(null)
  const markers = useRef({})
  const [loaded, setLoaded] = useState(false)
  const classes = useStyles()

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

    map.current.getSource('locations').setData(locationsToGeoJson(locations))

    locations.forEach(location => {
      const el = document.createElement('div')
      el.className = 'marker'
      el.innerHTML = renderToString(<LocationMarker />)
      el.addEventListener('click', () => selectLocation(location.id))
      markers.current[location.id] = new mapboxgl.Marker({
        element: el,
        offset: [0, 10],
        anchor: 'bottom',
      })
        .setLngLat({
          lng: location.geomLongitude,
          lat: location.geomLatitude,
        })
        .addTo(map.current)
    })

    return () => {
      Object.values(markers.current).forEach(marker => marker.remove())
      markers.current = {}
    }
  }, [selectLocation, loaded, locations])

  useEffect(() => {
    if (!selectedLocationId) return
    const marker = markers.current[selectedLocationId]
    if (!marker) return

    marker.getElement().classList.add('selected')
    return () => marker.getElement().classList.remove('selected')
  }, [selectedLocationId])

  return <div ref={mapContainer} className={classes.root} />
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
