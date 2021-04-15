import { useEffect, useRef } from 'react'
import statesData from './states.json'
import { boundingBox } from './geoUtils'
import * as config from './config'

const SOURCE_ID = 'state'

export default function useAddStates(map, setStatefp) {
  const states = useRef(statesData)

  useEffect(() => {
    if (!map) return

    map.addSource(SOURCE_ID, {
      type: 'geojson',
      // data: 'http://localhost:8080/admin/dashboard/gis/states',
      data: states.current,
    })

    map.addLayer({
      id: `${SOURCE_ID}-borders`,
      source: SOURCE_ID,
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
      id: `${SOURCE_ID}-fills`,
      source: SOURCE_ID,
      type: 'fill',
      paint: {
        'fill-color': 'transparent',
      }
    })

    const onClick = (e) => {
      const { statefp } = e.features[0].properties
      const state = states.current.features.find((s) =>
        s.properties.statefp === statefp
      )
      const bbox = boundingBox(state)
      map.fitBounds(bbox, config.FIT_BOUNDS_OPTIONS)
      map.once('zoomend', () => setStatefp(statefp))
    }

    map.on('click', `${SOURCE_ID}-fills`, onClick)

    return () => {
      map.off('click', `${SOURCE_ID}-fills`, onClick)
      map.removeLayer(`${SOURCE_ID}-borders`)
      map.removeLayer(`${SOURCE_ID}-fills`)
      map.removeSource(SOURCE_ID)
    }
  }, [map, setStatefp])
}
