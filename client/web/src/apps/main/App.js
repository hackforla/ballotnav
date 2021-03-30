import React from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Routes from './Routes'
import Header from 'components/layout/Header'
import Footer from 'components/main/Footer'
import CookieConsentBanner from 'components/main/CookieConsentBanner'
import Modals from 'components/modals'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
})

const App = () => {
  const classes = useStyles()
  const { pathname } = useLocation()
  return (
    <>
      <div className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Routes />
        </div>
        {pathname !== '/map' && <Footer />}
        <CookieConsentBanner />
      </div>
      <Modals />
    </>
  )
}

export default App
