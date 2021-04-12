import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Routes from './Routes'
import Footer from 'components/core/Footer'
import CookieConsentBanner from 'components/core/CookieConsentBanner'

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
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Routes />
            </div>
            <Footer />
            <CookieConsentBanner />
        </div>
    )
}

export default App
