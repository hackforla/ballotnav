import { useEffect } from 'react'

const noop = () => null

const Jurisidictions = ({
  map,
  jurisdictions,
  onChangeHoveredRegion = noop,
  onChangeSelectedRegion = noop,
}) => {
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
        onChangeHoveredRegion(region.id)

        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', `boundary-fill`, () => {
        clearHoveredRegion()
        onChangeHoveredRegion(null)
      })
    }

    addListeners()

    return () => {
      map.removeLayer('boundary-line')
      map.removeLayer('boundary-fill')
      map.removeSource('boundary')
    }
  }, [map, jurisdictions, onChangeHoveredRegion, onChangeSelectedRegion])

  return null
}

export default Jurisidictions
