import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        maxWidth: '58%',
        marginTop: 75,
        color: '#1B2152',
        fontSize: 20,
        // backgroundColor: 'green',
        // color: props => props.color,
    },
});

const ParaSecTwo = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <p>Due to distrust in the postal service, misguided information from the media, an inconsistent pool of resources provided by the government, and societal shifts caused by COVID-19, it is now more important than ever to have useful resources for those hoping to have their voices heard. </p>
            <br/>
            <p>
            Information is scattered across state and county websites, each of which may individually fail to provide one or more elements of crucial information, such as available ballot drop-off times. The BallotNav project will collect this data through a network of brigade partnerships and update it accordingly leading up to mid-term elections in 2022. 
            </p>
        </div>
    )
};

export default ParaSecTwo;