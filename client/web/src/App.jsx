import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/main/Header';
import Routes from './Routes';
import Footer from './components/main/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;