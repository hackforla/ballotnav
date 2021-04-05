import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import clsx from 'clsx'
import * as Yup from 'yup'
import { pick } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  input: {
    '&.changed:after': {
      content: '"*"',
      position: 'absolute',
      top: 0,
      right: -10,
      color: theme.palette.primary.main,
    },
  },
}))

// the forms can't handle null, so convert null to empty string
function getInitialValues(rawInitialValues, fields) {
  const values = pick(rawInitialValues, fields.map((field) => field.field))
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

function makeValidationSchema(fields) {
  const schema = fields.reduce((schema, field) => {
    schema[field.field] = field.validate
    return schema
  }, {})
  return Yup.object(schema)
}

export default function useForm({
  fields,
  initialValues: rawInitialValues,
  onSubmit: rawOnSubmit,
}) {
  const classes = useStyles()

  const initialValues = useMemo(() => {
    return getInitialValues(rawInitialValues, fields)
  }, [rawInitialValues, fields])

  const onSubmit = useCallback((values) => {
    rawOnSubmit(getSubmittableValues(values))
  }, [rawOnSubmit])

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    ...restOut
  } = useFormik({
    initialValues,
    onSubmit: (values) => onSubmit(getSubmittableValues(values)),
    validationSchema: makeValidationSchema(fields),
    enableReinitialize: true,
  })

  const changed = useMemo(() => {
    return getChangedValues(initialValues, values)
  }, [initialValues, values])

  const makeInput = useCallback((field) => {
    const { input: config } = fields.find((f) => f.field === field)
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
        className={clsx(classes.input, { changed: changed[field] })}
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
  }, [fields, values, handleChange, handleBlur, touched, errors, changed, classes])

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
