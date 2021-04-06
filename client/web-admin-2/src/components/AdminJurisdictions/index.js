import React, { useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useAssignmentActions from 'store/actions/assignment'
import { useAssignment } from 'store/selectors'
import LastUpdated from 'components/core/LastUpdated'
import Stats from './Stats'
import Jurisdictions from './Jurisdictions'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '6em',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2.5em',
    height: '3em',
  },
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: 24,
  },
}))

const AdminJurisdictions = () => {
  const classes = useStyles()
  const { getJurisdictions } = useAssignmentActions()
  const { jurisdictions } = useAssignment()

  useEffect(() => {
    if (!jurisdictions) getJurisdictions()
  }, [jurisdictions, getJurisdictions])

  const transformed = useMemo(() => {
    if (!jurisdictions) return null

    return jurisdictions.map((j) => ({
      id: j.id,
      jurisdictionName: j.name,
      stateName: j.state.name,
      jurisdictionStatus: j.jurisdictionStatus,
      userJurisdictions: j.userJurisdictions,
    }))
  }, [jurisdictions])

  if (!transformed) return null
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.title}>My Jurisdictions</h1>
        <LastUpdated
          updatedAt={Date.now()}
          onUpdate={getJurisdictions}
        />
      </div>
      <Stats jurisdictions={transformed} />
      <Jurisdictions jurisdictions={transformed} />
    </div>
  )
}

export default AdminJurisdictions
