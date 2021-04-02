import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'store/selectors'
import useAuthActions from 'store/actions/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Grid, TextField, Button } from '@material-ui/core'

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string().min(8).required('Required'),
  passwordConfirm: Yup.string().required('Required').oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
  notes: Yup.string(),
  slackName: Yup.string(),
});

function Register() {
  const { register } = useAuthActions()
  const { isSubmitting } = useAuth()

  const onSubmit = useCallback((values) => register(values), [register])

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      notes: '',
      slackName: '',
    },
    validationSchema,
    onSubmit,
  })

  return (
    <div style={{ padding: 100, maxWidth: 600, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', fontSize: 30, marginBottom: 20 }}>
        Register
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={values.firstName}
              onChange={handleChange}
              helperText={touched.firstName ? errors.firstName : ''}
              error={touched.firstName && Boolean(errors.firstName)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={values.lastName}
              onChange={handleChange}
              helperText={touched.lastName ? errors.lastName : ''}
              error={touched.lastName && Boolean(errors.lastName)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              helperText={touched.email ? errors.email : ''}
              error={touched.email && Boolean(errors.email)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="passwordConfirm"
              label="Re-type Password"
              type="password"
              id="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleChange}
              helperText={touched.passwordConfirm ? errors.passwordConfirm : ''}
              error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="notes"
              label="Region / Time Zone Preference"
              id="notes"
              value={values.notes}
              onChange={handleChange}
              helperText={touched.notes ? errors.notes : ''}
              error={touched.notes && Boolean(errors.notes)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="slackName"
              label="Slack Name"
              id="slackName"
              value={values.slackName}
              onChange={handleChange}
              helperText={touched.slackName ? errors.slackName : ''}
              error={touched.slackName && Boolean(errors.slackName)}
            />
          </Grid>
        </Grid>
        <Button
          style={{ marginTop: 20, marginBottom: 20 }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Register
        </Button>
        <Grid container justify="center">
          <Link to="/login">Already have an account? Login here.</Link>
        </Grid>
      </form>
    </div>
  )
}

export default Register
