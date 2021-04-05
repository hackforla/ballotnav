import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useForm from './useForm'
import * as Yup from 'yup'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import { pick } from 'services/utils'
import FormButtons from './FormButtons'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .input.changed:after': {
      content: '"*"',
      position: 'absolute',
      top: 0,
      right: -10,
      color: theme.palette.primary.main,
    },
  },
}))

const FIELDS = [
  {
    field: 'name',
    validate: Yup.string().required(),
    input: { label: 'Name' },
  },
  {
    field: 'authorityName',
    validate: Yup.string(),
    input: { label: 'Authority Name' },
  },
  {
    field: 'mailAddress1',
    validate: Yup.string(),
    input: { label: 'Address 1' },
  },
  {
    field: 'mailAddress2',
    validate: Yup.string(),
    input: { label: 'Address 2' },
  },
  {
    field: 'mailAddress3',
    validate: Yup.string(),
    input: { label: 'Address 3' },
  },
  {
    field: 'internalNotes',
    validate: Yup.string(),
    input: {
      label: 'Internal Notes',
      type: 'textarea',
      multiline: true,
      rows: 7,
    },
  },
]

function makeValidationSchema(fields) {
  const schema = fields.reduce((schema, field) => {
    schema[field.field] = field.validate
    return schema
  }, {})
  return Yup.object(schema)
}

const JurisdictionForm = ({ wipJurisdiction, onSubmit }) => {
  const classes = useStyles()

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
    initialValues: pick(wipJurisdiction, FIELDS.map((field) => field.field)),
    validationSchema: makeValidationSchema(FIELDS),
    onSubmit,
  })

  const makeInput = useCallback((field) => {
    const { input: config } = FIELDS.find((f) => f.field === field)
    return (
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        name={field}
        label={field}
        value={values[field]}
        onChange={handleChange}
        helperText={touched[field] ? errors[field] : ''}
        error={touched[field] && Boolean(errors[field])}
        className={clsx('input', { changed: changed[field] })}
        onBlur={handleBlur}
        { ...config }
      >
        {config.select && config.options.map(opt => (
          <MenuItem dense key={opt.value} value={opt.value}>
            { opt.display }
          </MenuItem>
        ))}
      </TextField>
    )
  }, [values, handleChange, handleBlur, touched, errors, changed])

  return (
    <div className={classes.root}>
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
              disabled={!dirty || !isValid || isSubmitting}
              submitTitle="Update jurisdiction"
              padding="0.375em 3em"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default JurisdictionForm
