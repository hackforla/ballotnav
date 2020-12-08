import React, { useState, useEffect, useRef } from 'react'
import Map from '../shared/Map'
import LocationList from '../shared/LocationList'
import VerifyAlert from '../shared/VerifyAlert'
import { makeStyles } from '@material-ui/styles'

const BUTTONS_HEIGHT = 50

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
    bottom: ({ locationHeight }) => Math.max(0, locationHeight - BUTTONS_HEIGHT),
    left: 0,
    right: 0,
    // transition would be nice but crashes mobile browsers -- work on this
    // transition: 'all 0.2s ease-in'
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
    paddingLeft: 12,
    height: BUTTONS_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    zIndex: 22,
    color: '#FFF',
    fontWeight: 700,
    cursor: 'pointer',
  },
}))

const MapAndList = ({ isLocationSelected, locationHeight }) => {
  const [listOpen, setListOpen] = useState(false)
  const classes = useStyles({ listOpen, locationHeight })

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
