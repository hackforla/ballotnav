import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from 'components/main/Home'
import About from 'components/main/About'
import Volunteer from 'components/main/Volunteer'
import MapPage from 'components/MapPage'
import PrivacyPolicy from 'components/main/PrivacyPolicy'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/map">
        <MapPage />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/volunteer">
        <Volunteer />
      </Route>
      <Route path="/privacy-policy">
        <PrivacyPolicy />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
