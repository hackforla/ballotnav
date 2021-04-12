import React, { useState, useEffect } from 'react'
import { useDashboard } from 'store/selectors'
import {
  useAddBoundary,
  useAddLocation,
  useAddBoundaryHover,
  useAddBoundaryZoom,
  useAddBoundaryClick,
  useAddLocations,
  useAddLocationHover,
} from './hooks'
import Sidebar from './Sidebar'
import Layers from './Layers'
import * as config from './config'

const Enhancers = ({ map }) => {
  const { jurisdictions } = useDashboard()
  const [hoveredRegionId, setHoveredRegionId] = useState(null)
  const [layers, setLayers] = useState({
    timeSinceUpdate: true,
    status: false,
    locations: true,
  })

  useAddBoundary(map)
  useAddLocation(map)
  useAddBoundaryHover(map, setHoveredRegionId)
  useAddBoundaryZoom(map, jurisdictions)
  useAddBoundaryClick(map, jurisdictions)
  useAddLocations(map, jurisdictions)
  useAddLocationHover(map)

  useEffect(() => {
    const layer = config.BOUNDARY_LAYER_FILL_ID
    const value = layers.timeSinceUpdate
      ? ['get', 'timeSinceUpdate']
      : 'transparent'
    map.setPaintProperty(layer, 'fill-color', value)
  }, [map, layers.timeSinceUpdate])

  useEffect(() => {
    const layer = config.LOCATION_LAYER_ID
    const value = layers.locations ? 'visible' : 'none'
    map.setLayoutProperty(layer, 'visibility', value)
  }, [map, layers.locations])

  return (
    <>
      <Sidebar hoveredRegionId={hoveredRegionId} />
      <Layers layers={layers} setLayers={setLayers} />
    </>
  )
}

export default Enhancers
