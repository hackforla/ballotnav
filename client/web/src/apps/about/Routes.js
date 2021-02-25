import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Landing from 'components/main/LandingTemp'
import PrivacyPolicy from 'components/main/PrivacyPolicy'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/privacy-policy">
        <PrivacyPolicy />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
