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
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '2em 0',
  },
  button: {
    textTransform: 'none',
    borderRadius: '2em',
    padding: '1em 3em',
    fontWeight: 700,
    fontSize: 12,
  },
}))

const FIELDS = [
  'name',
  'address1',
  'address2',
  'address3',
  'city',
  'zip',
  'contactName',
  'contactPhone',
  'contactEmail',
]

const validationSchema = Yup.object({
  name: Yup.string().required(),
  address1: Yup.string(),
  address2: Yup.string(),
  address3: Yup.string(),
  city: Yup.string(),
  zip: Yup.string(),
  contactName: Yup.string(),
  contactPhone: Yup.string(),
  contactEmail: Yup.string().email(),
})

const LocationForm = ({ wipLocation, onSubmit }) => {
  console.log(wipLocation)

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
    initialValues: pick(wipLocation, FIELDS),
    validationSchema,
    onSubmit,
  })

  const classes = useStyles({ dirty })

  const makeInput = useCallback((field, config) => (
    <TextField
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
      <form>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            { makeInput('name', { label: 'Name' }) }
          </Grid>
          <Grid item xs={12}>
            { makeInput('address1', { label: 'Address Line 1' }) }
          </Grid>
          <Grid item xs={12}>
            { makeInput('address2', { label: 'Address Line 2' }) }
          </Grid>
          <Grid item xs={12}>
            { makeInput('address3', { label: 'Address Line 3' }) }
          </Grid>
          <Grid item xs={12}>
            { makeInput('city', { label: 'City' }) }
          </Grid>
          <Grid item xs={12}>
            { makeInput('zip', { label: 'ZIP' }) }
          </Grid>
          <Grid item xs={12}>
            { makeInput('contactName', { label: 'Contact Name' }) }
          </Grid>
          <Grid item xs={12}>
            { makeInput('contactPhone', { label: 'Contact Phone' }) }
          </Grid>
          <Grid item xs={12}>
            { makeInput('contactEmail', { label: 'Contact Email' }) }
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              disabled={!dirty || !isValid || isSubmitting}
              onClick={handleReset}
            >
              Clear changes
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!isValid || !dirty || isSubmitting}
              onClick={handleSubmit}
            >
              Update Location
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default LocationForm
