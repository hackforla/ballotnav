import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        maxWidth: '100%',
        // backgroundColor: 'green',
        // color: props => props.color,
    },
});

const HeaderSecFour = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h1>See how it works</h1>
        </div>
    )
};

export default HeaderSecFour;