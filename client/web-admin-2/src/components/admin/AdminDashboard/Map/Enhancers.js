import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDashboard } from 'store/selectors'
import {
  useAddBoundary,
  useAddLocation,
  useAddBoundaryHover,
  useAddBoundaryZoom,
  useAddLocations,
  useAddLocationHover,
} from './hooks'
import Sidebar from './Sidebar'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
}))

const Enhancers = ({ map }) => {
  const classes = useStyles()
  const { jurisdictions } = useDashboard()
  const [hoveredRegionId, setHoveredRegionId] = useState(null)

  useAddBoundary(map)
  useAddLocation(map)
  useAddBoundaryHover(map, setHoveredRegionId)
  useAddBoundaryZoom(map, jurisdictions)
  useAddLocations(map, jurisdictions)
  useAddLocationHover(map)

  return (
    <div className={classes.root}>
      <Sidebar hoveredRegionId={hoveredRegionId} />
    </div>
  )
}

export default Enhancers
