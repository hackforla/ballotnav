import React from 'react'
import { Router } from 'react-router-dom'
import Header from './components/main/Header'
import Footer from './components/main/Footer'
import CookieConsentBanner from './components/main/CookieConsentBanner'
import Routes from './Routes'
import Modals from './components/modals'
import history from 'services/history'
import { makeStyles } from '@material-ui/core/styles'
import Div100vh from 'react-div-100vh' // for browser bottom bar issue on safari mobile

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
})

const App = () => {
  const classes = useStyles()
  return (
    <Router history={history}>
      <Div100vh className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Routes />
        </div>
        <Footer />
        <CookieConsentBanner />
      </Div100vh>
      <Modals />
    </Router>
  )
}

export default App
