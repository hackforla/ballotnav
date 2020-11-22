import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './components/main/Home'
import About from './components/main/About'
import Volunteer from './components/main/Volunteer'
import Press from './components/main/Press'
import MapPage from 'components/MapPage'

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
      <Route path="/press">
        <Press />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
