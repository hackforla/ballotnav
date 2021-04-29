import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    root: {
        paddingLeft: 66,
        flexWrap: 'wrap',
        maxWidth: '63%',
        marginTop: 75,
        // backgroundColor: 'green',
        // color: props => props.color,
    },
});

const HeaderSecOne = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h1>BallotNav is Validating
                Information for Future Elections. </h1>
        </div>
    )
};

export default HeaderSecOne;