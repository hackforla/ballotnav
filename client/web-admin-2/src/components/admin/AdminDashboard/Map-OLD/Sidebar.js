import React, { useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import populationByCounty from './population'
import useDashboardActions from 'store/actions/dashboard'
import { useDashboard } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: '1.5em',
    backgroundColor: '#27272b',
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

const Sidebar = ({ hoveredRegionId, selectedRegionId }) => {
  const classes = useStyles()
  const { getJurisdictions } = useDashboardActions()
  const { jurisdictions } = useDashboard()

  useEffect(() => {
    if (!jurisdictions) getJurisdictions()
  }, [jurisdictions, getJurisdictions])

  const { name, numLocations, population } = useMemo(() => {
    if (!jurisdictions) return {}

    if (hoveredRegionId) {
      const jur = jurisdictions.find((j) => j.id === hoveredRegionId)
      return {
        name: jur.name,
        numLocations: jur.locations.length,
        population: populationByCounty[jur.name],
      }
    }

    return {
      name: 'Georgia',
      numLocations: jurisdictions.reduce(
        (total, jur) => total + jur.locations.length,
        0
      ),
      population: Object.values(populationByCounty).reduce(
        (total, next) => total + next,
        0
      ),
    }
  }, [jurisdictions, hoveredRegionId])

  if (!jurisdictions) return null
  return (
    <div className={classes.root}>
      <h1>{name}</h1>
      <div className={classes.title}>Drop-off Locations</div>
      <div style={{ fontSize: 28 }}>{numLocations}</div>
      <div className={classes.title}>Population</div>
      <div style={{ fontSize: 22 }}>{population}</div>
    </div>
  )
}

export default Sidebar
