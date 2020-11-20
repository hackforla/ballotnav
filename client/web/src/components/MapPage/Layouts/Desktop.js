import React from 'react'
import { makeStyles } from '@material-ui/core'
import VerifyAlert from '../VerifyAlert'
import JurisdictionSelect from '../JurisdictionSelect'
import Map from '../Map'
import Locations from '../Locations'

const HEADER_HEIGHT = 52 // TODO: put the header height in the theme
const SIDEBAR_WIDTH = 500

const useStyles = makeStyles({
  root: {
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    position: 'relative',
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: SIDEBAR_WIDTH,
    right: 0,
  },
})

const Desktop = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <JurisdictionSelect />
      <VerifyAlert />
      <div className={classes.main}>
        <div className={classes.sidebar}>
          <Locations />
        </div>
        <div className={classes.map}>
          <Map />
        </div>
      </div>
    </div>
  )
}

export default Desktop
