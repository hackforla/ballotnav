import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Routes from './Routes'
import Div100vh from 'react-div-100vh'
import Footer from 'components/core/Footer'
import CookieConsentBanner from 'components/core/CookieConsentBanner'

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
    <Div100vh className={classes.root}>
      <div className={classes.content}>
        <Routes />
      </div>
      <Footer />
      <CookieConsentBanner />
    </Div100vh>
  )
}

export default App
