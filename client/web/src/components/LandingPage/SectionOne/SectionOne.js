import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LandingHeader from './LandHeadSecOne'
import SectionHeader from './HeaderSecOne'
import LaptopHero from './HeroImgSecOne'
import SectionParagraph from './ParaSecOne'
import LaunchDemoButton from './ButtonSecOne'

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.layout.pageWidth,
        maxWidth: '100%',
        margin: '50px auto',
        textAlign: 'start',
        '& h1': {
            fontSize: 40,
            fontWeight: 'bold',
            color: '#1B2152',
        },
        '& a': {
            display: 'block',
            textDecoration: 'underline',
            marginTop: 10,
        },
    },
}))

const SectionOne = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <LandingHeader />
            <SectionHeader />
            <LaptopHero />
            <SectionParagraph />
            <LaunchDemoButton />
        </div>
    )
}

export default SectionOne
