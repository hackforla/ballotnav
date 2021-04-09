import React from 'react'
import Grid from '@material-ui/core/Grid'
import useForm from './useForm'
import schema from './schemas/location'

const LocationForm = ({ wipLocation, onSubmit }) => {
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
        <Grid item xs={12}>
          {makeInput('contactName')}
        </Grid>
        <Grid item xs={12}>
          {makeInput('contactPhone')}
        </Grid>
        <Grid item xs={12}>
          {makeInput('contactEmail')}
        </Grid>
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
        <Grid item xs={12}>
          {makeInput('scheduleType')}
        </Grid>
        <Grid
          container
          item xs={12}
          justify='space-around'
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
