import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'components/use-auth'

function Login() {
  const { login } = useAuth()
  return (
    <>
      <div>Login Page</div>
      <Link to='/register'>register</Link>
      <button onClick={login}>login</button>
    </>
  )
}

export default Login
