import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { selectLocation } from 'redux/actions'
import SearchBar from 'components/SearchBar'
import VerifyAlert from '../VerifyAlert'
import JurisdictionSelect from '../JurisdictionSelect'
import LocationsList from '../LocationsList'
import LocationDetail from '../LocationDetail'
import Map from '../Map'

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
    position: 'relative',
  },
  locationsList: {
    position: 'absolute',
    width: SIDEBAR_WIDTH,
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'auto',
    padding: 10,
  },
  locationDetail: {
    position: 'absolute',
    width: SIDEBAR_WIDTH,
    top: 0,
    bottom: 0,
    left: ({ detailOpen }) => detailOpen ? 0 : -SIDEBAR_WIDTH,
    transition: 'all 0.25s ease-in-out',
    overflow: 'auto',
    padding: 10,
    backgroundColor: '#FFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: SIDEBAR_WIDTH,
    right: 0,
  },
})

const Desktop = ({ dataLoaded, locationSelected, deselectLocation }) => {
  const [detailOpen, setDetailOpen] = useState(false)
  const classes = useStyles({ detailOpen })

  const handleClose = useCallback(() => {
    setDetailOpen(false)
    setTimeout(deselectLocation, 250)
  }, [deselectLocation])

  useEffect(() => {
    if (locationSelected) setDetailOpen(true)
  }, [locationSelected])

  return (
    <div className={classes.root}>
      <JurisdictionSelect />
      <VerifyAlert />
      {dataLoaded && (
        <div className={classes.main}>
          <div className={classes.sidebar}>
            <div className={classes.searchBar}>
              <SearchBar />
            </div>
            <div className={classes.locations}>
              <div className={classes.locationsList}>
                <LocationsList />
              </div>
              <div className={classes.locationDetail}>
                <div onClick={handleClose}>Close Now</div>
                <LocationDetail />
              </div>
            </div>
          </div>
          <div className={classes.map}>
            <Map />
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  dataLoaded: !!state.data,
  locationSelected: !!state.ui.selectedLocationId,
})

const mapDispatchToProps = (dispatch) => ({
  deselectLocation: () => dispatch(selectLocation(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Desktop)
