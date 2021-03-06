import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useWip, useWipListItem } from 'store/selectors'
import useWipActions from 'store/actions/wip'
import LastUpdated from 'components/core/LastUpdated'
import LocationForm from 'components/forms/LocationForm'
import Interview from './Interview'
import Grid from '@material-ui/core/Grid'

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
    marginBottom: '3em',
  },
  locationHeader: {
    margin: '1em 0',
    color: theme.palette.primary.dark,
    fontSize: 14,
  },
  locationName: {
    fontWeight: 700,
    fontSize: 20,
  },
}))

const EditLocation = ({
  match: {
    params: { jid, lid },
  },
}) => {
  const classes = useStyles()
  const history = useHistory()
  const wip = useWip(jid)
  const stateName = useWipListItem(jid).stateName

  const isNew = lid === 'new'
  const wipLocation = isNew
    ? undefined
    : wip.locations.find((loc) => loc.id === +lid)

  const { getWip, updateWip } = useWipActions()

  const updateJurisdiction = useCallback(() => {
    getWip(jid)
  }, [jid, getWip])

  const onSubmitLocation = useCallback(
    (values) => {
      return updateWip({
        ...wip,
        locations: (() => {
          if (isNew) return [values, ...wip.locations]

          return wip.locations.map((wipLocation) => {
            return wipLocation.id === +lid
              ? { ...wipLocation, ...values }
              : wipLocation
          })
        })(),
      })
    },
    [wip, isNew, lid, updateWip]
  )

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.title}>{isNew ? 'Add' : 'Edit'} location</h2>
        <LastUpdated updatedAt={Date.now()} onUpdate={updateJurisdiction} />
      </div>
      <div className={classes.backButton} onClick={history.goBack}>
        Back to the jurisdiction
      </div>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <div className={classes.locationHeader}>
            <div className={classes.locationName}>
              {isNew ? 'New Location' : wipLocation.name}
            </div>
            <div>
              {wip.name}, {stateName}
            </div>
          </div>
          <LocationForm wipLocation={wipLocation} onSubmit={onSubmitLocation} />
        </Grid>
        <Grid item xs={6}>
          <Interview />
        </Grid>
      </Grid>
    </div>
  )
}

export default EditLocation
