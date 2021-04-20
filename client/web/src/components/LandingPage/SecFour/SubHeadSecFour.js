import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        color: '#1B2152',
        fontSize: 30,
        // backgroundColor: 'green',
        // color: props => props.color,
    },
});

const SubHeadSecFour = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <p>Simple and intuitive.
            Find out how it works in this short video.</p>
        </div>
    )
};

export default SubHeadSecFour;