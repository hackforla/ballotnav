import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import Header from './Header'
import Map from '../Map'
import Card from '../Locations/LocationsList/Card'
import Cards from '../Locations/LocationsList/Cards'
import LocationDetail from '../Locations/LocationDetail'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    position: 'relative',
  },
  buttons: {
    padding: 12,
    //textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    zIndex: 105,
    color: '#FFF',
    fontWeight: 700,
    //fontSize: 18,
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  list: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 103,
    transform: ({ listOpen }) => listOpen ? 'none' : 'translateY(100%)',
    transition: 'all 0.25s ease-in-out',
    backgroundColor: theme.palette.background.default,
    overflow: 'auto',
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    zIndex: 102,
    transform: ({ cardOpen }) => cardOpen ? 'none' : 'translateY(100%)',
    transition: 'all 0.25s ease-in-out',
    backgroundColor: theme.palette.background.default,
  },
  detail: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    zIndex: 104,
    transform: ({ detailOpen }) => detailOpen ? 'none' : 'translateY(100%)',
    transition: 'all 0.25s ease-in-out',
    backgroundColor: theme.palette.background.default,
    overflow: 'auto',
  },
}))

const Mobile = ({ selectedLocation }) => {
  const [listOpen, setListOpen] = useState(false)
  const [cardOpen, setCardOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [location, setLocation] = useState(null)
  const classes = useStyles({ listOpen, cardOpen, detailOpen })

  useEffect(() => {
    if (selectedLocation) {
      setListOpen(false)
      setCardOpen(true)
      setLocation(selectedLocation)
    } else {
      setCardOpen(false)
    }
  }, [selectedLocation])

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.main}>
        <div className={classes.map}>
          <Map />
        </div>
        <div className={classes.list}>
          <Cards />
        </div>
        <div className={classes.card}>
          {location && (
            <Card
              location={location}
              selectLocation={() => setDetailOpen(true)}
            />
          )}
        </div>
        <div className={classes.detail}>
          {location && (
            <LocationDetail location={location} />
          )}
        </div>
      </div>
      <div
        className={classes.buttons}
        onClick={() => {
          if (detailOpen)
            setDetailOpen(false)
          else
            setListOpen(!listOpen)
        }}
      >
        {(() => {
          if (detailOpen) return 'Back to map'
          return `Show ${listOpen ? 'map' : 'list'}`
        })()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedLocation: select.selectedLocation(state),
})

export default connect(mapStateToProps)(Mobile)
