import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadData } from './redux/actions/data.js';
import Header from './components/main/Header';
import Routes from './Routes';
import { useEffect } from 'react';

const App = ({
  loadData,
}) => {
  useEffect(() => {
    loadData();
  });

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

App.propTypes = {
  loadData: PropTypes.func.isRequired,
};

App.defaultProps = {
  loadData: () => null,
};