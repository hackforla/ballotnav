import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from './Input'

// the forms can't handle null, so convert nulls to empty strings.
// also limit initialValues to the fields in the schema
function getInitialValues(rawInitialValues, schema) {
  const initialValues = {}
  Object.keys(schema).forEach((field) => {
    initialValues[field] = rawInitialValues[field] || ''
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
  initialValues: rawInitialValues,
  onSubmit: rawOnSubmit,
  inputDefaults = {},
}) {
  const initialValues = useMemo(() => {
    return getInitialValues(rawInitialValues, schema)
  }, [rawInitialValues, schema])

  const onSubmit = useCallback((values) => {
    rawOnSubmit(getSubmittableValues(values))
  }, [rawOnSubmit])

  const validationSchema = useMemo(() => {
    return getValidationSchema(schema)
  }, [schema])

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    ...rest
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  })

  const changed = useMemo(() => {
    return getChangedValues(initialValues, values)
  }, [initialValues, values])

  const makeInput = useCallback((field) => (
    <Input
      margin="dense"
      fullWidth
      name={field}
      label={field}
      value={values[field]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched[field] ? errors[field] : ''}
      error={touched[field] && Boolean(errors[field])}
      className={changed[field] ? 'changed' : undefined}
      { ...inputDefaults }
      { ...schema[field].input }
    />
  ), [schema, values, handleChange, handleBlur, touched, errors, changed, inputDefaults])

  return {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    changed,
    makeInput,
    ...rest,
  }
}
