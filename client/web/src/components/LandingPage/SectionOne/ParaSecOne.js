import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        maxWidth: '58%',
        marginTop: 75,
        // backgroundColor: 'green',
        // color: props => props.color,
    },
});

const ParaSecOne = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h2>BallotNav helps voters find safe, secure, in-person locations to drop off your mail-in or absentee ballot. Launch our demo to navigate BallotNav.</h2>
        </div>
    )
};

export default ParaSecOne;