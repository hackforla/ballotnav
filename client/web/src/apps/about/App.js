import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import Div100vh from 'react-div-100vh'
import Footer from 'components/main/Footer'
import CookieConsentBanner from 'components/main/CookieConsentBanner'

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
    <BrowserRouter>
      <Div100vh className={classes.root}>
        <div className={classes.content}>
          <Routes />
        </div>
        <Footer />
        <CookieConsentBanner />
      </Div100vh>
    </BrowserRouter>
  )
}

export default App
