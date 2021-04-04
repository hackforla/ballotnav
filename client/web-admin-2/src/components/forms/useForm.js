import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'

// the forms can't handle null, so convert null to empty string
function getInitialValues(values) {
  return Object.keys(values).reduce((out, key) => {
    out[key] = values[key] || ''
    return out
  }, {})
}

// the database prefers null, so convert empty strings back to null
function getSubmittableValues(values) {
  return Object.keys(values).reduce((out, key) => {
    out[key] = values[key] || null
    return out
  }, {})
}

function getChangedValues(initialValues, currentValues) {
  return Object.keys(initialValues).reduce((out, key) => {
    out[key] = initialValues[key] !== currentValues[key]
    return out
  }, {})
}

export default function useForm({
  initialValues: rawInitialValues,
  onSubmit: rawOnSubmit,
  ...restIn
}) {
  const initialValues = useMemo(() => {
    return getInitialValues(rawInitialValues)
  }, [rawInitialValues])

  const onSubmit = useCallback((values) => {
    rawOnSubmit(getSubmittableValues(values))
  }, [rawOnSubmit])

  const { values, ...restOut } = useFormik({
    initialValues: getInitialValues(rawInitialValues),
    onSubmit: (values) => onSubmit(getSubmittableValues(values)),
    ...restIn
  })

  const changed = useMemo(() => {
    return getChangedValues(initialValues, values)
  }, [initialValues, values])

  return {
    values,
    changed,
    ...restOut,
  }
}
