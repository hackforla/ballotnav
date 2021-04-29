import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SectionOne from 'components/LandingPage/SecOne/SectionOne'
import SectionTwo from 'components/LandingPage/SecTwo/SectionTwo'
import SectionThree from 'components/LandingPage/SecThree/SectionThree'
import SectionFour from 'components/LandingPage/SecFour/SectionFour'
import SectionFive from 'components/LandingPage/SecFive/SectionFive'

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.layout.pageWidth,
        maxWidth: '100%',
        margin: '50px',
        // textAlign: 'start',
        // '& h1': {
        //     fontSize: 40,
        //     fontWeight: 'bold',
        //     color: '#1B2152',
        // },
        // '& a': {
        //     display: 'block',
        //     textDecoration: 'underline',
        //     marginTop: 10,
        // },
    },
}))

const Landing = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
        </div>
    )
}

export default Landing
