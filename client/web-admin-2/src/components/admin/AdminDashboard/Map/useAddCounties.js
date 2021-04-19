import { useEffect, useRef } from 'react'
import { boundingBox } from './geoUtils'
import * as config from './config'
import axios from 'axios'

const SOURCE_ID = 'county'

export default function useAddStates(map, statefp, setCountyfp, setRegionName) {
  const counties = useRef(null)

  useEffect(() => {
    if (!map) return

    map.addSource(SOURCE_ID, {
      type: 'geojson',
      data: null,
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
      const { countyfp } = e.features[0].properties
      const county = counties.current.features.find((s) =>
        s.properties.countyfp === countyfp
      )
      const bbox = boundingBox(county)
      map.fitBounds(bbox, config.FIT_BOUNDS_OPTIONS)
    }

    const onMouseMove = (e) => {
      setRegionName(e.features[0].properties.name)
    }

    map.on('click', `${SOURCE_ID}-fills`, onClick)
    map.on('mousemove', `${SOURCE_ID}-fills`, onMouseMove)

    return () => {
      map.off('click', `${SOURCE_ID}-fills`, onClick)
      map.off('mousemove', `${SOURCE_ID}-fills`, onMouseMove)
      map.removeLayer(`${SOURCE_ID}-borders`)
      map.removeLayer(`${SOURCE_ID}-fills`)
      map.removeSource(SOURCE_ID)
    }
  }, [map, setRegionName])

  useEffect(() => {
    if (!map || !statefp) return

    async function loadCounties(map, statefp) {
      const url = `http://localhost:8080/admin/dashboard/gis/states/${statefp}/counties`
      const { data } = await axios.get(url)
      map.getSource(SOURCE_ID).setData(data)
      counties.current = data
    }

    loadCounties(map, statefp)
  }, [map, statefp])
}
