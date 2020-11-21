import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import SearchBar from 'components/shared/SearchBar'
import LocationsList from './LocationsList'
import LocationDetail from './LocationDetail'

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '20px 15px',
    flex: 0,
    borderBottom: '1px lightgrey solid',
  },
  main: {
    flex: 1,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    left: ({ visible }) => (visible ? 0 : '-100%'),
    transition: 'all 0.25s ease-in-out',
    overflow: 'auto',
    padding: '10px 15px',
    backgroundColor: '#FFF',
  },
})

const Locations = ({ showLocationDetail }) => {
  const classes = useStyles({ visible: showLocationDetail })
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <SearchBar />
      </div>
      <div className={classes.main}>
        <LocationsList />
        <div className={classes.slider}>
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
