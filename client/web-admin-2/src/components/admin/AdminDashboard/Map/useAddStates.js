import { useEffect } from 'react'
import states from './states.json'
import { boundingBox } from './geoUtils'
import * as config from './config'

export default function useAddStates(map) {
  useEffect(() => {
    if (!map) return

    map.addSource('states', {
      type: 'geojson',
      // data: 'http://localhost:8080/admin/dashboard/gis/states',
      data: states,
    })

    map.addLayer({
      id: 'state-borders',
      source: 'states',
      type: 'line',
      paint: {
        'line-color': '#fff',
        'line-blur': 1,
        'line-width': [
          'case',
          [
            'all',
            ['boolean', ['feature-state', 'hover'], false],
            ['!', ['boolean', ['feature-state', 'selected'], false]],
          ],
          5,
          3,
        ],
      },
    })

    map.addLayer({
      id: 'state-fills',
      source: 'states',
      type: 'fill',
      paint: {
        'fill-color': 'transparent',
      }
    })

    const onClick = (e) => {
      // NOTE: it appears that e.features[0] includes only the **rendered**
      // geometry of the state. To get the full geometry we might need to
      // go back to the source data
      const { statefp, name } = e.features[0].properties
      const bbox = boundingBox(e.features[0].geometry)
      map.fitBounds(bbox, config.FIT_BOUNDS_OPTIONS)
    }

    map.on('click', 'state-fills', onClick)

    return () => {
      map.off('click', 'state-fills', onClick)
      map.removeLayer('state-boundaries')
      console.log('removing source')
      map.removeSource('states')
    }
  }, [map])
}
