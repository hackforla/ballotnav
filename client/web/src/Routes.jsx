import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Home from './components/main/Home';
import Map from './components/map/Map';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/map">
        <Map />
      </Route>
    </Switch>
  );
}

export default Routes;
