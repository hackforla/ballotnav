import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'

function getInitialValues(values) {
  return Object.keys(values).reduce((out, key) => {
    out[key] = values[key] || ''
    return out
  }, {})
}

function getSubmittableValues(values) {
  return Object.keys(values).reduce((out, key) => {
    out[key] = values[key] || null
    return out
  }, {})
}

function getChanged(initialValues, currentValues) {
  return Object.keys(initialValues).reduce((out, key) => {
    out[key] = initialValues[key] !== currentValues[key]
    return out
  }, {})
}

export default function useForm({
  initialValues: rawInitialValues,
  onSubmit: rawOnSubmit,
  ...rest
}) {
  const initialValues = useMemo(() => {
    return getInitialValues(rawInitialValues)
  }, [rawInitialValues])

  const onSubmit = useCallback((values) => {
    rawOnSubmit(getSubmittableValues(values))
  }, [rawOnSubmit])

  const {
    handleSubmit,
    handleChange,
    handleReset,
    errors,
    touched,
    values,
    dirty,
    isSubmitting
  } = useFormik({
    initialValues: getInitialValues(rawInitialValues),
    onSubmit: (values) => onSubmit(getSubmittableValues(values)),
    ...rest,
  })

  const changed = useMemo(() => {
    return getChanged(initialValues, values)
  }, [initialValues, values])

  return {
    handleSubmit,
    handleChange,
    handleReset,
    errors,
    touched,
    values,
    dirty,
    changed,
    isSubmitting,
  }
}
