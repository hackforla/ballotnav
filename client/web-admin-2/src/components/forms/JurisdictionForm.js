import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useForm from './useForm'
import * as Yup from 'yup'
import { Button, TextField, Grid } from '@material-ui/core'
import { pick } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
  changed: {
    '&:after': {
      content: '"*"',
      position: 'absolute',
      top: 0,
      right: -10,
      color: theme.palette.primary.main,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  clearButton: {
    color: theme.palette.link.main,
    fontSize: 12,
    textDecoration: 'underline',
    cursor: 'pointer',
    visibility: ({ dirty }) => dirty ? 'visible' : 'hidden',
    marginRight: '2em',
  },
  submitButton: {
    textTransform: 'none',
    borderRadius: '2em',
    padding: '0.375em 3em',
    fontWeight: 700,
    fontSize: 12,
  },
}))

const FIELDS = [
  'name',
  'authorityName',
  'mailAddress1',
  'mailAddress2',
  'mailAddress3',
  'internalNotes'
]

const validationSchema = Yup.object({
  name: Yup.string().required(),
  authorityName: Yup.string(),
  mailAddress1: Yup.string(),
  mailAddress2: Yup.string(),
  mailAddress3: Yup.string(),
  internalNotes: Yup.string(),
})

const JurisdictionForm = ({ wipJurisdiction, onSubmit }) => {
  const {
    handleSubmit,
    handleReset,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    dirty,
    changed,
    isSubmitting,
    isValid,
  } = useForm({
    enableReinitialize: true,
    initialValues: pick(wipJurisdiction, FIELDS),
    validationSchema,
    onSubmit,
  })

  const classes = useStyles({ dirty })

  const makeInput = useCallback((field, config) => (
    <TextField
      variant="outlined"
      margin="dense"
      fullWidth
      name={field}
      value={values[field]}
      onChange={handleChange}
      helperText={touched[field] ? errors[field] : ''}
      error={touched[field] && Boolean(errors[field])}
      className={changed[field] ? classes.changed : undefined}
      onBlur={handleBlur}
      { ...config }
    />
  ), [values, handleChange, handleBlur, touched, errors, changed, classes])

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            { makeInput('name', { label: 'Name' }) }
          </Grid>
          <Grid item xs={6}>
            { makeInput('authorityName', { label: 'Authority Name' }) }
          </Grid>
          <Grid container item xs={6} spacing={0}>
            <Grid item xs={12}>
              { makeInput('mailAddress1', { label: 'Address Line 1' }) }
            </Grid>
            <Grid item xs={12}>
              { makeInput('mailAddress2', { label: 'Address Line 2' }) }
            </Grid>
            <Grid item xs={12}>
              { makeInput('mailAddress3', { label: 'Address Line 3' }) }
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {makeInput('internalNotes', {
              label: 'Internal Notes',
              type: 'textarea',
              multiline: true,
              rows: 7,
            })}
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6} className={classes.buttons}>
            <div
              className={classes.clearButton}
              onClick={handleReset}
              disabled={!isValid || isSubmitting}
            >
              Clear changes
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              margin="normal"
              disabled={!isValid || !dirty || isSubmitting}
              className={classes.submitButton}
            >
              Update Jurisdiction
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default JurisdictionForm
