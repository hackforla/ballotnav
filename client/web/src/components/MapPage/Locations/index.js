import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { makeStyles } from '@material-ui/core'
import SearchBar from 'components/SearchBar'
import ListView from './ListView'
import BackButton from './BackButton'
import LocationDetail from './LocationDetail'

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
  locationDetail: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    left: ({ showLocationDetail }) => showLocationDetail ? 0 : '-100%',
    transition: `all ${TRANSITION_SECONDS}s ease-in-out`,
    overflow: 'auto',
    padding: '10px 15px',
    backgroundColor: '#FFF',
  },
})

const Locations = ({ showLocationDetail }) => {
  const classes = useStyles({ showLocationDetail })
  return (
    <div className={classes.root}>
      <div className={classes.searchBar}>
        <SearchBar />
      </div>
      <div className={classes.locations}>
        <ListView />
        <div className={classes.locationDetail}>
          <BackButton />
          <LocationDetail />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  showLocationDetail: select.showLocationDetail(state),
})

export default connect(mapStateToProps)(Locations)
