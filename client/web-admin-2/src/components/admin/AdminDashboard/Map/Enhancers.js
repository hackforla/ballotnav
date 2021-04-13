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
import TimeSinceUpdate from './TimeSinceUpdate'
import * as config from './config'

const UPDATE_LAYER = [
  {
    id: 0,
    stop: 1,
    label: '< 1 day',
    color: 'green',
    visible: true,
  },
  {
    id: 1,
    stop: 3,
    label: '> 1 day',
    color: 'yellow',
    visible: true,
  },
  {
    id: 2,
    stop: 7,
    label: '> 3 days',
    color: 'blue',
    visible: true,
  },
  {
    id: 3,
    stop: 14,
    label: '> 7 days',
    color: 'orange',
    visible: true,
  },
  {
    id: 4,
    label: '> 14 days',
    color: 'red',
    visible: true,
  },
]

function getStepExpression(updateLayer) {
  const steps = []
  updateLayer.forEach((period) => {
    steps.push(period.visible ? period.color : 'transparent')
    if (period.stop) steps.push(period.stop)
  })

  return [
    'step',
    ['get', 'timeSinceUpdate'],
    ...steps,
  ]
}

const Enhancers = ({ map }) => {
  const { jurisdictions } = useDashboard()
  const [hoveredRegionId, setHoveredRegionId] = useState(null)
  const [layers, setLayers] = useState({
    timeSinceUpdate: true,
    status: false,
    locations: true,
  })

  const [updateLayer, setUpdateLayer] = useState(UPDATE_LAYER)

  useAddBoundary(map)
  useAddLocation(map)
  useAddBoundaryHover(map, setHoveredRegionId)
  useAddBoundaryZoom(map, jurisdictions)
  useAddBoundaryClick(map, jurisdictions)
  useAddLocations(map, jurisdictions)
  useAddLocationHover(map)

  useEffect(() => {
    const layer = config.BOUNDARY_LAYER_FILL_ID
    const value = layers.timeSinceUpdate ? 'visible' : 'none'
    map.setLayoutProperty(layer, 'visibility', value)
  }, [map, layers.timeSinceUpdate])

  useEffect(() => {
    const layer = config.LOCATION_LAYER_ID
    const value = layers.locations ? 'visible' : 'none'
    map.setLayoutProperty(layer, 'visibility', value)
  }, [map, layers.locations])

  useEffect(() => {
    const layer = config.BOUNDARY_LAYER_FILL_ID
    const value = getStepExpression(updateLayer)
    map.setPaintProperty(layer, 'fill-color', value)
  }, [map, updateLayer])

  return (
    <>
      <Sidebar hoveredRegionId={hoveredRegionId} />
      <Layers layers={layers} setLayers={setLayers} />
      {layers.timeSinceUpdate && (
        <TimeSinceUpdate
          updateLayer={updateLayer}
          setUpdateLayer={setUpdateLayer}
        />
      )}
    </>
  )
}

export default Enhancers
