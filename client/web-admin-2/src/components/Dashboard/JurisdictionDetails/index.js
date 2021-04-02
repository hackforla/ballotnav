import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useMyJurisdictions, useWipJurisdictions } from 'store/selectors'
import { getWipJurisdiction } from 'store/actions/volunteer'
import LastUpdated from 'components/core/LastUpdated'
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
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
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
  const dispatch = useDispatch()
  const [showDetails, setShowDetails] = useState(true)
  const jurisdictions = useMyJurisdictions()
  const wipJurisdictions = useWipJurisdictions()
  const { jid } = match.params
  const wipJurisdiction = wipJurisdictions[jid]

  const jurisdictionStatus = useMemo(() => {
    if (!jurisdictions) return null
    return jurisdictions.find((j) => j.id === +jid)?.jurisdictionStatus
  }, [jurisdictions, jid])

  useEffect(() => {
    if (!wipJurisdiction) dispatch(getWipJurisdiction(jid))
  }, [dispatch, wipJurisdiction, jid])

  const toggleDetails = useCallback(() => {
    setShowDetails((showDetails) => !showDetails)
  }, [])

  if (!wipJurisdiction ) return null
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.title}>Jurisdiction details</h2>
        <div style={{ flex: 1, marginLeft: '2em' }}>{ jurisdictionStatus }</div>
        <LastUpdated updatedAt={Date.now()} />
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
