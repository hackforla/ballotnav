import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useWip, useWipListItem } from 'store/selectors'
import useWipActions from 'store/actions/wip'
import JurisdictionStatus from 'components/core/JurisdictionStatus'
import LastUpdated from 'components/core/LastUpdated'
import JurisdictionForm from 'components/forms/JurisdictionForm'
import Submodels from './Submodels'
import Footer from '../Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '6em',
  },
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
    display: ({ showDetails }) => (showDetails ? 'block' : 'none'),
    marginBottom: '3em',
  },
}))

const JurisdictionDetails = ({
  match: {
    params: { jid },
  },
}) => {
  const [showDetails, setShowDetails] = useState(true)
  const classes = useStyles({ showDetails })
  const jurisdictionStatus = useWipListItem(jid)?.jurisdictionStatus
  const { getWip, updateWip } = useWipActions()
  const wipJurisdiction = useWip(jid)

  const refreshWip = useCallback(() => getWip(jid), [getWip, jid])

  const toggleDetails = useCallback(() => {
    setShowDetails((showDetails) => !showDetails)
  }, [])

  const onSubmitJurisdiction = useCallback(
    (values) => {
      return updateWip({
        ...wipJurisdiction,
        ...values,
      })
    },
    [wipJurisdiction, updateWip]
  )

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <h2 className={classes.title}>Jurisdiction details</h2>
          <JurisdictionStatus status={jurisdictionStatus} />
        </div>
        <LastUpdated updatedAt={Date.now()} onUpdate={refreshWip} />
      </div>
      <div className={classes.detailsToggle} onClick={toggleDetails}>
        {showDetails ? 'Hide details' : 'Show details'}
      </div>
      <div className={classes.details}>
        <JurisdictionForm
          wipJurisdiction={wipJurisdiction}
          onSubmit={onSubmitJurisdiction}
        />
      </div>
      <Submodels wipJurisdiction={wipJurisdiction} />
      <Footer wipJurisdiction={wipJurisdiction} />
    </div>
  )
}

export default JurisdictionDetails
