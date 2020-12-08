import React, { useState, useEffect } from 'react'
import Map from '../shared/Map'
import LocationList from '../shared/LocationList'
import VerifyAlert from '../shared/VerifyAlert'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    position: 'relative',
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: ({ locationHeight }) => locationHeight,
    left: 0,
    right: 0,
    transition: 'all 0.2s ease-in'
  },
  list: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    transform: ({ listOpen }) => (listOpen ? 'none' : 'translateY(100%)'),
    transition: 'all 0.25s ease-in-out',
    backgroundColor: theme.palette.background.default,
    overflow: 'auto',
    padding: 10,
  },
  buttons: {
    padding: 12,
    backgroundColor: theme.palette.primary.main,
    zIndex: 22,
    color: '#FFF',
    fontWeight: 700,
    cursor: 'pointer',
  },
}))

const MapAndList = ({ isLocationSelected, locationHeight }) => {
  const [listOpen, setListOpen] = useState(false)
  const classes = useStyles({
    listOpen,
    locationHeight: Math.max(0, locationHeight - 44),  // TODO: 44 is the height of the bottom button -- make it a constant
  })

  useEffect(() => {
    if (isLocationSelected) setListOpen(false)
  }, [isLocationSelected])

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <VerifyAlert />
        <div className={classes.map}>
          <Map />
        </div>
        <div className={classes.list}>
          <LocationList />
        </div>
      </div>
      <div className={classes.buttons} onClick={() => setListOpen(!listOpen)}>
        Show {listOpen ? 'map' : 'list'}
      </div>
    </div>
  )
}

export default MapAndList
