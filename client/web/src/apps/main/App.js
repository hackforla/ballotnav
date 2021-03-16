import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ConnectedRouter } from 'connected-react-router'
import history from 'services/history'
import Routes from './Routes'
import Div100vh from 'react-div-100vh'
import Header from 'components/main/Header'
import Footer from 'components/main/Footer'
import CookieConsentBanner from 'components/main/CookieConsentBanner'
import Modals from 'components/modals'

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
    <ConnectedRouter basename={process.env.PUBLIC_URL} history={history}>
      <Div100vh className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Routes />
        </div>
        <Footer />
        <CookieConsentBanner />
      </Div100vh>
      <Modals />
    </ConnectedRouter>
  )
}

export default App
