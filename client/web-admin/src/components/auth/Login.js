import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  withStyles,
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from 'services/api'

const styles = (theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  body: {
    display: 'flex',
    height: '97.8%',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
})

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters at minimum')
    .required('Password is required'),
})

const LoginForm = (props) => {
  const { classes, setToast, setUser, history, match } = props

  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={{
              email: match.params.email || '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, formikBag) => {
              setTimeout(async () => {
                try {
                  const response = await api.user.login(
                    values.email,
                    values.password
                  )
                  if (response.isSuccess) {
                    setUser(response.user)
                    setToast({
                      message: 'Login successful.',
                    })
                    history.push('/')
                  } else if (response.emailNotFound) {
                    setToast({
                      message: `The email ${values.email} does not correspond to an
                      existing account. Please verify the email or register as a
                      new account.`,
                    })
                    formikBag.setSubmitting(false)
                  } else if (response.passwordInvalid) {
                    setToast({
                      message: `The password is incorrect, please check it
                      and try again.`,
                    })
                    formikBag.setSubmitting(false)
                  }
                  // async function muist return something
                  return true
                } catch (err) {
                  setToast({
                    message: 'Server error. Please contact support.',
                  })
                  console.log(err)
                  formikBag.setSubmitting(false)
                }
              }, 400)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  type="email"
                  id="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/*<Link
                      href={`/forgotpassword/${values.email || ''}`}
                      variant="body2"
                    >
                      Forgot password?
                    </Link>*/}
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      Register
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  )
}

export default withStyles(styles)(withRouter(LoginForm))
