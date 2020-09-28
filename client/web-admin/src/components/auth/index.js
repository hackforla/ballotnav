import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

function Auth() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Redirect to="/login" />
    </Switch>
  )
}

export default Auth
