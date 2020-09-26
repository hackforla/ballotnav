import React from 'react'
import { Link } from 'react-router-dom'

function Login({ login }) {
  return (
    <>
      <div>Login Page</div>
      <Link to='/register'>register</Link>
      <button onClick={login}>login</button>
    </>
  )
}

export default Login
