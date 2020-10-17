import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { TextField, MenuItem, Button, Box, Modal } from '@material-ui/core'
import LocationHoursForm from './LocationHoursForm'
import locationModel from 'models/location'
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

function getFormattedDate(date) {
  if (!date) return ''
  return moment(date).utc().format('yyyy-MM-DD')
}

/////////////////// THE COMPONENT //////////////////

function LocationForm({ model = locationModel, initialValues, onSubmit, submitText, style }) {

  const formik = useFormik({
    enableReinitialize: true, // necessary for form to update when initialValues changes
    initialValues: getInitialValues(model, initialValues),
    validate: getValidate(model),
    onSubmit: (values, funcs) => {
      values.hours = hours
      onSubmit(values, funcs)
    },
  })

  const [hours, setHours] = useState(initialValues ? initialValues.hours : [])
  const [hoursChanged, setHoursChanged] = useState(false)

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

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    validateForm()
  }, [validateForm])

  const hasErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={handleSubmit}
      style={{ width: 400 }}>
      {Object.keys(model).map((field) => {
        const { type } = model[field]

        if (field === 'id') return null

        if (values['scheduleType'] === 'description') {
          if ([
            'continuousOpenDate',
            'continuousOpenTime',
            'continuousCloseDate',
            'continuousCloseTime'
          ].includes(field))
            return null
        }

        if (values['scheduleType'] === 'continuous') {
          if (field === 'scheduleDescription')
            return null
        }

        if (values['scheduleType'] === 'hours') {
          if ([
            'scheduleDescription',
            'continuousOpenDate',
            'continuousOpenTime',
            'continuousCloseDate',
            'continuousCloseTime'
          ].includes(field))
            return null
        }

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
              value={type === 'date' ? getFormattedDate(values[field]) : values[field] || ''}
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
      {values['scheduleType'] === 'hours' && (
        <>
          <Button color="primary" variant="outlined" type="button" onClick={() => setModalOpen(true)}>
            View Location Hours
          </Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <div style={{
              position: 'absolute',
              top: 50,
              bottom: 50,
              width: 'calc(100vw - 200px)',
              left: 100,
              overflow: 'scroll',
              backgroundColor: 'white'
            }}>
              <LocationHoursForm
                hours={hours}
                locationName={values.name}
                onChange={(hours) => {
                  setHours(hours)
                  setHoursChanged(true)
                }}
                onFinished={() => setModalOpen(false)}
              />
            </div>
          </Modal>
        </>
      )}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 30,
          marginBottom: 20
        }}
      >
        <Button
          style={{ width: '45%' }}
          type="submit"
          variant="contained"
          color="primary"
          margin="normal"
          disabled={(!hoursChanged && !dirty) || isSubmitting || hasErrors}
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

export default LocationForm
