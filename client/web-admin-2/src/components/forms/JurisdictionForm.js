import React from 'react'
import Grid from '@material-ui/core/Grid'
import useForm from './useForm'
import schema from './schemas/jurisdiction'

const JurisdictionForm = ({ wipJurisdiction, onSubmit }) => {
  const { makeInput, makeButtons } = useForm({
    schema,
    initialValues: wipJurisdiction,
    onSubmit,
    inputDefaults: {
      variant: 'outlined',
    },
    buttons: {
      submitLabel: 'Update jurisdictions',
      padding: '0.375em 3em',
    },
  })

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          { makeInput('name') }
        </Grid>
        <Grid item xs={6}>
          { makeInput('authorityName') }
        </Grid>
        <Grid container item xs={6} spacing={0}>
          <Grid item xs={12}>
            { makeInput('mailAddress1') }
          </Grid>
          <Grid item xs={12}>
            { makeInput('mailAddress2') }
          </Grid>
          <Grid item xs={12}>
            { makeInput('mailAddress3') }
          </Grid>
        </Grid>
        <Grid item xs={6}>
          { makeInput('internalNotes') }
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          { makeButtons() }
        </Grid>
      </Grid>
    </form>
  )
}

export default JurisdictionForm
