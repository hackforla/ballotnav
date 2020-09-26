import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './components/main/Home';
import Map from './components/main/Map';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/map">
          <Map />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
