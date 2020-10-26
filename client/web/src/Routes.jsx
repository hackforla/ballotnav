import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './components/main/Home'
import MapContainer from './components/map/MapContainer'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/map">
        <MapContainer />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
