import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


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

const ButtonSecOne = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Button>Launch the Demo!</Button>
        </div>
    )
};

export default ButtonSecOne;