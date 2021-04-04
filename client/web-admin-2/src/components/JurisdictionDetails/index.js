import React, { useMemo, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMyJurisdictions, useWipJurisdiction } from 'store/selectors'
import useVolunteerActions from 'store/actions/volunteer'
import JurisdictionStatus from 'components/core/JurisdictionStatus'
import LastUpdated from 'components/core/LastUpdated'
import EditJurisdiction from './EditJurisdiction'
import Submodels from './Submodels'

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
  detailsToggle: {
    display: 'inline-block',
    color: theme.palette.link.main,
    textDecoration: 'underline',
    fontSize: '0.875em',
    marginBottom: '1.5em',
    cursor: 'pointer',
    userSelect: 'none',
  },
  details: {
    display: ({ showDetails }) => showDetails ? 'block' : 'none',
    marginBottom: '1.5em',
  },
}))

const JurisdictionDetails = ({ match: { params: { jid } } }) => {
  const [showDetails, setShowDetails] = useState(true)
  const classes = useStyles({ showDetails })
  const jurisdictions = useMyJurisdictions()
  const { getWipJurisdiction } = useVolunteerActions()
  const wipJurisdiction = useWipJurisdiction(jid)

  const jurisdictionStatus = useMemo(() => {
    if (!jurisdictions) return null
    return jurisdictions.find((j) => j.id === +jid)?.jurisdictionStatus
  }, [jurisdictions, jid])

  const updateWipJurisdiction = useCallback(() => {
    getWipJurisdiction(jid)
  }, [getWipJurisdiction, jid])

  const toggleDetails = useCallback(() => {
    setShowDetails((showDetails) => !showDetails)
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <h2 className={classes.title}>Jurisdiction details</h2>
          <JurisdictionStatus status={jurisdictionStatus} />
        </div>
        <LastUpdated
          updatedAt={Date.now()}
          onUpdate={updateWipJurisdiction}
        />
      </div>
      <div className={classes.detailsToggle} onClick={toggleDetails}>
        { showDetails ? 'Hide details' : 'Show details' }
      </div>
      <div className={classes.details}>
        <EditJurisdiction wipJurisdiction={wipJurisdiction} />
      </div>
      <Submodels wipJurisdiction={wipJurisdiction} />
    </div>
  )
}

export default JurisdictionDetails