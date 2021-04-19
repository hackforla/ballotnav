import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useInitMap from './useInitMap'
import useAddStates from './useAddStates'
import useAddCounties from './useAddCounties'
import RegionName from './RegionName'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    '& canvas.mapboxgl-canvas:focus': {
      outline: 'none',
    },
  },
}))

const noop = () => null

const Map = () => {
  const [statefp, setStatefp] = useState(null)
  // eslint-disable-next-line
  const [countyfp, setCountyfp] = useState(null)
  const [regionName, setRegionName] = useState(null)
  const classes = useStyles()
  const mapContainer = useRef(null)
  const map = useInitMap(mapContainer)
  useAddStates(map, setStatefp, setRegionName)
  useAddCounties(map, statefp, setCountyfp, statefp ? setRegionName : noop)

  console.log(regionName)

  return (
    <div ref={mapContainer} className={classes.root}>
      <RegionName regionName={regionName} />
    </div>
  )
}

export default Map
