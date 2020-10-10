import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useToast } from 'components/use-toast'
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
});

function Register() {
  const { register } = useAuth()
  const toast = useToast()
  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    isSubmitting,
    handleBlur,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit(values, { setSubmitting }) {
      register(values).catch((error) => {
        if (error.duplicateEmail) toast({ message: 'email already registered' })
        else if (error.unknownError)
          toast({ message: 'unknown error creating account' })
        setSubmitting(false)
      });
    },
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
              onBlur={handleBlur}
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
              onBlur={handleBlur}
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
              onBlur={handleBlur}
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
              onBlur={handleBlur}
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
              onBlur={handleBlur}
              helperText={touched.passwordConfirm ? errors.passwordConfirm : ''}
              error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
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
