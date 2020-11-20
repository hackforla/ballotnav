import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { selectLocation } from 'redux/actions'
import SearchBar from 'components/SearchBar'
import LocationsSummary from './LocationsSummary'
import LocationsList from './LocationsList'
import BackButton from './BackButton'
import LocationDetail from './LocationDetail'
import CircularProgress from '@material-ui/core/CircularProgress'

const TRANSITION_SECONDS = 0.25

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  searchBar: {
    padding: '20px 15px',
    flex: 0,
    borderBottom: '1px lightgrey solid',
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
    width: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'auto',
    padding: '10px 15px',
  },
  locationDetail: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    left: ({ showDetail }) => showDetail ? 0 : '-100%',
    transition: `all ${TRANSITION_SECONDS}s ease-in-out`,
    overflow: 'auto',
    padding: '10px 15px',
    backgroundColor: '#FFF',
  },
})

const Locations = ({ isLoading, locationSelected, deselectLocation }) => {
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
                <LocationsSummary />
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
  )
}

const mapStateToProps = (state) => ({
  locationSelected: !!state.ui.selectedLocationId,
  isLoading: state.data.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  deselectLocation: () => dispatch(selectLocation(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Locations)
