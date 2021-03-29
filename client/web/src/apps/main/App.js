import React from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
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
  const { pathname } = useLocation()
  return (
    <>
      <Div100vh className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Routes />
        </div>
        {pathname !== '/map' && <Footer />}
        <CookieConsentBanner />
      </Div100vh>
      <Modals />
    </>
  )
}

export default App
