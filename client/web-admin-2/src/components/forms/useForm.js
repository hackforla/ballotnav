import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'
import Input from './Input'
import * as Yup from 'yup'

// the forms can't handle null, so convert null to empty string.
// also limit initialValues to the fields in the schema
function getInitialValues(rawInitialValues, schema) {
  const initialValues = {}
  Object.keys(schema).forEach((field) => {
    initialValues[field] = rawInitialValues[field] || ''
  })
  return initialValues
}

// the database prefers null, so convert empty strings back to null
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
    ...restOut
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  })

  const changed = useMemo(() => {
    return getChangedValues(initialValues, values)
  }, [initialValues, values])

  const makeInput = useCallback((field) => {
    const { input: config } = schema[field]
    return (
      <Input
        variant="outlined"
        margin="dense"
        fullWidth
        name={field}
        label={field}
        value={values[field]}
        onChange={handleChange}
        helperText={touched[field] ? errors[field] : ''}
        error={touched[field] && Boolean(errors[field])}
        className={changed[field] ? 'changed' : undefined}
        onBlur={handleBlur}
        { ...config }
      />
    )
  }, [schema, values, handleChange, handleBlur, touched, errors, changed])

  return {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    changed,
    makeInput,
    ...restOut,
  }
}
