import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { makeStyles } from '@material-ui/core'
import LocationsSummary from './LocationsSummary'
import LocationsList from './LocationsList'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
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
})

const ListView = ({ isLoading }) => {
  const classes = useStyles()
  if (isLoading)
    return (
      <div className={classes.locationsLoader}>
        <CircularProgress />
      </div>
    )
  return (
    <div className={classes.locationsList}>
      <LocationsSummary />
      <LocationsList />
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoading: select.isLoading(state),
})

export default connect(mapStateToProps)(ListView)
