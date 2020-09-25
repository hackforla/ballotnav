import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './components/main/Home';
import About from './components/main/About';

class Routes extends React.Component {
  render() {
    return <Router>
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>;
  }
}

export default Routes;
