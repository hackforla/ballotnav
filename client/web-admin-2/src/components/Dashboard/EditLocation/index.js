import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useWipJurisdiction, useMyJurisdiction } from 'store/selectors'
import useVolunteerActions from 'store/actions/volunteer'
import LastUpdated from 'components/Dashboard/core/LastUpdated'

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
  backButton: {
    color: theme.palette.link.main,
    fontSize: 12,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  locationHeader: {
    marginTop: '3em',
    color: theme.palette.primary.dark,
    fontSize: 14,
  },
  locationName: {
    fontWeight: 700,
    fontSize: 20,
  },
}))

const EditLocation = ({ match: { params: { jid, lid } }}) => {
  const classes = useStyles()
  const history = useHistory()
  const wipJurisdiction = useWipJurisdiction(jid)
  const wipLocation = wipJurisdiction.locations.find((loc) => loc.id === +lid)
  const jurisdiction = useMyJurisdiction(jid)
  const { getWipJurisdiction } = useVolunteerActions()

  const updateJurisdiction = useCallback(() => {
    getWipJurisdiction(jid)
  }, [jid, getWipJurisdiction])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.title}>Edit location</h2>
        <LastUpdated
          updatedAt={Date.now()}
          onUpdate={updateJurisdiction}
        />
      </div>
      <div
        className={classes.backButton}
        onClick={history.goBack}
      >
        Back to the jurisdiction
      </div>
      <div className={classes.locationHeader}>
        <div className={classes.locationName}>{ wipLocation.name }</div>
        <div>{ wipJurisdiction.name }, { jurisdiction.state.name }</div>
      </div>
    </div>
  )
}

export default EditLocation
