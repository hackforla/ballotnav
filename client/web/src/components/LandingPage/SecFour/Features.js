import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccuracyIcon from 'assets/features/check.svg'
import LocationIcon from 'assets/features/current-location.svg'
import TextIcon from 'assets/features/message-ellipsis.svg'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '100%',
        marginTop: 35,
        // backgroundColor: 'green',
        // color: props => props.color,
    }
});

const Features = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <img style={{ height: '125px' }} src={AccuracyIcon} />
            <p style={{ padding: '20px', fontSize: '25px' }}>BallotNav validates election data to guarantee accurate results.</p>
            <img style={{ height: '125px' }} src={LocationIcon} />
            <p style={{ padding: '20px', fontSize: '25px' }}>Search for your nearest drop off locations. View details and directions.
</p>

            <img style={{ height: '125px' }} src={TextIcon} />
            <p style={{ padding: '20px', fontSize: '25px' }}>Receive
            notifications on your phone.</p>

        </div>
    )
};

export default Features;