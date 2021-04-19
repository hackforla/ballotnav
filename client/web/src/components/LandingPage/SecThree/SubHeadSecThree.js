import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        maxWidth: '100%',
        marginTop: 25,
        color: '#1B2152',
        fontSize: 25,
        // backgroundColor: 'green',
        // color: props => props.color,
    }
});

const SubHeadSecThree = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <p>BallotNav is an all-volunteer project initiated by Hack for LA and supported by brigades across
the Code for America network.</p>
        </div>
    )
};

export default SubHeadSecThree;