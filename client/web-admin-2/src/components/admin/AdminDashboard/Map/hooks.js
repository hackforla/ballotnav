import { useEffect, useMemo } from 'react'
import * as config from './config'
import { boundingBox } from './geoUtils'
import moment from 'moment'

export function useAddBoundary(map) {
  useEffect(() => {
    map.addSource(config.BOUNDARY_SOURCE_ID, {
      type: 'geojson',
      data: null,
    })

    map.addLayer({
      id: config.BOUNDARY_LAYER_FILL_ID,
      source: config.BOUNDARY_SOURCE_ID,
      type: 'fill',
      paint: {
        //'fill-color': ['get', 'timeSinceUpdate'],
        // 'fill-opacity': 0.5,
        // 'fill-opacity': [
        //   'case',
        //   [
        //     'all',
        //     ['boolean', ['feature-state', 'hover'], false],
        //     ['!', ['boolean', ['feature-state', 'selected'], false]],
        //   ],
        //   0.5,
        //   0,
        // ],
      },
    })

    map.addLayer({
      id: config.BOUNDARY_LAYER_LINE_ID,
      source: config.BOUNDARY_SOURCE_ID,
      type: 'line',
      paint: {
        'line-color': '#fff',
        // 'line-width': 1,
        'line-blur': 1,
        'line-width': [
          'case',
          [
            'all',
            ['boolean', ['feature-state', 'hover'], false],
            ['!', ['boolean', ['feature-state', 'selected'], false]],
          ],
          5,
          1,
        ]
      },
    })

    return () => {
      map.removeLayer(config.BOUNDARY_LAYER_LINE_ID)
      map.removeLayer(config.BOUNDARY_LAYER_FILL_ID)
      map.removeSource(config.BOUNDARY_SOURCE_ID)
    }
  }, [map])
}

export function useAddLocation(map) {
  useEffect(() => {
    map.addSource(config.LOCATION_SOURCE_ID, {
      type: 'geojson',
      data: null,
    })

    map.addLayer({
      id: config.LOCATION_LAYER_ID,
      source: config.LOCATION_SOURCE_ID,
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

    return () => {
      map.removeLayer(config.LOCATION_LAYER_ID)
      map.removeSource(config.LOCATION_SOURCE_ID)
    }
  }, [map])
}

export function useAddBoundaryHover(map, onChangeHoveredRegion) {
  useEffect(() => {
    let hoveredRegionId = null

    const setHoveredRegion = (region) => {
      if (hoveredRegionId) {
        map.setFeatureState(
          { source: config.BOUNDARY_SOURCE_ID, id: hoveredRegionId },
          { hover: false }
        )
      }

      hoveredRegionId = region.id

      map.setFeatureState(
        { source: config.BOUNDARY_SOURCE_ID, id: hoveredRegionId },
        { hover: true }
      )
    }

    const clearHoveredRegion = () => {
      if (hoveredRegionId) {
        map.setFeatureState(
          { source: config.BOUNDARY_SOURCE_ID, id: hoveredRegionId },
          { hover: false }
        )
        hoveredRegionId = null
      }
    }

    const onMouseMove = (e) => {
      const region = e.features[0]
      if (!region || region.id === hoveredRegionId) return

      setHoveredRegion(region)
      onChangeHoveredRegion(region.id)

      map.getCanvas().style.cursor = 'pointer'
    }

    const onMouseLeave = () => {
      clearHoveredRegion()
      onChangeHoveredRegion(null)
    }

    map.on('mousemove', config.BOUNDARY_LAYER_FILL_ID, onMouseMove)
    map.on('mouseleave', config.BOUNDARY_LAYER_FILL_ID, onMouseLeave)

    return () => {
      map.off('mousemove', config.BOUNDARY_LAYER_FILL_ID, onMouseMove)
      map.off('mouseleave', config.BOUNDARY_LAYER_FILL_ID, onMouseLeave)
    }
  }, [map, onChangeHoveredRegion])
}

export function useAddBoundaryClick(map, jurisdictions) {
  useEffect(() => {
    const onClick = (e) => {
      const jurisdiction = jurisdictions.find((j) => j.id === e.features[0].id)
      const bbox = boundingBox(jurisdiction.geojson)
      map.fitBounds(bbox, config.FIT_BOUNDS_OPTIONS)
    }

    map.on('click', config.BOUNDARY_LAYER_FILL_ID, onClick)

    return () => {
      map.off('click', config.BOUNDARY_LAYER_FILL_ID, onClick)
    }
  }, [map, jurisdictions])
}

export function useAddBoundaryZoom(map, jurisdictions) {
  const boundaries = useMemo(() => {
    if (!jurisdictions) return null

    return {
      type: 'FeatureCollection',
      features: jurisdictions.map((j) => ({
        id: j.id,
        type: 'Feature',
        properties: {
          name: j.name,
          timeSinceUpdate: moment
            .duration(moment().diff(moment(j.updatedAt)))
            .asDays(),
        },
        geometry: j.geojson,
      })),
    }
  }, [jurisdictions])

  useEffect(() => {
    if (!boundaries) return

    map.getSource(config.BOUNDARY_SOURCE_ID).setData(boundaries)
    map.fitBounds(boundingBox(boundaries), config.FIT_BOUNDS_OPTIONS)
  }, [map, boundaries])
}

export function useAddLocations(map, jurisdictions) {
  useEffect(() => {
    if (!jurisdictions) return

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

    map.getSource(config.LOCATION_SOURCE_ID).setData(locations)
  }, [map, jurisdictions])
}

export function useAddLocationHover(map) {
  useEffect(() => {
    const onMouseEnter = (e) => {
      console.log(e.features[0].properties.name)
    }

    map.on('mouseenter', config.LOCATION_LAYER_ID, onMouseEnter)

    return () => {
      map.off('mouseenter', config.LOCATION_LAYER_ID, onMouseEnter)
    }
  }, [map])
}
