import React from 'react'
import ballotNavLogo from 'assets/logos/ballotnav.svg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        // maxWidth: '250px',
        display: 'flex',
        justifyContent: 'flex-start',
        // backgroundColor: 'blue',
        // color: props => props.color,
    },
});

const LandHeadSecOne = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <img style={{height: '55px'}}src={ballotNavLogo} />
        </div>
    )
};

export default LandHeadSecOne;