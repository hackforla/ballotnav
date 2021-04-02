import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMyJurisdictions, useWipJurisdictions } from 'store/selectors'
import useVolunteerActions from 'store/actions/volunteer'
import JurisdictionStatus from 'components/Dashboard/core/JurisdictionStatus'
import LastUpdated from 'components/Dashboard/core/LastUpdated'
import EditJurisdiction from './EditJurisdiction'
import EditSubmodels from './EditSubmodels'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '3em',
  },
  headerLeft: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    marginRight: '1.5em',
  },
  details: {
    marginBottom: '4em',
  },
  detailsToggle: {
    color: theme.palette.link.main,
    textDecoration: 'underline',
    fontSize: '0.875em',
    marginBottom: '0.25em',
    cursor: 'pointer',
    userSelect: 'none',
  },
}))

const JurisdictionDetails = ({ match }) => {
  const classes = useStyles()
  const [showDetails, setShowDetails] = useState(true)
  const jurisdictions = useMyJurisdictions()
  const wipJurisdictions = useWipJurisdictions()
  const { getWipJurisdiction } = useVolunteerActions()
  const { jid } = match.params
  const wipJurisdiction = wipJurisdictions[jid]

  const jurisdictionStatus = useMemo(() => {
    if (!jurisdictions) return null
    return jurisdictions.find((j) => j.id === +jid)?.jurisdictionStatus
  }, [jurisdictions, jid])

  const updateWipJurisdiction = useCallback(() => {
    getWipJurisdiction(jid)
  }, [getWipJurisdiction, jid])

  useEffect(() => {
    if (!wipJurisdiction) updateWipJurisdiction()
  }, [wipJurisdiction, updateWipJurisdiction])

  const toggleDetails = useCallback(() => {
    setShowDetails((showDetails) => !showDetails)
  }, [])

  if (!wipJurisdiction ) return null
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', }}>
          <h2 className={classes.title}>Jurisdiction details</h2>
          <JurisdictionStatus status={jurisdictionStatus} />
        </div>
        <LastUpdated
          updatedAt={Date.now()}
          onUpdate={updateWipJurisdiction}
        />
      </div>
      <div className={classes.details}>
        <div className={classes.detailsToggle} onClick={toggleDetails}>
          { showDetails ? 'Hide details' : 'Show details' }
        </div>
        {showDetails && <EditJurisdiction wipJurisdiction={wipJurisdiction} />}
      </div>
      <EditSubmodels />
    </div>
  )
}

export default JurisdictionDetails
