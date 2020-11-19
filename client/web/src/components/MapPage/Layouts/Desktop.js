import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { selectLocation } from 'redux/actions'
import SearchBar from 'components/SearchBar'
import VerifyAlert from '../VerifyAlert'
import JurisdictionSelect from '../JurisdictionSelect'
import LocationsList from '../LocationsList'
import BackButton from '../BackButton'
import LocationDetail from '../LocationDetail'
import CircularProgress from '@material-ui/core/CircularProgress'
import Map from '../Map'

const HEADER_HEIGHT = 52 // TODO: put the header height in the theme
const SIDEBAR_WIDTH = 400
const TRANSITION_SECONDS = 0.25

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
  locationsLoader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    left: ({ showDetail }) => showDetail ? 0 : -SIDEBAR_WIDTH,
    transition: `all ${TRANSITION_SECONDS}s ease-in-out`,
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

const Desktop = ({ isLoading, locationSelected, deselectLocation }) => {
  const [showDetail, setShowDetail] = useState(false)
  const classes = useStyles({ showDetail })

  const hideDetail = useCallback(() => {
    setShowDetail(false)
    setTimeout(deselectLocation, TRANSITION_SECONDS * 1000)
  }, [deselectLocation])

  useEffect(() => {
    if (isLoading) setShowDetail(false)
  }, [isLoading])

  useEffect(() => {
    if (locationSelected) setShowDetail(true)
  }, [locationSelected])

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
            {isLoading
              ? (
                <div className={classes.locationsLoader}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <div className={classes.locationsList}>
                    <LocationsList />
                  </div>
                  <div className={classes.locationDetail}>
                    <BackButton onClick={hideDetail} />
                    <LocationDetail />
                  </div>
                </>
              )
            }
          </div>
        </div>
        <div className={classes.map}>
          <Map />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  locationSelected: !!state.ui.selectedLocationId,
  isLoading: state.data.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  deselectLocation: () => dispatch(selectLocation(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Desktop)
