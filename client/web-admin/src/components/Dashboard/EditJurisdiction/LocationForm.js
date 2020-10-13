import React, { useState } from 'react'
import { useFormik } from 'formik'
import { TextField, MenuItem, Button, Box, Modal } from '@material-ui/core'
import LocationHoursForm from './LocationHoursForm'
import locationModel from 'models/location'

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

function LocationForm({ model = locationModel, initialValues, onSubmit, submitText, style, onChangeHours }) {

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

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <form onSubmit={data => {
      console.log('submitting:', data)
      handleSubmit(data)
    }}
      style={{ width: 400 }}>
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
              value={values[field] || ''}
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
              {type.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.toString()}
                </MenuItem>
              ))}
            </TextField>
          )

        return null
      })}
      {/*{values['scheduleType'] === 'hours' && (
        <Paper>
          <LocationHoursForm
            hours={values['hours']}
          />
        </Paper>
      )}*/}
      {values['scheduleType'] === 'hours' && (
        <>
          <Button type="button" onClick={() => setModalOpen(true)}>
            View Hours
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
                hours={values.hours}
                locationName={values.name}
                //onChange={onChangeHours}
                onChange={hours => {
                  console.log('new hours:', hours)
                  onChangeHours(hours)
                }}
              />
            </div>
          </Modal>
        </>
      )}
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

export default LocationForm
