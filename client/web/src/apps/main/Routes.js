import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from 'components/pages/Home'
import Map from 'components/pages/Map'
import About from 'components/pages/About'
import Volunteer from 'components/pages/Volunteer'
import Privacy from 'components/pages/Privacy'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/map">
        <Map />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/volunteer">
        <Volunteer />
      </Route>
      <Route path="/privacy-policy">
        <Privacy />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
