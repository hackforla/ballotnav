import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        maxWidth: '62%',
        marginTop: 25,
        color: '#1B2152',
        fontSize: 25,
        // backgroundColor: 'green',
        // color: props => props.color,
    },
});

const SubHeadSecFive = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <p>Can you design, write, or code?  Are you an activist with an idea?
            You can help Los Angeles live up to its potential at Hack for LA. Everyone is welcome!</p>
        </div>
    )
};

export default SubHeadSecFive;