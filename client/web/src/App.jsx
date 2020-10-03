import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/main/Header';
import Routes from './Routes';

const App = ({

}) => {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
}

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadData()),
});

export default connect(null, mapDispatchToProps)(App);