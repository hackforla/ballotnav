import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Landing from 'components/pages/Landing/index'
import Privacy from 'components/pages/Privacy'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/privacy-policy">
        <Privacy />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
