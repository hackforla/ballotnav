import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LandingHeader from 'components/LandingPage/LandingHeader'
import aboutHero from 'assets/images/about-hero.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.layout.pageWidth,
        maxWidth: '100%',
        margin: '50px auto',
        textAlign: 'center',
        '& h1': {
            fontSize: 20,
            fontWeight: 'bold',
        },
        '& a': {
            display: 'block',
            textDecoration: 'underline',
            marginTop: 10,
        },
    },
}))

const Landing = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <LandingHeader />
            <img src={aboutHero} alt="computer-phone-logo" />
            



        </div>
    )
}

export default Landing
