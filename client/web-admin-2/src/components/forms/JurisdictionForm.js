import React from 'react'
import useForm from './useForm'
import Grid from '@material-ui/core/Grid'
import FormButtons from './FormButtons'
import schema from './schemas/jurisdiction'

const JurisdictionForm = ({ wipJurisdiction, onSubmit }) => {
  const {
    handleSubmit,
    handleReset,
    dirty,
    isSubmitting,
    isValid,
    makeInput,
  } = useForm({
    schema,
    initialValues: wipJurisdiction,
    onSubmit,
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
          {makeInput('internalNotes')}
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <FormButtons
            onReset={handleReset}
            onSubmit={handleSubmit}
            resetDisabled={!dirty}
            submitDisabled={!dirty || !isValid || isSubmitting}
            submitTitle="Update jurisdiction"
            padding="0.375em 3em"
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default JurisdictionForm
