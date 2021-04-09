import { useEffect } from 'react'

const Locations = ({ map, jurisdictions }) => {
  useEffect(() => {
    if (!map || !jurisdictions) return

    const allLocations = jurisdictions.reduce((all, next) => {
      return [...all, ...next.locations]
    }, [])

    const locations = {
      type: 'FeatureCollection',
      features: allLocations.map((loc) => ({
        type: 'Feature',
        id: loc.id,
        properties: {
          id: loc.id,
          name: loc.name,
        },
        geometry: {
          type: 'Point',
          coordinates: [loc.geomLongitude, loc.geomLatitude],
        },
      })),
    }

    map.addSource('locations', {
      type: 'geojson',
      data: locations,
    })

    map.addLayer({
      id: 'location-circles',
      source: 'locations',
      type: 'circle',
      paint: {
        // 'circle-radius': {
        //   'base': 1.75,
        //   'stops': [
        //     [10, 2],
        //     [15, 10]
        //   ],
        // },
        'circle-radius': 4,
        'circle-color': '#1fa7b5',
        'circle-opacity': 1,
      },
    })

    const addListeners = () => {
      map.on('mouseenter', 'location-circles', (e) => {
        console.log(e.features[0].properties.name)
      })
    }

    addListeners()

    return () => {
      map.removeLayer('location-circles')
      map.removeSource('locations')
    }
  }, [map, jurisdictions])

  return null
}

export default Locations
