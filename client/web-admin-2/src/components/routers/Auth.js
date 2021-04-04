import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import Login from 'components/auth/Login'
import Register from 'components/auth/Register'

const Auth = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Redirect to="/login" />
    </Switch>
  )
}

export default Auth
