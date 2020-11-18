import React from 'react'
import JurisdictionSelect from '../JurisdictionSelect'
import VerifyAlert from '../VerifyAlert'
import SearchBar from 'components/SearchBar'
import Locations from '../Locations'
import Map from '../Map'
import { makeStyles } from '@material-ui/core'

const HEADER_HEIGHT = 52 // TODO: put the header height in the theme
const SIDEBAR_WIDTH = 400

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
    display: 'flex',
    flexDirection: 'column',
  },
  searchBar: {
    padding: 10,
    flex: 0,
  },
  locations: {
    flex: 1,
    overflow: 'auto',
    padding: 10,
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
          <div className={classes.searchBar}>
            <SearchBar />
          </div>
          <div className={classes.locations}>
            <Locations />
          </div>
        </div>
        <div className={classes.map}>
          <Map />
        </div>
      </div>
    </div>
  )
}

export default Desktop
