import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import { useFormik } from 'formik'

function Login() {
  const { login } = useAuth()
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: 'jake.mensch@gmail.com',
      password: 'hellothere1',
    },
    onSubmit(values) {
      console.log('logging in:', values)
      login(values)
    }
  })
  return (
    <div>
      <div>Login Page</div>
      <form onSubmit={handleSubmit}>
        <input name="email" onChange={handleChange} />
        <input name="password" onChange={handleChange}  />
        <button type="submit">submit</button>
      </form>
      <Link to='/register'>register</Link>
    </div>
  )
}

export default Login
