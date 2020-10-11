import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './components/main/Home';
import MapContainer from './components/map/MapContainer';
import ResultList from './components/map/ResultList';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/map">
        <MapContainer />
      </Route>
      <Route path="/resultlist">
        <ResultList />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
