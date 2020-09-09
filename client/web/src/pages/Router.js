import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import About from './About';

class RoutePage extends React.Component {
  render() {
    return <Router>
      <Switch>
        
        
        <Route path="/about">
           <About />
        </Route>
        <Route path="/:id?">
          <Home/>
        </Route>
      </Switch>
    </Router>;
  }
}

export default RoutePage;
