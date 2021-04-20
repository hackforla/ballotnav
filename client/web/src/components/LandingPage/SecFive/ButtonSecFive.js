import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        maxWidth: '58%',
        marginTop: 55,
        // backgroundColor: 'green',
        // color: props => props.color,
    },
});

const ButtonSecFive = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Button>Meet the team</Button>
        </div>
    )
};

export default ButtonSecFive;