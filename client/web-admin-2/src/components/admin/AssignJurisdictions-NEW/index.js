import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useAssignmentActions from 'store/actions/assignment'
import { useAssignment } from 'store/selectors'
import LastUpdated from 'components/core/LastUpdated'

const useStyles = makeStyles((theme) => ({
  root: {},
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

const AssignJurisdictions = () => {
  const classes = useStyles()
  const { getAssignment } = useAssignmentActions()
  const assignment = useAssignment()

  useEffect(() => {
    if (!assignment) getAssignment()
  }, [assignment, getAssignment])

  if (!assignment) return null
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.title}>Assign Jurisdictions</h1>
        <LastUpdated
          updatedAt={Date.now()}
          onUpdate={getAssignment}
        />
      </div>
    </div>
  )
}

export default AssignJurisdictions
