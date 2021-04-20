import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SectionHeader from 'components/LandingPage/SecFive/HeadSecFive'
import SubHeadSecFive from 'components/LandingPage/SecFive/SubHeadSecFive'
import HeroImgSecFive from 'components/LandingPage/SecFive/HeroImgSecFive'
import ButtonSecFive from 'components/LandingPage/SecFive/ButtonSecFive'

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.layout.pageWidth,
        maxWidth: '100%',
        textAlign: 'start',
        '& h1': {
            fontSize: 40,
            color: '#1B2152',
        }
    },
}))

const SectionFive = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <SectionHeader/>
            <SubHeadSecFive/>
            <HeroImgSecFive/>
            <ButtonSecFive/>
        </div>
    )
}

export default SectionFive;
