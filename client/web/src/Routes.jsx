import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './components/main/Home'
import About from './components/main/About'
import Volunteer from './components/main/Volunteer'
import Press from './components/main/Press'
import MapPage from 'components/MapPage'
import PrivacyPolicy from './components/main/PrivacyPolicy'
import Landing from './components/main/Landing'


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
      <Route path="/privacy-policy">
        <PrivacyPolicy />
      </Route>
      <Route path="/landing">
        <Landing />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
