import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { selectLocation } from 'store/actions'
import Header from './Header'
import Card from '../Locations/LocationsList/Card'
import LocationDetail from '../Locations/LocationDetail'
import HeightMeasurer from './HeightMeasurer'
import { makeStyles } from '@material-ui/core/styles'
import MapAndList from './MapAndList'
import Toggler from './Toggler'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  card: {
    position: 'absolute',
    top: ({ fullCardOpen, cardOpen, cardHeight }) => {
      if (fullCardOpen) return 52
      if (cardOpen) return `calc(100% - ${cardHeight}px)`
      return '100%'
    },
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0 8px',
    zIndex: 106,
    transition: 'all 0.25s ease-in-out',
    backgroundColor: theme.palette.background.default,
    overflow: 'auto',
  },
}))

const Mobile = ({ selectedLocation, deselectLocation }) => {
  const [cardOpen, setCardOpen] = useState(false)
  const [fullCardOpen, setFullCardOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [location, setLocation] = useState(null)
  const [cardHeight, setCardHeight] = useState(0)
  const classes = useStyles({ cardOpen, cardHeight, fullCardOpen, detailOpen })

  useEffect(() => {
    if (selectedLocation) {
      setCardOpen(true)
      setLocation(selectedLocation)
    } else {
      setCardOpen(false)
    }
  }, [selectedLocation])

  useEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [cardHeight, cardOpen])

  return (
    <div className={classes.root}>
      <Header />
      <div style={{ flex: 1 }}>
        <MapAndList isLocationSelected={!!selectedLocation} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 52,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          pointerEvents: 'none',
        }}
      >
        {location && (
          <Toggler
            onClose={deselectLocation}
            shortContent={
              <Card
                location={location}
                selectLocation={() => setDetailOpen(true)}
              />
            }
            longContent={
              <LocationDetail location={location} />
            }
          />
        )}
      </div>
      {/*<div className={classes.card}>
        <div onClick={() => setFullCardOpen(!fullCardOpen)}>toggle</div>
        {location && (
          fullCardOpen
            ? <LocationDetail location={location} />
            : (
              <HeightMeasurer onMeasure={height => setCardHeight(height + 15)}>
                <Card
                  location={location}
                  selectLocation={() => setDetailOpen(true)}
                />
              </HeightMeasurer>
            )
        )}
      </div>*/}
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
