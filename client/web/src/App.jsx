import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/main/Header'
import Routes from './Routes'
import SearchModal from './components/modals/SearchModal'
import ShareModal from './components/modals/ShareModal'

// commented for dev because too many console warnings
// import VoteDotOrgModal from './components/modals/VoteDotOrgModal'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes />
      <SearchModal />
      <ShareModal />
      {/*<VoteDotOrgModal />*/}
    </Router>
  )
}

export default App
