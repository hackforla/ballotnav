import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Map from './Map'
import useDashboardActions from 'store/actions/dashboard'
import { useDashboard } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}))

const MapContainer = () => {
  const classes = useStyles()
  const { getJurisdictions } = useDashboardActions()
  const { jurisdictions } = useDashboard()

  useEffect(() => {
    if (!jurisdictions) getJurisdictions()
  }, [jurisdictions, getJurisdictions])

  return (
    <div className={classes.root}>
      <Map />
    </div>
  )
}

export default MapContainer
