import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BallotNavThumbnail from 'components/LandingPage/SecFour/ballotNavThumbnail'

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

const SectionFour = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <BallotNavThumbnail/>
        </div>
    )
}

export default SectionFour
