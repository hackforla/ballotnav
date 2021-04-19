import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        maxWidth: '58%',
        marginTop: 75,
        color: '#1B2152',
        fontSize: 30,
        // backgroundColor: 'green',
        // color: props => props.color,
    },
});

const ParaSecOne = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <p>BallotNav helps voters find safe, secure, in-person locations to drop off your mail-in or absentee ballot. Launch our demo to navigate BallotNav.</p>
        </div>
    )
};

export default ParaSecOne;