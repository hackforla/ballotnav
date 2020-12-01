import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import Summary from './Summary'
import LocationCards from './LocationCards'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  loader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const LocationsList = ({ isLoading, locations }) => {
  const classes = useStyles()
  const scrollRef = useRef(null)

  // scroll to top whenever locations changee
  useEffect(() => {
    scrollRef.current.scrollTop = 0
  }, [locations])

  return (
    <div ref={scrollRef} className={classes.root}>
      {isLoading ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Summary />
          <LocationCards />
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoading: select.isLoading(state),
  locations: select.sortedLocations(state),
})

export default connect(mapStateToProps)(LocationsList)
