import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import * as Yup from 'yup'
import useAuthActions from 'store/actions/auth'
import useForm from 'components/forms/useForm'
import Layout from './Layout'

const schema = {
  firstName: {
    validate: Yup.string().required('Required'),
    input: { label: 'First Name' },
  },
  lastName: {
    validate: Yup.string().required('Required'),
    input: { label: 'Last Name' },
  },
  email: {
    validate: Yup.string().email().required('Required'),
    input: { label: 'Email' },
  },
  password: {
    validate: Yup.string().min(8).required('Required'),
    input: { label: 'Password', type: 'password' },
  },
  passwordConfirm: {
    validate: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    input: { label: 'Re-type Password', type: 'password' },
  },
  notes: {
    validate: Yup.string(),
    input: { label: 'Region / Time Zone Preference' },
  },
  slackName: {
    validate: Yup.string(),
    input: { label: 'Slack Name' },
  },
}

const Register = () => {
  const { register } = useAuthActions()

  const { makeInput, makeSubmitButton } = useForm({
    schema,
    onSubmit: register,
    inputDefaults: {
      variant: 'outlined',
      margin: 'normal',
    },
  })

  return (
    <Layout title="Register">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {makeInput('firstName')}
          </Grid>
          <Grid item xs={6}>
            {makeInput('lastName')}
          </Grid>
        </Grid>
        {makeInput('email')}
        {makeInput('password')}
        {makeInput('passwordConfirm')}
        {makeInput('notes')}
        {makeInput('slackName')}
        {makeSubmitButton({
          label: 'Register',
          type: 'submit',
          fullWidth: true,
          size: 'large',
        })}
      </form>
      <Link to="/login">Already have an account? Login here.</Link>
    </Layout>
  )
}

export default Register
