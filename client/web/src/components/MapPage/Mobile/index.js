import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { selectLocation } from 'store/actions'
import LocationCard from '../shared/LocationCard'
import LocationDetail from '../shared/LocationDetail'
import CheckSteps from '../shared/LocationDetail/CheckSteps'
import { makeStyles } from '@material-ui/core/styles'
import MapAndList from './MapAndList'
import VerticalSlider from './VerticalSlider'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 25,
    pointerEvents: 'none',
  },
  card: {
    padding: '0 12px 15px',
    userSelect: 'none',
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
  const [locationHeight, setLocationHeight] = useState(0)

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation)
      setPosition('short')
    } else {
      setPosition('closed')
    }
  }, [selectedLocation])

  const handlePosition = useCallback(
    (position) => {
      if (position === 'closed') deselectLocation()
      setPosition(position)
    },
    [deselectLocation]
  )

  return (
    <div className={classes.root}>
      <MapAndList
        isLocationSelected={!!selectedLocation}
        locationHeight={position === 'closed' ? 0 : locationHeight}
      />
      <div className={classes.slider}>
        <VerticalSlider
          position={position}
          onChange={handlePosition}
          shortContent={
            location && (
              <div className={classes.card}>
                <LocationCard location={location} isSelected />
                <div className={classes.instructions}>Swipe up for details</div>
              </div>
            )
          }
          tallContent={
            <div className={classes.card}>
              <LocationDetail location={location} />
              <CheckSteps />
            </div>
          }
          onShortContentHeightChange={setLocationHeight}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedLocation: select.selectedLocation(state),
})

const mapDispatchToProps = (dispatch) => ({
  deselectLocation: () => dispatch(selectLocation(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mobile)
