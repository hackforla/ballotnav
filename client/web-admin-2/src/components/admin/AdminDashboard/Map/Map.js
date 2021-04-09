import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import mapboxgl, { styleUrl } from 'services/mapbox'
import Jurisdictions from './Jurisdictions'
import Locations from './Locations'
import Sidebar from './Sidebar'

const useStyles = makeStyles({
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
  sidebar: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
})

// const CONTINENTAL_US = [
//   [-124.848974, 24.396308],
//   [-66.885444, 49.384358],
// ]

const GEORGIA = [
  [-85, 30],
  [-82, 35],
]

const Map = ({ jurisdictions }) => {
  const classes = useStyles()
  const mapContainer = useRef(null)
  const [map, setMap] = useState(null)
  const [hoveredRegionId, setHoveredRegionId] = useState(null)
  const [selectedRegionId, setSelectedRegionId] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
      bounds: GEORGIA,
      fitBoundsOptions: {
        padding: 50,
      }
    })

    map.on('load', () => {
      setMap(map)
    })
  }, [])

  return (
    <div ref={mapContainer} className={classes.root}>
      {map && (
        <>
          <Jurisdictions
            map={map}
            jurisdictions={jurisdictions}
            onChangeHoveredRegion={setHoveredRegionId}
            onChangeSelectedRegion={setSelectedRegionId}
          />
          <Locations
            map={map}
            jurisdictions={jurisdictions}
          />
          <div className={classes.sidebar}>
            <Sidebar
              jurisdictions={jurisdictions}
              hoveredRegionId={hoveredRegionId}
              selectedRegionId={selectedRegionId}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Map
