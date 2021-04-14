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
    label: 'less than 1 day',
    color: 'green',
    visible: true,
  },
  {
    id: 1,
    stop: 3,
    label: '1 to 3 days',
    color: 'yellow',
    visible: true,
  },
  {
    id: 2,
    stop: 7,
    label: '3 to 7 days',
    color: 'blue',
    visible: true,
  },
  {
    id: 3,
    stop: 14,
    label: '7 to 14 days',
    color: 'orange',
    visible: true,
  },
  {
    id: 4,
    label: 'more than 14 days',
    color: 'red',
    visible: true,
  },
]

const LAYERS = {
  timeSinceUpdate: {
    label: 'time since update',
    visible: true,
  },
  locations: {
    label: 'locations',
    visible: true,
  },
}

function getStepExpression(updateLayer) {
  const steps = []
  updateLayer.forEach((period) => {
    steps.push(period.visible ? period.color : 'transparent')
    if (period.stop) steps.push(period.stop)
  })

  return ['step', ['get', 'timeSinceUpdate'], ...steps]
}

const Enhancers = ({ map }) => {
  const { jurisdictions } = useDashboard()
  const [hoveredRegionId, setHoveredRegionId] = useState(null)
  const [layers, setLayers] = useState(LAYERS)

  const [updateLayer, setUpdateLayer] = useState(UPDATE_LAYER)

  useAddBoundary(map)
  useAddLocation(map)
  useAddBoundaryHover(map, setHoveredRegionId)
  useAddBoundaryZoom(map, jurisdictions)
  useAddBoundaryClick(map, jurisdictions)
  useAddLocations(map, jurisdictions)
  useAddLocationHover(map)

  useEffect(() => {
    const layer = config.LOCATION_LAYER_ID
    const value = layers.locations.visible ? 'visible' : 'none'
    map.setLayoutProperty(layer, 'visibility', value)
  }, [map, layers.locations])

  useEffect(() => {
    setUpdateLayer((updateLayer) =>
      updateLayer.map((period) => ({
        ...period,
        visible: layers.timeSinceUpdate.visible,
      }))
    )
  }, [map, layers.timeSinceUpdate])

  useEffect(() => {
    const layer = config.BOUNDARY_LAYER_FILL_ID
    const value = getStepExpression(updateLayer)
    map.setPaintProperty(layer, 'fill-color', value)
  }, [map, updateLayer])

  return (
    <>
      <Sidebar hoveredRegionId={hoveredRegionId} />
      <Layers layers={layers} setLayers={setLayers} />
      {layers.timeSinceUpdate.visible && (
        <TimeSinceUpdate
          updateLayer={updateLayer}
          setUpdateLayer={setUpdateLayer}
        />
      )}
    </>
  )
}

export default Enhancers
