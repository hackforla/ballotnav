import { useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import population from './population'

const Jurisidictions = ({ map, jurisdictions }) => {
  const theme = useTheme()

  useEffect(() => {
    if (!map || !jurisdictions) return

    let hoveredRegionId = null
    // let selectedRegionId = null

    const boundaries = {
      type: 'FeatureCollection',
      features: jurisdictions.map((j) => ({
        id: j.id,
        type: 'Feature',
        properties: {
          name: j.name,
        },
        geometry: JSON.parse(j.geojson),
      }))
    }

    map.addSource('boundary', {
      type: 'geojson',
      data: boundaries,
    })

    map.addLayer({
      id: 'boundary-line',
      source: 'boundary',
      type: 'line',
      paint: {
        'line-color': '#fff',
        'line-width': 1,
        'line-blur': 1,
      },
    })

    map.addLayer({
      id: 'boundary-fill',
      source: 'boundary',
      type: 'fill',
      paint: {
        'fill-color': '#fff',
        'fill-opacity': [
          'case',
          ['all',
            ['boolean', ['feature-state', 'hover'], false],
            ['!', ['boolean', ['feature-state', 'selected'], false]]
          ],
          0.5,
          0
        ],
      },
    })

    const setHoveredRegion = region => {
      if (hoveredRegionId) {
        map.setFeatureState(
          { source: 'boundary', id: hoveredRegionId },
          { hover: false },
        )
      }

      const { name } = region.properties
      console.log(name, population[name])

      hoveredRegionId = region.id

      map.setFeatureState(
        { source: 'boundary', id: hoveredRegionId },
        { hover: true },
      )
    }

    const clearHoveredRegion = () => {
      if (hoveredRegionId) {
        map.setFeatureState(
          { source: 'boundary', id: hoveredRegionId },
          { hover: false },
        )
        hoveredRegionId = null
      }
    }

    const addListeners = () => {
      map.on('mousemove', `boundary-fill`, e => {
        const region = e.features[0]
        if (!region || region.id === hoveredRegionId)
          return

        setHoveredRegion(region)
        // this.onHoverRegion(region);

        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', `boundary-fill`, () => {
        clearHoveredRegion()
        // this.onHoverRegion(null);
      })
    }

    addListeners()
    //
    // map.on('mousemove', 'boundary-fill', (e) => {
    //   console.log(e.features[0].properties.name)
    //
    // })

    return () => {
      map.removeLayer('boundary-line')
      map.removeLayer('boundary-fill')
      map.removeSource('boundary')
    }
  }, [map, jurisdictions, theme])

  return null
}

export default Jurisidictions
