import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import SearchBar from 'components/core/SearchBar'
import LocationList from '../shared/LocationList'
import LocationDetail from '../shared/LocationDetail'
import BackButton from '../shared/BackButton'
import CheckSteps from '../shared/LocationDetail/CheckSteps'

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
    overflow: 'hidden',
  },
  list: {
    padding: 10,
    height: '100%',
    overflow: 'auto',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    left: ({ visible }) => (visible ? 0 : '-100%'),
    transition: 'all 0.25s ease-in-out',
    overflow: 'auto',
    padding: '10px 20px 10px 15px',
    backgroundColor: '#FFF',
  },
})

// NOTE: we hold the location in state so that it doesn't disappear
// immediately when selectedLocation is set to null
const Sidebar = ({ selectedLocation }) => {
  const classes = useStyles({ visible: !!selectedLocation })
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (selectedLocation) setLocation(selectedLocation)
  }, [selectedLocation])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <SearchBar />
      </div>
      <div className={classes.main}>
        <div className={classes.list}>
          <LocationList />
        </div>
        <div className={classes.slider}>
          <BackButton />
          <CheckSteps />
          <LocationDetail location={location} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedLocation: select.selectedLocation(state),
})

export default connect(mapStateToProps)(Sidebar)
