import React from 'react'
import ballotNavLogo from 'assets/logos/ballotnav.svg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
    paddingLeft: 66
    },
});

const LandHeadSecOne = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <img style={{height: '54px', }}src={ballotNavLogo} />
        </div>
    )
};

export default LandHeadSecOne;