import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import useForm from './useForm'
import schema from './schemas/location'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  section: {
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 12,
      bottom: 12,
      left: 0,
      width: 4,
      border: `1px ${theme.palette.primary.main} solid`,
      borderRightWidth: 0,
    },
    '&:after': {
      position: 'absolute',
      left: -32,
      top: '50%',
      transform:'translateY(-50%) rotate(-90deg)',
      fontSize: 12,
    }
  },
  address: { '&:after': { content: '"address"' } },
  contact: { '&:after': { content: '"contact"' } },
}))

const LocationForm = ({ wipLocation, onSubmit }) => {
  const classes = useStyles()

  const { makeInput, makeSubmitButton, makeResetButton } = useForm({
    schema,
    initialValues: wipLocation,
    onSubmit,
    buttonDefaults: {
      size: 'large',
    },
  })

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {makeInput('name')}
        </Grid>
        <Grid
          container spacing={0}
          item xs={12}
          className={clsx(classes.section, classes.address)}
        >
          <Grid item xs={12}>
            {makeInput('address1')}
          </Grid>
          <Grid item xs={12}>
            {makeInput('address2')}
          </Grid>
          <Grid item xs={12}>
            {makeInput('address3')}
          </Grid>
          <Grid item xs={12}>
            {makeInput('city')}
          </Grid>
          <Grid item xs={12}>
            {makeInput('zip')}
          </Grid>
        </Grid>
        <Grid
          container spacing={0}
          item xs={12}
          className={clsx(classes.section, classes.contact)}
        >
          <Grid item xs={12}>
            {makeInput('contactName')}
          </Grid>
          <Grid item xs={12}>
            {makeInput('contactPhone')}
          </Grid>
          <Grid item xs={12}>
            {makeInput('contactEmail')}
          </Grid>
        </Grid>
        <Grid
          container spacing={2}
          item xs={12}
        >
          <Grid item xs={6}>
            {makeInput('isDriveup')}
          </Grid>
          <Grid item xs={6}>
            {makeInput('isDropBox')}
          </Grid>
          <Grid item xs={6}>
            {makeInput('isEarlyDropoffLocation')}
          </Grid>
          <Grid item xs={6}>
            {makeInput('isEarlyVotingLocation')}
          </Grid>
          <Grid item xs={6}>
            {makeInput('isElectionsOffice')}
          </Grid>
          <Grid item xs={6}>
            {makeInput('isHandicapAccessible')}
          </Grid>
          <Grid item xs={6}>
            {makeInput('isOutdoors')}
          </Grid>
          <Grid item xs={6}>
            {makeInput('isPollingLocation')}
          </Grid>
          <Grid item xs={6}>
            {makeInput('isStaffedLocation')}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {makeInput('scheduleType')}
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="space-around"
          style={{ paddingTop: '2em' }}
        >
          {makeResetButton()}
          {makeSubmitButton({
            label: wipLocation ? 'Update location' : 'Add location',
            requireDirty: !!wipLocation,
          })}
        </Grid>
      </Grid>
    </form>
  )
}

export default LocationForm
