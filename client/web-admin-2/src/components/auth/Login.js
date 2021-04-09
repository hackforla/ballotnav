import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import useAuthActions from 'store/actions/auth'
import useForm from 'components/forms/useForm'
import Layout from './Layout'

const schema = {
  email: {
    validate: Yup.string().email().required('Required'),
    input: { label: 'Email' },
  },
  password: {
    validate: Yup.string().min(8).required('Required'),
    input: { label: 'Password', type: 'password' },
  },
}

const Login = () => {
  const { login } = useAuthActions()

  const { makeInput, makeSubmitButton } = useForm({
    schema,
    onSubmit: login,
    inputDefaults: {
      variant: 'outlined',
      margin: 'normal',
    },
  })

  return (
    <Layout title="Login">
      <form>
        {makeInput('email')}
        {makeInput('password')}
        {makeSubmitButton({
          label: 'Sign In',
          type: 'submit',
          fullWidth: true,
          size: 'large',
        })}
      </form>
      <Link to="/register">Need an account? Register here.</Link>
    </Layout>
  )
}

export default Login
