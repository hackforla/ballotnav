import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import Login from 'components/auth/Login'
import Register from 'components/auth/Register'
import Layout from 'components/core/Layout'

const Auth = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/login" />
      </Switch>
    </Layout>
  )
}

export default Auth
