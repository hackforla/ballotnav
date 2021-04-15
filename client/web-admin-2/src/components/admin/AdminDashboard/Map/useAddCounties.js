import { useEffect } from 'react'
import { boundingBox } from './geoUtils'
import * as config from './config'

export default function useAddStates(map, statefp, setCountyfp) {
  useEffect(() => {
    if (!map) return

    map.addSource('counties', {
      type: 'geojson',
      data: null,
      // data: 'http://localhost:8080/admin/dashboard/gis/states',
      //data: states,
    })

    map.addLayer({
      id: 'county-borders',
      source: 'counties',
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
      id: 'county-fills',
      source: 'counties',
      type: 'fill',
      paint: {
        'fill-color': 'transparent',
      }
    })

    const onClick = (e) => {
      // NOTE: it appears that e.features[0] includes only the **rendered**
      // geometry of the state. To get the full geometry we might need to
      // go back to the source data
      // const { countyfp } = e.features[0].properties
      const bbox = boundingBox(e.features[0].geometry)
      map.fitBounds(bbox, config.FIT_BOUNDS_OPTIONS)
    }

    map.on('click', 'county-fills', onClick)

    return () => {
      map.off('click', 'county-fills', onClick)
      map.removeLayer('county-boundaries')
      map.removeSource('counties')
    }
  }, [map])

  useEffect(() => {
    if (!map || !statefp) return

    const url = `http://localhost:8080/admin/dashboard/gis/states/${statefp}/counties`
    map.getSource('counties').setData(url)
  }, [map, statefp])
}
