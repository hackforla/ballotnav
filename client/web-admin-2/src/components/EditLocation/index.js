import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useWipJurisdiction, useMyJurisdiction } from 'store/selectors'
import useVolunteerActions from 'store/actions/volunteer'
import LastUpdated from 'components/core/LastUpdated'
import Editor from './Editor'
import Interview from './Interview'
import Grid from '@material-ui/core/Grid'

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
    display: 'inline-block',
    marginBottom: '1em',
  },
  locationHeader: {
    margin: '2.5em 0',
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className={classes.locationHeader}>
            <div className={classes.locationName}>{ wipLocation.name }</div>
            <div>{ wipJurisdiction.name }, { jurisdiction.state.name }</div>
          </div>
          <Editor />
        </Grid>
        <Grid item xs={6}>
          <Interview />
        </Grid>
      </Grid>
    </div>
  )
}

export default EditLocation