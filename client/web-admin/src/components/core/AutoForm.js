import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { TextField, MenuItem, Button, Box } from '@material-ui/core'
import moment from 'moment'

//////////////////// HELPERS /////////////////////

function getInitialValues(model, initialValues) {
  const values = initialValues
    ? { ...initialValues }
    : {}

  Object.keys(model).forEach(field => {
    if (typeof values[field] !== 'undefined') return
    values[field] = typeof model[field].defaultValue === 'undefined'
      ? ''
      : model[field].defaultValue
  })

  return values
}

function getValidate(model) {
  return values => {
    const errors = {}
    Object.keys(model).forEach((field) => {
      if (
        model[field].allowNull === false && values[field] === ''
      )
        errors[field] = 'This field is required.'
    })
    return errors
  }
}

/////////////////// THE COMPONENT //////////////////

function AutoForm({ model, initialValues, onSubmit, submitText, style }) {
  const formik = useFormik({
    enableReinitialize: true, // necessary for form to update when initialValues changes
    initialValues: getInitialValues(model, initialValues),
    validate: getValidate(model),
    onSubmit,
  })

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    isSubmitting,
    dirty,
    resetForm,
    validateForm,
  } = formik

  useEffect(() => {
    validateForm()
  }, [validateForm])

  const hasErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={handleSubmit} style={style}>
      {Object.keys(model).map((field) => {
        const { type } = model[field]

        if (field === 'id') return null

        if (type === 'text' || type === 'date' || type === 'time' || type === 'textarea')
          return (
            <TextField
              key={field}
              type={type}
              multiline={type === 'textarea'}
              rows={5}
              id={field}
              label={field}
              name={field}
              variant="outlined"
              margin="dense"
              fullWidth
              value={type === 'date' ? moment(values[field]).utc().format('yyyy-MM-DD') : values[field] || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors[field] || ''}
              error={Boolean(errors[field])}
              InputLabelProps={
                type === 'date' || type === 'time'
                ? { shrink: true }
                : undefined
              }
            />
          )

        if (type === 'YNU') {
          const opts = [
            { value: 'Y', display: 'Yes' },
            { value: 'N', display: 'No' },
            { value: 'U', display: 'Unknown' },
          ]
          return (
            <TextField
              select
              key={field}
              id={field}
              label={field}
              name={field}
              variant="outlined"
              margin="dense"
              fullWidth
              value={values[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors[field] || ''}
              error={Boolean(errors[field])}
            >
              {opts.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  { opt.display }
                </MenuItem>
              ))}
            </TextField>
          )
        }

        if (typeof type === 'object' && type.type === 'select')
          return (
            <TextField
              select
              key={field}
              id={field}
              label={field}
              name={field}
              variant="outlined"
              margin="dense"
              fullWidth
              value={values[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors[field] || ''}
              error={Boolean(errors[field])}
            >
              {type.options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  { opt.display }
                </MenuItem>
              ))}
            </TextField>
          )

        return null
      })}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <Button
          style={{ width: '45%' }}
          type="submit"
          variant="contained"
          color="primary"
          margin="normal"
          disabled={!dirty || isSubmitting || hasErrors}
        >
          { submitText || 'Confirm Changes' }
        </Button>
        <Button
          style={{ width: '45%' }}
          variant="contained"
          color="primary"
          margin="normal"
          disabled={!dirty || isSubmitting}
          onClick={() => {
            resetForm()
            setTimeout(validateForm)
          }}
        >
          Clear Changes
        </Button>
      </Box>
    </form>
  )
}

export default AutoForm
