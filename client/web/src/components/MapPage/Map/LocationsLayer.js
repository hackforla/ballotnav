import { useEffect } from 'react'

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

const LocationsLayer = ({ map, locations, selectLocation }) => {
  useEffect(() => {
    map.addSource('locations', {
      type: 'geojson',
      data: null,
    })

    map.addLayer({
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

    map.on('click', 'location-circles', (e) => {
      selectLocation(e.features[0].properties.id)
    })
  }, [map, selectLocation])

  useEffect(() => {
    map.getSource('locations').setData(locationsToGeoJson(locations))
  }, [map, locations])

  return null
}

export default LocationsLayer
