import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormInput from './FormInput'
import TextButton from 'components/core/TextButton'

// the forms can't handle null, so convert nulls to empty strings.
// also limit initialValues to the fields in the schema
function getInitialValues(rawInitialValues, schema) {
  const initialValues = {}
  Object.keys(schema).forEach((field) => {
    initialValues[field] =
      rawInitialValues[field] || schema[field].defaultValue || ''
  })
  return initialValues
}

// null is better in the database, so convert empty strings back to null
function getSubmittableValues(values) {
  const submittableValues = {}
  Object.keys(values).forEach((field) => {
    submittableValues[field] = values[field] || null
  })
  return submittableValues
}

function getChangedValues(initialValues, currentValues) {
  const changedValues = {}
  Object.keys(initialValues).forEach((field) => {
    changedValues[field] = initialValues[field] !== currentValues[field]
  })
  return changedValues
}

function getValidationSchema(schema) {
  const validators = {}
  Object.keys(schema).forEach((field) => {
    validators[field] = schema[field].validate
  })
  return Yup.object(validators)
}

export default function useForm({
  schema,
  initialValues: rawInitialValues = {},
  onSubmit: rawOnSubmit,
  inputDefaults = {},
  buttonDefaults = {},
  trackChanges = false, // show asterisk when field changes
}) {
  const initialValues = useMemo(() => {
    return getInitialValues(rawInitialValues, schema)
  }, [rawInitialValues, schema])

  const onSubmit = useCallback(
    (values) => rawOnSubmit(getSubmittableValues(values)),
    [rawOnSubmit]
  )

  const validationSchema = useMemo(() => {
    return getValidationSchema(schema)
  }, [schema])

  const form = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
  })

  form.changed = useMemo(() => {
    return getChangedValues(initialValues, form.values)
  }, [initialValues, form.values])

  form.makeInput = useCallback(
    (field) => (
      <FormInput
        margin="dense"
        fullWidth
        name={field}
        label={field}
        value={form.values[field]}
        onChange={form.handleChange}
        helperText={form.touched[field] ? form.errors[field] : null}
        error={!!form.errors[field] && form.touched[field]}
        className={trackChanges && form.changed[field] ? 'changed' : undefined}
        {...inputDefaults}
        {...schema[field].input}
      />
    ),
    [schema, form, inputDefaults, trackChanges]
  )

  form.makeSubmitButton = useCallback(
    ({ requireDirty, ...buttonProps }) => (
      <TextButton
        onClick={form.handleSubmit}
        isLoading={form.isSubmitting}
        disabled={requireDirty && !form.dirty}
        label="Submit"
        {...buttonDefaults}
        {...buttonProps}
      />
    ),
    [form, buttonDefaults]
  )

  form.makeResetButton = useCallback(
    (buttonProps) => (
      <TextButton
        disabled={!form.dirty || form.isSubmitting}
        onClick={form.handleReset}
        label="Clear changes"
        variant="outlined"
        {...buttonDefaults}
        {...buttonProps}
      />
    ),
    [form, buttonDefaults]
  )

  return form
}
