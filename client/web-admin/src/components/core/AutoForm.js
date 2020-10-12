import React from 'react'
import { useFormik } from 'formik'
import { TextField, MenuItem, Button, Box } from '@material-ui/core'

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
        model[field].allowNull === false &&
        typeof values[field] === 'undefined'
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
  } = formik

  return (
    <form onSubmit={handleSubmit} style={style}>
      {Object.keys(model).map((field) => {
        const { type } = model[field]

        if (
          !type ||
          field === 'createdAt' ||
          field === 'updatedAt' ||
          (model[field].field || '') === 'id' ||
          (model[field].field || '').endsWith('_id')
        )
          return null

        if (type === 'text' || type === 'date')
          return (
            <TextField
              key={field}
              type="text"
              id={field}
              label={field}
              name={field}
              variant="outlined"
              margin="dense"
              fullWidth
              value={values[field] || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors[field] || ''}
              error={Boolean(errors[field])}
            />
          )

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
              {type.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.toString()}
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
          disabled={!dirty || isSubmitting}
        >
          { submitText || 'Confirm Changes' }
        </Button>
        <Button
          style={{ width: '45%' }}
          variant="contained"
          color="primary"
          margin="normal"
          disabled={!dirty || isSubmitting}
          onClick={resetForm}
        >
          Clear Changes
        </Button>
      </Box>
    </form>
  )
}

export default AutoForm
