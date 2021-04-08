import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import populationByCounty from './population'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1.5em',
    backgroundColor: '#1B1B1B',
    color: theme.palette.common.white,
    minWidth: 275,
    textAlign: 'center',
    borderRadius: 10,
  },
  title: {
    textTransform: 'uppercase',
    fontStyle: 'italic',
    fontSize: '0.8em',
    margin: '2em 0 0.5em',
  },
}))

const Sidebar = ({ jurisdictions, hoveredRegionId, selectedRegionId }) => {
  const classes = useStyles()

  const { name, numLocations, population } = (() => {
    if (hoveredRegionId) {
      const jur = jurisdictions.find((j) => j.id === hoveredRegionId)
      return {
        name: jur.name,
        numLocations: jur.locations.length,
        population: populationByCounty[jur.name]
      }
    }

    return {
      name: 'Georgia',
      numLocations: jurisdictions.reduce((total, jur) => total + jur.locations.length, 0),
      population: Object.values(populationByCounty).reduce((total, next) => total + next, 0)
    }
  })()

  return (
    <div className={classes.root}>
      <h1>{ name }</h1>
      <div className={classes.title}>Drop-off Locations</div>
      <div style={{ fontSize: 28 }}>{ numLocations }</div>
      <div className={classes.title}>Population</div>
      <div style={{ fontSize: 22 }}>{ population }</div>
    </div>
  )
}

export default Sidebar
