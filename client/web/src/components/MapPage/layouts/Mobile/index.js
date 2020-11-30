import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { selectLocation } from 'store/actions'
import Card from '../../Locations/LocationsList/Card'
import LocationDetail from '../../Locations/LocationDetail'
import { makeStyles } from '@material-ui/core/styles'
import MapAndList from './MapAndList'
import Toggler from './Toggler2'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - ${theme.layout.headerHeight}px)`,
    overflow: 'hidden',
    position: 'relative',
  },
  locationInfo: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    pointerEvents: 'none',
  },
  card: {
    padding: '0 5px 15px',
  },
  instructions: {
    fontWeight: 400,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
    color: theme.palette.grey[400],
  },
}))

const Mobile = ({ selectedLocation, deselectLocation }) => {
  const [location, setLocation] = useState(null)
  const [position, setPosition] = useState('closed')
  const classes = useStyles()

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation)
      setPosition('short')
    } else {
      setPosition('closed')
    }
  }, [selectedLocation])

  return (
    <div className={classes.root}>
      <MapAndList isLocationSelected={!!selectedLocation} />
      <div className={classes.locationInfo}>
        <Toggler
          position={position}
          onChange={(position) => {
            if (position === 'closed') deselectLocation()
            setPosition(position)
          }}
          tallContent={
            <div className={classes.card}>
              <LocationDetail location={location} />
            </div>
          }
          shortContent={
            location ? (
              <div className={classes.card}>
                <Card location={location} />
                <div className={classes.instructions}>
                  Swipe up for details
                </div>
              </div>
            ) : null
          }
        >
          {/*{(() => {
            if (position === 'tall')
              return (
                <div className={classes.card}>
                  <LocationDetail location={location} />
                </div>
              )
            else if (location)
              return (
                <div className={classes.card}>
                  <Card location={location} />
                  <div className={classes.instructions}>
                    Swipe up for details
                  </div>
                </div>
              )
            else
              return null
          })()}*/}
        </Toggler>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedLocation: select.selectedLocation(state),
})

const mapDispatchToProps = (dispatch) => ({
  deselectLocation: () => dispatch(selectLocation(null))
})

export default connect(mapStateToProps, mapDispatchToProps)(Mobile)
